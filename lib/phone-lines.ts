import { friendlyTime, hoursSummary, openingState, type OpeningHours } from './hours.ts';

/** Neutral text for static/no-JS output: never claims the lines are open or closed. */
export function phoneLinesStatic(hours: readonly OpeningHours[]): string {
  return `Phone lines ${hoursSummary(hours)}`;
}

/**
 * Live phone-line status in the business zone, e.g. "Phone lines open, until 5pm" or
 * "Phone lines closed, back Monday 7am". Only called in the browser with the visitor's clock.
 */
export function phoneLinesLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const state = openingState(hours, timeZone, now);
  if (state.kind === 'open') return `Phone lines open, until ${friendlyTime(state.closes)}`;
  if (state.kind === 'closed') {
    const when = state.offset === 0 ? 'today' : state.offset === 1 ? 'tomorrow' : state.day;
    return `Phone lines closed, back ${when} ${friendlyTime(state.opens)}`;
  }
  return phoneLinesStatic(hours);
}
