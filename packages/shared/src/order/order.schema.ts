import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { MilestoneStageSchema } from '../discovery/discovery.schema.js';
import {
  IMAGE_CONTENT_TYPES,
  ImageUrlsSchema,
  MediaReviewStatusSchema,
} from '../media/media.schema.js';
import { IncotermSchema } from '../rfq/rfq.schema.js';
import {
  MilestoneStatusSchema,
  OrderStatusSchema,
  SampleStatusSchema,
} from '../status/statuses.js';

/** The production stages factories report on, in order. */
export const PRODUCTION_STAGES = [
  'FABRIC_SOURCING',
  'CUTTING',
  'SEWING',
  'FINISHING',
  'PACKING',
] as const;
export const ProductionStageSchema = z.enum(PRODUCTION_STAGES);
export type ProductionStage = z.infer<typeof ProductionStageSchema>;

export const VIDEO_CONTENT_TYPES = ['video/mp4', 'video/quicktime'] as const;
export const ORDER_MEDIA_TYPES = [...IMAGE_CONTENT_TYPES, ...VIDEO_CONTENT_TYPES] as const;
export const ORDER_IMAGE_MAX_BYTES = 15 * 1024 * 1024;
export const ORDER_VIDEO_MAX_BYTES = 50 * 1024 * 1024;

export const PresignOrderMediaSchema = z
  .object({
    fileName: z.string().trim().min(1).max(255),
    contentType: z.enum(ORDER_MEDIA_TYPES, { error: 'Upload a JPG, PNG, WebP, MP4 or MOV file' }),
    sizeBytes: z.number().int().positive(),
  })
  .refine(
    (v) =>
      v.sizeBytes <=
      ((VIDEO_CONTENT_TYPES as readonly string[]).includes(v.contentType)
        ? ORDER_VIDEO_MAX_BYTES
        : ORDER_IMAGE_MAX_BYTES),
    { path: ['sizeBytes'], error: 'Photos can be 15 MB, videos 50 MB' },
  );
export type PresignOrderMediaDto = z.infer<typeof PresignOrderMediaSchema>;

// ── Inputs ──────────────────────────────────────────────────────────────────

const note = z
  .string()
  .trim()
  .max(2000)
  .optional()
  .transform((v) => (v === '' ? undefined : v));

export const OrderTransitionSchema = z.object({
  to: OrderStatusSchema,
  note,
  /** When shipping: how it travels. */
  shipment: z
    .object({
      mode: z.enum(['SEA', 'AIR', 'ROAD', 'RAIL', 'COURIER']),
      carrier: z.string().trim().min(2).max(80),
      trackingNumber: z.string().trim().min(3).max(60),
    })
    .optional(),
});
export type OrderTransitionDto = z.output<typeof OrderTransitionSchema>;

export const RequestSampleSchema = z.object({
  quantity: z.coerce.number().int().min(1).max(20),
  notes: note,
});
export type RequestSampleInput = z.input<typeof RequestSampleSchema>;
export type RequestSampleDto = z.output<typeof RequestSampleSchema>;

export const ShipSampleSchema = z.object({
  courier: z.string().trim().min(2).max(80),
  trackingNumber: z.string().trim().min(3).max(60),
});
export type ShipSampleDto = z.infer<typeof ShipSampleSchema>;

export const SampleDecisionSchema = z
  .object({
    decision: z.enum(['APPROVE', 'CHANGES']),
    comments: note,
    /** Photos of what needs changing (uploaded via the order's media presign). */
    photoFileIds: z.array(z.uuid()).max(8).default([]),
  })
  .refine((v) => v.decision === 'APPROVE' || (v.comments !== undefined && v.comments.length >= 5), {
    path: ['comments'],
    error: 'Tell the factory what to change',
  });
export type SampleDecisionInput = z.input<typeof SampleDecisionSchema>;
export type SampleDecisionDto = z.output<typeof SampleDecisionSchema>;

export const MilestoneUpdateSchema = z.object({
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'DELAYED']),
  note,
});
export type MilestoneUpdateDto = z.output<typeof MilestoneUpdateSchema>;

export const AddMilestoneMediaSchema = z.object({
  fileId: z.uuid(),
  caption: z.string().trim().max(140).optional(),
});
export type AddMilestoneMediaDto = z.infer<typeof AddMilestoneMediaSchema>;

export const ReorderOrderSchema = z.object({
  quantity: z.coerce.number({ error: 'Enter a quantity' }).int().min(50).max(10_000_000),
  requestedShipDate: z.coerce
    .date({ error: 'Pick a date' })
    .refine((d) => d.getTime() > Date.now() + 14 * 86_400_000, {
      error: 'Allow at least two weeks',
    }),
  notes: note,
});
export type ReorderOrderInput = z.input<typeof ReorderOrderSchema>;
export type ReorderOrderDto = z.output<typeof ReorderOrderSchema>;

export const OrderCreatedSchema = z.object({ code: z.string() });

