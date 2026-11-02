import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { PaymentStatusSchema } from '../status/statuses.js';

export const PaymentMethodSchema = z.enum(['BANK_TRANSFER', 'LETTER_OF_CREDIT', 'CARD']);
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export const BuyerPaymentPurposeSchema = z.enum(['DEPOSIT', 'BALANCE']);
export type BuyerPaymentPurpose = z.infer<typeof BuyerPaymentPurposeSchema>;

/** When a tranche of the factory's money is released from escrow. */
export const RELEASE_TRIGGERS = [
  'PRODUCTION_START',
  'QC_PASSED',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
] as const;
export const ReleaseTriggerSchema = z.enum(RELEASE_TRIGGERS);
export type ReleaseTrigger = z.infer<typeof ReleaseTriggerSchema>;
export const ReleaseStatusSchema = z.enum(['SCHEDULED', 'DUE', 'RELEASED', 'PAID', 'CANCELLED']);
export type ReleaseStatus = z.infer<typeof ReleaseStatusSchema>;

/** E.g. 30% when production starts, 70% after QC passes. Shares in basis points, adding to 100%. */
export const ReleaseScheduleSchema = z
  .array(z.object({ trigger: ReleaseTriggerSchema, bps: z.number().int().min(1).max(10_000) }))
  .min(1)
  .max(RELEASE_TRIGGERS.length)
  .refine((s) => s.reduce((a, r) => a + r.bps, 0) === 10_000, {
    error: 'Shares must add up to 100%',
  })
  .refine((s) => new Set(s.map((r) => r.trigger)).size === s.length, {
    error: 'Each moment can be used once',
  })
  .transform((s) =>
    [...s].sort(
      (a, b) => RELEASE_TRIGGERS.indexOf(a.trigger) - RELEASE_TRIGGERS.indexOf(b.trigger),
    ),
  );
export type ReleaseSchedule = z.output<typeof ReleaseScheduleSchema>;

/** 30% when production starts, 50% when the final inspection passes, 20% on delivery. */
export const DEFAULT_RELEASE_SCHEDULE: ReleaseSchedule = [
  { trigger: 'PRODUCTION_START', bps: 3000 },
  { trigger: 'QC_PASSED', bps: 5000 },
  { trigger: 'DELIVERED', bps: 2000 },
];

/** Exchange rates: units of each currency per 1 USD, as decimal strings. */
export const FxRatesSchema = z.partialRecord(
  CurrencySchema,
  z.string().regex(/^\d{1,9}(\.\d{1,10})?$/, { error: 'Use a number like 119.5' }),
);
export type FxRates = z.infer<typeof FxRatesSchema>;

// ── Buyer ───────────────────────────────────────────────────────────────────

export const StartPaymentSchema = z.object({
  purpose: BuyerPaymentPurposeSchema,
  method: PaymentMethodSchema,
});
export type StartPaymentDto = z.infer<typeof StartPaymentSchema>;

