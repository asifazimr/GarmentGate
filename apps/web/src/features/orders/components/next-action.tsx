'use client';

import {
  nextStep,
  type OrderInspection,
  type OrderSample,
  type OrderStatus,
} from '@garmentgate/shared';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ClipboardX,
  CreditCard,
  Factory,
  PackageCheck,
  RotateCcw,
  Scale,
  Shirt,
  Truck,
  XCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { OrderRole } from '../api';

const ICONS = {
  CHOOSE_SAMPLING: Shirt,
  FACTORY_SHIPS_SAMPLE: Factory,
  REVIEW_SAMPLE: ClipboardCheck,
  CONFIRM_ORDER: CheckCircle2,
  PAY_DEPOSIT: CreditCard,
  PRODUCTION: Factory,
  INSPECTION: ClipboardCheck,
  QC_FAILED: ClipboardX,
  CHOOSE_SHIPPING: Truck,
  PAY_BALANCE: CreditCard,
  SHIP: Truck,
  IN_TRANSIT: Truck,
  CONFIRM_COMPLETION: PackageCheck,
  RESOLVE_DISPUTE: Scale,
  DONE: RotateCcw,
  CANCELLED: XCircle,
} as const;

/**
 * The one thing that should happen next, worded for whoever is looking: highlighted when it's
 * their move, calm when they're waiting on someone else.
 */
export function NextAction({
  role,
  status,
  latestSample,
  inspections = [],
  balancePaid,
  shippingChosen,
  values,
  children,
}: {
  role: OrderRole;
  status: OrderStatus;
  latestSample: OrderSample | null;
  inspections?: Pick<OrderInspection, 'type' | 'result'>[];
  balancePaid?: boolean;
  /** Whether the buyer chose how it ships (unknown: leave undefined). */
  shippingChosen?: boolean;
  /** Values for the copy, e.g. the deposit amount or the stage in progress. */
  values?: Record<string, string>;
  /** Buttons for the action. */
  children?: ReactNode;
}) {
  const t = useTranslations('orders.next');
  const finalInspection =
    inspections.filter((i) => i.type === 'PRE_SHIPMENT').at(-1)?.result ?? null;
  const { step, owner } = nextStep(status, {
    latestSample,
    finalInspection,
    balancePaid,
    shippingChosen,
  });
  const yours = owner === role || (role === 'ADMIN' && owner !== null);
  const Icon = step === 'DONE' && role !== 'BUYER' ? CheckCircle2 : ICONS[step];
  const who =
    owner === role
      ? 'you'
      : owner === null
        ? 'none'
        : owner === 'BUYER'
          ? 'buyer'
          : owner === 'MANUFACTURER'
            ? 'manufacturer'
            : 'admin';

  return (
    <section
      aria-labelledby="next-action"
      className={cn(
        'flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center',
        yours ? 'border-primary/40 bg-primary-soft/50 ring-primary/10 ring-4' : 'bg-card',
      )}
    >
      <span
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-xl',
          yours ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 space-y-1">
        <p
          className={cn(
            'text-xs font-medium tracking-wide uppercase',
            yours ? 'text-primary-ink' : 'text-muted-foreground',
          )}
        >
          {yours ? (
            <span className="inline-flex items-center gap-1">
              {t('yourMove')}
              <ArrowRight className="size-3 rtl:rotate-180" aria-hidden="true" />
            </span>
          ) : (
            t(`waiting.${who}`)
          )}
        </p>
        <h2 id="next-action" className="text-lg font-semibold tracking-[-0.01em]">
          {t(`${role}.${step}.title`, values ?? {})}
        </h2>
        <p className="text-muted-foreground text-sm">{t(`${role}.${step}.body`, values ?? {})}</p>
      </div>
      {children ? <div className="flex shrink-0 flex-wrap gap-2">{children}</div> : null}
    </section>
  );
}
