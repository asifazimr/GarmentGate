import { describe, expect, it } from 'vitest';
import { DEFAULT_DEPOSIT_BPS, estimateOrder, type EstimateTerms } from './estimate.js';

const terms: EstimateTerms = {
  sampleFeeUsdMinor: 7_500,
  inspectionFeeUsdMinor: 20_000,
  firstInspectionFree: true,
  creditSampleFees: true,
  depositBps: DEFAULT_DEPOSIT_BPS,
  plus: { freeInspections: true, sampleDiscountBps: 5_000 },
};
const base = {
  quantity: 6_000,
  unitPriceMinor: 450,
  samples: 2,
  inspections: 2,
  firstOrder: false,
  plus: false,
  freightMinor: 180_000,
  dutyBps: 1_200,
};

describe('order estimate', () => {
  it('adds up goods, fees, freight and duty, with the sample credit', () => {
    const e = estimateOrder(base, terms);
    expect(e.goods).toBe(2_700_000);
    expect(e.deposit).toBe(810_000);
    expect(e.sampleFees).toBe(15_000);
    expect(e.sampleCredit).toBe(15_000);
    expect(e.balance).toBe(2_700_000 - 810_000 - 15_000);
    expect(e.inspectionFees).toBe(40_000);
    expect(e.duty).toBe(345_600); // 12% of 2,880,000
    expect(e.payableToGarmentGate).toBe(2_700_000 - 15_000 + 15_000 + 40_000 + 180_000);
    expect(e.landed).toBe(e.payableToGarmentGate + 345_600);
    expect(e.landedPerPiece).toBe(Math.round(e.landed / 6_000));
  });

  it('waives the first inspection on a first order, and all of them for Plus', () => {
    expect(estimateOrder({ ...base, firstOrder: true }, terms).inspectionFees).toBe(20_000);
    const plus = estimateOrder({ ...base, plus: true }, terms);
    expect(plus.inspectionFees).toBe(0);
    expect(plus.sampleFees).toBe(7_500); // half price
  });

  it('keeps sample fees when they are not credited', () => {
    const e = estimateOrder(base, { ...terms, creditSampleFees: false });
    expect(e.sampleCredit).toBe(0);
    expect(e.balance).toBe(2_700_000 - 810_000);
  });
});
