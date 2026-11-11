import { DEFAULT_DEPOSIT_BPS, type EstimateTerms, type PublicPricing } from '@garmentgate/shared';

/** The calculator's terms from the live price list. */
export function estimateTerms(pricing: PublicPricing): EstimateTerms {
  return {
    sampleFeeUsdMinor: pricing.fees.sampleFeeUsdMinor,
    inspectionFeeUsdMinor: pricing.fees.inspectionFeeUsdMinor,
    firstInspectionFree: pricing.fees.firstInspectionFree,
    creditSampleFees: pricing.fees.creditSampleFees,
    depositBps: DEFAULT_DEPOSIT_BPS,
    plus: {
      freeInspections: pricing.buyerPlus.freeInspections,
      sampleDiscountBps: pricing.buyerPlus.sampleDiscountBps,
    },
  };
}

/** The worked examples: order parameters, costed live from the price list. */
export const STORIES = [
  {
    slug: 'organic-tees',
    input: {
      quantity: 6_000,
      unitPriceMinor: 450,
      samples: 2,
      inspections: 2,
      firstOrder: true,
      plus: false,
      freightMinor: 180_000,
      dutyBps: 1_200,
    },
  },
  {
    slug: 'hotel-uniforms',
    input: {
      quantity: 10_000,
      unitPriceMinor: 840,
      samples: 1,
      inspections: 2,
      firstOrder: false,
      plus: true,
      freightMinor: 450_000,
      dutyBps: 1_200,
    },
  },
  {
    slug: 'startup-activewear',
    input: {
      quantity: 800,
      unitPriceMinor: 980,
      samples: 3,
      inspections: 1,
      firstOrder: true,
      plus: false,
      freightMinor: 120_000,
      dutyBps: 2_800,
    },
  },
] as const;
export type StorySlug = (typeof STORIES)[number]['slug'];
