import { z } from 'zod';

/**
 * Factory plans (business model: "factory subscriptions, Free / Pro / Premium"). A plan buys
 * reach, never identity: more listed products, a boost in buyers' search, a smaller GarmentGate
 * markup on top of the factory's price (so its offers land cheaper) and, on Premium, a head
 * start on new open RFQs. Paid by card through Stripe subscriptions, or granted by staff
 * (bank transfer, promotions). Prices only apply to new subscriptions.
 */

export const PlanTierSchema = z.enum(['FREE', 'PRO', 'PREMIUM']);
export type PlanTier = z.infer<typeof PlanTierSchema>;
export const PAID_TIERS = ['PRO', 'PREMIUM'] as const satisfies readonly PlanTier[];
export const PaidTierSchema = z.enum(PAID_TIERS);
export type PaidTier = z.infer<typeof PaidTierSchema>;

export const PlanIntervalSchema = z.enum(['MONTH', 'YEAR']);
export type PlanInterval = z.infer<typeof PlanIntervalSchema>;

export const PlanTermsSchema = z.object({
  monthlyUsdMinor: z.number().int().min(0).max(10_000_000),
  yearlyUsdMinor: z.number().int().min(0).max(100_000_000),
  /** Listed (published or in review) products; null = unlimited. Drafts never count. */
  maxProducts: z.number().int().min(0).max(100_000).nullable(),
  /** Search ranking boost (0–10): a tie-breaker after relevance and the buyer's sort. */
  searchBoost: z.number().int().min(0).max(10),
  /** Taken off GarmentGate's markup on catalog prices and quotes (never below the per-unit floor). */
  markupDiscountBps: z.number().int().min(0).max(5_000),
  /** Sees new open RFQs at once; the others wait for the head start. */
  rfqHeadStart: z.boolean(),
});
export type PlanTerms = z.infer<typeof PlanTermsSchema>;

export const PlanSettingsSchema = z.object({
  tiers: z.object({ FREE: PlanTermsSchema, PRO: PlanTermsSchema, PREMIUM: PlanTermsSchema }),
  /** How long factories without a head start wait for a new open RFQ. */
  rfqHeadStartHours: z.number().int().min(0).max(168),
});
export type PlanSettings = z.infer<typeof PlanSettingsSchema>;

export const DEFAULT_PLAN_SETTINGS: PlanSettings = {
  tiers: {
    FREE: {
      monthlyUsdMinor: 0,
      yearlyUsdMinor: 0,
      maxProducts: 10,
      searchBoost: 0,
      markupDiscountBps: 0,
      rfqHeadStart: false,
    },
    PRO: {
      monthlyUsdMinor: 9_900,
      yearlyUsdMinor: 99_000,
      maxProducts: 50,
      searchBoost: 1,
      markupDiscountBps: 100,
      rfqHeadStart: false,
    },
    PREMIUM: {
      monthlyUsdMinor: 24_900,
      yearlyUsdMinor: 249_000,
      maxProducts: null,
      searchBoost: 2,
      markupDiscountBps: 200,
      rfqHeadStart: true,
    },
  },
  rfqHeadStartHours: 24,
};

export function priceOf(terms: PlanTerms, interval: PlanInterval): number {
  return interval === 'YEAR' ? terms.yearlyUsdMinor : terms.monthlyUsdMinor;
}

/** May a factory list one more product on these terms? */
export function canListAnother(listed: number, terms: Pick<PlanTerms, 'maxProducts'>): boolean {
  return terms.maxProducts === null || listed < terms.maxProducts;
}

/**
 * When an open RFQ becomes visible to a factory without a head start: after the head start,
 * but never later than halfway to the quote deadline (buyers still get their quotes).
 */
export function headStartEnds(publishedAt: Date, deadline: Date, hours: number): Date {
  const half = Math.max(0, (deadline.getTime() - publishedAt.getTime()) / 2);
  return new Date(publishedAt.getTime() + Math.min(hours * 3_600_000, half));
}

export const SubscriptionStatusSchema = z.enum(['INCOMPLETE', 'ACTIVE', 'PAST_DUE', 'CANCELED']);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;
export const SubscriptionSourceSchema = z.enum(['STRIPE', 'MANUAL']);

/** Grace after a missed renewal before the plan falls back to Free. */
export const PAST_DUE_GRACE_DAYS = 7;

