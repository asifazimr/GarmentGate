import { describe, expect, it } from 'vitest';
import {
  bookingPrice,
  buyerRateFor,
  cancellationSplit,
  cmtUnitPrice,
  DEFAULT_CAPACITY_BOOKING_SETTINGS,
  daysUntil,
  fullRefund,
  minutesForPieces,
  partnershipDepositDue,
  partnershipMonths,
  piecesForMinutes,
  samToCenti,
  tierFor,
} from './booking.js';
import { CapacityBookingSettingsSchema, CapacitySearchQuerySchema } from './booking.schema.js';

const tiers = DEFAULT_CAPACITY_BOOKING_SETTINGS.cancellationTiers;

describe('booking price', () => {
  it('adds the fee to the rate, rounding up', () => {
    expect(buyerRateFor(650, 800)).toBe(702);
    expect(buyerRateFor(651, 800)).toBe(704); // 703.08 → 704
  });

  it('prices minutes for both sides and takes a deposit share', () => {
    const p = bookingPrice({
      minutes: 120_000,
      factoryRateMinorPer100Min: 650,
      feeBps: 800,
      depositBps: 3000,
    });
    expect(p.factoryAmountMinor).toBe(780_000n);
    expect(p.buyerAmountMinor).toBe(842_400n);
    expect(p.depositMinor).toBe(252_720n);
    expect(p.buyerAmountMinor).toBeGreaterThanOrEqual(p.factoryAmountMinor);
  });

  it('rounds partial minor units up and never charges a zero deposit', () => {
    const p = bookingPrice({ minutes: 61, factoryRateMinorPer100Min: 1, feeBps: 0, depositBps: 1 });
    expect(p.factoryAmountMinor).toBe(1n);
    expect(p.depositMinor).toBe(1n);
  });
});

describe('SAM helper', () => {
  it('converts pieces and minutes both ways', () => {
    const sam = samToCenti(12.5);
    expect(sam).toBe(1250);
    expect(minutesForPieces(10_000, sam)).toBe(125_000);
    expect(minutesForPieces(3, 1)).toBe(1); // 0.03 min rounds up
    expect(piecesForMinutes(125_000, sam)).toBe(10_000);
    expect(piecesForMinutes(124_999, sam)).toBe(9_999);
  });

  it('prices a CMT piece from SAM and rate', () => {
    expect(cmtUnitPrice(1250, 702)).toBe(88); // 12.5 × 7.02 = 87.75 → 88
  });
});

describe('cancellation', () => {
  it('picks the tier by days ahead', () => {
    expect(tierFor(tiers, 45).refundBps).toBe(10_000);
    expect(tierFor(tiers, 30).refundBps).toBe(10_000);
    expect(tierFor(tiers, 29).refundBps).toBe(5_000);
    expect(tierFor(tiers, 0).refundBps).toBe(0);
    expect(tierFor(tiers, -3).refundBps).toBe(0);
  });

  it('splits a kept deposit between factory and platform, always adding up', () => {
    for (const [days, paid] of [
      [40, 252_720n],
      [20, 252_721n],
      [3, 99_999n],
    ] as const) {
      const s = cancellationSplit({
        paidMinor: paid,
        daysBefore: days,
        tiers,
        factoryShareBps: 5000,
      });
      expect(s.refundMinor + s.factoryMinor + s.platformMinor).toBe(paid);
    }
    expect(
      cancellationSplit({ paidMinor: 1001n, daysBefore: 20, tiers, factoryShareBps: 5000 }),
    ).toEqual({ refundMinor: 500n, factoryMinor: 250n, platformMinor: 251n });
    expect(
      cancellationSplit({ paidMinor: 1000n, daysBefore: 2, tiers, factoryShareBps: 7000 }),
    ).toEqual({ refundMinor: 0n, factoryMinor: 700n, platformMinor: 300n });
  });

  it('refunds everything on expiry', () => {
    expect(fullRefund(500n)).toEqual({ refundMinor: 500n, factoryMinor: 0n, platformMinor: 0n });
  });

  it('counts days between ISO dates', () => {
    expect(daysUntil('2026-12-01', '2026-11-01')).toBe(30);
    expect(daysUntil('2026-11-01', '2026-11-03')).toBe(-2);
  });
});

describe('partnerships', () => {
  it('lists calendar months', () => {
    expect(partnershipMonths('2027-01', 3)).toEqual([
      { start: '2027-01-01', end: '2027-01-31' },
      { start: '2027-02-01', end: '2027-02-28' },
      { start: '2027-03-01', end: '2027-03-31' },
    ]);
  });

  it('makes each month’s deposit due two weeks ahead, but not sooner than a hold', () => {
    const now = new Date('2026-11-04T10:00:00Z');
    expect(partnershipDepositDue('2027-03-01', now, 48).toISOString()).toBe(
      '2027-02-15T00:00:00.000Z',
    );
    expect(partnershipDepositDue('2026-11-10', now, 48).toISOString()).toBe(
      '2026-11-06T10:00:00.000Z',
    );
  });
});

describe('schemas', () => {
  it('accepts the default settings and refuses badly ordered tiers', () => {
    expect(CapacityBookingSettingsSchema.safeParse(DEFAULT_CAPACITY_BOOKING_SETTINGS).success).toBe(
      true,
    );
    const bad = CapacityBookingSettingsSchema.safeParse({
      ...DEFAULT_CAPACITY_BOOKING_SETTINGS,
      cancellationTiers: [
        { minDaysBefore: 14, refundBps: 5000 },
        { minDaysBefore: 30, refundBps: 10_000 },
      ],
    });
    expect(bad.success).toBe(false);
  });

  it('needs minutes, or pieces and SAM, to search', () => {
    const base = {
      categoryId: '0198a000-0000-7000-8000-000000000001',
      from: '2026-12-01',
      to: '2026-12-31',
    };
    expect(CapacitySearchQuerySchema.safeParse(base).success).toBe(false);
    expect(CapacitySearchQuerySchema.safeParse({ ...base, minutes: '6000' }).success).toBe(true);
    expect(
      CapacitySearchQuerySchema.safeParse({ ...base, pieces: '5000', samPerPiece: '12.5' }).success,
    ).toBe(true);
  });
});
