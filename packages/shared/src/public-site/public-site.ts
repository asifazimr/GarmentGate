import { z } from 'zod';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { ReleaseTriggerSchema } from '../payments/payments.schema.js';
import { BuyerPlusSettingsSchema } from '../plans/buyer-plus.js';
import { PlanSettingsSchema } from '../plans/plans.js';

/**
 * What the public website shows. Aggregates only: no company, factory or buyer is ever named
 * or counted on its own, so nothing here can identify one side to the other.
 */
export const PublicStatsSchema = z.strictObject({
  /** Listed factories with verified KYC. */
  verifiedFactories: z.number().int().min(0),
  /** Countries those factories are in. */
  sourcingCountries: z.number().int().min(0),
  /** Countries buyers ship to (from delivered orders). */
  buyerCountries: z.number().int().min(0),
  /** Product categories offered. */
  categories: z.number().int().min(0),
  /** QC reports filed. */
  inspections: z.number().int().min(0),
  /** Pieces in orders that reached the buyer. */
  piecesDelivered: z.number().int().min(0),
});
export type PublicStats = z.infer<typeof PublicStatsSchema>;

/** Public price list, straight from the staff settings so the site never drifts. */
export const PublicPricingSchema = z.strictObject({
  fees: z.strictObject({
    sampleFeeUsdMinor: z.number().int(),
    inspectionFeeUsdMinor: z.number().int(),
    firstInspectionFree: z.boolean(),
    creditSampleFees: z.boolean(),
    claimWindowDays: z.number().int(),
  }),
  releaseSchedule: z.array(
    z.strictObject({ trigger: ReleaseTriggerSchema, bps: z.number().int() }),
  ),
  factoryPlans: PlanSettingsSchema,
  buyerPlus: BuyerPlusSettingsSchema,
  /** What GarmentGate pays a gig QC inspector per inspection day. */
  inspectorDayRateUsdMinor: z.number().int(),
});
export type PublicPricing = z.infer<typeof PublicPricingSchema>;

// ── Leads: sales, enterprise, partners, support, press ──────────────────────

export const LeadKindSchema = z.enum([
  'SALES',
  'ENTERPRISE',
  'LOGISTICS_PARTNER',
  'MANUFACTURER',
  'SUPPORT',
  'PRESS',
]);
export type LeadKind = z.infer<typeof LeadKindSchema>;

export const LeadStatusSchema = z.enum(['NEW', 'CONTACTED', 'CLOSED']);
export type LeadStatus = z.infer<typeof LeadStatusSchema>;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' ? undefined : v));

export const LeadInputSchema = z.object({
  kind: LeadKindSchema,
  name: z.string().trim().min(2, { error: 'Enter your name' }).max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: 'Enter a valid email' })),
  company: optionalText(160),
  country: CountryCodeSchema.optional().or(z.literal('').transform(() => undefined)),
  /** Optional: for a call back. GarmentGate staff only. */
  phone: optionalText(40),
  message: z
    .string()
    .trim()
    .min(10, { error: 'Tell us a little more (10 characters or more)' })
    .max(4000),
  /** The page the form was sent from (e.g. /pricing). */
  source: z
    .string()
    .trim()
    .max(200)
    .regex(/^\/[\w\-/]*$/)
    .optional(),
  /** Honeypot: real people never fill it in (hidden from them). */
  website: z.string().max(200).optional(),
});
export type LeadInput = z.input<typeof LeadInputSchema>;
export type LeadDto = z.output<typeof LeadInputSchema>;

export const AdminLeadSchema = z.object({
  id: z.uuid(),
  kind: LeadKindSchema,
  status: LeadStatusSchema,
  name: z.string(),
  email: z.string(),
  company: z.string().nullable(),
  country: z.string().nullable(),
  phone: z.string().nullable(),
  message: z.string(),
  source: z.string().nullable(),
  handledBy: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type AdminLead = z.infer<typeof AdminLeadSchema>;

export const UpdateLeadSchema = z.object({ status: LeadStatusSchema });
export type UpdateLeadDto = z.infer<typeof UpdateLeadSchema>;
