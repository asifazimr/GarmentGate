import { describe, expect, it } from 'vitest';
import { acceptanceNumber, aqlVerdict, sampleSize } from './aql.js';

describe('sampleSize (General Inspection Level II)', () => {
  it.each([
    [8, 2],
    [50, 8],
    [500, 50],
    [501, 80],
    [1200, 80],
    [6000, 200],
    [12_000, 315],
    [35_000, 315],
    [35_001, 500],
    [1_000_000, 1250],
  ])('lot %i → sample %i', (lot, n) => {
    expect(sampleSize(lot)).toBe(n);
  });

  it('never samples more pieces than the lot has', () => {
    expect(sampleSize(2)).toBe(2);
  });

  it('refuses lots below 2', () => {
    expect(() => sampleSize(1)).toThrow();
  });
});

describe('acceptanceNumber', () => {
  it('matches the standard for common garment AQLs', () => {
    expect(acceptanceNumber(200, '2.5')).toBe(10);
    expect(acceptanceNumber(200, '4.0')).toBe(14);
    expect(acceptanceNumber(315, '2.5')).toBe(14);
    expect(acceptanceNumber(80, '2.5')).toBe(5);
    expect(acceptanceNumber(125, '1.5')).toBe(5);
  });
});

describe('aqlVerdict', () => {
  const base = {
    lotSize: 6000,
    majorAql: '2.5',
    minorAql: '4.0',
    critical: 0,
    major: 10,
    minor: 14,
  } as const;

  it('passes at the acceptance numbers', () => {
    expect(aqlVerdict(base)).toEqual({
      sampleSize: 200,
      acceptMajor: 10,
      acceptMinor: 14,
      result: 'PASS',
      reasons: [],
    });
  });

  it('fails one over, and on any critical defect', () => {
    expect(aqlVerdict({ ...base, major: 11 }).reasons).toEqual(['MAJOR']);
    expect(aqlVerdict({ ...base, minor: 15 }).result).toBe('FAIL');
    expect(aqlVerdict({ ...base, critical: 1 }).reasons).toEqual(['CRITICAL']);
  });
});
