/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}
export type OpeningState =
  | { kind: 'unknown' }
  | { kind: 'open'; closes: string }
  | { kind: 'closed'; day: Day; opens: string; offset: number }
  | { kind: 'never' };

/** Where `now` falls in the weekly hours, in the business zone. Browser callers supply the clock. */
export function openingState(hours: readonly OpeningHours[], timeZone: string, now = new Date()): OpeningState {
  if (!timeZone) return { kind: 'unknown' };
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  } catch { return { kind: 'unknown' }; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return { kind: 'unknown' };
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) return { kind: 'open', closes: today.closes };
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) return { kind: 'closed', day, opens: entry.opens, offset };
  }
  return { kind: 'never' };
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const state = openingState(hours, timeZone, now);
  if (state.kind === 'open') return `Open now · until ${state.closes}`;
  if (state.kind === 'closed') return `Closed · opens ${state.offset === 0 ? 'today' : state.day} at ${state.opens}`;
  if (state.kind === 'never') return 'Closed · see opening hours';
  return 'See opening hours';
}

/** "07:00" → "7am", "12:00" → "12pm", "17:30" → "5:30pm". */
export function friendlyTime(value: string): string {
  const hour = Number(value.slice(0, 2));
  const minute = value.slice(3);
  const suffix = hour < 12 ? 'am' : 'pm';
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}${minute === '00' ? '' : `:${minute}`}${suffix}`;
}

/** Static, neutral summary such as "Mon–Fri 7am–5pm, Sat 8am–12pm". Consecutive days with equal hours are grouped. */
export function hoursSummary(hours: readonly OpeningHours[]): string {
  validateHours(hours);
  const ordered = DAYS.map(day => hours.find(entry => entry.day === day)!);
  const groups: { first: Day; last: Day; text: string }[] = [];
  for (const entry of ordered) {
    if (!entry.opens || !entry.closes) continue;
    const text = `${friendlyTime(entry.opens)}–${friendlyTime(entry.closes)}`;
    const previous = groups.at(-1);
    if (previous && previous.text === text && DAYS.indexOf(previous.last) === DAYS.indexOf(entry.day) - 1) previous.last = entry.day;
    else groups.push({ first: entry.day, last: entry.day, text });
  }
  const short = (day: Day) => day.slice(0, 3);
  return groups.map(group => `${short(group.first)}${group.first === group.last ? '' : `–${short(group.last)}`} ${group.text}`).join(', ');
}
