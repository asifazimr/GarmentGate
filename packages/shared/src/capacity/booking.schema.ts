import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { PaymentMethodSchema } from '../payments/payments.schema.js';
import { IncotermSchema } from '../rfq/rfq.schema.js';
import {
  CapacityBookingStatusSchema,
  CapacityPartnershipStatusSchema,
  OrderStatusSchema,
} from '../status/statuses.js';
import { PublicBrandBadgeSchema } from './claims.schema.js';

export const CapacityBookingKindSchema = z.enum(['SLOT', 'LINE', 'PARTNERSHIP']);
export type CapacityBookingKind = z.infer<typeof CapacityBookingKindSchema>;
export const CapacityBookingActorSchema = z.enum(['BUYER', 'FACTORY', 'STAFF', 'SYSTEM']);
export type CapacityBookingActor = z.infer<typeof CapacityBookingActorSchema>;
export const CapacityConversionModeSchema = z.enum(['CMT', 'FULL_PACKAGE']);
export type CapacityConversionMode = z.infer<typeof CapacityConversionModeSchema>;

const IsoDate = z.iso.date({ error: 'Pick a date' });
const Bps = z.coerce.number({ error: 'Enter a number' }).int().min(0).max(10_000);
const SamPerPiece = z.coerce
  .number({ error: 'Enter the SAM per piece' })
  .min(0.5, { error: 'At least 0.5 minutes' })
  .max(600, { error: 'At most 600 minutes' })
  .multipleOf(0.01, { error: 'Two decimals at most' });
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' ? undefined : v));
const MonthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, { error: 'Pick a month' });

// ── Settings (staff) ────────────────────────────────────────────────────────

export const CancellationTierSchema = z.object({
  minDaysBefore: z.coerce.number({ error: 'Enter a number' }).int().min(0).max(365),
  refundBps: Bps,
});

export const CapacityBookingSettingsSchema = z
  .object({
    bookingFeeBps: Bps.refine((v) => v <= 5_000, { error: 'At most 50%' }),
    depositBps: Bps.refine((v) => v >= 500, { error: 'At least 5%' }),
    holdHours: z.coerce.number({ error: 'Enter hours' }).int().min(1).max(336),
    reminderHours: z.coerce.number({ error: 'Enter hours' }).int().min(1).max(168),
    convertLeadDays: z.coerce.number({ error: 'Enter days' }).int().min(0).max(90),
    cancellationTiers: z.array(CancellationTierSchema).min(1).max(6),
    factoryShareBps: Bps,
  })
  .superRefine((v, ctx) => {
    const tiers = v.cancellationTiers;
    tiers.forEach((t, i) => {
      const prev = tiers[i - 1];
      if (prev && t.minDaysBefore >= prev.minDaysBefore)
        ctx.addIssue({
          code: 'custom',
          path: ['cancellationTiers', i, 'minDaysBefore'],
          message: 'List tiers from the most days ahead to the fewest',
        });
      if (prev && t.refundBps > prev.refundBps)
        ctx.addIssue({
          code: 'custom',
          path: ['cancellationTiers', i, 'refundBps'],
          message: 'Later cancellations can’t refund more',
        });
    });
    if (tiers.at(-1)?.minDaysBefore !== 0)
      ctx.addIssue({
        code: 'custom',
        path: ['cancellationTiers', tiers.length - 1, 'minDaysBefore'],
        message: 'The last tier starts at 0 days',
      });
    if (v.reminderHours >= v.holdHours)
      ctx.addIssue({
        code: 'custom',
        path: ['reminderHours'],
        message: 'Remind before the hold runs out',
      });
  });
export type CapacityBookingSettingsInput = z.input<typeof CapacityBookingSettingsSchema>;
export type CapacityBookingSettingsDto = z.output<typeof CapacityBookingSettingsSchema>;

// ── Buyer search ────────────────────────────────────────────────────────────

/** Either the minutes, or pieces × SAM per piece (the "SAM helper"). */
export const CapacitySearchQuerySchema = z
  .object({
    categoryId: z.uuid({ error: 'Pick a category' }),
    minutes: z.coerce.number().int().min(60).max(5_000_000).optional(),
    pieces: z.coerce.number().int().min(1).max(10_000_000).optional(),
    samPerPiece: SamPerPiece.optional(),
    from: IsoDate,
    to: IsoDate,
  })
  .refine(
    (v) => v.minutes !== undefined || (v.pieces !== undefined && v.samPerPiece !== undefined),
    {
      path: ['minutes'],
      error: 'Enter the minutes, or pieces and SAM per piece',
    },
  )
  .refine((v) => v.to >= v.from, { path: ['to'], error: 'The end can’t be before the start' });
