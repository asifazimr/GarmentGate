/**
 * AQL sampling per ISO 2859-1, General Inspection Level II, single sampling, normal inspection:
 * the table garment QC uses. From the lot size it gives the sample size, and for each AQL the
 * acceptance number (most defects allowed). Critical defects are never accepted.
 */

/** Lot size upper bounds → sample size (code letters A … Q). */
const SAMPLE_SIZES: readonly [maxLot: number, sample: number][] = [
  [8, 2],
  [15, 3],
  [25, 5],
  [50, 8],
  [90, 13],
  [150, 20],
  [280, 32],
  [500, 50],
  [1200, 80],
  [3200, 125],
  [10_000, 200],
  [35_000, 315],
  [150_000, 500],
  [500_000, 800],
  [Number.POSITIVE_INFINITY, 1250],
];

export const AQL_LEVELS = ['1.5', '2.5', '4.0', '6.5'] as const;
export type AqlLevel = (typeof AQL_LEVELS)[number];

/** Acceptance numbers by sample size, per AQL (arrows of the standard resolved). */
const ACCEPT: Record<AqlLevel, Record<number, number>> = {
  '1.5': {
    2: 0,
    3: 0,
    5: 0,
    8: 0,
    13: 0,
    20: 1,
    32: 1,
    50: 2,
    80: 3,
    125: 5,
    200: 7,
    315: 10,
    500: 14,
    800: 21,
    1250: 21,
  },
  '2.5': {
    2: 0,
    3: 0,
    5: 0,
    8: 0,
    13: 1,
    20: 1,
    32: 2,
    50: 3,
    80: 5,
    125: 7,
    200: 10,
    315: 14,
    500: 21,
    800: 21,
    1250: 21,
  },
  '4.0': {
    2: 0,
    3: 0,
    5: 0,
    8: 1,
    13: 1,
    20: 2,
    32: 3,
    50: 5,
    80: 7,
    125: 10,
    200: 14,
    315: 21,
    500: 21,
    800: 21,
    1250: 21,
  },
  '6.5': {
    2: 0,
    3: 0,
    5: 1,
    8: 1,
    13: 2,
    20: 3,
    32: 5,
    50: 7,
    80: 10,
    125: 14,
    200: 21,
    315: 21,
    500: 21,
    800: 21,
    1250: 21,
  },
};

export function sampleSize(lotSize: number): number {
  if (!Number.isInteger(lotSize) || lotSize < 2) throw new Error('Lot size must be at least 2');
  const row = SAMPLE_SIZES.find(([max]) => lotSize <= max);
  // The last row is unbounded, so a row is always found.
  return Math.min(row?.[1] ?? 1250, lotSize);
}

export function acceptanceNumber(sample: number, aql: AqlLevel): number {
  const table = ACCEPT[aql];
  // A sample capped at the lot size (tiny lots) uses the nearest plan below it.
  const sizes = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);
  const size = [...sizes].reverse().find((s) => s <= sample) ?? 2;
  return table[size] ?? 0;
}

export interface AqlInput {
  lotSize: number;
  majorAql: AqlLevel;
  minorAql: AqlLevel;
  critical: number;
  major: number;
  minor: number;
}

export interface AqlVerdict {
  sampleSize: number;
  acceptMajor: number;
  acceptMinor: number;
  /** PASS only with no critical defects and both counts within their acceptance numbers. */
  result: 'PASS' | 'FAIL';
  reasons: ('CRITICAL' | 'MAJOR' | 'MINOR')[];
}

export function aqlVerdict(input: AqlInput): AqlVerdict {
  const n = sampleSize(input.lotSize);
  const acceptMajor = acceptanceNumber(n, input.majorAql);
  const acceptMinor = acceptanceNumber(n, input.minorAql);
  const reasons: AqlVerdict['reasons'] = [];
  if (input.critical > 0) reasons.push('CRITICAL');
  if (input.major > acceptMajor) reasons.push('MAJOR');
  if (input.minor > acceptMinor) reasons.push('MINOR');
  return {
    sampleSize: n,
    acceptMajor,
    acceptMinor,
    result: reasons.length === 0 ? 'PASS' : 'FAIL',
    reasons,
  };
}
