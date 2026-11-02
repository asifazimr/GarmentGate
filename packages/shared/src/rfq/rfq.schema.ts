import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { IMAGE_CONTENT_TYPES, MediaReviewStatusSchema } from '../media/media.schema.js';
import { CertificationTypeSchema, CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { QuoteStatusSchema, RfqStatusSchema } from '../status/statuses.js';

export const IncotermSchema = z.enum([
  'EXW',
  'FCA',
  'FOB',
  'CFR',
  'CIF',
  'CPT',
  'CIP',
  'DAP',
  'DPU',
  'DDP',
]);
export type Incoterm = z.infer<typeof IncotermSchema>;

export const RfqAttachmentKindSchema = z.enum([
  'TECH_PACK',
  'REFERENCE_IMAGE',
  'SIZE_CHART',
  'OTHER',
]);
export type RfqAttachmentKind = z.infer<typeof RfqAttachmentKindSchema>;

export const RFQ_FILE_TYPES = ['application/pdf', ...IMAGE_CONTENT_TYPES] as const;
export const RFQ_FILE_MAX_BYTES = 20 * 1024 * 1024;
export const RFQ_MAX_FILES = 10;
/** How far ahead a buyer may set the quote deadline. */
export const RFQ_MAX_DEADLINE_DAYS = 60;

export const PresignRfqFileSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(RFQ_FILE_TYPES, { error: 'Upload a PDF, JPG, PNG or WebP file' }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(RFQ_FILE_MAX_BYTES, { error: 'Files can be at most 20 MB' }),
});
export type PresignRfqFileDto = z.infer<typeof PresignRfqFileSchema>;

const optionalPositiveInt = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.number().int().min(1).optional(),
);
const optionalDate = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.date().optional(),
);
const DAY = 86_400_000;

// ── Buyer: create ───────────────────────────────────────────────────────────

export const RfqInputSchema = z
  .object({
    categoryId: z.uuid({ error: 'Choose a category' }),
    title: z.string().trim().min(5, { error: 'Give it a short title (5+ characters)' }).max(120),
    description: z
      .string()
      .trim()
      .min(20, { error: 'Describe the product in a few sentences' })
      .max(5000),
    attachments: z
      .array(z.object({ fileId: z.uuid(), kind: RfqAttachmentKindSchema }))
      .max(RFQ_MAX_FILES)
      .default([]),
    quantity: z.coerce
      .number({ error: 'Enter a quantity' })
      .int()
      .min(50, { error: 'At least 50 pieces' })
      .max(10_000_000),
    targetUnitPriceMinor: optionalPositiveInt,
    currency: CurrencySchema,
    /** Quotes are due by this date. */
    deadline: z.coerce.date({ error: 'Pick a date' }),
    requiredDeliveryDate: optionalDate,
    destinationCountry: CountryCodeSchema,
    incoterm: IncotermSchema,
  })
  .superRefine((v, ctx) => {
    const now = Date.now();
    if (v.deadline.getTime() < now + DAY) {
      ctx.addIssue({
        code: 'custom',
        path: ['deadline'],
        message: 'Give factories at least a day',
      });
    } else if (v.deadline.getTime() > now + RFQ_MAX_DEADLINE_DAYS * DAY) {
      ctx.addIssue({
        code: 'custom',
        path: ['deadline'],
        message: `Pick a date within ${String(RFQ_MAX_DEADLINE_DAYS)} days`,
      });
    }
    if (v.requiredDeliveryDate && v.requiredDeliveryDate.getTime() <= v.deadline.getTime()) {
      ctx.addIssue({
        code: 'custom',
        path: ['requiredDeliveryDate'],
        message: 'Delivery must be after the quote deadline',
      });
    }
    if (new Set(v.attachments.map((a) => a.fileId)).size !== v.attachments.length) {
      ctx.addIssue({ code: 'custom', path: ['attachments'], message: 'A file is attached twice' });
    }
  });
export type RfqInput = z.input<typeof RfqInputSchema>;
export type RfqDto = z.output<typeof RfqInputSchema>;

export const RfqCreatedSchema = z.object({ code: z.string() });
export type RfqCreated = z.infer<typeof RfqCreatedSchema>;

// ── Files ───────────────────────────────────────────────────────────────────

