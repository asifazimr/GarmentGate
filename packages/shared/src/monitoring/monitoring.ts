import { z } from 'zod';

/**
 * Remote video monitoring (live remote surveillance over IP cloud CCTV). Factories connect
 * cameras pointed at their production lines; GarmentGate staff approve each camera's view
 * before any buyer sees it (no signage, logos, faces or views outside, which could identify the
 * factory); buyers who add monitoring to an order watch the approved cameras the factory
 * assigned to it, live and recorded, while the order is being made. Buyers see numbered
 * cameras with the order code over the picture, never the factory's name or its labels.
 */

export const CameraAreaSchema = z.enum([
  'CUTTING',
  'SEWING',
  'FINISHING',
  'PACKING',
  'QC',
  'WAREHOUSE',
  'OTHER',
]);
export type CameraArea = z.infer<typeof CameraAreaSchema>;

export const CameraStatusSchema = z.enum([
  'SETUP',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'DISABLED',
]);
export type CameraStatus = z.infer<typeof CameraStatusSchema>;

/** What staff confirm, looking at the live picture, before a camera reaches buyers. */
export const CAMERA_CHECKLIST = [
  'productionOnly',
  'noSignage',
  'noFaces',
  'noOutsideView',
] as const;
export type CameraCheck = (typeof CAMERA_CHECKLIST)[number];

export const CreateCameraSchema = z.object({
  /** The factory's own name for it (only the factory and staff see it). */
  label: z.string().trim().min(2).max(80),
  area: CameraAreaSchema,
});
export type CreateCameraDto = z.infer<typeof CreateCameraSchema>;

export const ReviewCameraSchema = z
  .object({
    decision: z.enum(['APPROVE', 'REJECT']),
    checklist: z.object({
      productionOnly: z.boolean(),
      noSignage: z.boolean(),
      noFaces: z.boolean(),
      noOutsideView: z.boolean(),
    }),
    note: z
      .string()
      .trim()
      .max(500)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
  })
  .refine((v) => v.decision === 'REJECT' || CAMERA_CHECKLIST.every((k) => v.checklist[k]), {
    error: 'Confirm every check before approving',
    path: ['checklist'],
  })
  .refine((v) => v.decision === 'APPROVE' || (v.note?.length ?? 0) >= 5, {
    error: 'Tell the factory what to change',
    path: ['note'],
  });
export type ReviewCameraDto = z.output<typeof ReviewCameraSchema>;

export const MonitoringSettingsSchema = z.object({
  /** Buyers can add monitoring to orders. */
  enabled: z.boolean(),
  /** Per order (USD minor units, charged in the order's currency at the reference rate). */
  feeUsdMinor: z.number().int().min(0).max(10_000_000),
  /** How long a playback link works before the player asks for a new one. */
  playbackMinutes: z.number().int().min(1).max(240),
});
export type MonitoringSettings = z.infer<typeof MonitoringSettingsSchema>;

export const DEFAULT_MONITORING_SETTINGS: MonitoringSettings = {
  enabled: true,
  feeUsdMinor: 4_900,
  playbackMinutes: 30,
};

/** Order statuses during which a buyer can watch: from production start to dispatch. */
export const MONITORED_STATUSES = ['IN_PRODUCTION', 'QC', 'READY_TO_SHIP'] as const;

const ingest = z.strictObject({
  /** RTMPS ingest: point the camera, NVR or encoder here with the stream key. */
  rtmpsUrl: z.string(),
  streamKey: z.string(),
});

/** The factory's view of its own camera, with the ingest details to configure it. */
export const FactoryCameraSchema = z.strictObject({
  id: z.uuid(),
  label: z.string(),
  area: CameraAreaSchema,
  status: CameraStatusSchema,
  reviewNote: z.string().nullable(),
  live: z.boolean(),
  ingest: ingest.nullable(),
  createdAt: z.iso.datetime(),
});
export type FactoryCamera = z.infer<typeof FactoryCameraSchema>;

export const AdminCameraSchema = z.object({
  id: z.uuid(),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  label: z.string(),
  area: CameraAreaSchema,
  status: CameraStatusSchema,
  reviewNote: z.string().nullable(),
  live: z.boolean(),
  /** Signed, short-lived: staff watch to review. */
  playbackUrl: z.string().nullable(),
  reviewedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});
export type AdminCamera = z.infer<typeof AdminCameraSchema>;

export const AssignCamerasSchema = z.object({ cameraIds: z.array(z.uuid()).max(20) });
export type AssignCamerasDto = z.infer<typeof AssignCamerasSchema>;

export const OrderCameraViewSchema = z.strictObject({
  /** "Camera 1": numbered per order; the factory's labels never reach the buyer. */
  number: z.number().int().min(1),
  area: CameraAreaSchema,
  live: z.boolean(),
  /** Signed live link while the order is being made, else null. */
  playbackUrl: z.string().nullable(),
  recordings: z.array(
    z.strictObject({
      startedAt: z.iso.datetime(),
      durationSeconds: z.number().int().nullable(),
      playbackUrl: z.string(),
    }),
  ),
});
export type OrderCameraView = z.infer<typeof OrderCameraViewSchema>;

/** The buyer's monitoring panel on an order. */
export const BuyerMonitoringSchema = z.strictObject({
  /** Staff offer monitoring and the factory has approved cameras. */
  available: z.boolean(),
  /** The buyer added monitoring to this order (and how it stands). */
  added: z.boolean(),
  paid: z.boolean(),
  /** In the order's currency at today's reference rate. */
  feeMinor: z.number().int().nullable(),
  currency: z.string(),
  /** The order is being made, so cameras can be watched. */
  watchable: z.boolean(),
  cameras: z.array(OrderCameraViewSchema),
});
export type BuyerMonitoring = z.infer<typeof BuyerMonitoringSchema>;

/** The factory's monitoring panel on an order: which of its approved cameras show it. */
export const FactoryOrderMonitoringSchema = z.strictObject({
  added: z.boolean(),
  cameras: z.array(
    z.strictObject({
      id: z.uuid(),
      label: z.string(),
      area: CameraAreaSchema,
      assigned: z.boolean(),
    }),
  ),
});
export type FactoryOrderMonitoring = z.infer<typeof FactoryOrderMonitoringSchema>;
