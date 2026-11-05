import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { ShipmentReferenceSchema } from './references.js';
import { IncotermSchema } from '../rfq/rfq.schema.js';
import {
  LogisticsShipmentStatusSchema,
  OrderStatusSchema,
  PickupStatusSchema,
  ShipmentLegStatusSchema,
} from '../status/statuses.js';
import {
  LogisticsModeSchema,
  PortCodeSchema,
  ShipperModeSchema,
  ShippingModeSchema,
} from './logistics.schema.js';
import { GgIncotermSchema } from './order-logistics.schema.js';

export const ShipmentUploadKindSchema = z.enum([
  'BILL_OF_LADING',
  'AIRWAY_BILL',
  'PROOF_OF_DELIVERY',
  'PHOTO',
  'OTHER',
]);
export type ShipmentUploadKind = z.infer<typeof ShipmentUploadKindSchema>;
export const ShipmentEventSourceSchema = z.enum(['STAFF', 'PARTNER', 'FACTORY', 'SYSTEM']);
export type ShipmentEventSource = z.infer<typeof ShipmentEventSourceSchema>;

const IsoDate = z.iso.date({ error: 'Pick a date' });
/** Optional free text: '' and missing become null. Accepts null so a form's output re-parses. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((v) => (v === '' || v === undefined ? null : v));
const optionalPort = z
  .union([PortCodeSchema, z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' || v === null || v === undefined ? null : v));
const Int = (min: number, max: number, error: string) =>
  z.coerce.number({ error }).int({ error }).min(min, { error }).max(max, { error });
const optionalInt = (min: number, max: number, error: string) =>
  z
    .union([Int(min, max, error), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' || v === null || v === undefined ? null : v));

export const ShipmentLegKindSchema = z.enum([
  'FACTORY_TO_HUB',
  'HUB_TO_PORT',
  'PORT_TO_PORT',
  'PORT_TO_BUYER',
  'HUB_HANDOVER',
]);
export type ShipmentLegKind = z.infer<typeof ShipmentLegKindSchema>;
export const HubReceiptConditionSchema = z.enum(['GOOD', 'DAMAGED', 'SHORT', 'OVER']);
export type HubReceiptCondition = z.infer<typeof HubReceiptConditionSchema>;
export const LogisticsDocumentTypeSchema = z.enum([
  'COMMERCIAL_INVOICE',
  'PACKING_LIST',
  'BILL_OF_LADING',
  'ORIGINAL_BILL_OF_LADING',
  'CERTIFICATE_OF_ORIGIN',
  'INSURANCE_CERTIFICATE',
  'SHIPPING_LABEL',
  'CARTON_MARKING',
]);
export type LogisticsDocumentType = z.infer<typeof LogisticsDocumentTypeSchema>;

// ── Factory: packing and pickup ─────────────────────────────────────────────

/** Weight in grams; volume either in litres or from identical carton dimensions (cm). */
export const OrderPackingInputSchema = z
  .object({
    cartons: Int(1, 100_000, 'Enter the number of cartons'),
    piecesPerCarton: optionalInt(1, 10_000, 'Enter pieces per carton'),
    grossWeightGrams: Int(1, 100_000_000, 'Enter the gross weight'),
    netWeightGrams: optionalInt(1, 100_000_000, 'Enter the net weight'),
    volumeLitres: optionalInt(1, 10_000_000, 'Enter the volume'),
    cartonLengthCm: optionalInt(1, 300, 'Enter the length'),
    cartonWidthCm: optionalInt(1, 300, 'Enter the width'),
    cartonHeightCm: optionalInt(1, 300, 'Enter the height'),
  })
  .refine(
    (v) =>
      v.volumeLitres !== null ||
      (v.cartonLengthCm !== null && v.cartonWidthCm !== null && v.cartonHeightCm !== null),
    { path: ['volumeLitres'], error: 'Give the volume or the carton dimensions' },
  )
  .refine((v) => v.netWeightGrams === null || v.netWeightGrams <= v.grossWeightGrams, {
    path: ['netWeightGrams'],
    error: 'Net weight can’t exceed gross weight',
  });
export type OrderPackingInput = z.input<typeof OrderPackingInputSchema>;
export type OrderPackingDto = z.output<typeof OrderPackingInputSchema>;

/** Volume of `cartons` identical cartons, in litres (cm³ / 1000, rounded up). */
export function cartonVolumeLitres(cartons: number, l: number, w: number, h: number): number {
  return Math.ceil((cartons * l * w * h) / 1000);
}

