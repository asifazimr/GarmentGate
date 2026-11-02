'use client';

import type { AdminOverview } from '@garmentgate/shared';
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Coins,
  FileCheck2,
  Package,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/lib/format';
import { useOverview } from '../api';

const RANGES = [3, 6, 12, 24] as const;

// Recharts loads in its own chunk after the page's KPIs and queues (route-level splitting).
const chartFallback = () => <Skeleton className="h-60 rounded-lg" />;
const GmvChart = dynamic(() => import('./overview-charts').then((m) => m.GmvChart), {
  ssr: false,
  loading: chartFallback,
});
const RevenueChart = dynamic(() => import('./overview-charts').then((m) => m.RevenueChart), {
  ssr: false,
  loading: chartFallback,
});
const ConversionChart = dynamic(() => import('./overview-charts').then((m) => m.ConversionChart), {
  ssr: false,
  loading: chartFallback,
});
/** chart-1 / chart-3 are validated as a pair (light and dark) for the two revenue series. */
const SERIES = { markup: 'var(--chart-1)', commission: 'var(--chart-3)' } as const;

/** GMV, revenue and conversion over time, plus shortcuts to everything waiting for staff. */
export function AdminOverviewPage() {
  const t = useTranslations('adminPanel.overview');
  const locale = useLocale();
  const format = useFormatter();
  const [months, setMonths] = useState<(typeof RANGES)[number]>(12);
  const overview = useOverview(months);
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  const usdShort = (minor: number) =>
    format.number(minor / 100, {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    });
  const monthLabel = (m: string) =>
    format.dateTime(new Date(`${m}-01T00:00:00Z`), {
      month: 'short',
      year: '2-digit',
      timeZone: 'UTC',
    });
  const d = overview.data;

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Select
            items={RANGES.map((r) => ({ value: String(r), label: t('range', { months: r }) }))}
            value={String(months)}
            onValueChange={(v) => {
              const range = RANGES.find((r) => String(r) === v);
              if (range) setMonths(range);
            }}
          >
            <SelectTrigger aria-label={t('rangeLabel')} className="min-w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => (
                <SelectItem key={r} value={String(r)}>
                  {t('range', { months: r })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {overview.isError ? (
        <ErrorState onRetry={() => void overview.refetch()} retrying={overview.isFetching} />
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <li>
              <StatCard
                label={t('kpis.gmv')}
                icon={CircleDollarSign}
                value={d ? usd(d.kpis.gmvUsdMinor) : ''}
                hint={d ? t('kpis.gmvHint', { count: d.kpis.confirmedOrders }) : undefined}
                trend={d?.series.map((m) => m.gmvUsdMinor)}
                loading={overview.isPending}
              />
            </li>
            <li>
              <StatCard
                label={t('kpis.revenue')}
                icon={Coins}
                value={d ? usd(d.kpis.revenueUsdMinor) : ''}
                hint={
                  d
                    ? t('kpis.revenueHint', {
                        markup: usd(d.kpis.markupUsdMinor),
                        commission: usd(d.kpis.commissionUsdMinor),
                      })
                    : undefined
                }
                trend={d?.series.map((m) => m.markupUsdMinor + m.commissionUsdMinor)}
                loading={overview.isPending}
              />
            </li>
            <li>
              <StatCard
                label={t('kpis.active')}
                icon={Package}
                value={d ? format.number(d.kpis.activeOrders) : ''}
                hint={t('kpis.activeHint')}
                loading={overview.isPending}
              />
            </li>
            <li>
              <StatCard
                label={t('kpis.conversion')}
                icon={FileCheck2}
                value={
                  d
                    ? format.number(d.kpis.conversionBps / 10_000, {
                        style: 'percent',
                        maximumFractionDigits: 1,
                      })
                    : ''
                }
                hint={
                  d
                    ? t('kpis.conversionHint', {
                        converted: d.kpis.rfqsConverted,
                        rfqs: d.kpis.rfqs,
                      })
                    : undefined
                }
                loading={overview.isPending}
              />
            </li>
          </ul>

          {d && d.skippedCurrencies.length > 0 ? (
            <p className="bg-warning-soft text-warning-ink rounded-lg px-4 py-3 text-sm">
              {t('skipped', { currencies: d.skippedCurrencies.join(', ') })}{' '}
              <Link href="/admin/payments" className="font-medium underline">
                {t('setRates')}
              </Link>
            </p>
          ) : null}

          <Queues queues={d?.queues} />

          <div className="grid gap-6 xl:grid-cols-2">
            <ChartCard title={t('charts.gmv')} description={t('charts.gmvBody')} loading={!d}>
              {d ? <GmvChart series={d.series} /> : null}
            </ChartCard>

            <ChartCard
              title={t('charts.revenue')}
              description={t('charts.revenueBody')}
              loading={!d}
            >
              {d ? <RevenueChart series={d.series} /> : null}
            </ChartCard>

            <ChartCard
              title={t('charts.conversion')}
              description={t('charts.conversionBody')}
              loading={!d}
            >
              {d ? <ConversionChart series={d.series} /> : null}
            </ChartCard>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <ChartCard title={t('byStatus')} loading={!d}>
                {d ? (
                  <BarList
                    empty={t('noOrders')}
                    rows={d.ordersByStatus.map((s) => ({
                      key: s.status,
                      label: <StatusBadge domain="order" status={s.status} />,
                      value: s.count,
                      display: format.number(s.count),
                    }))}
                  />
                ) : null}
              </ChartCard>
              <ChartCard title={t('topCategories')} loading={!d}>
                {d ? (
                  <BarList
                    empty={t('noOrders')}
                    rows={d.topCategories.map((c) => ({
                      key: c.name ?? '—',
                      label: c.name ?? t('uncategorised'),
                      value: c.gmvUsdMinor,
                      display: usdShort(c.gmvUsdMinor),
                    }))}
                  />
                ) : null}
              </ChartCard>
            </div>
          </div>

          {d ? <MonthlyTable overview={d} monthLabel={monthLabel} usd={usd} /> : null}
        </>
      )}
    </div>
  );
}