/** Processing + review state of an attachment, and a signed link to its sanitized copy. */
export const RfqAttachmentViewSchema = z.object({
  id: z.uuid(),
  kind: RfqAttachmentKindSchema,
  /** Owner: their own file name. Factories: a neutral generated name. */
  fileName: z.string(),
  contentType: z.string(),
  sizeBytes: z.number().int(),
  processing: z.enum(['PENDING', 'PROCESSING', 'READY', 'FAILED']),
  review: MediaReviewStatusSchema,
  /** Signed, short-lived link to the metadata-free copy; null until ready. */
  url: z.url().nullable(),
  /** Images only: a small rendition for previews. */
  thumbUrl: z.url().nullable(),
});
export type RfqAttachmentView = z.infer<typeof RfqAttachmentViewSchema>;

// ── Buyer: views ────────────────────────────────────────────────────────────

export const QuoteBadgeSchema = z.enum(['BEST_VALUE', 'LOWEST_PRICE', 'FASTEST']);
export type QuoteBadge = z.infer<typeof QuoteBadgeSchema>;

/** A quote as the buyer sees it: GarmentGate's price, the factory's code. Strict: no extras. */
export const BuyerQuoteSchema = z.strictObject({
  id: z.uuid(),
  manufacturer: z.strictObject({
    code: z.string(),
    country: z.string().length(2),
    performanceScore: z.number().int(),
    onTimeDeliveryBps: z.number().int().nullable(),
    certifications: z.array(CertificationTypeSchema),
  }),
  /** What the buyer pays GarmentGate per piece. */
  unitPriceMinor: z.number().int(),
  totalMinor: z.number().int(),
  currency: CurrencySchema,
  leadTimeDays: z.number().int(),
  moqPcs: z.number().int().nullable(),
  validUntil: z.iso.datetime().nullable(),
  notes: z.string().nullable(),
  status: QuoteStatusSchema,
  offeredAt: z.iso.datetime().nullable(),
  badges: z.array(QuoteBadgeSchema),
});
export type BuyerQuote = z.infer<typeof BuyerQuoteSchema>;

export const BuyerRfqSummarySchema = z.object({
  code: z.string(),
  title: z.string(),
  status: RfqStatusSchema,
  categoryName: z.string(),
  quantity: z.number().int(),
  currency: CurrencySchema,
  deadline: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  offers: z.number().int(),
  bestUnitPriceMinor: z.number().int().nullable(),
  orderCode: z.string().nullable(),
});
export type BuyerRfqSummary = z.infer<typeof BuyerRfqSummarySchema>;

export const BuyerRfqDetailSchema = z.object({
  code: z.string(),
  title: z.string(),
  description: z.string(),
  status: RfqStatusSchema,
  category: z.object({ id: z.uuid(), name: z.string() }),
  quantity: z.number().int(),
  targetUnitPriceMinor: z.number().int().nullable(),
  currency: CurrencySchema,
  deadline: z.iso.datetime(),
  requiredDeliveryDate: z.iso.datetime().nullable(),
  incoterm: IncotermSchema.nullable(),
  destinationCountry: z.string().nullable(),
  createdAt: z.iso.datetime(),
  /** Factories invited or matched so far. */
  factoriesReached: z.number().int(),
  attachments: z.array(RfqAttachmentViewSchema),
  quotes: z.array(BuyerQuoteSchema),
  orderCode: z.string().nullable(),
});
export type BuyerRfqDetail = z.infer<typeof BuyerRfqDetailSchema>;

export const AcceptQuoteResultSchema = z.object({ orderCode: z.string() });
export type AcceptQuoteResult = z.infer<typeof AcceptQuoteResultSchema>;

// ── Manufacturer: views and quotes ─────────────────────────────────────────

export const MatchReasonSchema = z.enum(['INVITED', 'CATEGORY', 'MOQ', 'CAPACITY']);
export type MatchReason = z.infer<typeof MatchReasonSchema>;

/** The factory's own quote: its own price only. */
export const ManufacturerQuoteSchema = z.strictObject({
  unitPriceMinor: z.number().int(),
  totalMinor: z.number().int(),
  leadTimeDays: z.number().int(),
  moqPcs: z.number().int().nullable(),
  validUntil: z.iso.datetime().nullable(),
  notes: z.string().nullable(),
  status: QuoteStatusSchema,
  updatedAt: z.iso.datetime(),
});
export type ManufacturerQuote = z.infer<typeof ManufacturerQuoteSchema>;