/** The tier a subscription grants right now (or null). Pure, so the rules are unit tested. */
export function grantedTier(
  s: {
    tier: PaidTier;
    status: SubscriptionStatus;
    currentPeriodEnd: Date | null;
  },
  now: Date,
): PaidTier | null {
  if (s.status !== 'ACTIVE' && s.status !== 'PAST_DUE') return null;
  if (s.currentPeriodEnd === null) return s.tier; // a staff grant without an end
  const grace = s.status === 'PAST_DUE' ? PAST_DUE_GRACE_DAYS * 86_400_000 : 86_400_000;
  return s.currentPeriodEnd.getTime() + grace > now.getTime() ? s.tier : null;
}

// ── Requests ────────────────────────────────────────────────────────────────

export const PlanCheckoutSchema = z.object({ tier: PaidTierSchema, interval: PlanIntervalSchema });
export type PlanCheckoutDto = z.infer<typeof PlanCheckoutSchema>;

export const GrantPlanSchema = z
  .object({
    tier: PlanTierSchema,
    /** Last day of the grant (inclusive); empty = until staff end it. */
    endsOn: z.iso
      .date()
      .optional()
      .or(z.literal('').transform(() => undefined)),
    /** Paid by bank transfer: the amount received and its reference (books it as revenue). */
    paidUsdMinor: z.number().int().min(0).max(100_000_000).optional(),
    bankReference: z
      .string()
      .trim()
      .max(80)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
    note: z.string().trim().min(3, { error: 'Say why' }).max(500),
  })
  .refine((v) => !v.paidUsdMinor || !!v.bankReference, {
    error: 'Add the transfer reference',
    path: ['bankReference'],
  });
export type GrantPlanInput = z.input<typeof GrantPlanSchema>;
export type GrantPlanDto = z.output<typeof GrantPlanSchema>;

// ── Views ───────────────────────────────────────────────────────────────────

const subscriptionView = {
  tier: PaidTierSchema,
  interval: PlanIntervalSchema.nullable(),
  source: SubscriptionSourceSchema,
  status: SubscriptionStatusSchema,
  currentPeriodEnd: z.iso.datetime().nullable(),
  cancelAtPeriodEnd: z.boolean(),
};

/** The factory's own plan page. Factory-only: nothing about buyers. */
export const FactoryPlanSchema = z.strictObject({
  tier: PlanTierSchema,
  terms: PlanSettingsSchema.shape.tiers,
  rfqHeadStartHours: z.number().int(),
  subscription: z.strictObject(subscriptionView).nullable(),
  listedProducts: z.number().int(),
  invoices: z.array(
    z.strictObject({
      id: z.string(),
      amountMinor: z.number().int(),
      currency: z.string(),
      paidAt: z.iso.datetime(),
      periodEnd: z.iso.datetime().nullable(),
    }),
  ),
  /** Card checkout is on (Stripe configured). Otherwise factories ask staff (bank transfer). */
  cardEnabled: z.boolean(),
});
export type FactoryPlan = z.infer<typeof FactoryPlanSchema>;

/** Any plan, factory or buyer, for staff. */
export const SubscriptionPlanSchema = z.enum(['PRO', 'PREMIUM', 'PLUS']);
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;

export const AdminSubscriptionSchema = z.object({
  id: z.uuid(),
  account: z.object({
    kind: z.enum(['FACTORY', 'BUYER']),
    code: z.string(),
    name: z.string(),
    country: z.string(),
  }),
  tier: SubscriptionPlanSchema,
  interval: PlanIntervalSchema.nullable(),
  source: SubscriptionSourceSchema,
  status: SubscriptionStatusSchema,
  currentPeriodEnd: z.iso.datetime().nullable(),
  cancelAtPeriodEnd: z.boolean(),
  amountUsdMinor: z.number().int(),
  paidUsdMinor: z.number().int(),
  note: z.string().nullable(),
  stripeSubscriptionId: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type AdminSubscription = z.infer<typeof AdminSubscriptionSchema>;

export const AdminPlansSchema = z.object({
  counts: z.object({
    FREE: z.number().int(),
    PRO: z.number().int(),
    PREMIUM: z.number().int(),
    /** Buyers with GarmentGate Plus. */
    PLUS: z.number().int(),
  }),
  /** Recurring revenue, monthly equivalent of live paid subscriptions (USD minor units). */
  mrrUsdMinor: z.number().int(),
  subscriptions: z.array(AdminSubscriptionSchema),
});
export type AdminPlans = z.infer<typeof AdminPlansSchema>;
