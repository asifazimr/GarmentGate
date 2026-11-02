import { describe, expect, it } from 'vitest';
import { buildOverview, monthsBetween, overviewStart } from './overview.js';

const rates = { USD: '1', EUR: '0.5' }; // 1 USD = 0.5 EUR, so 1 EUR = 2 USD

describe('overview months', () => {
  it('starts at the first of the month, months − 1 back', () => {
    const now = new Date('2026-11-15T10:00:00Z');
    expect(overviewStart(now, 1).toISOString()).toBe('2026-11-01T00:00:00.000Z');
    expect(overviewStart(now, 12).toISOString()).toBe('2025-12-01T00:00:00.000Z');
  });

  it('lists every month up to now, across a year end', () => {
    expect(
      monthsBetween(new Date('2025-11-01T00:00:00Z'), new Date('2026-02-03T00:00:00Z')),
    ).toEqual(['2025-11', '2025-12', '2026-01', '2026-02']);
  });
});

describe('buildOverview', () => {
  const months = ['2026-10', '2026-11'];

  it('sums GMV, markup and commission in USD, by month and category', () => {
    const result = buildOverview(
      [
        {
          confirmedAt: new Date('2026-10-05T00:00:00Z'),
          currency: 'USD',
          buyerTotalMinor: 10_000n,
          manufacturerTotalMinor: 8_000n,
          commissionMinor: 400n,
          category: 'T-shirts',
        },
        {
          confirmedAt: new Date('2026-11-02T00:00:00Z'),
          currency: 'EUR',
          buyerTotalMinor: 5_000n,
          manufacturerTotalMinor: 4_000n,
          commissionMinor: 100n,
          category: 'Hoodies',
        },
      ],
      [],
      rates,
      months,
    );
    expect(result.gmvUsdMinor).toBe(20_000);
    expect(result.markupUsdMinor).toBe(4_000);
    expect(result.commissionUsdMinor).toBe(600);
    expect(result.revenueUsdMinor).toBe(4_600);
    expect(result.series.map((m) => m.gmvUsdMinor)).toEqual([10_000, 10_000]);
    expect(result.topCategories.map((c) => c.name)).toEqual(['T-shirts', 'Hoodies']);
  });

  it('computes RFQ → order conversion in basis points', () => {
    const at = new Date('2026-11-01T00:00:00Z');
    const result = buildOverview(
      [],
      [
        { publishedAt: at, converted: true },
        { publishedAt: at, converted: false },
        { publishedAt: at, converted: false },
      ],
      rates,
      months,
    );
    expect(result.rfqs).toBe(3);
    expect(result.rfqsConverted).toBe(1);
    expect(result.conversionBps).toBe(3333);
    expect(result.series[1]).toMatchObject({ rfqs: 3, rfqsConverted: 1 });
  });

  it('skips currencies without a rate instead of guessing', () => {
    const result = buildOverview(
      [
        {
          confirmedAt: new Date('2026-11-02T00:00:00Z'),
          currency: 'BDT',
          buyerTotalMinor: 1_000n,
          manufacturerTotalMinor: 900n,
          commissionMinor: 0n,
          category: null,
        },
      ],
      [],
      rates,
      months,
    );
    expect(result.gmvUsdMinor).toBe(0);
    expect(result.confirmedOrders).toBe(1);
    expect(result.skippedCurrencies).toEqual(['BDT']);
  });

  it('ignores anything outside the window', () => {
    const result = buildOverview(
      [
        {
          confirmedAt: new Date('2026-08-01T00:00:00Z'),
          currency: 'USD',
          buyerTotalMinor: 1_000n,
          manufacturerTotalMinor: 900n,
          commissionMinor: 0n,
          category: null,
        },
      ],
      [{ publishedAt: new Date('2026-08-01T00:00:00Z'), converted: true }],
      rates,
      months,
    );
    expect(result.gmvUsdMinor).toBe(0);
    expect(result.rfqs).toBe(0);
  });
});
