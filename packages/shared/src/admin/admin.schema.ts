import { z } from 'zod';
import { KycStatusSchema } from '../auth/auth.schema.js';
import { RoleSchema } from '../auth/roles.js';
import { CertificationTypeSchema } from '../onboarding/onboarding.schema.js';
import { OrderStatusSchema } from '../status/statuses.js';

/** Staff only: everything here carries real identities and the platform's numbers. */

// ── Overview ────────────────────────────────────────────────────────────────

export const AdminOverviewQuerySchema = z.object({
  months: z.coerce.number().int().min(1).max(24).default(12),
});
export type AdminOverviewQuery = z.infer<typeof AdminOverviewQuerySchema>;

const usd = z.number().int();

export const OverviewMonthSchema = z.object({
  /** YYYY-MM, UTC */
  month: z.string().regex(/^\d{4}-\d{2}$/),
  gmvUsdMinor: usd,
  markupUsdMinor: usd,
  commissionUsdMinor: usd,
  orders: z.number().int(),
  rfqs: z.number().int(),
  rfqsConverted: z.number().int(),
});
export type OverviewMonth = z.infer<typeof OverviewMonthSchema>;

/**
 * Platform numbers over the last `months` months, in USD minor units at the stored rates. GMV
 * counts confirmed orders (by confirmation month), at the buyer price, cancelled ones excluded.
 * Revenue = markup (buyer price − factory price) + commission withheld from the factory.
 */
export const AdminOverviewSchema = z.object({
  from: z.iso.datetime(),
  kpis: z.object({
    gmvUsdMinor: usd,
    revenueUsdMinor: usd,
    markupUsdMinor: usd,
    commissionUsdMinor: usd,
    confirmedOrders: z.number().int(),
    activeOrders: z.number().int(),
    rfqs: z.number().int(),
    rfqsConverted: z.number().int(),
    /** RFQs that became an order, in basis points of RFQs published. */
    conversionBps: z.number().int(),
  }),
  series: z.array(OverviewMonthSchema),
  /** Currencies left out of the USD totals because they have no exchange rate yet. */
  skippedCurrencies: z.array(z.string()),
  ordersByStatus: z.array(z.object({ status: OrderStatusSchema, count: z.number().int() })),
  topCategories: z.array(
    /** null: orders without an RFQ category (e.g. old reorders). */
    z.object({ name: z.string().nullable(), gmvUsdMinor: usd, orders: z.number().int() }),
  ),
  /** Work waiting for staff, for the shortcuts on the dashboard. */
  queues: z.object({
    kyc: z.number().int(),
    certifications: z.number().int(),
    flaggedMessages: z.number().int(),
    paymentsToConfirm: z.number().int(),
    releasesDue: z.number().int(),
    openDisputes: z.number().int(),
  }),
});
export type AdminOverview = z.infer<typeof AdminOverviewSchema>;

// ── Users ───────────────────────────────────────────────────────────────────

export const UserStatusSchema = z.enum(['ACTIVE', 'SUSPENDED', 'DEACTIVATED']);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const AdminUserSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  name: z.string(),
  role: RoleSchema,
  status: UserStatusSchema,
  company: z
    .object({
      id: z.uuid(),
      name: z.string(),
      code: z.string().nullable(),
      type: z.enum(['BUYER', 'MANUFACTURER']),
      kycStatus: KycStatusSchema,
    })
    .nullable(),
  emailVerified: z.boolean(),
  lastLoginAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  /** Contact-filter hits in the last 30 days. */
  violations: z.number().int(),
  warnings: z.number().int(),
  suspendedReason: z.string().nullable(),
  suspendedAt: z.iso.datetime().nullable(),
});
export type AdminUser = z.infer<typeof AdminUserSchema>;

export const SuspendUserSchema = z.object({
  reason: z.string().trim().min(5, { error: 'Say why (at least 5 characters)' }).max(500),
});
export type SuspendUserDto = z.infer<typeof SuspendUserSchema>;

export const WarnUserSchema = z.object({
  note: z.string().trim().min(5, { error: 'Say why (at least 5 characters)' }).max(500),
  level: z.enum(['WARNING', 'FINAL_WARNING']).default('WARNING'),
});
export type WarnUserInput = z.input<typeof WarnUserSchema>;
export type WarnUserDto = z.output<typeof WarnUserSchema>;

// ── Audit log ───────────────────────────────────────────────────────────────

export const AuditQuerySchema = z.object({
  action: z.string().trim().max(80).optional(),
  entityType: z.string().trim().max(80).optional(),
  entityId: z.string().trim().max(80).optional(),
  actorId: z.uuid().optional(),
  from: z.iso.datetime().optional(),
  to: z.iso.datetime().optional(),
  limit: z.coerce.number().int().min(1).max(2000).default(500),
});
export type AuditQuery = z.infer<typeof AuditQuerySchema>;

export const AuditEntrySchema = z.object({
  id: z.uuid(),
  action: z.string(),
  entityType: z.string(),
  entityId: z.string().nullable(),
  actor: z
    .object({ id: z.uuid(), name: z.string(), email: z.string(), role: RoleSchema })
    .nullable(),
  metadata: z.unknown(),
  ip: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type AuditEntry = z.infer<typeof AuditEntrySchema>;

// ── Certifications ──────────────────────────────────────────────────────────

export const CertificationStatusSchema = z.enum(['PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED']);
export type CertificationStatus = z.infer<typeof CertificationStatusSchema>;

export const AdminCertificationsQuerySchema = z.object({
  status: CertificationStatusSchema.optional(),
});

export const AdminCertificationSchema = z.object({
  id: z.uuid(),
  type: CertificationTypeSchema,
  customName: z.string().nullable(),
  certificateNumber: z.string().nullable(),
  issuedAt: z.iso.datetime().nullable(),
  expiresAt: z.iso.datetime().nullable(),
  status: CertificationStatusSchema,
  rejectionReason: z.string().nullable(),
  verifiedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  manufacturer: z.object({
    companyId: z.uuid(),
    code: z.string(),
    name: z.string(),
    kycStatus: KycStatusSchema,
  }),
  /** 5-minute signed link to the uploaded certificate. */
  fileUrl: z.url().nullable(),
});
export type AdminCertification = z.infer<typeof AdminCertificationSchema>;

export const RejectCertificationSchema = z.object({
  reason: z.string().trim().min(5, { error: 'Say why (at least 5 characters)' }).max(500),
});
export type RejectCertificationDto = z.infer<typeof RejectCertificationSchema>;

// ── Orders ──────────────────────────────────────────────────────────────────

/**
 * Staff move an order outside the normal flow (fixing a mistake, a deal agreed offline). The
 * reason is required and goes to the audit log; disputes still open through their own flow.
 */
export const OverrideOrderStatusSchema = z.object({
  to: OrderStatusSchema.exclude(['DISPUTED']),
  reason: z
    .string()
    .trim()
    .min(10, { error: 'Explain the override (at least 10 characters)' })
    .max(500),
});
export type OverrideOrderStatusDto = z.infer<typeof OverrideOrderStatusSchema>;
