import { z } from 'zod';
import { CountryCodeSchema, CertificationTypeSchema } from '../onboarding/onboarding.schema.js';
import { CurrencySchema } from '../catalog/product.schema.js';
import {
  PublicManufacturerSchema,
  PublicProductSchema,
} from '../manufacturer/manufacturer.schema.js';
import { OrderStatusSchema, RfqStatusSchema } from '../status/statuses.js';

/** Accepts `a,b` or repeated params; empty → undefined. */
const csv = <T extends z.ZodType>(item: T) =>
  z.preprocess((v) => {
    const raw: unknown[] = Array.isArray(v) ? v : typeof v === 'string' ? v.split(',') : [];
    const list = raw
      .filter((s): s is string => typeof s === 'string')
      .map((s) => s.trim())
      .filter(Boolean);
    return list.length > 0 ? list : undefined;
  }, z.array(item).max(20).optional());

const optionalInt = (max: number) =>
  z.preprocess(
    (v) => (v === '' || v === null ? undefined : v),
    z.coerce.number().int().min(0).max(max).optional(),
  );

export const ProductSortSchema = z.enum([
  'relevance',
  'price_asc',
  'price_desc',
  'moq_asc',
  'lead_time_asc',
  'score_desc',
  'newest',
]);
export type ProductSort = z.infer<typeof ProductSortSchema>;

export const ProductSearchQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  category: csv(z.string().max(60)),
  fabric: csv(z.string().max(120)),
  country: csv(CountryCodeSchema),
  cert: csv(CertificationTypeSchema),
  gsmMin: optionalInt(2000),
  gsmMax: optionalInt(2000),
  moqMin: optionalInt(10_000_000),
  moqMax: optionalInt(10_000_000),
  /** Buyer price per piece in minor units of `currency`. */
  priceMin: optionalInt(100_000_000),
  priceMax: optionalInt(100_000_000),
  currency: CurrencySchema.default('USD'),
  leadTimeMax: optionalInt(365),
  sort: ProductSortSchema.default('relevance'),
  page: z.coerce.number().int().min(1).max(500).default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(24),
});
export type ProductSearchQuery = z.output<typeof ProductSearchQuerySchema>;

const FacetSchema = z.record(z.string(), z.number().int());

export const ProductSearchResultSchema = z.object({
  hits: z.array(PublicProductSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
  facets: z.object({
    category: FacetSchema,
    fabric: FacetSchema,
    country: FacetSchema,
    certifications: FacetSchema,
  }),
  /** Price bounds of the matching set, in minor units of the query currency. */
  priceRange: z.object({ min: z.number().int(), max: z.number().int() }).nullable(),
});
export type ProductSearchResult = z.infer<typeof ProductSearchResultSchema>;

export const ManufacturerSortSchema = z.enum([
  'relevance',
  'score_desc',
  'capacity_desc',
  'moq_asc',
]);

export const ManufacturerSearchQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  category: csv(z.string().max(60)),
  country: csv(CountryCodeSchema),
  cert: csv(CertificationTypeSchema),
  moqMax: optionalInt(10_000_000),
  sort: ManufacturerSortSchema.default('relevance'),
  page: z.coerce.number().int().min(1).max(500).default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(24),
});
export type ManufacturerSearchQuery = z.output<typeof ManufacturerSearchQuerySchema>;

