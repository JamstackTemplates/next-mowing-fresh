import { ROUND_DAY_NAMES, type Suburb } from '../content/suburbs.ts';

export type LookupResult =
  | { kind: 'empty' }
  | { kind: 'served'; suburb: Suburb }
  | { kind: 'waitlist'; suburb: Suburb }
  | { kind: 'unknown'; query: string };

/** Case-insensitive, ignoring spaces, hyphens and apostrophes: "Kew East", "keweast" and "kew-east" match. */
export function normaliseSuburb(value: string): string {
  return value.toLowerCase().replace(/[\s\-'’.]+/g, '');
}

/**
 * Match a suburb name or postcode. Exact matches win; otherwise a prefix of three or more
 * characters that matches exactly one suburb (so "camb" finds Camberwell, but "kew" stays Kew).
 */
export function lookupSuburb(query: string, list: readonly Suburb[]): LookupResult {
  const needle = normaliseSuburb(query);
  if (!needle) return { kind: 'empty' };
  const exact = list.find(suburb => suburb.postcode === needle || normaliseSuburb(suburb.name) === needle);
  const prefixed = needle.length >= 3 ? list.filter(suburb => normaliseSuburb(suburb.name).startsWith(needle)) : [];
  const suburb = exact ?? (prefixed.length === 1 ? prefixed[0] : undefined);
  if (!suburb) return { kind: 'unknown', query: query.trim() };
  return suburb.status === 'served' ? { kind: 'served', suburb } : { kind: 'waitlist', suburb };
}

export function lookupMessage(result: LookupResult): string {
  switch (result.kind) {
    case 'empty': return 'Type a suburb or postcode.';
    case 'served': return `Yes, we mow ${result.suburb.name} on ${ROUND_DAY_NAMES[result.suburb.roundDay]}s.`;
    case 'waitlist': return `${result.suburb.name} is on our waitlist. Send an enquiry and we'll tell you when a spot opens.`;
    case 'unknown': return `${result.query} isn't on our rounds yet, but send an enquiry and we'll let you know if that changes.`;
  }
}