/** An RFQ as a factory sees it: the buyer is a BYR- code, prices stay out. Strict: no extras. */
export const ManufacturerRfqSummarySchema = z.strictObject({
  code: z.string(),
  title: z.string(),
  categoryName: z.string(),
  buyerCode: z.string(),
  quantity: z.number().int(),
  currency: CurrencySchema,
  deadline: z.iso.datetime(),
  requiredDeliveryDate: z.iso.datetime().nullable(),
  incoterm: IncotermSchema.nullable(),
  destinationCountry: z.string().nullable(),
  publishedAt: z.iso.datetime().nullable(),
  reasons: z.array(MatchReasonSchema),
  myQuote: ManufacturerQuoteSchema.nullable(),
});
export type ManufacturerRfqSummary = z.infer<typeof ManufacturerRfqSummarySchema>;

export const ManufacturerRfqDetailSchema = ManufacturerRfqSummarySchema.extend({
  description: z.string(),
  attachments: z.array(RfqAttachmentViewSchema),
  status: RfqStatusSchema,
  /** False once the deadline passed, the RFQ closed, or the quote was decided. */
  canQuote: z.boolean(),
});
export type ManufacturerRfqDetail = z.infer<typeof ManufacturerRfqDetailSchema>;

export const QuoteInputSchema = z.object({
  /** The factory's own price per piece, minor units of the RFQ currency. */
  unitPriceMinor: z.coerce
    .number({ error: 'Enter a price' })
    .int()
    .min(1, { error: 'Enter a price' })
    .max(100_000_000),
  leadTimeDays: z.coerce.number({ error: 'Enter a lead time' }).int().min(1).max(365),
  moqPcs: optionalPositiveInt,
  validUntil: optionalDate.refine((d) => d === undefined || d.getTime() > Date.now(), {
    error: 'Pick a future date',
  }),
  notes: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type QuoteInput = z.input<typeof QuoteInputSchema>;
export type QuoteDto = z.output<typeof QuoteInputSchema>;

// ── Admin: margins ──────────────────────────────────────────────────────────

export const MarginRuleSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  /** Basis points over the factory price (1500 = 15%). */
  markupBps: z.number().int(),
  minMarginPerUnitMinor: z.number().int().nullable(),
  /** Withheld from the factory's payouts: basis points of the factory total. */
  commissionBps: z.number().int(),
  /** Lower rate when the buyer has completed an order with the factory before. */
  repeatCommissionBps: z.number().int().nullable(),
  category: z.object({ id: z.uuid(), name: z.string() }).nullable(),
  buyerCode: z.string().nullable(),
  active: z.boolean(),
  quotesPriced: z.number().int(),
  updatedAt: z.iso.datetime(),
});
export type MarginRule = z.infer<typeof MarginRuleSchema>;

export const MarginRuleInputSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    markupBps: z.coerce.number().int().min(0).max(10_000, { error: 'At most 100%' }),
    minMarginPerUnitMinor: z.preprocess(
      (v) => (v === '' || v === null ? undefined : v),
      z.coerce.number().int().min(0).optional(),
    ),
    commissionBps: z.coerce.number().int().min(0).max(10_000, { error: 'At most 100%' }).default(0),
    repeatCommissionBps: z.preprocess(
      (v) => (v === '' || v === null ? null : v),
      z.coerce.number().int().min(0).max(10_000).nullable().default(null),
    ),
    categoryId: z.uuid().nullable().default(null),
    buyerCode: z
      .string()
      .trim()
      .regex(/^BYR-[A-Z]{2}-\d{4,}$/, { error: 'Use a buyer code like BYR-US-0012' })
      .nullable()
      .default(null),
    active: z.boolean().default(true),
  })
  .refine((r) => r.repeatCommissionBps === null || r.repeatCommissionBps <= r.commissionBps, {
    error: 'The repeat-order rate can’t be above the normal commission',
    path: ['repeatCommissionBps'],
  });
export type MarginRuleInput = z.input<typeof MarginRuleInputSchema>;
export type MarginRuleDto = z.output<typeof MarginRuleInputSchema>;

/** Admin override of the buyer price on an offered quote. */
export const RepriceQuoteSchema = z.object({
  buyerUnitPriceMinor: z.coerce.number().int().min(1),
});
export type RepriceQuoteDto = z.infer<typeof RepriceQuoteSchema>;
