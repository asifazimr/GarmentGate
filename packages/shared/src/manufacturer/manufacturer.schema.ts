import { z } from 'zod';
import { PublicRatingSchema } from '../trust/reviews.schema.js';
import { CertificationTypeSchema } from '../onboarding/onboarding.schema.js';
import { CurrencySchema } from '../catalog/product.schema.js';
import { ImageUrlsSchema, OwnedImageSchema } from '../media/media.schema.js';

/*
 * Buyer-facing ("public") shapes. Strict objects: parsing fails on ANY key not listed here,
 * so a field added to a Prisma model can never reach a buyer by accident.
 * Never add: company/legal/trade name, address, phone, email, website, people's names,
 * registration/tax/certificate numbers, manufacturer prices.
 */

export const PublicCategorySchema = z.strictObject({ slug: z.string(), name: z.string() });

export const PublicCertificationSchema = z.strictObject({
  type: CertificationTypeSchema,
  /** Only for type OTHER; scrubbed of names. */
  name: z.string().nullable(),
  /** Month precision is enough for buyers; exact dates help identify the factory. */
  validUntil: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .nullable(),
});

export const PublicImageSchema = z.strictObject({
  id: z.uuid(),
  caption: z.string().nullable(),
  urls: ImageUrlsSchema,
});

export const PublicManufacturerSchema = z.strictObject({
  publicCode: z.string().regex(/^MFR-[A-Z]{2}-\d{4,}$/),
  country: z.string().length(2),
  headline: z.string().nullable(),
  about: z.string().nullable(),
  categories: z.array(PublicCategorySchema),
  capabilities: z.strictObject({
    monthlyCapacityPcs: z.number().int().nullable(),
    moqPcs: z.number().int().nullable(),
    sampleLeadTimeDays: z.number().int().nullable(),
    productionLeadTimeMinDays: z.number().int().nullable(),
    productionLeadTimeMaxDays: z.number().int().nullable(),
    workforceSize: z.number().int().nullable(),
    factorySizeSqm: z.number().int().nullable(),
    machinery: z.array(z.strictObject({ type: z.string(), count: z.number().int() })),
    exportMarkets: z.array(z.string().length(2)),
  }),
  certifications: z.array(PublicCertificationSchema),
  scores: z.strictObject({
    performanceScore: z.number().int().min(0).max(100),
    onTimeDeliveryBps: z.number().int().nullable(),
    /** Final inspections passed first time. */
    qcPassBps: z.number().int().nullable(),
    /** Buyer reviews; null until there's at least one. */
    rating: PublicRatingSchema.nullable(),
  }),
  photos: z.array(PublicImageSchema),
});
export type PublicManufacturer = z.infer<typeof PublicManufacturerSchema>;

export const PublicProductSchema = z.strictObject({
  id: z.uuid(),
  manufacturerCode: z.string(),
  country: z.string().length(2),
  title: z.string(),
  description: z.string().nullable(),
  category: PublicCategorySchema,
  fabric: z.string().nullable(),
  composition: z.string().nullable(),
  gsm: z.number().int().nullable(),
  moqPcs: z.number().int(),
  leadTimeDays: z.number().int(),
  currency: CurrencySchema,
  /** Buyer prices (what the buyer pays GarmentGate). */
  priceTiers: z.array(
    z.strictObject({ minQty: z.number().int(), unitPriceMinor: z.number().int() }),
  ),
  images: z.array(PublicImageSchema),
});
export type PublicProduct = z.infer<typeof PublicProductSchema>;

// ── Manufacturer self-service ───────────────────────────────────────────────

export const FactoryPhotoInputSchema = z.object({
  fileId: z.uuid(),
  caption: z
    .string()
    .trim()
    .max(140)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type FactoryPhotoDto = z.output<typeof FactoryPhotoInputSchema>;

export const ReorderSchema = z.object({ ids: z.array(z.uuid()).min(1).max(50) });
export type ReorderDto = z.infer<typeof ReorderSchema>;

export const ManufacturerProfileViewSchema = z.object({
  publicCode: z.string(),
  photos: z.array(OwnedImageSchema),
});
export type ManufacturerProfileView = z.infer<typeof ManufacturerProfileViewSchema>;

// ── Capacity calendar ───────────────────────────────────────────────────────

export const MonthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, { error: 'Use YYYY-MM' });

export const CapacityMonthSchema = z.object({
  month: MonthSchema,
  /** Pieces the factory can make that month (override, else the profile's monthly capacity). */
  availablePcs: z.number().int().nonnegative(),
  isOverride: z.boolean(),
  /** Pieces scheduled through GarmentGate orders shipping that month. */
  platformBookedPcs: z.number().int().nonnegative(),
  /** Pieces booked by the factory outside GarmentGate. */
  externalBookedPcs: z.number().int().nonnegative(),
  note: z.string().nullable(),
});
export type CapacityMonth = z.infer<typeof CapacityMonthSchema>;

export const CapacityCalendarSchema = z.object({
  defaultMonthlyCapacityPcs: z.number().int().nullable(),
  months: z.array(CapacityMonthSchema),
});
export type CapacityCalendar = z.infer<typeof CapacityCalendarSchema>;

export const UpdateCapacityMonthSchema = z.object({
  /** null clears the override (fall back to the profile capacity). */
  availablePcs: z.preprocess(
    (v) => (v === '' ? null : v),
    z.coerce.number().int().min(0).max(100_000_000).nullable(),
  ),
  externalBookedPcs: z.coerce.number().int().min(0).max(100_000_000),
  note: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type UpdateCapacityMonthInput = z.input<typeof UpdateCapacityMonthSchema>;
export type UpdateCapacityMonthDto = z.output<typeof UpdateCapacityMonthSchema>;
