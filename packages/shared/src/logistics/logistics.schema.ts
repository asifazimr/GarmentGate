import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { CONTAINER_TYPES, LOGISTICS_MODES, RATE_UNITS } from './freight.js';

/** Freight modes: what rate cards, margins and quotes price. */
export const LogisticsModeSchema = z.enum(LOGISTICS_MODES);
export type LogisticsMode = z.infer<typeof LogisticsModeSchema>;
/** Every way an order can leave with GarmentGate: a freight mode, or a hand-over at the hub. */
export const SHIPPING_MODES = [...LOGISTICS_MODES, 'HANDOVER'] as const;
export const ShippingModeSchema = z.enum(SHIPPING_MODES);
export type ShippingMode = z.infer<typeof ShippingModeSchema>;
/** A freight mode read back from storage (rate cards and margins never hold HANDOVER). */
export function freightMode(mode: string): LogisticsMode {
  return LogisticsModeSchema.parse(mode);
}
export const RateUnitSchema = z.enum(RATE_UNITS);
export type RateUnit = z.infer<typeof RateUnitSchema>;
export const ContainerTypeSchema = z.enum(CONTAINER_TYPES);
export type ContainerType = z.infer<typeof ContainerTypeSchema>;
export const LogisticsPartnerKindSchema = z.enum([
  'FORWARDER',
  'COURIER',
  'TRUCKING',
  'CUSTOMS_BROKER',
]);
export type LogisticsPartnerKind = z.infer<typeof LogisticsPartnerKindSchema>;
export const HubOperatorSchema = z.enum(['GARMENT_GATE', 'PARTNER']);
export const ShipperModeSchema = z.enum([
  'GARMENT_GATE_EXPORTER',
  'SWITCH_BL',
  'HUB_CONSOLIDATION',
]);
export type ShipperMode = z.infer<typeof ShipperModeSchema>;

const IsoDate = z.iso.date({ error: 'Pick a date' });
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' || v === undefined ? null : v));
const optionalCountry = z
  .union([CountryCodeSchema, z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' || v === null || v === undefined ? null : v));
/** UN/LOCODE, e.g. BDCGP (Chittagong), DEHAM (Hamburg). */
export const PortCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{2}[A-Z0-9]{3}$/, { error: 'Use a UN/LOCODE like DEHAM' });
const optionalPort = z
  .union([PortCodeSchema, z.literal(''), z.null()])
  .optional()
  .transform((v) => (v === '' || v === null || v === undefined ? null : v));
const Minor = (min = 0) =>
  z.coerce.number({ error: 'Enter an amount' }).int().min(min).max(1_000_000_000);
const Bps = z.coerce.number({ error: 'Enter a number' }).int().min(0).max(10_000);

// ── Partners ────────────────────────────────────────────────────────────────

export const LogisticsPartnerInputSchema = z.object({
  name: z.string().trim().min(2, { error: 'Name the partner' }).max(120),
  kind: LogisticsPartnerKindSchema,
  country: CountryCodeSchema,
  contactEmail: z
    .union([z.email({ error: 'Enter a valid email' }), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? null : v)),
  contactPhone: optionalText(40),
  notes: optionalText(1000),
  active: z.boolean().default(true),
});
export type LogisticsPartnerInput = z.input<typeof LogisticsPartnerInputSchema>;
export type LogisticsPartnerDto = z.output<typeof LogisticsPartnerInputSchema>;

export const LogisticsPartnerSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  kind: LogisticsPartnerKindSchema,
  country: z.string(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
  notes: z.string().nullable(),
  active: z.boolean(),
  rateCards: z.number().int(),
});
export type LogisticsPartner = z.infer<typeof LogisticsPartnerSchema>;

// ── Hubs ────────────────────────────────────────────────────────────────────

export const HubInputSchema = z
  .object({
    code: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^HUB-[A-Z]{2}-\d{2}$/, { error: 'Use a code like HUB-BD-01' }),
    name: z.string().trim().min(2, { error: 'Name the hub' }).max(120),
    operator: HubOperatorSchema.default('GARMENT_GATE'),
    partnerId: z
      .union([z.uuid(), z.literal(''), z.null()])
      .optional()
      .transform((v) => (v === '' || v === null || v === undefined ? null : v)),
    country: CountryCodeSchema,
    city: z.string().trim().min(1, { error: 'Enter the city' }).max(80),
    addressLine1: z.string().trim().min(3, { error: 'Enter the address' }).max(200),
    addressLine2: optionalText(200),
    postalCode: optionalText(20),
    port: optionalPort,
    active: z.boolean().default(true),
  })
  .refine((v) => v.operator === 'GARMENT_GATE' || v.partnerId !== null, {
    path: ['partnerId'],
    error: 'Pick the partner who runs this hub',
  })
  .refine((v) => v.code.slice(4, 6) === v.country, {
    path: ['code'],
    error: 'The code’s country must match the hub’s',
  });