// ── Views ───────────────────────────────────────────────────────────────────

export const OrderMediaSchema = z.object({
  id: z.uuid(),
  kind: z.enum(['IMAGE', 'VIDEO']),
  urls: ImageUrlsSchema.nullable(),
  videoUrl: z.url().nullable(),
  caption: z.string().nullable(),
  processing: z.enum(['PENDING', 'PROCESSING', 'READY', 'FAILED']),
  /** Factories and staff see review state; buyers only ever get approved media. */
  review: MediaReviewStatusSchema,
});
export type OrderMedia = z.infer<typeof OrderMediaSchema>;

export const OrderSampleSchema = z.object({
  id: z.uuid(),
  round: z.number().int(),
  status: SampleStatusSchema,
  quantity: z.number().int(),
  requestNotes: z.string().nullable(),
  courier: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  requestedAt: z.iso.datetime(),
  shippedAt: z.iso.datetime().nullable(),
  decidedAt: z.iso.datetime().nullable(),
  feedback: z.string().nullable(),
  photos: z.array(OrderMediaSchema),
});
export type OrderSample = z.infer<typeof OrderSampleSchema>;

export const OrderMilestoneSchema = z.object({
  stage: MilestoneStageSchema,
  status: MilestoneStatusSchema,
  plannedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  note: z.string().nullable(),
  media: z.array(OrderMediaSchema),
});
export type OrderMilestone = z.infer<typeof OrderMilestoneSchema>;

export const OrderEventSchema = z.object({
  from: OrderStatusSchema.nullable(),
  to: OrderStatusSchema,
  at: z.iso.datetime(),
  /** Staff only: who did it and why. */
  actor: z.string().nullable(),
  note: z.string().nullable(),
});
export type OrderEvent = z.infer<typeof OrderEventSchema>;

export const OrderShipmentSchema = z.object({
  mode: z.string(),
  carrier: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  shippedAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),
});

const core = {
  code: z.string(),
  title: z.string(),
  specification: z.string().nullable(),
  status: OrderStatusSchema,
  quantity: z.number().int(),
  currency: CurrencySchema,
  incoterm: IncotermSchema,
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  depositBps: z.number().int(),
  requestedShipDate: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  confirmedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  cancelledAt: z.iso.datetime().nullable(),
  rfqCode: z.string().nullable(),
  reorderOfCode: z.string().nullable(),
  progressPercent: z.number().int(),
  samples: z.array(OrderSampleSchema),
  milestones: z.array(OrderMilestoneSchema),
  events: z.array(OrderEventSchema),
  shipment: OrderShipmentSchema.nullable(),
  /** What the viewer may move the order to right now. */
  allowedTransitions: z.array(OrderStatusSchema),
};

/** The buyer's order: GarmentGate's price, the factory's code. Strict: nothing else. */
export const BuyerOrderSchema = z.strictObject({
  ...core,
  manufacturerCode: z.string(),
  unitPriceMinor: z.number().int(),
  totalMinor: z.number().int(),
  depositMinor: z.number().int(),
});
export type BuyerOrder = z.infer<typeof BuyerOrderSchema>;

/** The factory's order: its own price, the buyer's code. Strict: nothing else. */
export const ManufacturerOrderSchema = z.strictObject({
  ...core,
  buyerCode: z.string(),
  unitPriceMinor: z.number().int(),
  totalMinor: z.number().int(),
});
export type ManufacturerOrder = z.infer<typeof ManufacturerOrderSchema>;

export const AdminOrderSchema = z.object({
  ...core,
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  buyerUnitPriceMinor: z.number().int(),
  manufacturerUnitPriceMinor: z.number().int(),
  buyerTotalMinor: z.number().int(),
  manufacturerTotalMinor: z.number().int(),
});
export type AdminOrder = z.infer<typeof AdminOrderSchema>;

const summary = {
  code: z.string(),
  title: z.string(),
  status: OrderStatusSchema,
  quantity: z.number().int(),
  currency: CurrencySchema,
  requestedShipDate: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  progressPercent: z.number().int(),
  /** Production stage in progress, if any. */
  currentStage: MilestoneStageSchema.nullable(),
};
export const BuyerOrderSummarySchema = z.strictObject({
  ...summary,
  manufacturerCode: z.string(),
  totalMinor: z.number().int(),
});
export type BuyerOrderSummary = z.infer<typeof BuyerOrderSummarySchema>;
export const ManufacturerOrderSummarySchema = z.strictObject({
  ...summary,
  buyerCode: z.string(),
  totalMinor: z.number().int(),
});
export type ManufacturerOrderSummary = z.infer<typeof ManufacturerOrderSummarySchema>;
export const AdminOrderSummarySchema = z.object({
  ...summary,
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  buyerTotalMinor: z.number().int(),
  manufacturerTotalMinor: z.number().int(),
});
export type AdminOrderSummary = z.infer<typeof AdminOrderSummarySchema>;
