import { z } from 'zod';

export const SUPPLIER_CLAIM_REGIONS = [
  'EU',
  'UK',
  'US',
  'CANADA',
  'JAPAN',
  'AUSTRALIA',
  'MIDDLE_EAST',
  'OTHER',
] as const;
export const SupplierClaimRegionSchema = z.enum(SUPPLIER_CLAIM_REGIONS);
export type SupplierClaimRegion = z.infer<typeof SupplierClaimRegionSchema>;
export const SupplierClaimTierSchema = z.enum(['MAJOR', 'ESTABLISHED']);
export type SupplierClaimTier = z.infer<typeof SupplierClaimTierSchema>;
export const SupplierClaimStatusSchema = z.enum(['PENDING', 'VERIFIED', 'REJECTED']);
export type SupplierClaimStatus = z.infer<typeof SupplierClaimStatusSchema>;

export const EVIDENCE_TYPES_CLAIM = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;
export const CLAIM_EVIDENCE_MAX_BYTES = 10 * 1024 * 1024;

/** Presigned upload for a claim's evidence. */
export const PresignClaimEvidenceSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(EVIDENCE_TYPES_CLAIM, { error: 'Upload a PDF or an image' }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(CLAIM_EVIDENCE_MAX_BYTES, { error: 'Files can be up to 10 MB' }),
});
export type PresignClaimEvidenceDto = z.infer<typeof PresignClaimEvidenceSchema>;

export const AdminClaimsQuerySchema = z.object({ status: SupplierClaimStatusSchema.optional() });

/**
 * "We supply these brands." The names and evidence stay between the factory and GarmentGate;
 * buyers only ever see a badge built from region, tier and how many brands were verified.
 */
export const SupplierClaimInputSchema = z.object({
  region: SupplierClaimRegionSchema,
  tier: SupplierClaimTierSchema,
  brandNames: z
    .array(z.string().trim().min(1).max(80))
    .min(1, { error: 'Name at least one brand' })
    .max(20)
    .refine((b) => new Set(b.map((x) => x.toLowerCase())).size === b.length, {
      error: 'Each brand once',
    }),
  /** Purchase orders, invoices or a supplier certificate (uploaded first). */
  evidenceFileId: z.uuid({ error: 'Upload evidence (a PO, invoice or supplier certificate)' }),
  note: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type SupplierClaimInput = z.input<typeof SupplierClaimInputSchema>;
export type SupplierClaimDto = z.output<typeof SupplierClaimInputSchema>;

/** The factory's own view of its claims. */
export const ManufacturerClaimSchema = z.object({
  id: z.uuid(),
  region: SupplierClaimRegionSchema,
  tier: SupplierClaimTierSchema,
  brandNames: z.array(z.string()),
  note: z.string().nullable(),
  status: SupplierClaimStatusSchema,
  reviewNote: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type ManufacturerClaim = z.infer<typeof ManufacturerClaimSchema>;

/** Staff review: the real factory and the evidence. */
export const AdminClaimSchema = ManufacturerClaimSchema.extend({
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  evidenceUrl: z.url().nullable(),
  reviewedAt: z.iso.datetime().nullable(),
});
export type AdminClaim = z.infer<typeof AdminClaimSchema>;

export const ReviewClaimSchema = z.object({
  note: z.string().trim().max(500).optional(),
});
export const RejectClaimSchema = z.object({
  note: z.string().trim().min(5, { error: 'Say why (the factory sees it)' }).max(500),
});
export type RejectClaimDto = z.infer<typeof RejectClaimSchema>;

/** What a buyer sees: "Supplies to 3 major EU brands". */
export const PublicBrandBadgeSchema = z.strictObject({
  region: SupplierClaimRegionSchema,
  tier: SupplierClaimTierSchema,
  brandCount: z.number().int().positive(),
});
export type PublicBrandBadge = z.infer<typeof PublicBrandBadgeSchema>;

/**
 * Verified claims → badges: one per region and tier, counting distinct brands. Major brands come
 * first, then by count. Brand names are used only to de-duplicate, never returned.
 */
export function brandBadges(
  claims: readonly {
    region: SupplierClaimRegion;
    tier: SupplierClaimTier;
    brandNames: readonly string[];
    status: SupplierClaimStatus;
  }[],
): PublicBrandBadge[] {
  const groups = new Map<
    string,
    { region: SupplierClaimRegion; tier: SupplierClaimTier; brands: Set<string> }
  >();
  for (const c of claims) {
    if (c.status !== 'VERIFIED') continue;
    const key = `${c.tier}:${c.region}`;
    const group = groups.get(key) ?? { region: c.region, tier: c.tier, brands: new Set<string>() };
    for (const b of c.brandNames) group.brands.add(b.trim().toLowerCase());
    groups.set(key, group);
  }
  return [...groups.values()]
    .filter((g) => g.brands.size > 0)
    .map((g) => ({ region: g.region, tier: g.tier, brandCount: g.brands.size }))
    .sort((a, b) =>
      a.tier !== b.tier ? (a.tier === 'MAJOR' ? -1 : 1) : b.brandCount - a.brandCount,
    );
}
