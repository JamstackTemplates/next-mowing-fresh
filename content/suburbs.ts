// Suburbs on the mowing rounds. Common owner edit: move a suburb from 'waitlist' to 'served'.
// The round sheet, Home strip, map, lookup and JSON-LD areaServed all read from this list.
import { SLUG } from './prices.ts';

export const ROUND_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export type RoundDay = typeof ROUND_DAYS[number];
export const ROUND_DAY_NAMES: Record<RoundDay, string> = {
  Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday',
};

export interface Suburb {
  /** Stable, URL-safe ID. Also positions the plot on the suburb map (components/art/suburb-map.tsx). */
  id: string;
  /** Suburb name as locals write it. */
  name: string;
  /** Four-digit Australian postcode. */
  postcode: string;
  /** Day the crew mows this suburb. */
  roundDay: RoundDay;
  /** 'served': taking new lawns. 'waitlist': full for now; enquiries join the waitlist. */
  status: 'served' | 'waitlist';
}

export const suburbs: Suburb[] = [
  { id: 'kew', name: 'Kew', postcode: '3101', roundDay: 'Mon', status: 'served' },
  { id: 'kew-east', name: 'Kew East', postcode: '3102', roundDay: 'Mon', status: 'served' },
  { id: 'hawthorn', name: 'Hawthorn', postcode: '3122', roundDay: 'Tue', status: 'served' },
  { id: 'hawthorn-east', name: 'Hawthorn East', postcode: '3123', roundDay: 'Tue', status: 'served' },
  { id: 'camberwell', name: 'Camberwell', postcode: '3124', roundDay: 'Wed', status: 'served' },
  { id: 'canterbury', name: 'Canterbury', postcode: '3126', roundDay: 'Wed', status: 'served' },
  { id: 'surrey-hills', name: 'Surrey Hills', postcode: '3127', roundDay: 'Thu', status: 'served' },
  { id: 'balwyn', name: 'Balwyn', postcode: '3103', roundDay: 'Thu', status: 'served' },
  { id: 'balwyn-north', name: 'Balwyn North', postcode: '3104', roundDay: 'Thu', status: 'waitlist' },
  { id: 'glen-iris', name: 'Glen Iris', postcode: '3146', roundDay: 'Fri', status: 'served' },
  { id: 'ashburton', name: 'Ashburton', postcode: '3147', roundDay: 'Fri', status: 'waitlist' },
  { id: 'box-hill', name: 'Box Hill', postcode: '3128', roundDay: 'Sat', status: 'waitlist' },
];

export function validateSuburbs(list: readonly Suburb[]): void {
  const ids = new Set<string>();
  const names = new Set<string>();
  for (const suburb of list) {
    const at = `suburbs.ts: suburb "${suburb.id}"`;
    if (!SLUG.test(suburb.id)) throw new Error(`${at}: id must be lower-case letters, digits and hyphens`);
    if (ids.has(suburb.id)) throw new Error(`${at}: duplicate id`);
    ids.add(suburb.id);
    if (!suburb.name.trim()) throw new Error(`${at}: name is required`);
    if (names.has(suburb.name.toLowerCase())) throw new Error(`${at}: duplicate name "${suburb.name}"`);
    names.add(suburb.name.toLowerCase());
    if (!/^\d{4}$/.test(suburb.postcode)) throw new Error(`${at}: postcode must be four digits`);
    if (!ROUND_DAYS.includes(suburb.roundDay)) throw new Error(`${at}: roundDay must be one of ${ROUND_DAYS.join(', ')}`);
    if (suburb.status !== 'served' && suburb.status !== 'waitlist') throw new Error(`${at}: status must be 'served' or 'waitlist'`);
  }
}

validateSuburbs(suburbs);

export const servedSuburbs = suburbs.filter(suburb => suburb.status === 'served');

/** Suburbs grouped by round day in Mon–Sat order; days with no suburbs are kept so the sheet stays a week. */
export function suburbsByDay(list: readonly Suburb[] = suburbs): { day: RoundDay; suburbs: Suburb[] }[] {
  return ROUND_DAYS.map(day => ({ day, suburbs: list.filter(suburb => suburb.roundDay === day) }));
}
