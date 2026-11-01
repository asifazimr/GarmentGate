import { Check, Clock, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type TimelineState = 'done' | 'current' | 'upcoming' | 'warning';

export interface TimelineItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Already formatted date or relative time. */
  meta?: ReactNode;
  state: TimelineState;
}

/** Vertical progress through a sequence: production milestones, verification, shipments. */
export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn('relative', className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!last ? (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute start-[13px] top-8 bottom-1 w-px',
                  item.state === 'done' ? 'bg-primary/60' : 'bg-border',
                )}
              />
            ) : null}
            <Marker state={item.state} />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p
                  className={cn(
                    'text-sm font-medium',
                    item.state === 'upcoming' && 'text-muted-foreground',
                  )}
                >
                  {item.title}
                </p>
                {item.meta ? (
                  <p className="text-subtle-foreground tabular text-xs">{item.meta}</p>
                ) : null}
              </div>
              {item.description ? (
                <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                  {item.description}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Marker({ state }: { state: TimelineState }) {
  const base =
    'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full ring-4 ring-background';
  if (state === 'done') {
    return (
      <span className={cn(base, 'bg-primary text-primary-foreground')} aria-hidden="true">
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (state === 'current') {
    return (
      <span
        className={cn(base, 'bg-primary-soft text-primary-ink ring-background')}
        aria-hidden="true"
      >
        <span className="bg-primary/25 absolute inset-0 rounded-full motion-safe:animate-ping" />
        <Clock className="relative size-3.5" strokeWidth={2.25} />
      </span>
    );
  }
  if (state === 'warning') {
    return (
      <span className={cn(base, 'bg-warning-soft text-warning-ink')} aria-hidden="true">
        <TriangleAlert className="size-3.5" />
      </span>
    );
  }
  return (
    <span className={cn(base, 'bg-card border-border-strong border')} aria-hidden="true">
      <span className="bg-border-strong size-1.5 rounded-full" />
    </span>
  );
}
