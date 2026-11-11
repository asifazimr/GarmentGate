import { z } from 'zod';

/**
 * The website's cost calculator: what an order costs a buyer and when each part is paid,
 * from a price per piece and the live fees. Integer minor units throughout. An estimate:
 * real prices come from quotes, freight from the shipping step, duty from customs.
 */

/** The deposit most orders use (each order sets its own). */
export const DEFAULT_DEPOSIT_BPS = 3_000;

export const EstimateInputSchema = z.object({
  quantity: z.number().int().min(1).max(10_000_000),
  /** GarmentGate's all-in price per piece (USD minor units). */
  unitPriceMinor: z.number().int().min(1).max(100_000_000),
  samples: z.number().int().min(0).max(50),
  /** Inspection days booked (inline + final). */
  inspections: z.number().int().min(0).max(20),
  firstOrder: z.boolean(),
  plus: z.boolean(),
  freightMinor: z.number().int().min(0).max(1_000_000_000),
  /** Import duty on the goods and freight (CIF), basis points. */
  dutyBps: z.number().int().min(0).max(10_000),
});
export type EstimateInput = z.infer<typeof EstimateInputSchema>;

export interface EstimateTerms {
  sampleFeeUsdMinor: number;
  inspectionFeeUsdMinor: number;
  firstInspectionFree: boolean;
  creditSampleFees: boolean;
  depositBps: number;
  plus: { freeInspections: boolean; sampleDiscountBps: number } | null;
}

export interface Estimate {
  goods: number;
  deposit: number;
  balance: number;
  sampleFees: number;
  /** Sample fees credited back against the balance when bulk is confirmed. */
  sampleCredit: number;
  inspectionFees: number;
  freight: number;
  duty: number;
  /** Everything paid to GarmentGate (goods, fees, freight), after the sample credit. */
  payableToGarmentGate: number;
  /** Plus duty paid to customs at import. */
  landed: number;
  landedPerPiece: number;
}

const bps = (amount: number, b: number) => Math.round((amount * b) / 10_000);

export function estimateOrder(input: EstimateInput, terms: EstimateTerms): Estimate {
  const goods = input.quantity * input.unitPriceMinor;
  const deposit = bps(goods, terms.depositBps);
  const plus = input.plus ? terms.plus : null;
  const samplePrice =
    terms.sampleFeeUsdMinor - bps(terms.sampleFeeUsdMinor, plus?.sampleDiscountBps ?? 0);
  const sampleFees = input.samples * samplePrice;
  const sampleCredit = terms.creditSampleFees ? sampleFees : 0;
  const freeInspections = plus?.freeInspections
    ? input.inspections
    : input.firstOrder && terms.firstInspectionFree
      ? Math.min(1, input.inspections)
      : 0;
  const inspectionFees = (input.inspections - freeInspections) * terms.inspectionFeeUsdMinor;
  const balance = goods - deposit - sampleCredit;
  const duty = bps(goods + input.freightMinor, input.dutyBps);
  const payableToGarmentGate =
    goods - sampleCredit + sampleFees + inspectionFees + input.freightMinor;
  const landed = payableToGarmentGate + duty;
  return {
    goods,
    deposit,
    balance,
    sampleFees,
    sampleCredit,
    inspectionFees,
    freight: input.freightMinor,
    duty,
    payableToGarmentGate,
    landed,
    landedPerPiece: Math.round(landed / input.quantity),
  };
}
