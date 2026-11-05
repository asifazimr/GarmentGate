import { z } from 'zod';
import { IMAGE_CONTENT_TYPES, MediaReviewStatusSchema } from '../media/media.schema.js';
import {
  DisputeStatusSchema,
  LogisticsClaimStatusSchema,
  OrderStatusSchema,
} from '../status/statuses.js';

export const DISPUTE_REASONS = [
  'QUALITY',
  'QUANTITY',
  'LATE_DELIVERY',
  'NOT_AS_DESCRIBED',
  'PAYMENT',
  'OTHER',
] as const;
export const DisputeReasonSchema = z.enum(DISPUTE_REASONS);
export type DisputeReason = z.infer<typeof DisputeReasonSchema>;

export const EVIDENCE_TYPES = [...IMAGE_CONTENT_TYPES, 'application/pdf'] as const;
export const EVIDENCE_MAX_BYTES = 15 * 1024 * 1024;
export const EVIDENCE_MAX_FILES = 10;

export const OpenDisputeSchema = z.object({
  reason: DisputeReasonSchema,
  description: z
    .string()
    .trim()
    .min(20, { error: 'Describe what went wrong (at least 20 characters)' })
    .max(4000),
  /** Files already uploaded with the presign endpoint. */
  evidence: z.array(z.uuid()).max(EVIDENCE_MAX_FILES).default([]),
});
export type OpenDisputeInput = z.input<typeof OpenDisputeSchema>;
export type OpenDisputeDto = z.output<typeof OpenDisputeSchema>;

export const PresignEvidenceSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(EVIDENCE_TYPES, { error: 'Upload a JPG, PNG, WebP or PDF file' }),
  sizeBytes: z.number().int().positive().max(EVIDENCE_MAX_BYTES, {
    error: 'Files can be 15 MB',
  }),
});
export type PresignEvidenceDto = z.infer<typeof PresignEvidenceSchema>;

export const AddEvidenceSchema = z.object({
  fileId: z.uuid(),
  note: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type AddEvidenceDto = z.output<typeof AddEvidenceSchema>;

/** Staff decide: who it's resolved for, an optional refund from escrow, and where the order goes. */
export const ResolveDisputeSchema = z.object({
  outcome: z.enum(['RESOLVED_FOR_BUYER', 'RESOLVED_FOR_MANUFACTURER', 'SETTLED']),
  resolution: z.string().trim().min(10, { error: 'Explain the decision' }).max(2000),
  /** Refund to the buyer from unreleased escrow, in minor units of the order currency. */
  refundMinor: z.coerce.number().int().min(0).default(0),
  /** Back where it was, completed, or cancelled. */
  resumeTo: OrderStatusSchema,
});
export type ResolveDisputeInput = z.input<typeof ResolveDisputeSchema>;
export type ResolveDisputeDto = z.output<typeof ResolveDisputeSchema>;

// ── Views ───────────────────────────────────────────────────────────────────

export const DisputeEvidenceSchema = z.strictObject({
  id: z.uuid(),
  /** Who added it, from the viewer's point of view. */
  from: z.enum(['YOU', 'OTHER_SIDE', 'GARMENTGATE']),
  kind: z.enum(['IMAGE', 'PDF']),
  name: z.string(),
  url: z.url().nullable(),
  thumbUrl: z.url().nullable(),
  note: z.string().nullable(),
  processing: z.enum(['PENDING', 'PROCESSING', 'READY', 'FAILED']),
  /** Own uploads and staff see review state; the other side's appear only once approved. */
  review: MediaReviewStatusSchema,
  createdAt: z.iso.datetime(),
});
export type DisputeEvidence = z.infer<typeof DisputeEvidenceSchema>;

const dispute = {
  id: z.uuid(),
  orderCode: z.string(),
  reason: DisputeReasonSchema,
  description: z.string(),
  status: DisputeStatusSchema,
  openedAt: z.iso.datetime(),
  resolvedAt: z.iso.datetime().nullable(),
  resolution: z.string().nullable(),
  evidence: z.array(DisputeEvidenceSchema),
};

/** The buyer's view: their own refund, never the factory's side of the money. */
export const BuyerDisputeSchema = z.strictObject({
  ...dispute,
  refundMinor: z.number().int().nullable(),
  currency: z.string(),
});
export type BuyerDispute = z.infer<typeof BuyerDisputeSchema>;

/** The factory's view: no refund amount (it's in buyer prices, which would reveal the margin). */
export const ManufacturerDisputeSchema = z.strictObject(dispute);
export type ManufacturerDispute = z.infer<typeof ManufacturerDisputeSchema>;

export const AdminDisputeSchema = z.object({
  ...dispute,
  originalDescription: z.string(),
  refundMinor: z.number().int().nullable(),
  currency: z.string(),
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  openedBy: z.string(),
  assignedTo: z.string().nullable(),
  /** Where the order stood when the dispute opened. */
  disputedFrom: OrderStatusSchema.nullable(),
  /** Unreleased escrow: the most that can be refunded. */
  refundableMinor: z.number().int(),
  /** Shipped with GarmentGate logistics: losses in transit go through a logistics claim. */
  logistics: z
    .object({
      shipmentCode: z.string(),
      claim: z.object({ code: z.string(), status: LogisticsClaimStatusSchema }).nullable(),
    })
    .nullable(),
});
export type AdminDispute = z.infer<typeof AdminDisputeSchema>;

export const AdminDisputeSummarySchema = z.object({
  id: z.uuid(),
  orderCode: z.string(),
  reason: DisputeReasonSchema,
  status: DisputeStatusSchema,
  buyerCode: z.string(),
  manufacturerCode: z.string(),
  openedAt: z.iso.datetime(),
  assignedTo: z.string().nullable(),
  evidenceToReview: z.number().int(),
});
export type AdminDisputeSummary = z.infer<typeof AdminDisputeSummarySchema>;