export type HubInput = z.input<typeof HubInputSchema>;
export type HubDto = z.output<typeof HubInputSchema>;

export const HubSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  operator: HubOperatorSchema,
  partner: z.object({ id: z.uuid(), code: z.string(), name: z.string() }).nullable(),
  country: z.string(),
  city: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().nullable(),
  postalCode: z.string().nullable(),
  port: z.string().nullable(),
  active: z.boolean(),
});
export type Hub = z.infer<typeof HubSchema>;

// ── Rate cards (staff only: partner costs) ──────────────────────────────────

export const RateCardInputSchema = z
  .object({
    partnerId: z.uuid({ error: 'Pick a partner' }),
    mode: LogisticsModeSchema,
    originCountry: CountryCodeSchema,
    originPort: optionalPort,
    destinationCountry: CountryCodeSchema,
    destinationPort: optionalPort,
    unit: RateUnitSchema,
    containerType: z
      .union([ContainerTypeSchema, z.literal(''), z.null()])
      .optional()
      .transform((v) => (v === '' || v === null || v === undefined ? null : v)),
    costMinor: Minor(1),
    minChargeMinor: Minor(0).default(0),
    currency: CurrencySchema.default('USD'),
    transitDaysMin: z.coerce.number({ error: 'Enter days' }).int().min(0).max(180),
    transitDaysMax: z.coerce.number({ error: 'Enter days' }).int().min(0).max(180),
    validFrom: IsoDate,
    validTo: IsoDate,
    active: z.boolean().default(true),
    notes: optionalText(500),
  })
  .refine((v) => v.transitDaysMax >= v.transitDaysMin, {
    path: ['transitDaysMax'],
    error: 'Can’t be less than the minimum',
  })
  .refine((v) => v.validTo >= v.validFrom, { path: ['validTo'], error: 'Ends before it starts' })
  .refine((v) => (v.unit === 'PER_CONTAINER') === (v.containerType !== null), {
    path: ['containerType'],
    error: 'Pick a container for per-container rates (and only for those)',
  })
  .refine((v) => v.originPort === null || v.originPort.startsWith(v.originCountry), {
    path: ['originPort'],
    error: 'The port is in another country',
  })
  .refine((v) => v.destinationPort === null || v.destinationPort.startsWith(v.destinationCountry), {
    path: ['destinationPort'],
    error: 'The port is in another country',
  });
export type RateCardInput = z.input<typeof RateCardInputSchema>;
export type RateCardDto = z.output<typeof RateCardInputSchema>;

export const RateCardSchema = z.object({
  id: z.uuid(),
  partner: z.object({ id: z.uuid(), code: z.string(), name: z.string() }),
  mode: LogisticsModeSchema,
  originCountry: z.string(),
  originPort: z.string().nullable(),
  destinationCountry: z.string(),
  destinationPort: z.string().nullable(),
  unit: RateUnitSchema,
  containerType: ContainerTypeSchema.nullable(),
  costMinor: z.number().int(),
  minChargeMinor: z.number().int(),
  currency: CurrencySchema,
  transitDaysMin: z.number().int(),
  transitDaysMax: z.number().int(),
  validFrom: z.iso.date(),
  validTo: z.iso.date(),
  active: z.boolean(),
  notes: z.string().nullable(),
});
export type RateCard = z.infer<typeof RateCardSchema>;

// ── Margins ─────────────────────────────────────────────────────────────────

export const LogisticsMarginRuleInputSchema = z.object({
  name: z.string().trim().min(2, { error: 'Name the rule' }).max(80),
  mode: z
    .union([LogisticsModeSchema, z.literal(''), z.null()])
    .optional()
    .transform((v) => (v === '' || v === null || v === undefined ? null : v)),
  originCountry: optionalCountry,
  destinationCountry: optionalCountry,
  markupBps: Bps,
  minMarginMinor: Minor(0).default(0),
  active: z.boolean().default(true),
});
export type LogisticsMarginRuleInput = z.input<typeof LogisticsMarginRuleInputSchema>;
export type LogisticsMarginRuleDto = z.output<typeof LogisticsMarginRuleInputSchema>;

