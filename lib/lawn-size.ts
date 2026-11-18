import { type LawnBand } from '../content/prices.ts';

/** Area in whole square metres from length × width in metres, or null when either is missing or invalid. */
export function lawnArea(length: number, width: number): number | null {
  if (!Number.isFinite(length) || !Number.isFinite(width) || length <= 0 || width <= 0) return null;
  return Math.round(length * width);
}

/** The band a lawn falls in. Bands include their upper bound: 150 m² is a Courtyard lawn, 151 m² is Standard. */
export function bandForArea(area: number, bands: readonly LawnBand[]): LawnBand | null {
  if (!Number.isFinite(area) || area <= 0) return null;
  return bands.find(band => area > band.minM2 && (band.maxM2 === null || area <= band.maxM2)) ?? null;
}

/** Short sentence for the lawn-size helper. */
export function lawnSizeMessage(area: number | null, bands: readonly LawnBand[]): string {
  if (area === null) return 'Enter the length and width of your lawn in metres.';
  const band = bandForArea(area, bands);
  const size = `About ${area.toLocaleString('en-AU')} m²`;
  if (!band) return `${size}. Enter a lawn larger than 0 m².`;
  if (band.weekly === null && band.fortnightly === null && band.oneOff === null) return `${size}: ${band.label}, price on enquiry.`;
  const price = (value: number | null, label: string) => value === null ? `${label} on enquiry` : `$${value} ${label}`;
  return `${size}: ${band.label} lawn. ${price(band.weekly, 'weekly')}, ${price(band.fortnightly, 'fortnightly')}, ${price(band.oneOff, 'one-off')} a visit.`;
}
