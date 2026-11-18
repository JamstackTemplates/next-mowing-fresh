// Price by lawn size. The most common owner edit: change a number below and rebuild.
// All prices are Australian dollars per visit, GST included, in whole dollars.

export interface LawnBand {
  /** Stable, URL-safe ID (lower-case letters, digits and hyphens). Referenced by content/patterns.ts. */
  id: string;
  /** Short name shown in the price table. */
  label: string;
  /** Smallest lawn in this band, in square metres (exclusive, except 0). Must equal the previous band's maxM2. */
  minM2: number;
  /** Largest lawn in this band, in square metres (inclusive). `null` only for the last, open-ended band. */
  maxM2: number | null;
  /** Plain description that helps visitors pick a band without measuring. */
  example: string;
  /** Per-visit price on a weekly plan, or `null` for "price on enquiry". */
  weekly: number | null;
  /** Per-visit price on a fortnightly plan, or `null` for "price on enquiry". */
  fortnightly: number | null;
  /** Price for a single mow with no plan, or `null` for "price on enquiry". */
  oneOff: number | null;
}

export const CURRENCY = 'AUD';

export const lawnBands: LawnBand[] = [
  { id: 'courtyard', label: 'Courtyard', minM2: 0, maxM2: 150, example: 'Townhouse courtyard or a small front lawn', weekly: 45, fortnightly: 52, oneOff: 65 },
  { id: 'standard', label: 'Standard', minM2: 150, maxM2: 350, example: 'Front and back lawn on a regular block', weekly: 60, fortnightly: 70, oneOff: 90 },
  { id: 'family', label: 'Family', minM2: 350, maxM2: 600, example: 'Big backyard with room for a cricket pitch', weekly: 80, fortnightly: 92, oneOff: 120 },
  { id: 'estate', label: 'Estate', minM2: 600, maxM2: 1000, example: 'Corner block or a double block', weekly: 105, fortnightly: 120, oneOff: 155 },
  { id: 'acreage', label: 'Acreage', minM2: 1000, maxM2: null, example: 'Anything larger', weekly: null, fortnightly: null, oneOff: null },
];

export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Throws an error naming the band to fix. Runs at build time and in tests. */
export function validateBands(bands: readonly LawnBand[]): void {
  if (!bands.length) throw new Error('prices.ts: add at least one lawn band');
  const ids = new Set<string>();
  bands.forEach((band, index) => {
    const at = `prices.ts: band "${band.id || `#${index + 1}`}"`;
    if (!SLUG.test(band.id)) throw new Error(`${at}: id must be lower-case letters, digits and hyphens`);
    if (ids.has(band.id)) throw new Error(`${at}: duplicate id`);
    ids.add(band.id);
    if (!band.label.trim()) throw new Error(`${at}: label is required`);
    if (!band.example.trim()) throw new Error(`${at}: example is required`);
    const expectedMin = index === 0 ? 0 : bands[index - 1].maxM2;
    if (band.minM2 !== expectedMin) throw new Error(`${at}: minM2 must be ${expectedMin} so bands meet without gaps or overlaps`);
    const last = index === bands.length - 1;
    if (band.maxM2 === null && !last) throw new Error(`${at}: only the last band can be open-ended (maxM2: null)`);
    if (band.maxM2 !== null && band.maxM2 <= band.minM2) throw new Error(`${at}: maxM2 must be larger than minM2`);
    const prices = [['weekly', band.weekly], ['fortnightly', band.fortnightly], ['oneOff', band.oneOff]] as const;
    for (const [field, price] of prices) {
      if (price !== null && (!Number.isInteger(price) || price <= 0 || price > 2000)) {
        throw new Error(`${at}: ${field} must be a whole number of dollars between 1 and 2000, or null for "on enquiry"`);
      }
    }
    if (band.weekly !== null && band.fortnightly !== null && band.weekly >= band.fortnightly) {
      throw new Error(`${at}: weekly price must be lower than fortnightly`);
    }
    if (band.fortnightly !== null && band.oneOff !== null && band.fortnightly >= band.oneOff) {
      throw new Error(`${at}: fortnightly price must be lower than one-off`);
    }
  });
}

validateBands(lawnBands);

const priced = (values: (number | null)[]) => values.filter((value): value is number => value !== null);

/** Lowest weekly price: the "from $45 a visit" figure. */
export const fromPrice = Math.min(...priced(lawnBands.map(band => band.weekly)));
/** Highest listed price, for schema.org priceRange. */
export const topPrice = Math.max(...priced(lawnBands.flatMap(band => [band.weekly, band.fortnightly, band.oneOff])));

/** "$45" or "On enquiry". */
export function formatPrice(value: number | null): string {
  return value === null ? 'On enquiry' : `$${value}`;
}

/** "Up to 150 m²", "150–350 m²" or "Over 1000 m²". */
export function bandRange(band: LawnBand): string {
  if (band.minM2 === 0 && band.maxM2 !== null) return `Up to ${band.maxM2} m²`;
  if (band.maxM2 === null) return `Over ${band.minM2} m²`;
  return `${band.minM2}–${band.maxM2} m²`;
}
