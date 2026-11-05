import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { ShipmentReferenceSchema } from './references.js';
import { LogisticsClaimStatusSchema, type LogisticsClaimStatus } from '../status/statuses.js';

/**
 * Logistics claims: loss, damage, shortage or delay while an order is in GarmentGate's care.
 * Staff open one (often from the buyer's dispute), submit it to the cargo insurer and settle:
 * compensation to the buyer, recovery from the insurer (never above the insured value, 110% of
 * CIF) and a chargeback to the liable partner (never above that leg's cost).
 */

export const LogisticsClaimTypeSchema = z.enum(['LOSS', 'DAMAGE', 'SHORTAGE', 'DELAY']);
export type LogisticsClaimType = z.infer<typeof LogisticsClaimTypeSchema>;

const CLAIM_MOVES: Record<LogisticsClaimStatus, readonly LogisticsClaimStatus[]> = {
  OPEN: ['SUBMITTED', 'SETTLED', 'REJECTED'],
  SUBMITTED: ['SETTLED', 'REJECTED'],
  SETTLED: [],
  REJECTED: [],
};

export function canMoveClaim(from: LogisticsClaimStatus, to: LogisticsClaimStatus): boolean {
  return CLAIM_MOVES[from].includes(to);
}

export function isClaimOpen(status: LogisticsClaimStatus): boolean {
  return status === 'OPEN' || status === 'SUBMITTED';
}

const minor = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' ? undefined : v));

export const OpenClaimSchema = z.object({
  orderCode: z.string().regex(/^ORD-\d{4}-\d{5}$/, { error: 'Pick an order' }),
  type: LogisticsClaimTypeSchema,
  claimedMinor: minor.refine((v) => v > 0, { error: 'Enter what was lost' }),
  description: z
    .string()
    .trim()
    .min(10, { error: 'Say what happened (10 characters or more)' })
    .max(2000),
  /** What the buyer reads on their tracking card (filtered and scrubbed). */
  publicNote: optionalText(500),
  legId: z.uuid().optional(),
  disputeId: z.uuid().optional(),
});
export type OpenClaimInput = z.input<typeof OpenClaimSchema>;
export type OpenClaimDto = z.output<typeof OpenClaimSchema>;

export const SubmitClaimSchema = z.object({ insurerReference: ShipmentReferenceSchema });
export type SubmitClaimDto = z.infer<typeof SubmitClaimSchema>;

export const SettleClaimSchema = z
  .object({
    outcome: z.enum(['SETTLED', 'REJECTED']),
    compensationMinor: minor,
    insurerRecoveryMinor: minor,
    partnerChargebackMinor: minor,
    resolution: z.string().trim().min(3, { error: 'Say how it was settled' }).max(1000),
    publicNote: optionalText(500),
  })
  .refine(
    (v) =>
      v.outcome === 'SETTLED' ||
      v.compensationMinor + v.insurerRecoveryMinor + v.partnerChargebackMinor === 0,
    { error: 'A rejected claim moves no money', path: ['outcome'] },
  );
export type SettleClaimInput = z.input<typeof SettleClaimSchema>;
export type SettleClaimDto = z.output<typeof SettleClaimSchema>;

/** Why a settlement isn't allowed, or null. Mirrors the DB check on logistics_claims. */
export function settlementError(
  claim: { claimedMinor: bigint; insuredValueMinor: bigint; legCostMinor: bigint | null },
  dto: Pick<
    SettleClaimDto,
    'compensationMinor' | 'insurerRecoveryMinor' | 'partnerChargebackMinor'
  >,
): string | null {
  if (BigInt(dto.compensationMinor) > claim.claimedMinor)
    return 'Compensation can’t exceed what was claimed';
  if (BigInt(dto.insurerRecoveryMinor) > claim.insuredValueMinor)
    return claim.insuredValueMinor === 0n
      ? 'This order wasn’t insured'
      : 'The insurer can’t pay more than the insured value';
  if (dto.partnerChargebackMinor > 0) {
    if (claim.legCostMinor === null) return 'Pick the leg (and its partner) to charge back';
    if (BigInt(dto.partnerChargebackMinor) > claim.legCostMinor)
      return 'A chargeback can’t exceed what the leg cost';
  }
  return null;
}

/** What a claim cost GarmentGate: compensation less what it recovered (negative = net gain). */
export function claimNetMinor(c: {
  compensationMinor: bigint;
  insurerRecoveryMinor: bigint;
  partnerChargebackMinor: bigint;
}): bigint {
  return c.compensationMinor - c.insurerRecoveryMinor - c.partnerChargebackMinor;
}

// ── Views ───────────────────────────────────────────────────────────────────

export const AdminLogisticsClaimSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  type: LogisticsClaimTypeSchema,
  status: LogisticsClaimStatusSchema,
  orderCode: z.string(),
  shipmentCode: z.string(),
  buyerCode: z.string(),
  disputeId: z.uuid().nullable(),
  leg: z
    .object({
      id: z.uuid(),
      sequence: z.number().int(),
      partnerName: z.string().nullable(),
      costMinor: z.number().int().nullable(),
    })
    .nullable(),
  description: z.string(),
  publicNote: z.string().nullable(),
  currency: CurrencySchema,
  claimedMinor: z.number().int(),
  insuredValueMinor: z.number().int(),
  insurerReference: z.string().nullable(),
  compensationMinor: z.number().int(),
  insurerRecoveryMinor: z.number().int(),
  partnerChargebackMinor: z.number().int(),
  netMinor: z.number().int(),
  resolution: z.string().nullable(),
  createdAt: z.iso.datetime(),
  settledAt: z.iso.datetime().nullable(),
});
export type AdminLogisticsClaim = z.infer<typeof AdminLogisticsClaimSchema>;

/** The buyer's view on the tracking card. Strict: no partner, insurer or recovery amounts. */
export const BuyerClaimSchema = z.strictObject({
  code: z.string(),
  type: LogisticsClaimTypeSchema,
  status: LogisticsClaimStatusSchema,
  note: z.string().nullable(),
  /** Paid to the buyer once settled. */
  compensationMinor: z.number().int().nullable(),
  currency: CurrencySchema,
  createdAt: z.iso.datetime(),
});
export type BuyerClaim = z.infer<typeof BuyerClaimSchema>;

/** The partner's view of a claim on its leg. Strict: no buyer, compensation or insurer. */
export const PartnerClaimSchema = z.strictObject({
  code: z.string(),
  type: LogisticsClaimTypeSchema,
  status: LogisticsClaimStatusSchema,
  /** Deducted from what GarmentGate owes the partner. */
  chargebackMinor: z.number().int(),
});
export type PartnerClaim = z.infer<typeof PartnerClaimSchema>;