export const BookPickupSchema = z.object({
  hubId: z.uuid({ error: 'Pick a hub' }),
  pickupDate: IsoDate,
  note: optionalText(500),
});
export type BookPickupInput = z.input<typeof BookPickupSchema>;
export type BookPickupDto = z.output<typeof BookPickupSchema>;

/** A GarmentGate hub as a factory sees it: where to deliver. */
export const HubAddressSchema = z.strictObject({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().nullable(),
  city: z.string(),
  postalCode: z.string().nullable(),
  country: z.string(),
});
export type HubAddress = z.infer<typeof HubAddressSchema>;

const PackingView = z.strictObject({
  cartons: z.number().int(),
  piecesPerCarton: z.number().int().nullable(),
  grossWeightGrams: z.number().int(),
  netWeightGrams: z.number().int().nullable(),
  volumeLitres: z.number().int(),
  cartonLengthCm: z.number().int().nullable(),
  cartonWidthCm: z.number().int().nullable(),
  cartonHeightCm: z.number().int().nullable(),
});

/** The factory's side of a GarmentGate-shipped order: packing and the hub. Never the buyer. */
export const FactoryOrderLogisticsSchema = z.strictObject({
  /** GarmentGate ships this order (the factory delivers to a hub and books nothing itself). */
  managed: z.boolean(),
  canPack: z.boolean(),
  canBookPickup: z.boolean(),
  packing: PackingView.nullable(),
  pickup: z
    .strictObject({
      status: PickupStatusSchema,
      pickupDate: z.iso.date(),
      hub: HubAddressSchema,
    })
    .nullable(),
  received: z.strictObject({ cartons: z.number().int(), receivedAt: z.iso.datetime() }).nullable(),
  hubs: z.array(HubAddressSchema),
});
export type FactoryOrderLogistics = z.infer<typeof FactoryOrderLogisticsSchema>;

// ── Buyer: shipping orders together ─────────────────────────────────────────

export const ConsolidationCandidateSchema = z.strictObject({
  code: z.string(),
  title: z.string(),
  status: OrderStatusSchema,
  quantity: z.number().int(),
  manufacturerCode: z.string(),
});
export type ConsolidationCandidate = z.infer<typeof ConsolidationCandidateSchema>;

export const ConsolidationQuoteRequestSchema = z.object({
  orderCodes: z
    .array(z.string().regex(/^ORD-\d{4}-\d{4,}$/))
    .min(2, { error: 'Pick at least two orders' })
    .max(10)
    .refine((v) => new Set(v).size === v.length, { error: 'Each order once' }),
  destinationCountry: CountryCodeSchema,
  destinationPort: optionalPort,
  incoterm: GgIncotermSchema,
  insured: z.boolean().default(false),
});
export type ConsolidationQuoteRequestInput = z.input<typeof ConsolidationQuoteRequestSchema>;
export type ConsolidationQuoteRequest = z.output<typeof ConsolidationQuoteRequestSchema>;

export const ConsolidationOptionSchema = z.strictObject({
  code: z.string(),
  mode: LogisticsModeSchema,
  currency: CurrencySchema,
  transitDaysMin: z.number().int(),
  transitDaysMax: z.number().int(),
  combinedTotalMinor: z.number().int(),
  /** What the same orders cost shipped one by one (null when one of them can't be priced alone). */
  separateTotalMinor: z.number().int().nullable(),
  savingMinor: z.number().int(),
  shares: z.array(
    z.strictObject({
      orderCode: z.string(),
      freightMinor: z.number().int(),
      insuranceMinor: z.number().int(),
      totalMinor: z.number().int(),
    }),
  ),
  validUntil: z.iso.datetime(),
});
export type ConsolidationOption = z.infer<typeof ConsolidationOptionSchema>;

// ── Staff: hub receiving and shipments ──────────────────────────────────────

export const UpdatePickupSchema = z.object({
  status: z.enum(['SCHEDULED', 'COLLECTED', 'CANCELLED']),
  pickupDate: IsoDate.optional(),
  partnerId: z
    .union([z.uuid(), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' || v === null || v === undefined ? null : v)),
});
export type UpdatePickupDto = z.output<typeof UpdatePickupSchema>;

export const HubReceiptInputSchema = z.object({
  orderCode: z.string().regex(/^ORD-\d{4}-\d{4,}$/, { error: 'Unknown order' }),
  hubId: z.uuid({ error: 'Pick a hub' }),
  cartonsReceived: Int(0, 100_000, 'Enter the cartons received'),
  grossWeightGrams: optionalInt(1, 100_000_000, 'Enter the weight'),
  condition: HubReceiptConditionSchema,
  repacked: z.boolean().default(false),
  relabelled: z.boolean().default(false),
  notes: optionalText(1000),
  photoFileIds: z.array(z.uuid()).max(12).default([]),
});
export type HubReceiptInput = z.input<typeof HubReceiptInputSchema>;
export type HubReceiptDto = z.output<typeof HubReceiptInputSchema>;

export const PresignHubPhotoSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp'], { error: 'Upload a photo' }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(15 * 1024 * 1024),
});
export type PresignHubPhotoDto = z.infer<typeof PresignHubPhotoSchema>;

