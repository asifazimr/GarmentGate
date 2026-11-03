import { describe, expect, it } from 'vitest';
import { bandFor, FLOOR_AREA_BANDS, WORKFORCE_BANDS } from './bands.js';
import { brandBadges } from './claims.schema.js';
import { dateOnly, isoWeekday, piecesFor, slotCapacityMinutes, workingDayCount } from './lines.js';

describe('line capacity', () => {
  const monToSat = [1, 2, 3, 4, 5, 6];

  it('knows ISO weekdays', () => {
    expect(isoWeekday(dateOnly('2026-11-02'))).toBe(1); // Monday
    expect(isoWeekday(dateOnly('2026-11-08'))).toBe(7); // Sunday
  });

  it('counts working days inclusively', () => {
    expect(workingDayCount(dateOnly('2026-11-02'), dateOnly('2026-11-08'), monToSat)).toBe(6);
    expect(workingDayCount(dateOnly('2026-11-08'), dateOnly('2026-11-08'), monToSat)).toBe(0);
    // Bangladesh-style week: Saturday to Thursday.
    expect(
      workingDayCount(dateOnly('2026-11-02'), dateOnly('2026-11-08'), [1, 2, 3, 4, 6, 7]),
    ).toBe(6);
  });

  it('turns a window into SAM minutes and minutes into pieces', () => {
    const line = { dailySamMinutes: 10_800, workingDays: monToSat };
    expect(slotCapacityMinutes(line, dateOnly('2026-11-02'), dateOnly('2026-11-15'))).toBe(129_600);
    expect(piecesFor(129_600, 9.5)).toBe(13_642);
    expect(piecesFor(1_000, 0)).toBe(0);
  });
});

describe('size bands', () => {
  it('puts exact figures into ranges', () => {
    expect(bandFor(820, WORKFORCE_BANDS)).toEqual({ min: 500, max: 999 });
    expect(bandFor(5000, WORKFORCE_BANDS)).toEqual({ min: 5000, max: null });
    expect(bandFor(42_000, FLOOR_AREA_BANDS)).toEqual({ min: 25000, max: null });
    expect(bandFor(null, WORKFORCE_BANDS)).toBeNull();
    expect(bandFor(0, WORKFORCE_BANDS)).toBeNull();
  });
});

describe('brandBadges', () => {
  it('counts distinct verified brands per region and tier, never returning names', () => {
    const badges = brandBadges([
      { region: 'EU', tier: 'MAJOR', brandNames: ['H&M', 'Zara'], status: 'VERIFIED' },
      { region: 'EU', tier: 'MAJOR', brandNames: ['zara', 'Primark'], status: 'VERIFIED' },
      { region: 'US', tier: 'ESTABLISHED', brandNames: ['Brand A'], status: 'VERIFIED' },
      { region: 'UK', tier: 'MAJOR', brandNames: ['Pending Co'], status: 'PENDING' },
      { region: 'UK', tier: 'MAJOR', brandNames: ['Rejected Co'], status: 'REJECTED' },
    ]);
    expect(badges).toEqual([
      { region: 'EU', tier: 'MAJOR', brandCount: 3 },
      { region: 'US', tier: 'ESTABLISHED', brandCount: 1 },
    ]);
    expect(JSON.stringify(badges)).not.toMatch(/zara|primark|h&m|brand a/i);
  });
});
