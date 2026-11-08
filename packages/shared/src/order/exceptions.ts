import { z } from 'zod';
import { OrderStatusSchema } from '../status/statuses.js';
import type { OrderStatus } from '../status/statuses.js';

/**
 * The exception flow (business model: "If a stage fails — sample rejected, inspection failed,
 * delay over 7 days — the order goes to an exception flow: rework, factory replacement,
 * discount or refund from escrow").
 */

export const DELAY_ALERT_DAYS = 7;
const DAY = 86_400_000;

/** Orders still being made: a late plan means something. */
const IN_MAKING: readonly OrderStatus[] = ['IN_PRODUCTION', 'QC', 'READY_TO_SHIP'];

export interface LatenessInput {
  status: OrderStatus;
  requestedShipDate: Date | null;
  /** The goods reached GarmentGate's hub. */
  atHub: boolean;
  milestones: readonly { stage: string; status: string; plannedAt: Date | null }[];
}

export interface Lateness {
  daysLate: number;
  /** The production stage most behind plan, or SHIP_DATE when it's the ship date. */
  stage: string;
}

/**
 * How far an order runs behind its plan: the oldest unfinished production stage past its
 * planned date, or the requested ship date passing before the goods reach the hub.
 */
export function lateness(o: LatenessInput, now: Date): Lateness | null {
  if (!IN_MAKING.includes(o.status)) return null;
  let worst: Lateness | null = null;
  const consider = (stage: string, due: Date) => {
    const days = Math.floor((now.getTime() - due.getTime()) / DAY);
    if (days > 0 && (!worst || days > worst.daysLate)) worst = { daysLate: days, stage };
  };
  for (const m of o.milestones)
    if (m.status !== 'COMPLETED' && m.plannedAt) consider(m.stage, m.plannedAt);
  if (o.requestedShipDate && !o.atHub) consider('SHIP_DATE', o.requestedShipDate);
  return worst;
}

/** Alert when an order is a week or more late, at most once a week. */
export function needsDelayAlert(
  late: Lateness | null,
  lastAlertedAt: Date | null,
  now: Date,
): boolean {
  if (!late || late.daysLate < DELAY_ALERT_DAYS) return false;
  return !lastAlertedAt || now.getTime() - lastAlertedAt.getTime() >= DELAY_ALERT_DAYS * DAY;
}

export const ExceptionKindSchema = z.enum(['DELAY', 'INSPECTION_FAILED', 'SAMPLE_REJECTED']);
export type ExceptionKind = z.infer<typeof ExceptionKindSchema>;

export const OrderExceptionSchema = z.object({
  orderCode: z.string(),
  status: OrderStatusSchema,
  currency: z.string(),
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  kind: ExceptionKindSchema,
  /** DELAY: days behind and the stage (or SHIP_DATE). */
  daysLate: z.number().int().nullable(),
  stage: z.string().nullable(),
  since: z.iso.datetime().nullable(),
  delayAlertedAt: z.iso.datetime().nullable(),
  factoryChanges: z.number().int(),
});
export type OrderException = z.infer<typeof OrderExceptionSchema>;

/** Orders that can still move to another factory: not yet at GarmentGate's hub. */
export const REPLACEABLE_STATUSES: readonly OrderStatus[] = [
  'DRAFT',
  'SAMPLING',
  'SAMPLE_APPROVED',
  'DEPOSIT_PENDING',
  'IN_PRODUCTION',
  'QC',
  'READY_TO_SHIP',
];

export const ReplaceFactorySchema = z.object({
  manufacturerCode: z.string().regex(/^MFR-[A-Z]{2}-\d{4}$/, { error: 'Enter a factory code' }),
  /** The new factory's price per piece (minor units, the order's currency). */
  manufacturerUnitPriceMinor: z.number().int().positive({ error: 'Enter the new factory price' }),
  reason: z.string().trim().min(10, { error: 'Say why (10 characters or more)' }).max(1000),
});
export type ReplaceFactoryInput = z.input<typeof ReplaceFactorySchema>;
export type ReplaceFactoryDto = z.output<typeof ReplaceFactorySchema>;
