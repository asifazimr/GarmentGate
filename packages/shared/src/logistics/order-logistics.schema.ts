import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { PaymentMethodSchema } from '../payments/payments.schema.js';
import { HsCodeSchema, PortCodeSchema, ShippingModeSchema } from './logistics.schema.js';
import { ShipmentReferenceSchema } from './references.js';
import { GG_INCOTERMS } from './shipping.js';

export const GgIncotermSchema = z.enum(GG_INCOTERMS);
/** Terms an order can ship on with GarmentGate: its own freight, or FCA at a hub (hand-over). */
export const ShippingIncotermSchema = z.enum([...GG_INCOTERMS, 'FCA']);
export type ShippingIncoterm = z.infer<typeof ShippingIncotermSchema>;

/** The buyer's shipping step: where to, on which terms; the cargo is estimated unless given. */
export const ShippingQuoteRequestSchema = z.object({
  destinationCountry: CountryCodeSchema,
  destinationPort: z
    .union([PortCodeSchema, z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' || v === null || v === undefined ? null : v)),
  incoterm: GgIncotermSchema,
  insured: z.boolean().default(false),
});
export type ShippingQuoteRequestInput = z.input<typeof ShippingQuoteRequestSchema>;
export type ShippingQuoteRequest = z.output<typeof ShippingQuoteRequestSchema>;

/** A landed-cost ESTIMATE: duty depends on the customs ruling, which the UI says. */
export const LandedCostViewSchema = z.strictObject({
  goodsMinor: z.number().int(),
  freightMinor: z.number().int(),
  insuranceMinor: z.number().int(),
  valuation: z.enum(['CIF', 'FOB']),
  dutyRateBps: z.number().int().nullable(),
  dutyMinor: z.number().int(),
  totalMinor: z.number().int(),
  perPieceMinor: z.number().int(),
});
export type LandedCostView = z.infer<typeof LandedCostViewSchema>;

/** One shipping option as the buyer sees it: GarmentGate's price, never a partner or its cost. */
export const BuyerShippingOptionSchema = z.strictObject({
  quoteId: z.uuid(),
  mode: ShippingModeSchema,
  incoterm: ShippingIncotermSchema,
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  currency: CurrencySchema,
  freightMinor: z.number().int(),
  insuranceMinor: z.number().int(),
  dutyEstimateMinor: z.number().int(),
  totalMinor: z.number().int(),
  transitDaysMin: z.number().int(),
  transitDaysMax: z.number().int(),
  validUntil: z.iso.datetime(),
  landedCost: LandedCostViewSchema,
});
export type BuyerShippingOption = z.infer<typeof BuyerShippingOptionSchema>;

export const BuyerOrderLogisticsSchema = z.strictObject({
  /** The shipping step can be used (feature on and the order not shipped yet). */
  available: z.boolean(),
  /** A different option can still be chosen (nothing paid for shipping yet). */
  editable: z.boolean(),
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  hsCode: z.string().nullable(),
  cargo: z.strictObject({
    weightGrams: z.number().int(),
    volumeLitres: z.number().int(),
    estimated: z.boolean(),
  }),
  accepted: BuyerShippingOptionSchema.nullable(),
  paidMinor: z.number().int(),
  outstandingMinor: z.number().int(),
  /** A transfer the buyer marked as sent, waiting for staff. */
  pending: z.boolean(),
  /** Hand-over: the buyer's own forwarder (their data, shown back to them). */
  forwarder: z
    .strictObject({ name: z.string(), contact: z.string(), reference: z.string().nullable() })
    .nullable(),
});
export type BuyerOrderLogistics = z.infer<typeof BuyerOrderLogisticsSchema>;

export const PayLogisticsSchema = z.object({ method: PaymentMethodSchema });
export type PayLogisticsDto = z.infer<typeof PayLogisticsSchema>;

export const SetHsCodeSchema = z.object({ hsCode: HsCodeSchema });
export type SetHsCodeDto = z.infer<typeof SetHsCodeSchema>;

/**
 * The buyer uses its own forwarder: the factory still delivers to a GarmentGate hub, and
 * GarmentGate hands the cargo over there (FCA). No freight charge; GarmentGate arranges the
 * collection with the forwarder, so the factory and the forwarder never meet.
 */
export const HandoverRequestSchema = z.object({
  destinationCountry: CountryCodeSchema,
  forwarderName: z.string().trim().min(2, { error: 'Enter the forwarder’s name' }).max(120),
  /** Who GarmentGate calls to arrange the collection. Staff only. */
  forwarderContact: z
    .string()
    .trim()
    .min(5, { error: 'Enter an email or phone number for the forwarder' })
    .max(200),
  forwarderReference: z
    .union([ShipmentReferenceSchema, z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' || v === undefined ? null : v)),
});
export type HandoverRequestInput = z.input<typeof HandoverRequestSchema>;
export type HandoverRequestDto = z.output<typeof HandoverRequestSchema>;
