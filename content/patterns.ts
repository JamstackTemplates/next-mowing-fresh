// Stripe patterns offered on every plan. The pattern art for each id lives in app/tailwind.input.css (.lawn--<id>).
import { lawnBands, SLUG, type LawnBand } from './prices.ts';

export type PatternId = 'straight' | 'diagonal' | 'checkerboard' | 'diamond';

export interface StripePattern {
  /** Stable ID; must match a .lawn--<id> style. */
  id: PatternId;
  name: string;
  description: string;
  /** Extra AUD per visit, GST included. 0 for no surcharge. */
  surcharge: number;
  /** Smallest lawn band the pattern suits; an id from content/prices.ts. */
  minBandId: string;
}

export const patterns: StripePattern[] = [
  { id: 'straight', name: 'Classic straight', description: 'Parallel stripes along the longest edge of the lawn.', surcharge: 0, minBandId: 'courtyard' },
  { id: 'diagonal', name: 'Diagonal', description: 'Stripes at 45° to the house. Makes a small lawn look wider.', surcharge: 0, minBandId: 'courtyard' },
  { id: 'checkerboard', name: 'Checkerboard', description: 'Two passes at right angles for squares that shift as you walk past.', surcharge: 10, minBandId: 'standard' },
  { id: 'diamond', name: 'Diamond', description: 'Two diagonal passes. The one the neighbours ask about.', surcharge: 15, minBandId: 'standard' },
];

export function validatePatterns(list: readonly StripePattern[], bands: readonly LawnBand[] = lawnBands): void {
  const ids = new Set<string>();
  for (const pattern of list) {
    const at = `patterns.ts: pattern "${pattern.id}"`;
    if (!SLUG.test(pattern.id)) throw new Error(`${at}: id must be URL-safe`);
    if (ids.has(pattern.id)) throw new Error(`${at}: duplicate id`);
    ids.add(pattern.id);
    if (!pattern.name.trim() || !pattern.description.trim()) throw new Error(`${at}: name and description are required`);
    if (!Number.isInteger(pattern.surcharge) || pattern.surcharge < 0 || pattern.surcharge > 200) throw new Error(`${at}: surcharge must be whole dollars from 0 to 200`);
    if (!bands.some(band => band.id === pattern.minBandId)) throw new Error(`${at}: minBandId "${pattern.minBandId}" is not a band in prices.ts`);
  }
}

validatePatterns(patterns);

export function surchargeLabel(pattern: StripePattern): string {
  return pattern.surcharge ? `+$${pattern.surcharge} a visit` : 'No extra charge';
}

export function minBandLabel(pattern: StripePattern, bands: readonly LawnBand[] = lawnBands): string {
  const band = bands.find(item => item.id === pattern.minBandId)!;
  return bands[0].id === band.id ? 'Suits every lawn' : `Suits ${band.label} lawns and up`;
}