export const ManufacturerSearchResultSchema = z.object({
  hits: z.array(PublicManufacturerSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
  facets: z.object({ category: FacetSchema, country: FacetSchema, certifications: FacetSchema }),
});
export type ManufacturerSearchResult = z.infer<typeof ManufacturerSearchResultSchema>;

/** Production stages an order moves through (mirrors the Prisma enum). */
export const MilestoneStageSchema = z.enum([
  'ORDER_CONFIRMED',
  'FABRIC_SOURCING',
  'CUTTING',
  'SEWING',
  'FINISHING',
  'PACKING',
  'READY_FOR_INSPECTION',
  'SHIPPED',
]);
export type MilestoneStage = z.infer<typeof MilestoneStageSchema>;

// ── Shortlists ──────────────────────────────────────────────────────────────

export const ShortlistNameSchema = z.object({
  name: z.string().trim().min(1, { error: 'Give the list a name' }).max(60),
});
export type ShortlistNameDto = z.infer<typeof ShortlistNameSchema>;

/** Products by id, factories by public code: buyers never handle internal factory ids. */
export const ShortlistItemInputSchema = z.union([
  z.object({ productId: z.uuid() }),
  z.object({ manufacturerCode: z.string().regex(/^MFR-[A-Z]{2}-\d{4,}$/) }),
]);
export type ShortlistItemInput = z.infer<typeof ShortlistItemInputSchema>;

export const ShortlistSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  isDefault: z.boolean(),
  products: z.array(z.object({ itemId: z.uuid(), product: PublicProductSchema })),
  manufacturers: z.array(z.object({ itemId: z.uuid(), manufacturer: PublicManufacturerSchema })),
  updatedAt: z.iso.datetime(),
});
export type Shortlist = z.infer<typeof ShortlistSchema>;

/** Lightweight membership map for heart buttons: which lists contain what. */
export const SavedIndexSchema = z.object({
  lists: z.array(z.object({ id: z.uuid(), name: z.string(), isDefault: z.boolean() })),
  products: z.record(z.string(), z.array(z.uuid())),
  manufacturers: z.record(z.string(), z.array(z.uuid())),
});
export type SavedIndex = z.infer<typeof SavedIndexSchema>;

// ── Request a quote / order a sample from a product ─────────────────────────

export const ProductRequestSchema = z
  .object({
    kind: z.enum(['QUOTE', 'SAMPLE']),
    quantity: z.coerce.number().int().min(1).max(10_000_000),
    sampleQuantity: z.preprocess(
      (v) => (v === '' ? undefined : v),
      z.coerce.number().int().min(1).max(20).optional(),
    ),
    /** Buyer's target price per piece, minor units of the product currency. */
    targetUnitPriceMinor: z.preprocess(
      (v) => (v === '' ? undefined : v),
      z.coerce.number().int().min(1).optional(),
    ),
    neededBy: z.coerce.date({ error: 'Pick a date' }),
    destinationCountry: CountryCodeSchema,
    notes: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
  })
  .refine((v) => v.neededBy.getTime() > Date.now(), {
    path: ['neededBy'],
    error: 'Pick a future date',
  })
  .refine((v) => v.kind === 'QUOTE' || v.sampleQuantity !== undefined, {
    path: ['sampleQuantity'],
    error: 'How many samples?',
  });
export type ProductRequestInput = z.input<typeof ProductRequestSchema>;
export type ProductRequestDto = z.output<typeof ProductRequestSchema>;

export const ProductRequestResultSchema = z.object({ rfqCode: z.string() });
export type ProductRequestResult = z.infer<typeof ProductRequestResultSchema>;

// ── Buyer dashboard ─────────────────────────────────────────────────────────

export const BuyerDashboardSchema = z.object({
  stats: z.object({
    activeOrders: z.number().int(),
    openRfqs: z.number().int(),
    savedItems: z.number().int(),
    /** Held in escrow for this buyer, per currency (minor units). */
    inEscrow: z.array(z.object({ currency: CurrencySchema, amountMinor: z.number().int() })),
  }),
  activeOrders: z.array(
    z.object({
      code: z.string(),
      title: z.string(),
      status: OrderStatusSchema,
      quantity: z.number().int(),
      currency: CurrencySchema,
      /** What the buyer pays. */
      totalMinor: z.number().int(),
      manufacturerCode: z.string(),
      progressPercent: z.number().int().min(0).max(100),
      currentMilestone: MilestoneStageSchema.nullable(),
      shipBy: z.iso.datetime().nullable(),
    }),
  ),
  openRfqs: z.array(
    z.object({
      code: z.string(),
      title: z.string(),
      status: RfqStatusSchema,
      quantity: z.number().int(),
      deadline: z.iso.datetime(),
      offers: z.number().int(),
    }),
  ),
  recommended: z.array(PublicManufacturerSchema),
});
export type BuyerDashboard = z.infer<typeof BuyerDashboardSchema>;