/** One row of the staff logistics board: every order GarmentGate ships. */
export const ForwarderSchema = z.object({
  name: z.string(),
  contact: z.string().nullable(),
  reference: z.string().nullable(),
});
export type Forwarder = z.infer<typeof ForwarderSchema>;

export const AdminLogisticsOrderSchema = z.object({
  code: z.string(),
  status: OrderStatusSchema,
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string(), country: z.string() }),
  quote: z.object({
    mode: ShippingModeSchema,
    incoterm: z.string(),
    destinationCountry: z.string(),
    destinationPort: z.string().nullable(),
    currency: CurrencySchema,
    totalMinor: z.number().int(),
    paid: z.boolean(),
    consolidationCode: z.string().nullable(),
    /** HANDOVER: the buyer's forwarder that collects at the hub. */
    forwarder: ForwarderSchema.nullable(),
  }),
  cargo: z.object({
    estimatedGrams: z.number().int(),
    estimatedLitres: z.number().int(),
    packedGrams: z.number().int().nullable(),
    packedLitres: z.number().int().nullable(),
    cartons: z.number().int().nullable(),
  }),
  pickup: z
    .object({
      id: z.uuid(),
      status: PickupStatusSchema,
      pickupDate: z.iso.date(),
      hubCode: z.string(),
    })
    .nullable(),
  receipt: z
    .object({
      hubCode: z.string(),
      cartonsReceived: z.number().int(),
      condition: HubReceiptConditionSchema,
      receivedAt: z.iso.datetime(),
    })
    .nullable(),
  shipmentCode: z.string().nullable(),
});
export type AdminLogisticsOrder = z.infer<typeof AdminLogisticsOrderSchema>;