export const MarkSentSchema = z.object({
  payerReference: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type MarkSentDto = z.output<typeof MarkSentSchema>;

export const PaymentStartSchema = z.object({
  paymentId: z.uuid(),
  reference: z.string(),
  method: PaymentMethodSchema,
  amountMinor: z.number().int(),
  currency: CurrencySchema,
  /** Bank transfer / LC: where to send the money, quoting the reference. */
  instructions: z.array(z.string()).nullable(),
  /** Card: confirm with Stripe.js. */
  stripe: z.object({ clientSecret: z.string(), publishableKey: z.string() }).nullable(),
});
export type PaymentStart = z.infer<typeof PaymentStartSchema>;

export const BuyerPaymentSchema = z.strictObject({
  id: z.uuid(),
  reference: z.string(),
  purpose: z.enum(['DEPOSIT', 'BALANCE', 'REFUND']),
  method: PaymentMethodSchema,
  amountMinor: z.number().int(),
  status: PaymentStatusSchema,
  createdAt: z.iso.datetime(),
  paidAt: z.iso.datetime().nullable(),
});

/** What the buyer owes and has paid, in GarmentGate's prices. Strict: no factory amounts. */
export const BuyerPaymentsSchema = z.strictObject({
  currency: CurrencySchema,
  totalMinor: z.number().int(),
  paidMinor: z.number().int(),
  refundedMinor: z.number().int(),
  outstandingMinor: z.number().int(),
  plan: z.array(
    z.strictObject({
      purpose: BuyerPaymentPurposeSchema,
      amountMinor: z.number().int(),
      status: z.enum(['NOT_DUE', 'DUE', 'PROCESSING', 'PAID']),
      paymentId: z.uuid().nullable(),
    }),
  ),
  payments: z.array(BuyerPaymentSchema),
  methods: z.array(PaymentMethodSchema),
  instructions: z.array(z.string()).nullable(),
});
export type BuyerPayments = z.infer<typeof BuyerPaymentsSchema>;

// ── Manufacturer ────────────────────────────────────────────────────────────

const ReleaseView = z.strictObject({
  id: z.uuid(),
  trigger: ReleaseTriggerSchema,
  bps: z.number().int(),
  /** The factory's share only. */
  amountMinor: z.number().int(),
  status: ReleaseStatusSchema,
  dueAt: z.iso.datetime().nullable(),
  releasedAt: z.iso.datetime().nullable(),
  paidAt: z.iso.datetime().nullable(),
});

/** The factory's money for an order, in its own prices. Strict: no buyer amounts or margin. */
export const ManufacturerPayoutsSchema = z.strictObject({
  orderCode: z.string(),
  currency: CurrencySchema,
  /** At the factory's own prices. */
  totalMinor: z.number().int(),
  /** GarmentGate's commission, withheld from the payouts (set when the order is confirmed). */
  commissionBps: z.number().int(),
  commissionMinor: z.number().int(),
  /** What the factory receives: total less commission. */
  netMinor: z.number().int(),
  releasedMinor: z.number().int(),
  paidMinor: z.number().int(),
  schedule: z.array(ReleaseView),
  payouts: z.array(
    z.strictObject({
      reference: z.string(),
      amountMinor: z.number().int(),
      currency: CurrencySchema,
      /** When paid in another currency: what arrived, at the stored rate. */
      settlementCurrency: CurrencySchema.nullable(),
      settlementAmountMinor: z.number().int().nullable(),
      paidAt: z.iso.datetime().nullable(),
    }),
  ),
});
export type ManufacturerPayouts = z.infer<typeof ManufacturerPayoutsSchema>;

// ── Admin ───────────────────────────────────────────────────────────────────

export const ConfirmPaymentSchema = z.object({
  /** Bank statement, SWIFT copy or LC document (uploaded first). */
  proofFileId: z.uuid({ error: 'Upload the proof of payment' }),
  bankReference: z.string().trim().min(3).max(80),
});
export type ConfirmPaymentDto = z.infer<typeof ConfirmPaymentSchema>;

export const RejectPaymentSchema = z.object({ reason: z.string().trim().min(3).max(300) });
export type RejectPaymentDto = z.infer<typeof RejectPaymentSchema>;

export const PayoutSchema = z.object({
  bankReference: z.string().trim().min(3).max(80),
  /** Pay the factory in another currency (converted at today's stored rate). */
  settlementCurrency: CurrencySchema.optional(),
});
export type PayoutDto = z.infer<typeof PayoutSchema>;

export const RefundSchema = z.object({
  amountMinor: z.coerce.number().int().min(1),
  reason: z.string().trim().min(3).max(300),
});
export type RefundDto = z.infer<typeof RefundSchema>;

export const PresignProofSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(10 * 1024 * 1024),
});
export type PresignProofDto = z.infer<typeof PresignProofSchema>;

const Party = z.object({ code: z.string(), name: z.string() });

export const LedgerEntryViewSchema = z.object({
  account: z.string(),
  direction: z.enum(['DEBIT', 'CREDIT']),
  amountMinor: z.number().int(),
});

export const LedgerTransactionViewSchema = z.object({
  id: z.uuid(),
  kind: z.string(),
  description: z.string(),
  currency: CurrencySchema,
  postedAt: z.iso.datetime(),
  unitsPerUsd: z.string(),
  amountUsdMinor: z.number().int(),
  entries: z.array(LedgerEntryViewSchema),
});

