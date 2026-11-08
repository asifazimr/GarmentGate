import { describe, expect, it } from 'vitest';
import { DEFAULT_UNIT_ECONOMICS, gates, orderContribution, rateBps, shareOf } from './kpi.js';

describe('unit economics', () => {
  it('reproduces the business model’s 1,000 polo example: about USD 680 per order', () => {
    // Factory USD 5,000; 12% margin; QC fee 200 (inspector 80); shipping 1,050 (freight 900);
    // 3% commission. Amounts in US cents.
    const c = orderContribution(
      {
        buyerGoodsMinor: 560_000n,
        factoryGoodsMinor: 500_000n,
        commissionMinor: 15_000n,
        logisticsChargedMinor: 105_000n,
        logisticsCostMinor: 90_000n,
        feesChargedMinor: 20_000n,
        feesCostMinor: 8_000n,
      },
      DEFAULT_UNIT_ECONOMICS,
      10_000n,
    );
    expect(c).toEqual({
      buyerPaysMinor: 685_000n,
      grossRevenueMinor: 102_000n,
      paymentFeesMinor: 17_125n,
      merchandisingMinor: 10_000n,
      claimsReserveMinor: 6_850n,
      contributionMinor: 68_025n,
    });
  });

  it('rounds shares half up', () => {
    expect(shareOf(6_850n, 100)).toBe(69n);
    expect(shareOf(0n, 250)).toBe(0n);
  });

  it('measures ratios only when there is something to measure', () => {
    expect(rateBps(17, 20)).toBe(8_500);
    expect(rateBps(0, 0)).toBeNull();
  });
});

describe('roadmap gates', () => {
  const base = {
    paidOrders: 50,
    onTimeBps: 8_500,
    positiveContributionBps: 10_000,
    repeatBuyerBps: 3_000,
    monthlyContributionUsdMinor: 2_500_000,
    monthlyFixedCostsUsdMinor: 2_000_000,
    workingCapitalLine: false,
  };

  it('opens gate 1 at 50 paid orders and 85% on time', () => {
    expect(gates(base)[0]?.met).toBe(true);
    expect(gates({ ...base, paidOrders: 49 })[0]?.met).toBe(false);
    expect(gates({ ...base, onTimeBps: null })[0]?.met).toBe(false);
  });

  it('opens gate 2 on positive margin per order and 30% repeat buyers', () => {
    expect(gates(base)[1]?.met).toBe(true);
    expect(gates({ ...base, positiveContributionBps: 9_900 })[1]?.met).toBe(false);
  });

  it('opens gate 3 at break-even once staff confirm the working-capital line', () => {
    const g3 = gates(base)[2];
    expect(g3?.checks.find((c) => c.key === 'BREAK_EVEN')?.met).toBe(true);
    expect(g3?.met).toBe(false);
    expect(gates({ ...base, workingCapitalLine: true })[2]?.met).toBe(true);
    expect(
      gates({ ...base, workingCapitalLine: true, monthlyContributionUsdMinor: 1 })[2]?.met,
    ).toBe(false);
  });
});
