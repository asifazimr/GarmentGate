import { z } from 'zod';
import { PlanIntervalSchema, SubscriptionSourceSchema, SubscriptionStatusSchema } from './plans.js';

/**
 * GarmentGate Plus (business model: buyer membership). Everything is staff-configurable:
 * price, free inspections, the sample-fee discount, priority for the buyer's RFQs in factories'
 * inboxes and a dedicated merchandiser. Factories only ever see "priority", never who.
 */
export const BuyerPlusSettingsSchema = z.object({
  monthlyUsdMinor: z.number().int().min(0).max(10_000_000),
  yearlyUsdMinor: z.number().int().min(0).max(100_000_000),
  /** Inspection fees waived for members. */
  freeInspections: z.boolean(),
  /** Taken off each sample fee (10000 = free samples). */
  sampleDiscountBps: z.number().int().min(0).max(10_000),
  /** Members' open RFQs are marked priority and listed first for factories. */
  priorityRfqs: z.boolean(),
  /** Staff are asked to assign a dedicated merchandiser when a buyer joins. */
  merchandiser: z.boolean(),
});
export type BuyerPlusSettings = z.infer<typeof BuyerPlusSettingsSchema>;

export const DEFAULT_BUYER_PLUS_SETTINGS: BuyerPlusSettings = {
  monthlyUsdMinor: 4_900,
  yearlyUsdMinor: 49_000,
  freeInspections: true,
  sampleDiscountBps: 5_000,
  priorityRfqs: true,
  merchandiser: true,
};

/** A sample fee after the member discount (rounded to the minor unit). */
export function discountedFee(amountMinor: bigint, discountBps: number): bigint {
  if (discountBps <= 0) return amountMinor;
  return (amountMinor * BigInt(10_000 - Math.min(discountBps, 10_000)) + 5_000n) / 10_000n;
}

export const PlusCheckoutSchema = z.object({ interval: PlanIntervalSchema });
export type PlusCheckoutDto = z.infer<typeof PlusCheckoutSchema>;

export const GrantPlusSchema = z
  .object({
    /** false ends a staff-set membership. */
    plus: z.boolean(),
    endsOn: z.iso
      .date()
      .optional()
      .or(z.literal('').transform(() => undefined)),
    paidUsdMinor: z.number().int().min(0).max(100_000_000).optional(),
    bankReference: z
      .string()
      .trim()
      .max(80)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
    note: z.string().trim().min(3, { error: 'Say why' }).max(500),
  })
  .refine((v) => !v.paidUsdMinor || !!v.bankReference, {
    error: 'Add the transfer reference',
    path: ['bankReference'],
  });
export type GrantPlusInput = z.input<typeof GrantPlusSchema>;
export type GrantPlusDto = z.output<typeof GrantPlusSchema>;

/** The buyer's own Plus page. Buyer-only: nothing about factories. */
export const BuyerPlusSchema = z.strictObject({
  active: z.boolean(),
  settings: BuyerPlusSettingsSchema,
  subscription: z
    .strictObject({
      interval: PlanIntervalSchema.nullable(),
      source: SubscriptionSourceSchema,
      status: SubscriptionStatusSchema,
      currentPeriodEnd: z.iso.datetime().nullable(),
      cancelAtPeriodEnd: z.boolean(),
    })
    .nullable(),
  invoices: z.array(
    z.strictObject({
      id: z.string(),
      amountMinor: z.number().int(),
      currency: z.string(),
      paidAt: z.iso.datetime(),
    }),
  ),
  /** GarmentGate staff looking after the account, if assigned. */
  merchandiser: z.string().nullable(),
  cardEnabled: z.boolean(),
});
export type BuyerPlus = z.infer<typeof BuyerPlusSchema>;
