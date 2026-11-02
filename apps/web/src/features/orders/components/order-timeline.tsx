'use client';

import {
  type OrderEvent,
  type OrderMedia,
  type OrderMilestone,
  type OrderSample,
  type OrderStatus,
  PRODUCTION_STAGES,
  type ProductionStage,
} from '@garmentgate/shared';
import { Check, Clock, Play, TriangleAlert } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { type ReactNode, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface TimelineOrder {
  status: OrderStatus;
  createdAt: string;
  confirmedAt: string | null;
  completedAt: string | null;
  requestedShipDate: string | null;
  samples: OrderSample[];
  milestones: OrderMilestone[];
  events: OrderEvent[];
  inspections: { photos: OrderMedia[] }[];
  shipment: {
    carrier: string | null;
    trackingNumber: string | null;
    shippedAt: string | null;
    deliveredAt: string | null;
  } | null;
}

type PhaseState = 'done' | 'current' | 'upcoming' | 'skipped' | 'warning';
type PhaseKey =
  'placed' | 'sample' | 'deposit' | ProductionStage | 'qc' | 'shipping' | 'delivered' | 'completed';

interface Phase {
  key: PhaseKey;
  state: PhaseState;
  date: { kind: 'done' | 'expected' | 'since'; iso: string } | null;
  media: OrderMedia[];
  note: string | null;
}

const PHASES: PhaseKey[] = [
  'placed',
  'sample',
  'deposit',
  ...PRODUCTION_STAGES,
  'qc',
  'shipping',
  'delivered',
  'completed',
];

/** Where on the timeline a status sits (production resolves to its current stage). */
function phaseOf(status: OrderStatus, milestones: OrderMilestone[]): number {
  switch (status) {
    case 'DRAFT':
      return 0;
    case 'SAMPLING':
      return 1;
    case 'SAMPLE_APPROVED':
    case 'DEPOSIT_PENDING':
      return 2;
    case 'IN_PRODUCTION': {
      const i = PRODUCTION_STAGES.findIndex(
        (s) => milestones.find((m) => m.stage === s)?.status !== 'COMPLETED',
      );
      // Every stage done: the next step is inspection.
      return i < 0 ? 8 : 3 + i;
    }
    case 'QC':
      return 8;
    case 'READY_TO_SHIP':
    case 'SHIPPED':
      return 9;
    case 'DELIVERED':
      return 10;
    case 'COMPLETED':
      return 12;
    default:
      return 0;
  }
}

/** Builds the phases: done before the current one, the current one highlighted, the rest ahead. */
export function buildPhases(order: TimelineOrder): {
  phases: Phase[];
  stopped: 'CANCELLED' | 'DISPUTED' | null;
} {
  const stopped = order.status === 'CANCELLED' || order.status === 'DISPUTED' ? order.status : null;
  // A stopped order is shown where it stood when it stopped.
  const stoppedFrom = stopped
    ? ([...order.events].reverse().find((e) => e.to === stopped)?.from ?? 'DRAFT')
    : order.status;
  const current = phaseOf(stoppedFrom, order.milestones);
  const reached = (to: OrderStatus) => order.events.find((e) => e.to === to)?.at ?? null;
  const sampled = order.samples.length > 0;

  const phases = PHASES.map((key, i): Phase => {
    const state: PhaseState =
      i < current
        ? 'done'
        : i === current
          ? stopped
            ? 'warning'
            : order.status === 'COMPLETED'
              ? 'done'
              : 'current'
          : 'upcoming';
    const milestone = order.milestones.find((m) => m.stage === key);
    const base = { key, media: milestone?.media ?? [], note: milestone?.note ?? null };

    if (key === 'placed')
      return {
        ...base,
        state,
        date: { kind: 'done', iso: order.events[0]?.at ?? order.createdAt },
      };
    if (key === 'sample') {
      if (!sampled && i < current) return { ...base, state: 'skipped', date: null };
      const approved = reached('SAMPLE_APPROVED');
      return {
        ...base,
        state,
        media: order.samples.flatMap((s) => s.photos),
        date:
          approved && state === 'done'
            ? { kind: 'done', iso: approved }
            : order.samples.at(-1)
              ? { kind: 'since', iso: order.samples.at(-1)?.requestedAt ?? order.createdAt }
              : null,
      };
    }
    if (key === 'deposit') {
      const received = reached('IN_PRODUCTION');
      return {
        ...base,
        state,
        date:
          received && state === 'done'
            ? { kind: 'done', iso: received }
            : order.confirmedAt
              ? { kind: 'since', iso: order.confirmedAt }
              : null,
      };
    }
    if (milestone) {
      return {
        ...base,
        state: milestone.status === 'DELAYED' && state === 'current' ? 'warning' : state,
        date: milestone.completedAt
          ? { kind: 'done', iso: milestone.completedAt }
          : milestone.plannedAt
            ? { kind: 'expected', iso: milestone.plannedAt }
            : null,
      };
    }
    if ((PRODUCTION_STAGES as readonly string[]).includes(key))
      return { ...base, state, date: null };
    if (key === 'qc') {
      const passed = reached('READY_TO_SHIP');
      return {
        ...base,
        state,
        media: order.inspections.flatMap((i) => i.photos),
        date: passed && state === 'done' ? { kind: 'done', iso: passed } : null,
      };
    }
    if (key === 'shipping') {
      const shipped = order.shipment?.shippedAt;
      return {
        ...base,
        state,
        date: shipped
          ? { kind: 'done', iso: shipped }
          : order.requestedShipDate
            ? { kind: 'expected', iso: order.requestedShipDate }
            : null,
      };
    }
    if (key === 'delivered') {
      const delivered = order.shipment?.deliveredAt ?? reached('DELIVERED');
      return { ...base, state, date: delivered ? { kind: 'done', iso: delivered } : null };
    }
    return {
      ...base,
      state,
      date: order.completedAt ? { kind: 'done', iso: order.completedAt } : null,
    };
  });
  return { phases, stopped };
}

/**
 * The order at a glance: one step per phase with its state, the done / expected dates, the
 * factory's photos and videos, and the current step highlighted. `slot` lets a page add
 * controls or details to a step (sample rounds, the factory's stage editor).
 */
export function OrderTimeline({
  order,
  slot,
}: {
  order: TimelineOrder;
  slot?: (key: PhaseKey) => ReactNode;
}) {
  const t = useTranslations('orders.timeline');
  const format = useFormatter();
  const { phases, stopped } = buildPhases(order);
  const [viewing, setViewing] = useState<OrderMedia | null>(null);

  return (
    <>
      {stopped ? (
        <div
          className={cn(
            'mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
            stopped === 'DISPUTED'
              ? 'bg-danger-soft text-danger-ink'
              : 'bg-neutral-soft text-neutral-ink',
          )}
        >
          <TriangleAlert className="size-4" aria-hidden="true" />
          {t(stopped === 'DISPUTED' ? 'disputed' : 'cancelled')}
        </div>
      ) : null}
      <ol className="relative">
        {phases.map((phase, i) => {
          const last = i === phases.length - 1;
          const extra = slot?.(phase.key);
          const current = phase.state === 'current' || phase.state === 'warning';
          return (
            <li
              key={phase.key}
              className="relative flex gap-4 pb-2 last:pb-0"
              aria-current={current ? 'step' : undefined}
            >
              {!last ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute start-[15px] top-9 bottom-0 w-0.5 rounded-full',
                    phase.state === 'done' ? 'bg-primary' : 'bg-border',
                  )}
                />
              ) : null}
              <Marker state={phase.state} />
              <div
                className={cn(
                  'mb-4 min-w-0 flex-1 rounded-xl transition-colors',
                  current
                    ? 'bg-card border-primary/40 ring-primary/10 border p-4 shadow-sm ring-4'
                    : 'px-1 pt-1.5',
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p
                    className={cn(
                      'font-medium',
                      phase.state === 'upcoming' && 'text-muted-foreground',
                      phase.state === 'skipped' && 'text-subtle-foreground line-through',
                    )}
                  >
                    {t(`phases.${phase.key}`)}
                    {current ? (
                      <Badge
                        variant={phase.state === 'warning' ? 'warning' : 'brand'}
                        className="ms-2 align-middle"
                      >
                        {phase.state === 'warning' ? t('attention') : t('now')}
                      </Badge>
                    ) : null}
                  </p>
                  {phase.state === 'skipped' ? (
                    <span className="text-subtle-foreground text-xs">{t('skipped')}</span>
                  ) : phase.date ? (
                    <span className="text-muted-foreground tabular text-xs">
                      {t(`date.${phase.date.kind}`, {
                        date: format.dateTime(new Date(phase.date.iso), { dateStyle: 'medium' }),
                      })}
                    </span>
                  ) : null}
                </div>
                {current ? (
                  <p className="text-muted-foreground mt-1 text-sm">{t(`hints.${phase.key}`)}</p>
                ) : null}
                {phase.note && phase.state !== 'upcoming' ? (
                  <p className="text-muted-foreground mt-1 text-sm">{phase.note}</p>
                ) : null}
                {phase.media.length > 0 ? (
                  <MediaStrip media={phase.media} onOpen={setViewing} />
                ) : null}
                {extra ? <div className="mt-3">{extra}</div> : null}
              </div>
            </li>
          );
        })}
      </ol>
      <Dialog open={viewing !== null} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogTitle className="sr-only">{viewing?.caption ?? t('media')}</DialogTitle>
          <DialogDescription className="sr-only">{t('media')}</DialogDescription>
          {viewing?.kind === 'VIDEO' && viewing.videoUrl ? (
            <video
              src={viewing.videoUrl}
              controls
              autoPlay
              className="max-h-[75dvh] w-full rounded-lg bg-black"
            />
          ) : viewing?.urls ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed rendition URL
            <img
              src={viewing.urls.large}
              alt={viewing.caption ?? ''}
              className="max-h-[75dvh] w-full rounded-lg object-contain"
            />
          ) : null}
          {viewing?.caption ? (
            <p className="text-muted-foreground text-sm">{viewing.caption}</p>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Marker({ state }: { state: PhaseState }) {
  return (
    <span
      className={cn(
        'relative z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border-2',
        state === 'done' && 'border-primary bg-primary text-primary-foreground',
        state === 'current' && 'border-primary bg-card text-primary-ink',
        state === 'warning' && 'border-warning bg-warning-soft text-warning-ink',
        (state === 'upcoming' || state === 'skipped') &&
          'border-border bg-card text-subtle-foreground',
      )}
      aria-hidden="true"
    >
      {state === 'done' ? (
        <Check className="size-4" />
      ) : state === 'warning' ? (
        <TriangleAlert className="size-4" />
      ) : state === 'current' ? (
        <>
          <span className="bg-primary/30 absolute inset-0 rounded-full motion-safe:animate-ping" />
          <Clock className="relative size-4" />
        </>
      ) : (
        <span className="bg-border size-2 rounded-full" />
      )}
    </span>
  );
}

function MediaStrip({ media, onOpen }: { media: OrderMedia[]; onOpen: (m: OrderMedia) => void }) {
  const t = useTranslations('orders.timeline');
  return (
    <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {media.map((m) => (
        <li key={m.id} className="shrink-0">
          <button
            type="button"
            onClick={() => onOpen(m)}
            disabled={m.processing !== 'READY'}
            className="focus-visible:ring-ring/40 bg-muted relative block size-20 overflow-hidden rounded-lg border outline-none focus-visible:ring-3 sm:size-24"
            aria-label={m.caption ?? t(m.kind === 'VIDEO' ? 'openVideo' : 'openPhoto')}
          >
            {m.kind === 'IMAGE' && m.urls ? (
              // eslint-disable-next-line @next/next/no-img-element -- short-lived signed rendition URL
              <img src={m.urls.thumb} alt="" className="size-full object-cover" loading="lazy" />
            ) : m.kind === 'VIDEO' && m.videoUrl ? (
              <>
                <video
                  src={`${m.videoUrl}#t=0.1`}
                  preload="metadata"
                  muted
                  className="size-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
                  <Play className="size-6 fill-current" aria-hidden="true" />
                </span>
              </>
            ) : (
              <span className="text-muted-foreground flex size-full items-center justify-center text-[0.6875rem]">
                {t('processing')}
              </span>
            )}
            {m.review !== 'APPROVED' ? (
              <span className="bg-background/90 absolute inset-x-0 bottom-0 truncate px-1 text-[0.625rem]">
                {t(`review.${m.review}`)}
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