function ChartCard({
  title,
  description,
  loading,
  children,
}: {
  title: string;
  description?: string;
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{loading ? <Skeleton className="h-56 rounded-lg" /> : children}</CardContent>
    </Card>
  );
}

/** Magnitude as plain horizontal bars: one hue, the value always written out. */
function BarList({
  rows,
  empty,
}: {
  rows: { key: string; label: React.ReactNode; value: number; display: string }[];
  empty: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (rows.length === 0) return <p className="text-muted-foreground text-sm">{empty}</p>;
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.key} className="space-y-1">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{r.label}</span>
            <span className="tabular font-medium">{r.display}</span>
          </div>
          <div className="bg-muted h-1.5 overflow-hidden rounded-full" aria-hidden="true">
            <div
              className="h-full rounded-full"
              style={{ width: `${String((r.value / max) * 100)}%`, background: SERIES.markup }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Queues({ queues }: { queues: AdminOverview['queues'] | undefined }) {
  const t = useTranslations('adminPanel.overview.queues');
  const items = [
    { key: 'kyc', href: '/admin/kyc', icon: ShieldCheck },
    { key: 'certifications', href: '/admin/certifications', icon: BadgeCheck },
    { key: 'flaggedMessages', href: '/admin/moderation', icon: ShieldAlert },
    { key: 'paymentsToConfirm', href: '/admin/payments', icon: Wallet },
    { key: 'releasesDue', href: '/admin/payments', icon: Coins },
    { key: 'openDisputes', href: '/admin/disputes', icon: Scale },
  ] as const;
  return (
    <section aria-labelledby="queues" className="space-y-3">
      <h2 id="queues" className="text-muted-foreground text-sm font-medium">
        {t('title')}
      </h2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map(({ key, href, icon: Icon }) => (
          <li key={key}>
            <Link
              href={href}
              className="bg-card hover:bg-surface focus-visible:ring-ring/40 group flex h-full items-center gap-3 rounded-xl border p-3 shadow-xs outline-none focus-visible:ring-3"
            >
              <Icon className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="tabular block text-lg font-semibold">
                  {queues ? queues[key] : <Skeleton className="h-6 w-8" />}
                </span>
                <span className="text-muted-foreground block truncate text-xs">{t(key)}</span>
              </span>
              <ArrowRight
                className="text-subtle-foreground size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The same numbers as the charts, as a table: for screen readers and exact values. */
function MonthlyTable({
  overview,
  monthLabel,
  usd,
}: {
  overview: AdminOverview;
  monthLabel: (m: string) => string;
  usd: (minor: number) => string;
}) {
  const t = useTranslations('adminPanel.overview.table');
  return (
    <details className="bg-card rounded-xl border shadow-xs">
      <summary className="cursor-pointer px-4 py-3 text-sm font-medium">{t('show')}</summary>
      <div className="overflow-x-auto border-t">
        <table className="tabular w-full text-sm">
          <thead className="bg-surface text-muted-foreground text-xs">
            <tr>
              <th scope="col" className="px-4 py-2 text-start font-medium">
                {t('month')}
              </th>
              <th scope="col" className="px-4 py-2 text-end font-medium">
                {t('gmv')}
              </th>
              <th scope="col" className="px-4 py-2 text-end font-medium">
                {t('markup')}
              </th>
              <th scope="col" className="px-4 py-2 text-end font-medium">
                {t('commission')}
              </th>
              <th scope="col" className="px-4 py-2 text-end font-medium">
                {t('orders')}
              </th>
              <th scope="col" className="px-4 py-2 text-end font-medium">
                {t('rfqs')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {overview.series.map((m) => (
              <tr key={m.month}>
                <th scope="row" className="px-4 py-2 text-start font-normal">
                  {monthLabel(m.month)}
                </th>
                <td className="px-4 py-2 text-end">{usd(m.gmvUsdMinor)}</td>
                <td className="px-4 py-2 text-end">{usd(m.markupUsdMinor)}</td>
                <td className="px-4 py-2 text-end">{usd(m.commissionUsdMinor)}</td>
                <td className="px-4 py-2 text-end">{m.orders}</td>
                <td className="px-4 py-2 text-end">
                  {m.rfqsConverted}/{m.rfqs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
