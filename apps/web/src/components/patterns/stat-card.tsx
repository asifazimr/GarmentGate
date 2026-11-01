import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface StatDelta {
  /** Already formatted, e.g. "+12%" */
  label: string;
  direction: 'up' | 'down';
  /** Whether this direction is good news (revenue up) or bad news (defects up). */
  sentiment: 'positive' | 'negative' | 'neutral';
}

/** A single KPI: label, big number, optional trend and sparkline. */
export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
  trend,
  loading = false,
}: {
  label: ReactNode;
  /** Already formatted (money via Intl.NumberFormat, counts with grouping). */
  value: ReactNode;
  icon?: LucideIcon;
  delta?: StatDelta;
  hint?: ReactNode;
  /** Small series for a sparkline, oldest first. */
  trend?: number[];
  loading?: boolean;
}) {
  return (
    <Card size="sm" className="gap-3 px-4 sm:px-5">
      <div className="text-muted-foreground flex items-center justify-between gap-2 text-[0.8125rem] font-medium">
        <span className="truncate">{label}</span>
        {Icon ? (
          <Icon className="text-subtle-foreground size-4 shrink-0" aria-hidden="true" />
        ) : null}
      </div>
      {loading ? (
        <Skeleton className="h-8 w-28" />
      ) : (
        <div className="flex items-end justify-between gap-4">
          <div className="tabular text-[1.75rem] leading-none font-semibold tracking-[-0.03em]">
            {value}
          </div>
          {trend && trend.length > 1 ? (
            <Sparkline values={trend} sentiment={delta?.sentiment} />
          ) : null}
        </div>
      )}
      {delta || hint ? (
        <div className="flex items-center gap-2 text-xs">
          {delta ? (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium',
                delta.sentiment === 'positive' && 'bg-success-soft text-success-ink',
                delta.sentiment === 'negative' && 'bg-danger-soft text-danger-ink',
                delta.sentiment === 'neutral' && 'bg-neutral-soft text-neutral-ink',
              )}
            >
              {delta.direction === 'up' ? (
                <ArrowUpRight className="size-3" aria-hidden="true" />
              ) : (
                <ArrowDownRight className="size-3" aria-hidden="true" />
              )}
              {delta.label}
            </span>
          ) : null}
          {hint ? <span className="text-muted-foreground">{hint}</span> : null}
        </div>
      ) : null}
    </Card>
  );
}

function Sparkline({
  values,
  sentiment = 'neutral',
}: {
  values: number[];
  sentiment?: StatDelta['sentiment'];
}) {
  const width = 80;
  const height = 28;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((v, i) => [
    (i / (values.length - 1)) * width,
    height - 2 - ((v - min) / span) * (height - 4),
  ]);
  const line = points.map(([x, y]) => `${x?.toFixed(1)},${y?.toFixed(1)}`).join(' ');
  const color =
    sentiment === 'positive'
      ? 'var(--success)'
      : sentiment === 'negative'
        ? 'var(--destructive)'
        : 'var(--primary)';
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-7 w-20 shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <polyline points={`0,${height} ${line} ${width},${height}`} fill={color} opacity={0.1} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
