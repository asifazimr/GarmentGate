import { z } from 'zod';
import { IncotermSchema } from '../rfq/rfq.schema.js';
import { ShipmentStatusSchema } from '../status/statuses.js';

export const ShipmentModeSchema = z.enum(['SEA', 'AIR', 'ROAD', 'RAIL', 'COURIER']);

export const SHIPMENT_DOCUMENT_TYPES = [
  'COMMERCIAL_INVOICE',
  'PACKING_LIST',
  'BILL_OF_LADING',
  'AIRWAY_BILL',
  'CERTIFICATE_OF_ORIGIN',
  'INSPECTION_CERTIFICATE',
  'OTHER',
] as const;
export const ShipmentDocumentTypeSchema = z.enum(SHIPMENT_DOCUMENT_TYPES);
export type ShipmentDocumentType = z.infer<typeof ShipmentDocumentTypeSchema>;

/** Papers GarmentGate issues itself, under its own name, for the buyer. */
export const GENERATED_DOCUMENT_TYPES = [
  'COMMERCIAL_INVOICE',
  'PACKING_LIST',
  'BILL_OF_LADING',
  'CERTIFICATE_OF_ORIGIN',
] as const;
export const GeneratedDocumentTypeSchema = z.enum(GENERATED_DOCUMENT_TYPES);
export type GeneratedDocumentType = z.infer<typeof GeneratedDocumentTypeSchema>;

export const SHIPMENT_DOCUMENT_MAX_BYTES = 20 * 1024 * 1024;

/** Carrier references: letters, digits, dashes, slashes and spaces only (no free text). */
export const ShipmentReferenceSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9][A-Za-z0-9 /-]{2,39}$/, { error: 'Letters, digits and dashes only' });
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const reference = z.preprocess(blank, ShipmentReferenceSchema.optional());
const name = (max: number) => z.string().trim().min(2, { error: 'Required' }).max(max);
const count = (max: number) =>
  z.preprocess(blank, z.coerce.number().int().positive().max(max).optional());

export const BookShipmentSchema = z
  .object({
    mode: ShipmentModeSchema,
    incoterm: z.preprocess(blank, IncotermSchema.optional()),
    forwarder: name(80),
    carrier: name(80),
    trackingNumber: reference,
    containerNumber: reference,
    /** Bill of lading or air waybill number. */
    transportDocNo: reference,
    originPort: name(80),
    destinationPort: z.preprocess(blank, name(80).optional()),
    cartons: count(1_000_000),
    grossWeightKg: count(10_000_000),
    etd: z.coerce.date({ error: 'Pick a date' }),
    eta: z.coerce.date({ error: 'Pick a date' }),
  })
  .refine((v) => v.eta.getTime() >= v.etd.getTime(), {
    path: ['eta'],
    error: 'Arrival must be after departure',
  });
export type BookShipmentInput = z.input<typeof BookShipmentSchema>;
export type BookShipmentDto = z.output<typeof BookShipmentSchema>;

export const PresignShipmentDocumentSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.literal('application/pdf', { error: 'Upload a PDF' }),
  sizeBytes: z.number().int().positive().max(SHIPMENT_DOCUMENT_MAX_BYTES, {
    error: 'Documents can be 20 MB',
  }),
});
export type PresignShipmentDocumentDto = z.infer<typeof PresignShipmentDocumentSchema>;

export const AddShipmentDocumentSchema = z.object({
  fileId: z.uuid(),
  type: ShipmentDocumentTypeSchema,
});
export type AddShipmentDocumentDto = z.infer<typeof AddShipmentDocumentSchema>;

export const PublishShipmentDocumentSchema = z.object({ buyerVisible: z.boolean() });
export type PublishShipmentDocumentDto = z.infer<typeof PublishShipmentDocumentSchema>;

// ── Views ───────────────────────────────────────────────────────────────────

export const ShipmentDocumentViewSchema = z.object({
  id: z.uuid(),
  type: ShipmentDocumentTypeSchema,
  /** Neutral name, e.g. ORD-2026-00017-packing-list.pdf. */
  name: z.string(),
  url: z.url().nullable(),
  processing: z.enum(['PENDING', 'PROCESSING', 'READY', 'FAILED']),
  /** Factory and staff: whether the buyer can see it. Buyers only get visible ones. */
  buyerVisible: z.boolean(),
});
export type ShipmentDocumentView = z.infer<typeof ShipmentDocumentViewSchema>;

export const OrderShipmentSchema = z.object({
  status: ShipmentStatusSchema,
  mode: ShipmentModeSchema,
  incoterm: IncotermSchema.nullable(),
  forwarder: z.string().nullable(),
  carrier: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  containerNumber: z.string().nullable(),
  transportDocNo: z.string().nullable(),
  originPort: z.string().nullable(),
  destinationPort: z.string().nullable(),
  cartons: z.number().int().nullable(),
  grossWeightKg: z.number().int().nullable(),
  etd: z.iso.datetime().nullable(),
  eta: z.iso.datetime().nullable(),
  shippedAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),
  documents: z.array(ShipmentDocumentViewSchema),
  /** GarmentGate-issued papers the viewer can download (buyer and staff). */
  generatedDocuments: z.array(GeneratedDocumentTypeSchema),
});
export type OrderShipment = z.infer<typeof OrderShipmentSchema>;
