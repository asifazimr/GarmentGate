import { z } from 'zod';
import { EmailSchema } from '../auth/auth.schema.js';
import { IMAGE_CONTENT_TYPES, OrderMediaSchema } from '../media/media.schema.js';
import { InspectionResultSchema } from '../status/statuses.js';
import { AQL_LEVELS } from './aql.js';

export const AqlLevelSchema = z.enum(AQL_LEVELS);

export const INSPECTION_TYPES = [
  'PRE_PRODUCTION',
  'DURING_PRODUCTION',
  'PRE_SHIPMENT',
  'CONTAINER_LOADING',
] as const;
export const InspectionTypeSchema = z.enum(INSPECTION_TYPES);
export type InspectionType = z.infer<typeof InspectionTypeSchema>;

/** What a buyer can book: an inline check during production, or the final random inspection. */
export const BookableInspectionTypeSchema = z.enum(['DURING_PRODUCTION', 'PRE_SHIPMENT']);

export const INSPECTION_PHOTO_MAX_BYTES = 15 * 1024 * 1024;
export const INSPECTION_REPORT_MAX_BYTES = 20 * 1024 * 1024;

// ── Inputs ──────────────────────────────────────────────────────────────────

export const BookInspectionSchema = z.object({
  type: BookableInspectionTypeSchema,
  /** The day the inspector visits (a date input's value, UTC midnight). */
  scheduledAt: z.coerce.date({ error: 'Pick a date' }),
});
export type BookInspectionInput = z.input<typeof BookInspectionSchema>;
export type BookInspectionDto = z.output<typeof BookInspectionSchema>;

/** Staff: who inspects, and when. */
export const AssignInspectionSchema = z.object({
  inspectorId: z.uuid().nullable(),
  scheduledAt: z.coerce.date().optional(),
});
export type AssignInspectionDto = z.output<typeof AssignInspectionSchema>;

export const PresignInspectionFileSchema = z
  .object({
    fileName: z.string().trim().min(1).max(255),
    contentType: z.enum([...IMAGE_CONTENT_TYPES, 'application/pdf'], {
      error: 'Upload a JPG, PNG, WebP or PDF file',
    }),
    sizeBytes: z.number().int().positive(),
  })
  .refine(
    (v) =>
      v.sizeBytes <=
      (v.contentType === 'application/pdf'
        ? INSPECTION_REPORT_MAX_BYTES
        : INSPECTION_PHOTO_MAX_BYTES),
    { path: ['sizeBytes'], error: 'Photos can be 15 MB, reports 20 MB' },
  );
export type PresignInspectionFileDto = z.infer<typeof PresignInspectionFileSchema>;

export const AddInspectionPhotoSchema = z.object({
  fileId: z.uuid(),
  caption: z.string().trim().max(200).optional(),
});
export type AddInspectionPhotoDto = z.infer<typeof AddInspectionPhotoSchema>;

const count = z.coerce.number({ error: 'Enter a number' }).int().min(0).max(100_000);

/**
 * The AQL report. The verdict is computed from the counts; the inspector may fail a lot that
 * passes on counts (e.g. measurements out of tolerance) but can't pass one that fails.
 */
export const InspectionReportSchema = z.object({
  lotSize: z.coerce.number({ error: 'Enter a number' }).int().min(2).max(10_000_000),
  majorAql: AqlLevelSchema,
  minorAql: AqlLevelSchema,
  critical: count,
  major: count,
  minor: count,
  result: z.enum(['PASS', 'FAIL']),
  summary: z.string().trim().min(10, { error: 'Summarise what you found' }).max(4000),
  /** An uploaded PDF report (optional). */
  reportFileId: z.uuid().optional(),
});
export type InspectionReportInput = z.input<typeof InspectionReportSchema>;
export type InspectionReportDto = z.output<typeof InspectionReportSchema>;

export const CreateInspectorSchema = z.object({
  email: EmailSchema,
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
});
export type CreateInspectorDto = z.infer<typeof CreateInspectorSchema>;

// ── Views ───────────────────────────────────────────────────────────────────

export const InspectionAqlSchema = z.object({
  lotSize: z.number().int(),
  sampleSize: z.number().int(),
  majorAql: z.string(),
  minorAql: z.string(),
  acceptMajor: z.number().int(),
  acceptMinor: z.number().int(),
});

/** An inspection on an order, as each side sees it. */
export const OrderInspectionSchema = z.object({
  id: z.uuid(),
  type: InspectionTypeSchema,
  result: InspectionResultSchema,
  scheduledAt: z.iso.datetime().nullable(),
  inspectedAt: z.iso.datetime().nullable(),
  bookedBy: z.enum(['BUYER', 'STAFF', 'PLATFORM']),
  /** Staff only: the inspector's name. Parties see "GarmentGate QC". */
  inspector: z.string().nullable(),
  aql: InspectionAqlSchema.nullable(),
  defects: z.object({ critical: z.number(), major: z.number(), minor: z.number() }).nullable(),
  summary: z.string().nullable(),
  photos: z.array(OrderMediaSchema),
  /** The sanitized PDF report: factory and staff only. */
  reportUrl: z.url().nullable(),
});
export type OrderInspection = z.infer<typeof OrderInspectionSchema>;

export const InspectorSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  openInspections: z.number().int(),
});
export type Inspector = z.infer<typeof InspectorSchema>;

/** One job in an inspector's list. Inspectors are staff: they see where the factory is. */
export const InspectorJobSchema = z.object({
  id: z.uuid(),
  type: InspectionTypeSchema,
  result: InspectionResultSchema,
  scheduledAt: z.iso.datetime().nullable(),
  inspectedAt: z.iso.datetime().nullable(),
  orderCode: z.string(),
  orderStatus: z.string(),
  title: z.string(),
  quantity: z.number().int(),
  factory: z.object({
    code: z.string(),
    name: z.string(),
    address: z.string(),
    country: z.string(),
  }),
});
export type InspectorJob = z.infer<typeof InspectorJobSchema>;

export const InspectorJobDetailSchema = InspectorJobSchema.extend({
  specification: z.string().nullable(),
  items: z.array(z.object({ color: z.string(), size: z.string(), quantity: z.number().int() })),
  inspection: OrderInspectionSchema,
  /** Whether the report can still be submitted (pending, and the order is where it should be). */
  canReport: z.boolean(),
});
export type InspectorJobDetail = z.infer<typeof InspectorJobDetailSchema>;