export const LogisticsMarginRuleSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  mode: LogisticsModeSchema.nullable(),
  originCountry: z.string().nullable(),
  destinationCountry: z.string().nullable(),
  markupBps: z.number().int(),
  minMarginMinor: z.number().int(),
  active: z.boolean(),
});
export type LogisticsMarginRule = z.infer<typeof LogisticsMarginRuleSchema>;

// ── Duty rates ──────────────────────────────────────────────────────────────

/** "6109.10" and "6109 10" are accepted and stored as digits. */
const digitsOnly = z
  .string()
  .trim()
  .transform((v) => v.replace(/[.\s]/g, ''));
export const HsCodeSchema = digitsOnly.pipe(
  z.string().regex(/^\d{6,10}$/, { error: 'Use a 6–10 digit HS code' }),
);

export const DutyRateInputSchema = z.object({
  hsPrefix: digitsOnly.pipe(
    z.string().regex(/^\d{2,10}$/, { error: 'Use 2–10 digits of the HS code' }),
  ),
  destinationCountry: CountryCodeSchema,
  rateBps: Bps,
  note: optionalText(200),
});
export type DutyRateInput = z.input<typeof DutyRateInputSchema>;
export type DutyRateDto = z.output<typeof DutyRateInputSchema>;

export const DutyRateSchema = z.object({
  id: z.uuid(),
  hsPrefix: z.string(),
  destinationCountry: z.string(),
  rateBps: z.number().int(),
  note: z.string().nullable(),
  updatedAt: z.iso.datetime(),
});
export type DutyRate = z.infer<typeof DutyRateSchema>;

// ── Settings ────────────────────────────────────────────────────────────────

export const LogisticsSettingsSchema = z.object({
  shipperMode: ShipperModeSchema,
  /** Cargo insurance premium on the insured value (110% of CIF). */
  insuranceRateBps: Bps.refine((v) => v <= 500, { error: 'At most 5%' }),
  minInsurancePremiumMinor: Minor(0),
  /** How long a freight quote stays valid. */
  quoteValidityDays: z.coerce.number({ error: 'Enter days' }).int().min(1).max(60),
  /** Until the factory packs: estimated packed weight and volume per piece. */
  pieceWeightGrams: z.coerce
    .number({ error: 'Enter grams' })
    .int()
    .min(10)
    .max(20_000)
    .default(300),
  pieceVolumeMl: z.coerce
    .number({ error: 'Enter millilitres' })
    .int()
    .min(50)
    .max(100_000)
    .default(1_500),
});
export type LogisticsSettingsInput = z.input<typeof LogisticsSettingsSchema>;
export type LogisticsSettings = z.output<typeof LogisticsSettingsSchema>;

export const DEFAULT_LOGISTICS_SETTINGS: LogisticsSettings = {
  shipperMode: 'GARMENT_GATE_EXPORTER',
  insuranceRateBps: 30,
  minInsurancePremiumMinor: 2500,
  quoteValidityDays: 7,
  pieceWeightGrams: 300,
  pieceVolumeMl: 1_500,
};

// ── Quotes (staff preview now; the buyer's shipping step uses the same engine) ─

export const FreightQuoteRequestSchema = z.object({
  mode: LogisticsModeSchema,
  originCountry: CountryCodeSchema,
  originPort: optionalPort,
  destinationCountry: CountryCodeSchema,
  destinationPort: optionalPort,
  weightGrams: z.coerce.number({ error: 'Enter the weight' }).int().min(1).max(100_000_000),
  volumeLitres: z.coerce.number({ error: 'Enter the volume' }).int().min(0).max(1_000_000),
  /** CIF basis for insurance (goods value), in minor units of `currency`. */
  goodsValueMinor: Minor(0).default(0),
  currency: CurrencySchema.default('USD'),
  shipDate: IsoDate,
});
export type FreightQuoteRequestInput = z.input<typeof FreightQuoteRequestSchema>;
export type FreightQuoteRequest = z.output<typeof FreightQuoteRequestSchema>;

/** One priced option, staff view (with cost and margin). */
export const FreightOptionSchema = z.object({
  provider: z.string(),
  rateCardId: z.uuid().nullable(),
  partner: z.object({ id: z.uuid(), code: z.string(), name: z.string() }).nullable(),
  mode: LogisticsModeSchema,
  currency: CurrencySchema,
  chargeableMilliUnits: z.number().int(),
  unit: RateUnitSchema,
  partnerCostMinor: z.number().int(),
  marginRule: z.string().nullable(),
  freightPriceMinor: z.number().int(),
  insurancePremiumMinor: z.number().int(),
  transitDaysMin: z.number().int(),
  transitDaysMax: z.number().int(),
});
export type FreightOption = z.infer<typeof FreightOptionSchema>;
