'use client';

import type { AdminOverview } from '@garmentgate/shared';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatMoney } from '@/lib/format';

/**
 * The overview's Recharts charts, in their own chunk: the page loads them after its KPIs and
 * queues, so the charting library never blocks the first render.
 */

/** chart-1 / chart-3 are validated as a pair (light and dark) for the two revenue series. */
export const SERIES = { markup: 'var(--chart-1)', commission: 'var(--chart-3)' } as const;
const AXIS = { fontSize: 12, fill: 'var(--muted-foreground)' };

function useChartFormat() {
  const t = useTranslations('adminPanel.overview');
  const locale = useLocale();
  const format = useFormatter();
  return {
    t,
    format,
    usd: (minor: number) => formatMoney(minor, 'USD', locale),
    usdShort: (minor: number) =>
      format.number(minor / 100, {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1,
      }),
    monthLabel: (m: string) =>
      format.dateTime(new Date(`${m}-01T00:00:00Z`), {
        month: 'short',
        year: '2-digit',
        timeZone: 'UTC',
      }),
  };
}

export function GmvChart({ series }: { series: Month[] }) {
  const { t, usd, usdShort, monthLabel } = useChartFormat();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickFormatter={monthLabel}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
        />
        <YAxis tickFormatter={usdShort} tick={AXIS} tickLine={false} axisLine={false} width={64} />
        <Tooltip
          cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
          content={
            <ChartTooltip
              formatMonth={monthLabel}
              rows={(m) => [{ name: t('charts.gmvSeries'), value: usd(m.gmvUsdMinor) }]}
            />
          }
        />
        <Bar
          dataKey="gmvUsdMinor"
          name={t('charts.gmvSeries')}
          fill={SERIES.markup}
          radius={[4, 4, 0, 0]}
          maxBarSize={36}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RevenueChart({ series }: { series: Month[] }) {
  const { t, usd, usdShort, monthLabel } = useChartFormat();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickFormatter={monthLabel}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
        />
        <YAxis tickFormatter={usdShort} tick={AXIS} tickLine={false} axisLine={false} width={64} />
        <Tooltip
          cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
          content={
            <ChartTooltip
              formatMonth={monthLabel}
              rows={(m) => [
                {
                  name: t('charts.markup'),
                  value: usd(m.markupUsdMinor),
                  color: SERIES.markup,
                },
                {
                  name: t('charts.commission'),
                  value: usd(m.commissionUsdMinor),
                  color: SERIES.commission,
                },
                {
                  name: t('charts.total'),
                  value: usd(m.markupUsdMinor + m.commissionUsdMinor),
                },
              ]}
            />
          }
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: 'var(--muted-foreground)' }}
        />
        {/* A 2px card-coloured stroke keeps the stacked segments visibly apart. */}
        <Bar
          dataKey="markupUsdMinor"
          name={t('charts.markup')}
          stackId="revenue"
          fill={SERIES.markup}
          stroke="var(--card)"
          strokeWidth={2}
          maxBarSize={36}
        />
        <Bar
          dataKey="commissionUsdMinor"
          name={t('charts.commission')}
          stackId="revenue"
          fill={SERIES.commission}
          stroke="var(--card)"
          strokeWidth={2}
          radius={[4, 4, 0, 0]}
          maxBarSize={36}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ConversionChart({ series }: { series: Month[] }) {
  const { t, format, monthLabel } = useChartFormat();
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={series.map((m) => ({
          ...m,
          rate: m.rfqs > 0 ? m.rfqsConverted / m.rfqs : null,
        }))}
        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickFormatter={monthLabel}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 1]}
          tickFormatter={(v: number) => format.number(v, { style: 'percent' })}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
          width={48}
        />
        <Tooltip
          cursor={{ stroke: 'var(--border-strong)' }}
          content={
            <ChartTooltip
              formatMonth={monthLabel}
              rows={(m) => [
                {
                  name: t('charts.conversionSeries'),
                  value:
                    m.rfqs > 0
                      ? format.number(m.rfqsConverted / m.rfqs, {
                          style: 'percent',
                          maximumFractionDigits: 1,
                        })
                      : '—',
                },
                {
                  name: t('charts.rfqs'),
                  value: t('charts.rfqsValue', {
                    converted: m.rfqsConverted,
                    rfqs: m.rfqs,
                  }),
                },
              ]}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="rate"
          name={t('charts.conversionSeries')}
          stroke={SERIES.markup}
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2, stroke: 'var(--card)', fill: SERIES.markup }}
          activeDot={{ r: 5, strokeWidth: 2, stroke: 'var(--card)' }}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

type Month = AdminOverview['series'][number];

/** Tooltip content in the card's own surface and ink (series colour only on the swatch). */
function ChartTooltip({
  active,
  payload,
  formatMonth,
  rows,
}: {
  active?: boolean;
  payload?: readonly { payload?: unknown }[];
  /** Not `label`: Recharts injects its own `label` (the hovered x value) into tooltip content. */
  formatMonth: (month: string) => string;
  rows: (month: Month) => { name: string; value: string; color?: string }[];
}) {
  const point = payload?.[0]?.payload as Month | undefined;
  if (!active || !point) return null;
  return (
    <div className="bg-popover text-popover-foreground min-w-44 rounded-lg border px-3 py-2 text-xs shadow-lg">
      <p className="mb-1.5 font-medium">{formatMonth(point.month)}</p>
      <dl className="space-y-1">
        {rows(point).map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground flex items-center gap-1.5">
              {r.color ? (
                <span
                  className="size-2 rounded-full"
                  style={{ background: r.color }}
                  aria-hidden="true"
                />
              ) : null}
              {r.name}
            </dt>
            <dd className="tabular font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