export type CapacitySearchQuery = z.output<typeof CapacitySearchQuerySchema>;

export const BookingQuoteSchema = z.strictObject({
  minutes: z.number().int(),
  currency: CurrencySchema,
  buyerRateMinorPer100Min: z.number().int(),
  buyerAmountMinor: z.number().int(),
  depositMinor: z.number().int(),
  depositBps: z.number().int(),
});
export type BookingQuote = z.infer<typeof BookingQuoteSchema>;

/** One bookable window as a buyer sees it: no line code, name or factory identity. */
export const CapacityWindowSchema = z.strictObject({
  slotId: z.uuid(),
  /** Opaque: used to ask for a partnership on the same line. */
  lineId: z.uuid(),
  /** "Line 1", "Line 2": numbered per factory in the results. */
  lineNumber: z.number().int().positive(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  totalMinutes: z.number().int(),
  freeMinutes: z.number().int(),
  /** True when the requested minutes fit. */
  fits: z.boolean(),
  estimatedPieces: z.number().int().nullable(),
  quote: BookingQuoteSchema.nullable(),
});
export type CapacityWindow = z.infer<typeof CapacityWindowSchema>;

export const CapacitySearchResultSchema = z.strictObject({
  manufacturer: z.strictObject({
    publicCode: z.string(),
    country: z.string(),
    performanceScore: z.number().int(),
    brandBadges: z.array(PublicBrandBadgeSchema),
  }),
  windows: z.array(CapacityWindowSchema),
});
export type CapacitySearchResult = z.infer<typeof CapacitySearchResultSchema>;

export const CapacitySearchResponseSchema = z.strictObject({
  minutes: z.number().int(),
  results: z.array(CapacitySearchResultSchema),
});
export type CapacitySearchResponse = z.infer<typeof CapacitySearchResponseSchema>;

// ── Booking flow ────────────────────────────────────────────────────────────

export const BookingTermsQuerySchema = z.object({
  kind: z.enum(['SLOT', 'LINE']).default('SLOT'),
  minutes: z.coerce.number().int().min(60).optional(),
});
export type BookingTermsQuery = z.output<typeof BookingTermsQuerySchema>;

/** Step 2 of the flow: the price, the deposit, how long the hold lasts and the cancellation policy. */
export const BookingTermsSchema = z.strictObject({
  window: CapacityWindowSchema,
  manufacturer: z.strictObject({ publicCode: z.string(), country: z.string() }),
  quote: BookingQuoteSchema,
  holdHours: z.number().int(),
  cancellationTiers: z.array(
    z.strictObject({ minDaysBefore: z.number().int(), refundBps: z.number().int() }),
  ),
});
export type BookingTerms = z.infer<typeof BookingTermsSchema>;

export const CreateBookingSchema = z
  .object({
    slotId: z.uuid(),
    kind: z.enum(['SLOT', 'LINE']).default('SLOT'),
    minutes: z.coerce.number().int().min(60, { error: 'At least 60 minutes' }).optional(),
    categoryId: z.uuid({ error: 'Pick a category' }),
    samPerPiece: SamPerPiece.optional(),
    note: optionalText(1000),
    acceptTerms: z.literal(true, { error: 'Accept the booking terms' }),
  })
  .refine((v) => v.kind === 'LINE' || v.minutes !== undefined, {
    path: ['minutes'],
    error: 'How many minutes?',
  });
export type CreateBookingInput = z.input<typeof CreateBookingSchema>;
export type CreateBookingDto = z.output<typeof CreateBookingSchema>;

export const BookingCreatedSchema = z.object({ code: z.string() });

export const BookingReasonSchema = z.object({
  reason: z.string().trim().min(5, { error: 'Say why (at least 5 characters)' }).max(500),
});
export type BookingReasonDto = z.infer<typeof BookingReasonSchema>;

export const PayBookingDepositSchema = z.object({ method: PaymentMethodSchema });
export type PayBookingDepositDto = z.infer<typeof PayBookingDepositSchema>;

export const ConvertBookingSchema = z.discriminatedUnion('mode', [
  z.object({
    mode: z.literal('CMT'),
    title: z.string().trim().min(3, { error: 'Name the style' }).max(120),
    quantity: z.coerce.number({ error: 'Enter a quantity' }).int().min(1).max(10_000_000),
    samPerPiece: SamPerPiece,
    incoterm: IncotermSchema,
    destinationCountry: CountryCodeSchema,
    specification: optionalText(4000),
  }),
  z.object({
    mode: z.literal('FULL_PACKAGE'),
    title: z.string().trim().min(3, { error: 'Name the style' }).max(120),
    quantity: z.coerce.number({ error: 'Enter a quantity' }).int().min(1).max(10_000_000),
    samPerPiece: SamPerPiece.optional(),
    incoterm: IncotermSchema,
    destinationCountry: CountryCodeSchema,
    description: z
      .string()
      .trim()
      .min(10, { error: 'Describe fabric, trims and packing' })
      .max(4000),
  }),
]);
export type ConvertBookingInput = z.input<typeof ConvertBookingSchema>;
export type ConvertBookingDto = z.output<typeof ConvertBookingSchema>;
export const ConvertedBookingSchema = z.object({
  orderCode: z.string().nullable(),
  rfqCode: z.string().nullable(),
});
export type ConvertedBooking = z.infer<typeof ConvertedBookingSchema>;

/** What the buyer should do next (drives the highlighted action). */
export const BookingNextActionSchema = z.enum([
  'PAY_DEPOSIT',
  'AWAIT_PAYMENT_CHECK',
  'AWAIT_FACTORY',
  'CONVERT',
  'AWAIT_QUOTE',
  'TRACK_ORDER',
]);
export type BookingNextAction = z.infer<typeof BookingNextActionSchema>;

const TierView = z.strictObject({ minDaysBefore: z.number().int(), refundBps: z.number().int() });

export const BuyerBookingSchema = z.strictObject({
  code: z.string(),
  kind: CapacityBookingKindSchema,
  status: CapacityBookingStatusSchema,
  manufacturer: z.strictObject({ publicCode: z.string(), country: z.string() }),
  category: z.strictObject({ id: z.uuid(), name: z.string() }),
  minutes: z.number().int(),
  returnedMinutes: z.number().int(),
  samPerPiece: z.number().nullable(),
  estimatedPieces: z.number().int().nullable(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  currency: CurrencySchema,
  buyerRateMinorPer100Min: z.number().int(),
  buyerAmountMinor: z.number().int(),
  depositMinor: z.number().int(),
  depositPaidMinor: z.number().int(),
  /** A transfer the buyer marked as sent, waiting for staff to confirm. */
  depositPending: z.boolean(),
  factoryAccepted: z.boolean(),
  holdExpiresAt: z.iso.datetime(),
  /** Convert to an order by this date (production start minus the lead time). */
  convertBy: z.iso.date(),
  cancellationTiers: z.array(TierView),
  /** What the buyer would get back if they cancelled today. */
  refundIfCancelledMinor: z.number().int(),
  confirmedAt: z.iso.datetime().nullable(),
  cancelledAt: z.iso.datetime().nullable(),
  cancelledBy: CapacityBookingActorSchema.nullable(),
  cancelReason: z.string().nullable(),
  refundMinor: z.number().int().nullable(),
  conversionMode: CapacityConversionModeSchema.nullable(),
  order: z.strictObject({ code: z.string(), status: OrderStatusSchema }).nullable(),
  rfqCode: z.string().nullable(),
  partnershipCode: z.string().nullable(),
  note: z.string().nullable(),
  nextAction: BookingNextActionSchema.nullable(),
  createdAt: z.iso.datetime(),
});
export type BuyerBooking = z.infer<typeof BuyerBookingSchema>;

/** The factory's view: the buyer is a BYR- code; only the factory's own rate and amount. */
export const ManufacturerBookingSchema = z.strictObject({
  code: z.string(),
  kind: CapacityBookingKindSchema,
  status: CapacityBookingStatusSchema,
  buyer: z.strictObject({ code: z.string() }),
  line: z.strictObject({ id: z.uuid(), code: z.string(), name: z.string() }),
  category: z.strictObject({ id: z.uuid(), name: z.string() }),
  minutes: z.number().int(),
  returnedMinutes: z.number().int(),
  samPerPiece: z.number().nullable(),
  estimatedPieces: z.number().int().nullable(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  currency: CurrencySchema,
  factoryRateMinorPer100Min: z.number().int(),
  factoryAmountMinor: z.number().int(),
  accepted: z.boolean(),
  depositPaid: z.boolean(),
  holdExpiresAt: z.iso.datetime(),
  cancelledBy: CapacityBookingActorSchema.nullable(),
  cancelReason: z.string().nullable(),
  /** The factory's share of a deposit the buyer forfeited. */
  compensationMinor: z.number().int().nullable(),
  orderCode: z.string().nullable(),
  partnershipCode: z.string().nullable(),
  note: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type ManufacturerBooking = z.infer<typeof ManufacturerBookingSchema>;

export const AdminBookingSchema = z.object({
  code: z.string(),
  kind: CapacityBookingKindSchema,
  status: CapacityBookingStatusSchema,
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  line: z.object({ code: z.string(), name: z.string() }),
  minutes: z.number().int(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  currency: CurrencySchema,
  factoryAmountMinor: z.number().int(),
  buyerAmountMinor: z.number().int(),
  depositMinor: z.number().int(),
  depositPaidMinor: z.number().int(),
  factoryAccepted: z.boolean(),
  holdExpiresAt: z.iso.datetime(),
  refundMinor: z.number().int().nullable(),
  compensationMinor: z.number().int().nullable(),
  compensationPaid: z.boolean(),
  cancelledBy: CapacityBookingActorSchema.nullable(),
  cancelReason: z.string().nullable(),
  orderCode: z.string().nullable(),
  partnershipCode: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type AdminBooking = z.infer<typeof AdminBookingSchema>;

export const AdminBookingsQuerySchema = z.object({
  status: CapacityBookingStatusSchema.optional(),
});

// ── Partnerships ────────────────────────────────────────────────────────────

export const CreatePartnershipSchema = z.object({
  lineId: z.uuid(),
  categoryId: z.uuid({ error: 'Pick a category' }),
  monthlyMinutes: z.coerce.number({ error: 'Enter minutes' }).int().min(600).max(5_000_000),
  months: z.coerce.number({ error: 'Pick a length' }).int().min(6).max(12),
  startMonth: MonthSchema,
  samPerPiece: SamPerPiece.optional(),
  note: optionalText(1000),
  acceptTerms: z.literal(true, { error: 'Accept the partnership terms' }),
});
export type CreatePartnershipInput = z.input<typeof CreatePartnershipSchema>;
export type CreatePartnershipDto = z.output<typeof CreatePartnershipSchema>;

const PartnershipBase = {
  code: z.string(),
  status: CapacityPartnershipStatusSchema,
  category: z.strictObject({ id: z.uuid(), name: z.string() }),
  monthlyMinutes: z.number().int(),
  months: z.number().int(),
  startMonth: z.string(),
  samPerPiece: z.number().nullable(),
  currency: CurrencySchema,
  declineReason: z.string().nullable(),
  note: z.string().nullable(),
  createdAt: z.iso.datetime(),
  bookings: z.array(
    z.strictObject({
      code: z.string(),
      status: CapacityBookingStatusSchema,
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    }),
  ),
};

export const BuyerPartnershipSchema = z.strictObject({
  ...PartnershipBase,
  manufacturer: z.strictObject({ publicCode: z.string(), country: z.string() }),
  buyerRateMinorPer100Min: z.number().int(),
  monthlyAmountMinor: z.number().int(),
});
export type BuyerPartnership = z.infer<typeof BuyerPartnershipSchema>;

export const ManufacturerPartnershipSchema = z.strictObject({
  ...PartnershipBase,
  buyer: z.strictObject({ code: z.string() }),
  line: z.strictObject({ id: z.uuid(), code: z.string(), name: z.string() }),
  factoryRateMinorPer100Min: z.number().int(),
  monthlyAmountMinor: z.number().int(),
});
export type ManufacturerPartnership = z.infer<typeof ManufacturerPartnershipSchema>;

/** The buyer's capacity dashboard. */
export const BuyerCapacityOverviewSchema = z.strictObject({
  bookings: z.array(BuyerBookingSchema),
  partnerships: z.array(BuyerPartnershipSchema),
});
export type BuyerCapacityOverview = z.infer<typeof BuyerCapacityOverviewSchema>;

export const ManufacturerBookingInboxSchema = z.strictObject({
  bookings: z.array(ManufacturerBookingSchema),
  partnerships: z.array(ManufacturerPartnershipSchema),
});
export type ManufacturerBookingInbox = z.infer<typeof ManufacturerBookingInboxSchema>;
