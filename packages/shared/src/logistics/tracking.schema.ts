import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { ShipmentReferenceSchema } from './references.js';
import { LogisticsShipmentStatusSchema, ShipmentLegStatusSchema } from '../status/statuses.js';
import { BuyerClaimSchema, PartnerClaimSchema } from './claims.js';
import { ShippingModeSchema } from './logistics.schema.js';
import {
  LogisticsDocumentTypeSchema,
  ShipmentLegKindSchema,
  ShipmentUploadKindSchema,
} from './shipments.schema.js';

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' || v === undefined ? null : v));
const optionalRef = z
  .union([ShipmentReferenceSchema, z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' ? null : v));
const optionalDate = z
  .union([z.iso.date(), z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' ? null : v));

/** Statuses a tracking event may move a shipment to (forward, or to EXCEPTION). */
export const TRACKING_STATUSES = [
  'IN_TRANSIT',
  'AT_DESTINATION',
  'CUSTOMS',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'EXCEPTION',
] as const;
export const TrackingStatusSchema = z.enum(TRACKING_STATUSES);
export type TrackingStatus = z.infer<typeof TrackingStatusSchema>;

/** The order shipments move through; EXCEPTION can happen at any point and is left with the next status. */
export const SHIPMENT_FLOW = [
  'PLANNED',
  'BOOKED',
  'IN_TRANSIT',
  'AT_DESTINATION',
  'CUSTOMS',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
] as const;

/** Can a shipment go from `from` to `to`? Forward along the flow, or into and out of EXCEPTION. */
export function canAdvanceShipment(
  from: z.infer<typeof LogisticsShipmentStatusSchema>,
  to: TrackingStatus,
): boolean {
  if (from === 'CANCELLED' || from === 'DELIVERED') return false;
  if (to === 'EXCEPTION') return from !== 'PLANNED';
  if (from === 'EXCEPTION') return true;
  const flow: readonly string[] = SHIPMENT_FLOW;
  return flow.indexOf(to) > flow.indexOf(from);
}

/** A tracking update from a partner or staff. The note is filtered before buyers see it. */
export const TrackingEventInputSchema = z.object({
  status: TrackingStatusSchema.optional(),
  legStatus: z.enum(['IN_TRANSIT', 'COMPLETED']).optional(),
  location: optionalText(120),
  note: optionalText(500),
  occurredAt: z.iso.datetime({ error: 'Pick a date and time' }).optional(),
});
export type TrackingEventInput = z.input<typeof TrackingEventInputSchema>;
export type TrackingEventDto = z.output<typeof TrackingEventInputSchema>;

export const PartnerLegRefsSchema = z.object({
  carrier: z
    .union([z.string().trim().min(2).max(80), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' ? null : v)),
  trackingNumber: optionalRef,
  containerNumber: optionalRef,
  transportDocNo: optionalRef,
  etd: optionalDate,
  eta: optionalDate,
});
export type PartnerLegRefsInput = z.input<typeof PartnerLegRefsSchema>;
export type PartnerLegRefsDto = z.output<typeof PartnerLegRefsSchema>;

export const PresignShipmentUploadSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(['application/pdf', 'image/jpeg', 'image/png', 'image/webp'], {
    error: 'Upload a PDF or a photo',
  }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(15 * 1024 * 1024),
});
export type PresignShipmentUploadDto = z.infer<typeof PresignShipmentUploadSchema>;

export const AttachShipmentUploadSchema = z.object({
  fileId: z.uuid(),
  kind: ShipmentUploadKindSchema,
});
export type AttachShipmentUploadDto = z.infer<typeof AttachShipmentUploadSchema>;

/** Partner-facing documents: they consign to GarmentGate and name neither buyer nor factory. */
export const PARTNER_DOCUMENTS = [
  'BILL_OF_LADING',
  'PACKING_LIST',
  'SHIPPING_LABEL',
  'CARTON_MARKING',
] as const;
/** Buyer-facing documents, once the goods have left. */
export const BUYER_DOCUMENTS = [
  'COMMERCIAL_INVOICE',
  'PACKING_LIST',
  'BILL_OF_LADING',
  'CERTIFICATE_OF_ORIGIN',
  'INSURANCE_CERTIFICATE',
] as const;
export const BuyerDocumentTypeSchema = z.enum(BUYER_DOCUMENTS);
export const PartnerDocumentTypeSchema = z.enum(PARTNER_DOCUMENTS);

const TrackingEventView = z.strictObject({
  occurredAt: z.iso.datetime(),
  status: LogisticsShipmentStatusSchema.nullable(),
  location: z.string().nullable(),
  note: z.string().nullable(),
});

/** One leg as a partner sees it: GarmentGate's booking, never a buyer or factory. */
export const PartnerLegSchema = z.strictObject({
  id: z.uuid(),
  shipmentCode: z.string(),
  kind: ShipmentLegKindSchema,
  status: ShipmentLegStatusSchema,
  shipmentStatus: LogisticsShipmentStatusSchema,
  mode: ShippingModeSchema,
  fromLabel: z.string(),
  toLabel: z.string(),
  /** Where to collect, when it's GarmentGate's hub. */
  pickupHub: z.strictObject({ code: z.string(), name: z.string(), address: z.string() }).nullable(),
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  cartons: z.number().int(),
  grossWeightGrams: z.number().int(),
  volumeLitres: z.number().int(),
  currency: CurrencySchema,
  /** What GarmentGate pays for this leg. */
  costMinor: z.number().int().nullable(),
  accepted: z.boolean(),
  paid: z.boolean(),
  carrier: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  containerNumber: z.string().nullable(),
  transportDocNo: z.string().nullable(),
  etd: z.iso.date().nullable(),
  eta: z.iso.date().nullable(),
  events: z.array(TrackingEventView),
  documentTypes: z.array(PartnerDocumentTypeSchema),
  claims: z.array(PartnerClaimSchema),
});
export type PartnerLeg = z.infer<typeof PartnerLegSchema>;

/** The buyer's GarmentGate-branded timeline across every leg. No partner, hub address or factory. */
export const BuyerTrackingSchema = z.strictObject({
  shipmentCode: z.string(),
  status: LogisticsShipmentStatusSchema,
  mode: ShippingModeSchema,
  originCountry: z.string(),
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  etd: z.iso.date().nullable(),
  eta: z.iso.date().nullable(),
  departedAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),
  /** Container and bill of lading of the main carriage, once it has left. */
  containerNumber: z.string().nullable(),
  transportDocNo: z.string().nullable(),
  legs: z.array(
    z.strictObject({
      kind: ShipmentLegKindSchema,
      status: ShipmentLegStatusSchema,
      from: z.string(),
      to: z.string(),
    }),
  ),
  events: z.array(TrackingEventView),
  documents: z.array(LogisticsDocumentTypeSchema),
  /** Papers and photos staff reviewed and published (sanitized, neutral names). */
  papers: z.array(
    z.strictObject({
      id: z.uuid(),
      kind: ShipmentUploadKindSchema,
      name: z.string(),
      url: z.string().nullable(),
    }),
  ),
  claims: z.array(BuyerClaimSchema),
});
export type BuyerTracking = z.infer<typeof BuyerTrackingSchema>;

export const CreatePartnerUserSchema = z.object({
  email: z.email({ error: 'Enter a valid email' }).trim().toLowerCase(),
  firstName: z.string().trim().min(1, { error: 'Enter a first name' }).max(60),
  lastName: z.string().trim().min(1, { error: 'Enter a last name' }).max(60),
});
export type CreatePartnerUserInput = z.input<typeof CreatePartnerUserSchema>;
export type CreatePartnerUserDto = z.output<typeof CreatePartnerUserSchema>;

export const PartnerUserSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  name: z.string(),
  status: z.string(),
});
export type PartnerUser = z.infer<typeof PartnerUserSchema>;

export const PublishShipmentUploadSchema = z.object({ buyerVisible: z.boolean() });
export type PublishShipmentUploadDto = z.infer<typeof PublishShipmentUploadSchema>;