export const CreateShipmentSchema = z.object({
  orderCodes: z
    .array(z.string().regex(/^ORD-\d{4}-\d{4,}$/))
    .min(1, { error: 'Pick the orders' })
    .max(20)
    .refine((v) => new Set(v).size === v.length, { error: 'Each order once' }),
  originHubId: z
    .union([z.uuid(), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' || v === null || v === undefined ? null : v)),
  etd: IsoDate.optional(),
  eta: IsoDate.optional(),
});
export type CreateShipmentInput = z.input<typeof CreateShipmentSchema>;
export type CreateShipmentDto = z.output<typeof CreateShipmentSchema>;

const optionalRef = z
  .union([ShipmentReferenceSchema, z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' ? null : v));
const optionalDate = z
  .union([IsoDate, z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' ? null : v));

export const UpdateLegSchema = z.object({
  status: ShipmentLegStatusSchema.optional(),
  partnerId: z
    .union([z.uuid(), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' ? null : v)),
  carrier: z
    .union([z.string().trim().min(2).max(80), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' ? null : v)),
  trackingNumber: optionalRef,
  containerNumber: optionalRef,
  transportDocNo: optionalRef,
  costMinor: z
    .union([z.coerce.number().int().min(0), z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' ? null : v)),
  etd: optionalDate,
  eta: optionalDate,
});
export type UpdateLegInput = z.input<typeof UpdateLegSchema>;
export type UpdateLegDto = z.output<typeof UpdateLegSchema>;

export const UpdateShipmentSchema = z.object({
  status: z.enum(['PLANNED', 'BOOKED', 'CANCELLED']).optional(),
  etd: optionalDate,
  eta: optionalDate,
});
export type UpdateShipmentInput = z.input<typeof UpdateShipmentSchema>;
export type UpdateShipmentDto = z.output<typeof UpdateShipmentSchema>;

const PartyRef = z.object({ code: z.string(), name: z.string() });

export const AdminShipmentLegSchema = z.object({
  id: z.uuid(),
  sequence: z.number().int(),
  kind: ShipmentLegKindSchema,
  status: ShipmentLegStatusSchema,
  partner: z.object({ id: z.uuid(), code: z.string(), name: z.string() }).nullable(),
  fromLabel: z.string(),
  toLabel: z.string(),
  carrier: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  containerNumber: z.string().nullable(),
  transportDocNo: z.string().nullable(),
  costMinor: z.number().int().nullable(),
  etd: z.iso.date().nullable(),
  eta: z.iso.date().nullable(),
  accepted: z.boolean(),
  paid: z.boolean(),
});
export type AdminShipmentLeg = z.infer<typeof AdminShipmentLegSchema>;

export const AdminShipmentSchema = z.object({
  code: z.string(),
  status: LogisticsShipmentStatusSchema,
  /** Converted from a factory-booked shipment: read-only. */
  historical: z.boolean(),
  mode: ShippingModeSchema,
  incoterm: IncotermSchema,
  shipperMode: ShipperModeSchema,
  buyer: PartyRef,
  originHub: PartyRef.nullable(),
  originCountry: z.string(),
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  consolidationCode: z.string().nullable(),
  currency: CurrencySchema,
  buyerPriceMinor: z.number().int(),
  partnerCostMinor: z.number().int(),
  insuranceMinor: z.number().int(),
  /** Freight margin: what buyers paid for freight minus what partners cost. */
  marginMinor: z.number().int(),
  cartons: z.number().int(),
  grossWeightGrams: z.number().int(),
  volumeLitres: z.number().int(),
  etd: z.iso.date().nullable(),
  eta: z.iso.date().nullable(),
  orders: z.array(
    z.object({
      code: z.string(),
      manufacturer: PartyRef,
      cartons: z.number().int(),
      grossWeightGrams: z.number().int(),
      volumeLitres: z.number().int(),
      buyerShareMinor: z.number().int(),
      costShareMinor: z.number().int(),
      forwarder: ForwarderSchema.nullable(),
    }),
  ),
  legs: z.array(AdminShipmentLegSchema),
  events: z.array(
    z.object({
      occurredAt: z.iso.datetime(),
      status: LogisticsShipmentStatusSchema.nullable(),
      source: ShipmentEventSourceSchema,
      location: z.string().nullable(),
      publicNote: z.string().nullable(),
      internalNote: z.string().nullable(),
    }),
  ),
  uploads: z.array(
    z.object({
      id: z.uuid(),
      kind: ShipmentUploadKindSchema,
      fileName: z.string(),
      legSequence: z.number().int().nullable(),
      url: z.string().nullable(),
      /** Sanitized (PDF) or rendered (photo): it can be published to the buyer. */
      ready: z.boolean(),
      buyerVisible: z.boolean(),
      createdAt: z.iso.datetime(),
    }),
  ),
  departedAt: z.iso.datetime().nullable(),
  deliveredAt: z.iso.datetime().nullable(),
  documents: z.array(
    z.object({
      type: LogisticsDocumentTypeSchema,
      number: z.string(),
      createdAt: z.iso.datetime(),
    }),
  ),
  /** Documents this shipper mode can produce. */
  documentTypes: z.array(LogisticsDocumentTypeSchema),
  createdAt: z.iso.datetime(),
});
export type AdminShipment = z.infer<typeof AdminShipmentSchema>;

export const AdminShipmentRowSchema = AdminShipmentSchema.pick({
  code: true,
  status: true,
  historical: true,
  mode: true,
  buyer: true,
  originCountry: true,
  destinationCountry: true,
  destinationPort: true,
  currency: true,
  buyerPriceMinor: true,
  partnerCostMinor: true,
  marginMinor: true,
  cartons: true,
  etd: true,
  eta: true,
  createdAt: true,
}).extend({ orders: z.number().int() });
export type AdminShipmentRow = z.infer<typeof AdminShipmentRowSchema>;

/** Which documents a shipper mode issues. SWITCH_BL adds the factory-shipper original (staff only). */
/**
 * The papers a shipment carries. A hand-over has no transport document of GarmentGate's (the
 * buyer's forwarder issues it), and only insured cargo gets an insurance certificate.
 */
export function documentTypesFor(
  shipperMode: z.infer<typeof ShipperModeSchema>,
  shipment: { mode: z.infer<typeof ShippingModeSchema>; insured: boolean } = {
    mode: 'SEA_LCL',
    insured: true,
  },
): LogisticsDocumentType[] {
  const handover = shipment.mode === 'HANDOVER';
  const transport: LogisticsDocumentType[] = handover
    ? []
    : shipperMode === 'SWITCH_BL'
      ? ['BILL_OF_LADING', 'ORIGINAL_BILL_OF_LADING']
      : ['BILL_OF_LADING'];
  const insurance: LogisticsDocumentType[] =
    shipment.insured && !handover ? ['INSURANCE_CERTIFICATE'] : [];
  return [
    'COMMERCIAL_INVOICE',
    'PACKING_LIST',
    ...transport,
    'CERTIFICATE_OF_ORIGIN',
    ...insurance,
    'SHIPPING_LABEL',
    'CARTON_MARKING',
  ];
}
