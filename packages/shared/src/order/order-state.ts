import type { OrderStatus } from '../status/statuses.js';

/** Who can move an order. Staff can do everything the parties can, plus the money and QC steps. */
export type OrderActor = 'BUYER' | 'MANUFACTURER' | 'ADMIN';

/** The happy path, in order. CANCELLED and DISPUTED branch off it. */
export const ORDER_FLOW = [
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
] as const satisfies readonly OrderStatus[];

const A = 'ADMIN' as const;
const B = 'BUYER' as const;
const M = 'MANUFACTURER' as const;

/**
 * Every allowed transition and who may make it. Anything not listed is refused.
 *
 * - Sampling is optional (DRAFT → DEPOSIT_PENDING, e.g. a reorder of an approved style).
 * - SAMPLE_APPROVED is reached by the buyer approving a sample, not by a bare status change.
 * - Money and quality are GarmentGate's: deposit received (→ IN_PRODUCTION) and QC results.
 * - QC can send an order back to production for rework (staff, or the buyer after a failed
 *   final inspection).
 * - Buyers can cancel until production starts; after that only staff can.
 * - Disputes are resolved by staff, back into the flow or to COMPLETED / CANCELLED.
 */
export const ORDER_TRANSITIONS: Readonly<
  Record<OrderStatus, Partial<Record<OrderStatus, readonly OrderActor[]>>>
> = {
  DRAFT: { SAMPLING: [B, A], DEPOSIT_PENDING: [B, A], CANCELLED: [B, A] },
  SAMPLING: { SAMPLE_APPROVED: [B, A], CANCELLED: [B, A], DISPUTED: [B, A] },
  SAMPLE_APPROVED: { DEPOSIT_PENDING: [B, A], SAMPLING: [B, A], CANCELLED: [B, A] },
  DEPOSIT_PENDING: { IN_PRODUCTION: [A], CANCELLED: [B, A] },
  IN_PRODUCTION: { QC: [M, A], DISPUTED: [B, A], CANCELLED: [A] },
  // The buyer may send it back for rework after a failed final inspection (checked by QC).
  QC: { READY_TO_SHIP: [A], IN_PRODUCTION: [B, A], DISPUTED: [B, A] },
  // Shipping happens when GarmentGate's shipment leaves the hub (run as staff, never offered).
  READY_TO_SHIP: { SHIPPED: [A], DISPUTED: [B, A] },
  SHIPPED: { DELIVERED: [B, A], DISPUTED: [B, A] },
  DELIVERED: { COMPLETED: [B, A], DISPUTED: [B, A] },
  COMPLETED: {},
  CANCELLED: {},
  DISPUTED: {
    IN_PRODUCTION: [A],
    QC: [A],
    READY_TO_SHIP: [A],
    SHIPPED: [A],
    DELIVERED: [A],
    COMPLETED: [A],
    CANCELLED: [A],
  },
};

export function canTransition(from: OrderStatus, to: OrderStatus, actor: OrderActor): boolean {
  return ORDER_TRANSITIONS[from][to]?.includes(actor) ?? false;
}

/** Moves that only happen on their own: an order ships when its GarmentGate shipment departs. */
const BY_DEPARTURE: Partial<Record<OrderStatus, OrderStatus>> = { READY_TO_SHIP: 'SHIPPED' };

/** The statuses this actor can move the order to from here (what the UI offers). */
export function allowedTransitions(from: OrderStatus, actor: OrderActor): OrderStatus[] {
  return (Object.entries(ORDER_TRANSITIONS[from]) as [OrderStatus, readonly OrderActor[]][])
    .filter(([to, actors]) => actors.includes(actor) && BY_DEPARTURE[from] !== to)
    .map(([to]) => to);
}

export function isTerminal(status: OrderStatus): boolean {
  return Object.keys(ORDER_TRANSITIONS[status]).length === 0;
}

/** 0–100 through the happy path (CANCELLED/DISPUTED report where the order stood). */
export function flowProgress(status: OrderStatus): number {
  const index = (ORDER_FLOW as readonly OrderStatus[]).indexOf(status);
  return index < 0 ? 0 : Math.round((index / (ORDER_FLOW.length - 1)) * 100);
}

/** What has to happen next, and whose move it is. Drives the highlighted "next action". */
export type NextStep =
  | 'CHOOSE_SAMPLING'
  | 'FACTORY_SHIPS_SAMPLE'
  | 'REVIEW_SAMPLE'
  | 'CONFIRM_ORDER'
  | 'PAY_DEPOSIT'
  | 'PRODUCTION'
  | 'INSPECTION'
  | 'QC_FAILED'
  | 'CHOOSE_SHIPPING'
  | 'PAY_BALANCE'
  | 'SHIP'
  | 'IN_TRANSIT'
  | 'CONFIRM_COMPLETION'
  | 'RESOLVE_DISPUTE'
  | 'DONE'
  | 'CANCELLED';

export interface NextStepInfo {
  step: NextStep;
  /** Whose move it is; null when nobody needs to act. */
  owner: OrderActor | null;
}

/** What else decides the next step besides the status. */
export interface NextStepContext {
  latestSample?: { status: string } | null;
  /** Result of the latest final (pre-shipment) inspection. */
  finalInspection?: 'PENDING' | 'PASS' | 'FAIL' | 'ON_HOLD' | null;
  balancePaid?: boolean;
  /** The buyer chose how it ships (GarmentGate freight or its own forwarder). */
  shippingChosen?: boolean;
}

export function nextStep(status: OrderStatus, context: NextStepContext = {}): NextStepInfo {
  const latestSample = context.latestSample ?? null;
  switch (status) {
    case 'DRAFT':
      return { step: 'CHOOSE_SAMPLING', owner: 'BUYER' };
    case 'SAMPLING':
      return latestSample?.status === 'SHIPPED' || latestSample?.status === 'RECEIVED'
        ? { step: 'REVIEW_SAMPLE', owner: 'BUYER' }
        : { step: 'FACTORY_SHIPS_SAMPLE', owner: 'MANUFACTURER' };
    case 'SAMPLE_APPROVED':
      return { step: 'CONFIRM_ORDER', owner: 'BUYER' };
    case 'DEPOSIT_PENDING':
      return { step: 'PAY_DEPOSIT', owner: 'BUYER' };
    case 'IN_PRODUCTION':
      return { step: 'PRODUCTION', owner: 'MANUFACTURER' };
    case 'QC':
      // A failed final inspection: the buyer decides between rework and a dispute.
      return context.finalInspection === 'FAIL'
        ? { step: 'QC_FAILED', owner: 'BUYER' }
        : { step: 'INSPECTION', owner: 'ADMIN' };
    case 'READY_TO_SHIP':
      // The factory can't book the pickup to GarmentGate's hub until the buyer has chosen.
      if (context.shippingChosen === false) return { step: 'CHOOSE_SHIPPING', owner: 'BUYER' };
      return context.balancePaid === false
        ? { step: 'PAY_BALANCE', owner: 'BUYER' }
        : { step: 'SHIP', owner: 'MANUFACTURER' };
    case 'SHIPPED':
      return { step: 'IN_TRANSIT', owner: 'BUYER' };
    case 'DELIVERED':
      return { step: 'CONFIRM_COMPLETION', owner: 'BUYER' };
    case 'DISPUTED':
      return { step: 'RESOLVE_DISPUTE', owner: 'ADMIN' };
    case 'COMPLETED':
      return { step: 'DONE', owner: null };
    case 'CANCELLED':
      return { step: 'CANCELLED', owner: null };
  }
}
