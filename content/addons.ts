// Optional extras, shown on the Prices page tool rack.
import { SLUG } from './prices.ts';

export type AddonIcon = 'shears' | 'spray' | 'spreader' | 'mower';

export interface Addon {
  /** Stable, URL-safe ID. */
  id: string;
  name: string;
  /** "From" price in AUD, GST included, whole dollars. */
  price: number;
  /** What the price is for, e.g. "per visit". */
  unit: string;
  /** Drawing shown on the rack. */
  icon: AddonIcon;
}

export const addons: Addon[] = [
  { id: 'hedge-trim', name: 'Hedge trim', price: 40, unit: 'per visit', icon: 'shears' },
  { id: 'weed-spray', name: 'Path and driveway weed spray', price: 25, unit: 'per visit', icon: 'spray' },
  { id: 'fertilise', name: 'Seasonal fertilise (spring and autumn)', price: 35, unit: 'per application', icon: 'spreader' },
  { id: 'first-cut', name: 'Overgrown first cut', price: 40, unit: 'one-off, first visit only', icon: 'mower' },
];

export function validateAddons(list: readonly Addon[]): void {
  const ids = new Set<string>();
  for (const addon of list) {
    const at = `addons.ts: add-on "${addon.id}"`;
    if (!SLUG.test(addon.id)) throw new Error(`${at}: id must be URL-safe`);
    if (ids.has(addon.id)) throw new Error(`${at}: duplicate id`);
    ids.add(addon.id);
    if (!addon.name.trim() || !addon.unit.trim()) throw new Error(`${at}: name and unit are required`);
    if (!Number.isInteger(addon.price) || addon.price <= 0 || addon.price > 2000) throw new Error(`${at}: price must be whole dollars from 1 to 2000`);
  }
}

validateAddons(addons);