/** An order's full money position: staff only (it shows the margin). */
export const OrderFinanceSchema = z.object({
  orderCode: z.string(),
  status: z.string(),
  currency: CurrencySchema,
  buyer: Party,
  manufacturer: Party,
  buyerTotalMinor: z.number().int(),
  manufacturerTotalMinor: z.number().int(),
  /** Platform revenue on the order: markup + factory commission. */
  marginMinor: z.number().int(),
  /** Buyer price over factory price. */
  markupMinor: z.number().int(),
  /** Withheld from the factory's payouts. */
  factoryCommissionMinor: z.number().int(),
  factoryCommissionBps: z.number().int(),
  repeatOrder: z.boolean(),
  receivedMinor: z.number().int(),
  escrowMinor: z.number().int(),
  releasedMinor: z.number().int(),
  commissionMinor: z.number().int(),
  payableMinor: z.number().int(),
  paidOutMinor: z.number().int(),
  refundedMinor: z.number().int(),
  payments: z.array(
    z.object({
      id: z.uuid(),
      reference: z.string(),
      direction: z.enum(['INBOUND', 'OUTBOUND']),
      purpose: z.string(),
      method: PaymentMethodSchema,
      provider: z.string(),
      amountMinor: z.number().int(),
      currency: CurrencySchema,
      status: PaymentStatusSchema,
      paidAt: z.iso.datetime().nullable(),
      proofUrl: z.url().nullable(),
    }),
  ),
  releases: z.array(
    ReleaseView.extend({
      buyerMinor: z.number().int(),
      commissionMinor: z.number().int(),
      fundedEnough: z.boolean(),
    }).strip(),
  ),
  ledger: z.array(LedgerTransactionViewSchema),
});
export type OrderFinance = z.infer<typeof OrderFinanceSchema>;

export const FinanceInboxSchema = z.object({
  toConfirm: z.array(
    z.object({
      paymentId: z.uuid(),
      orderCode: z.string(),
      reference: z.string(),
      purpose: z.string(),
      method: PaymentMethodSchema,
      amountMinor: z.number().int(),
      currency: CurrencySchema,
      status: PaymentStatusSchema,
      buyer: Party,
      payerReference: z.string().nullable(),
      createdAt: z.iso.datetime(),
    }),
  ),
  toRelease: z.array(
    z.object({
      releaseId: z.uuid(),
      orderCode: z.string(),
      trigger: ReleaseTriggerSchema,
      manufacturerMinor: z.number().int(),
      buyerMinor: z.number().int(),
      currency: CurrencySchema,
      manufacturer: Party,
      fundedEnough: z.boolean(),
      dueAt: z.iso.datetime().nullable(),
    }),
  ),
  toPay: z.array(
    z.object({
      releaseId: z.uuid(),
      orderCode: z.string(),
      manufacturerMinor: z.number().int(),
      currency: CurrencySchema,
      manufacturer: Party,
      releasedAt: z.iso.datetime().nullable(),
    }),
  ),
});
export type FinanceInbox = z.infer<typeof FinanceInboxSchema>;

/** Trial balance and reconciliation, per currency. */
export const LedgerBalancesSchema = z.object({
  currencies: z.array(
    z.object({
      currency: CurrencySchema,
      debitsMinor: z.number().int(),
      creditsMinor: z.number().int(),
      balanced: z.boolean(),
      cashMinor: z.number().int(),
      escrowMinor: z.number().int(),
      payableMinor: z.number().int(),
      revenueMinor: z.number().int(),
      /** cash = escrow + payable + revenue */
      reconciled: z.boolean(),
      /** Ledger cash vs. succeeded payments in minus out. */
      paymentsNetMinor: z.number().int(),
      cashMatchesPayments: z.boolean(),
    }),
  ),
  accounts: z.array(
    z.object({
      type: z.string(),
      currency: CurrencySchema,
      party: Party.nullable(),
      balanceMinor: z.number().int(),
    }),
  ),
  totalsUsdMinor: z.object({
    cash: z.number().int(),
    escrow: z.number().int(),
    payable: z.number().int(),
    revenue: z.number().int(),
  }),
  rates: FxRatesSchema,
});
export type LedgerBalances = z.infer<typeof LedgerBalancesSchema>;
