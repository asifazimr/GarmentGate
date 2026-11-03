/**
 * Exact headcount or floor area can identify a factory, so buyers see ranges. Each band is
 * [min, max] inclusive; the last is open-ended (max null).
 */
export interface Band {
  min: number;
  max: number | null;
}

export const WORKFORCE_BANDS: readonly Band[] = [
  { min: 1, max: 99 },
  { min: 100, max: 249 },
  { min: 250, max: 499 },
  { min: 500, max: 999 },
  { min: 1000, max: 2499 },
  { min: 2500, max: 4999 },
  { min: 5000, max: null },
];

export const FLOOR_AREA_BANDS: readonly Band[] = [
  { min: 1, max: 999 },
  { min: 1000, max: 2499 },
  { min: 2500, max: 4999 },
  { min: 5000, max: 9999 },
  { min: 10000, max: 24999 },
  { min: 25000, max: null },
];

/** The band a value falls in, or null when the value is unknown or not positive. */
export function bandFor(value: number | null, bands: readonly Band[]): Band | null {
  if (value === null || value <= 0) return null;
  return bands.find((b) => value >= b.min && (b.max === null || value <= b.max)) ?? null;
}
