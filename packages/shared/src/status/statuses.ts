import { z } from 'zod';
import { KycStatusSchema } from '../auth/auth.schema.js';

// Mirrors of the Prisma enums, so web and api share one vocabulary for every lifecycle.

export const OrderStatusSchema = z.enum([
  'DRAFT',
  'SAMPLING',
  'SAMPLE_APPROVED',
  'DEPOSIT_PENDING',
  'IN_PRODUCTION',
  'QC',
  'READY_TO_SHIP',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
  'DISPUTED',
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const RfqStatusSchema = z.enum(['DRAFT', 'OPEN', 'CLOSED', 'AWARDED', 'CANCELLED']);
export type RfqStatus = z.infer<typeof RfqStatusSchema>;

export const QuoteStatusSchema = z.enum([
  'SUBMITTED',
  'UNDER_REVIEW',
  'OFFERED',
  'ACCEPTED',
  'REJECTED',
  'WITHDRAWN',
  'EXPIRED',
]);
export type QuoteStatus = z.infer<typeof QuoteStatusSchema>;

export const PaymentStatusSchema = z.enum([
  'PENDING',
  'PROCESSING',
  'SUCCEEDED',
  'FAILED',
  'CANCELLED',
]);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const ShipmentStatusSchema = z.enum([
  'PENDING',
  'BOOKED',
  'IN_TRANSIT',
  'AT_PORT',
  'CUSTOMS',
  'DELIVERED',
  'EXCEPTION',
]);
export type ShipmentStatus = z.infer<typeof ShipmentStatusSchema>;

export const SampleStatusSchema = z.enum([
  'REQUESTED',
  'IN_PROGRESS',
  'SHIPPED',
  'RECEIVED',
  'APPROVED',
  'REJECTED',
]);
export type SampleStatus = z.infer<typeof SampleStatusSchema>;

export const InspectionResultSchema = z.enum(['PENDING', 'PASS', 'FAIL', 'ON_HOLD']);
export type InspectionResult = z.infer<typeof InspectionResultSchema>;

export const DisputeStatusSchema = z.enum([
  'OPEN',
  'UNDER_REVIEW',
  'RESOLVED_FOR_BUYER',
  'RESOLVED_FOR_MANUFACTURER',
  'SETTLED',
  'CLOSED',
]);
export type DisputeStatus = z.infer<typeof DisputeStatusSchema>;

export const MilestoneStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED']);
export type MilestoneStatus = z.infer<typeof MilestoneStatusSchema>;

export const ProductStatusDomainSchema = z.enum([
  'DRAFT',
  'PENDING_REVIEW',
  'PUBLISHED',
  'ARCHIVED',
]);
export const MediaReviewDomainSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);
export const CapacityBookingStatusSchema = z.enum([
  'HELD',
  'CONFIRMED',
  'IN_PRODUCTION',
  'COMPLETED',
  'CANCELLED',
  'EXPIRED',
]);
export type CapacityBookingStatus = z.infer<typeof CapacityBookingStatusSchema>;
export const CapacityPartnershipStatusSchema = z.enum([
  'REQUESTED',
  'ACTIVE',
  'DECLINED',
  'CANCELLED',
  'ENDED',
]);
export type CapacityPartnershipStatus = z.infer<typeof CapacityPartnershipStatusSchema>;

/** Every status-bearing domain, keyed by name, for StatusBadge and filters. */
export const STATUS_DOMAINS = {
  order: OrderStatusSchema,
  rfq: RfqStatusSchema,
  quote: QuoteStatusSchema,
  kyc: KycStatusSchema,
  payment: PaymentStatusSchema,
  shipment: ShipmentStatusSchema,
  sample: SampleStatusSchema,
  inspection: InspectionResultSchema,
  dispute: DisputeStatusSchema,
  milestone: MilestoneStatusSchema,
  product: ProductStatusDomainSchema,
  media: MediaReviewDomainSchema,
  booking: CapacityBookingStatusSchema,
  partnership: CapacityPartnershipStatusSchema,
} as const;
export type StatusDomain = keyof typeof STATUS_DOMAINS;
export type StatusOf<D extends StatusDomain> = z.infer<(typeof STATUS_DOMAINS)[D]>;

/** Visual tone of a status. Same meaning everywhere: one glance tells you where things stand. */
export type StatusTone = 'neutral' | 'info' | 'progress' | 'warning' | 'success' | 'danger';

export const STATUS_TONES: { [D in StatusDomain]: Record<StatusOf<D>, StatusTone> } = {
  order: {
    DRAFT: 'neutral',
    SAMPLING: 'progress',
    SAMPLE_APPROVED: 'info',
    DEPOSIT_PENDING: 'warning',
    IN_PRODUCTION: 'progress',
    QC: 'progress',
    READY_TO_SHIP: 'info',
    SHIPPED: 'info',
    DELIVERED: 'success',
    COMPLETED: 'success',
    CANCELLED: 'neutral',
    DISPUTED: 'danger',
  },
  rfq: {
    DRAFT: 'neutral',
    OPEN: 'info',
    CLOSED: 'neutral',
    AWARDED: 'success',
    CANCELLED: 'neutral',
  },
  quote: {
    SUBMITTED: 'info',
    UNDER_REVIEW: 'warning',
    OFFERED: 'progress',
    ACCEPTED: 'success',
    REJECTED: 'danger',
    WITHDRAWN: 'neutral',
    EXPIRED: 'neutral',
  },
  kyc: {
    NOT_SUBMITTED: 'neutral',
    PENDING_REVIEW: 'warning',
    VERIFIED: 'success',
    REJECTED: 'danger',
  },
  payment: {
    PENDING: 'warning',
    PROCESSING: 'info',
    SUCCEEDED: 'success',
    FAILED: 'danger',
    CANCELLED: 'neutral',
  },
  shipment: {
    PENDING: 'neutral',
    BOOKED: 'info',
    IN_TRANSIT: 'progress',
    AT_PORT: 'progress',
    CUSTOMS: 'warning',
    DELIVERED: 'success',
    EXCEPTION: 'danger',
  },
  sample: {
    REQUESTED: 'neutral',
    IN_PROGRESS: 'progress',
    SHIPPED: 'info',
    RECEIVED: 'info',
    APPROVED: 'success',
    REJECTED: 'danger',
  },
  inspection: {
    PENDING: 'neutral',
    PASS: 'success',
    FAIL: 'danger',
    ON_HOLD: 'warning',
  },
  dispute: {
    OPEN: 'danger',
    UNDER_REVIEW: 'warning',
    RESOLVED_FOR_BUYER: 'success',
    RESOLVED_FOR_MANUFACTURER: 'success',
    SETTLED: 'success',
    CLOSED: 'neutral',
  },
  milestone: {
    PENDING: 'neutral',
    IN_PROGRESS: 'progress',
    COMPLETED: 'success',
    DELAYED: 'warning',
  },
  product: {
    DRAFT: 'neutral',
    PENDING_REVIEW: 'warning',
    PUBLISHED: 'success',
    ARCHIVED: 'neutral',
  },
  media: {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'danger',
  },
  booking: {
    HELD: 'warning',
    CONFIRMED: 'info',
    IN_PRODUCTION: 'progress',
    COMPLETED: 'success',
    CANCELLED: 'neutral',
    EXPIRED: 'neutral',
  },
  partnership: {
    REQUESTED: 'warning',
    ACTIVE: 'success',
    DECLINED: 'danger',
    CANCELLED: 'neutral',
    ENDED: 'neutral',
  },
};

export function statusTone<D extends StatusDomain>(domain: D, status: StatusOf<D>): StatusTone {
  return STATUS_TONES[domain][status];
}
