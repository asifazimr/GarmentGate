'use client';

import {
  type Gate,
  type GateCheck,
  KpiQuerySchema,
  type KpiReport,
  type OrderEconomics,
} from '@garmentgate/shared';
import {
  BarChart3,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Coins,
  Factory,
  Gauge,
  Percent,
  Repeat,
  Settings2,
  ShieldAlert,
  Timer,
  Truck,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTodayIso } from '@/lib/client-hooks';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useKpis } from '../api';
import { UnitEconomicsDialog } from './unit-economics-dialog';

const DAY = 86_400_000;
const GATE_KEYS = {
  1: { title: 'gate1', phase: 'phase1' },
  2: { title: 'gate2', phase: 'phase2' },
  3: { title: 'gate3', phase: 'phase3' },
} as const;
const daysBefore = (iso: string, days: number) =>
  new Date(new Date(`${iso}T00:00:00Z`).getTime() - days * DAY).toISOString().slice(0, 10);

/**
 * The Phase 1 scoreboard: whether the business works (GMV, take rate, contribution per order),
 * how well it runs (on time, first pass, repeat buyers, claims) and how far each roadmap gate is.
 */
export function KpiDashboard() {
  const t = useTranslations('kpis');
  const today = useTodayIso();
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const range = today ? { from: from ?? daysBefore(today, 90), to: to ?? today } : null;
  const parsed = range ? KpiQuerySchema.safeParse(range) : null;
  const kpis = useKpis(parsed?.success ? parsed.data : null);
  const rangeError = parsed && !parsed.success ? parsed.error.issues[0]?.message : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Button variant="outline" onClick={() => setEditing(true)}>
            <Settings2 />
            {t('assumptions')}
          </Button>
        }
      />
      <div className="flex flex-wrap items-end gap-3">
        <Field className="w-40">
          <FieldLabel htmlFor="kpi-from">{t('from')}</FieldLabel>
          <Input
            id="kpi-from"
            type="date"
            value={range?.from ?? ''}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Field>
        <Field className="w-40" data-invalid={!!rangeError}>
          <FieldLabel htmlFor="kpi-to">{t('to')}</FieldLabel>
          <Input
            id="kpi-to"
            type="date"
            value={range?.to ?? ''}
            onChange={(e) => setTo(e.target.value)}
          />
          <FieldError errors={rangeError ? [{ message: rangeError }] : []} />
        </Field>
        <p className="text-muted-foreground basis-64 text-xs">{t('usdNote')}</p>
      </div>
      {kpis.isError ? (
        <ErrorState onRetry={() => void kpis.refetch()} retrying={kpis.isFetching} />
      ) : (
        <Body report={kpis.data} loading={kpis.isPending} onRetry={() => void kpis.refetch()} />
      )}
      <UnitEconomicsDialog open={editing} onClose={() => setEditing(false)} />
    </div>
  );
}

function Body({
  report: r,
  loading,
  onRetry,
}: {
  report?: KpiReport;
  loading: boolean;
  onRetry: () => void;
}) {
  const t = useTranslations('kpis');
  const format = useFormatter();
  const locale = useLocale();
  const usd = (minor: number | null) => (minor === null ? '—' : formatMoney(minor, 'USD', locale));
  const pct = (bps: number | null) =>
    bps === null
      ? '—'
      : format.number(bps / 10_000, { style: 'percent', maximumFractionDigits: 1 });

  const columns = useMemo<DataColumn<OrderEconomics>[]>(() => {
    const m = (minor: number, currency: string) => formatMoney(minor, currency, locale);
    const amount = (
      id: 'buyerPays' | 'grossRevenue' | 'paymentFees' | 'merchandising' | 'claimsReserve',
      pick: (o: OrderEconomics) => number,
      negative = false,
    ): DataColumn<OrderEconomics> => ({
      id,
      header: t(`columns.${id}`),
      value: pick,
      cell: (o) => (
        <span className="tabular">{`${negative ? '−' : ''}${m(pick(o), o.currency)}`}</span>
      ),
      align: 'end',
      searchable: false,
    });
    return [
      {
        id: 'order',
        header: t('columns.order'),
        value: (o) => `${o.orderCode} ${o.buyerCode} ${o.manufacturerCode}`,
        cell: (o) => (
          <span>
            <Link
              href={`/admin/orders/${o.orderCode}`}
              className="font-mono text-xs font-medium hover:underline"
            >
              {o.orderCode}
            </Link>
            <span className="text-muted-foreground block text-xs">
              {o.buyerCode} · {o.manufacturerCode}
            </span>
          </span>
        ),
      },
      amount('buyerPays', (o) => o.buyerPaysMinor),
      amount('grossRevenue', (o) => o.grossRevenueMinor),
      amount('paymentFees', (o) => o.paymentFeesMinor, true),
      amount('merchandising', (o) => o.merchandisingMinor, true),
      amount('claimsReserve', (o) => o.claimsReserveMinor, true),
      {
        id: 'contribution',
        header: t('columns.contribution'),
        value: (o) => o.contributionUsdMinor,
        cell: (o) => (
          <span
            className={cn(
              'tabular font-medium',
              o.contributionMinor < 0 ? 'text-danger-ink' : 'text-success-ink',
            )}
          >
            {m(o.contributionMinor, o.currency)}
          </span>
        ),
        align: 'end',
        searchable: false,
      },
    ];
  }, [t, locale]);

  return (
    <div className="space-y-6">
      <section aria-labelledby="gates-heading" className="space-y-3">
        <h2 id="gates-heading" className="text-lg font-semibold tracking-[-0.01em]">
          {t('gates.title')}
        </h2>
        <div className="grid gap-3 lg:grid-cols-3">
          {(r?.gates ?? [null, null, null]).map((g, i) => (
            <GateCard key={g?.gate ?? i} gate={g} pct={pct} usd={usd} />
          ))}
        </div>
      </section>

      <section aria-labelledby="money-heading" className="space-y-3">
        <h2 id="money-heading" className="text-lg font-semibold tracking-[-0.01em]">
          {t('money')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            loading={loading}
            icon={Coins}
            label={t('gmv')}
            value={usd(r?.gmvUsdMinor ?? 0)}
            hint={t('orders', { count: r?.orders ?? 0 })}
          />
          <StatCard
            loading={loading}
            icon={Percent}
            label={t('takeRate')}
            value={pct(r?.takeRateBps ?? null)}
            hint={t('takeRateHint', { amount: usd(r?.grossRevenueUsdMinor ?? 0) })}
          />
          <StatCard
            loading={loading}
            icon={Wallet}
            label={t('contributionPerOrder')}
            value={usd(r?.contributionPerOrderUsdMinor ?? null)}
            hint={t('contributionTotal', { amount: usd(r?.contributionUsdMinor ?? 0) })}
          />
          <StatCard
            loading={loading}
            icon={BarChart3}
            label={t('positiveOrders')}
            value={pct(r?.positiveContributionBps ?? null)}
            hint={t('positiveHint')}
          />
        </div>
      </section>

      <section aria-labelledby="ops-heading" className="space-y-3">
        <h2 id="ops-heading" className="text-lg font-semibold tracking-[-0.01em]">
          {t('operations')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            loading={loading}
            icon={Truck}
            label={t('onTime')}
            value={pct(r?.onTimeBps ?? null)}
            hint={t('onTimeHint', { count: r?.shipped ?? 0 })}
          />
          <StatCard
            loading={loading}
            icon={ClipboardCheck}
            label={t('firstPass')}
            value={pct(r?.firstPassBps ?? null)}
            hint={t('inspections', { count: r?.finalInspections ?? 0 })}
          />
          <StatCard
            loading={loading}
            icon={Repeat}
            label={t('repeatBuyers')}
            value={pct(r?.repeatBuyerBps ?? null)}
            hint={t('repeatHint')}
          />
          <StatCard
            loading={loading}
            icon={Gauge}
            label={t('quoteToOrder')}
            value={pct(r?.quoteToOrderBps ?? null)}
            hint={t('quotes', { count: r?.quotesOffered ?? 0 })}
          />
          <StatCard
            loading={loading}
            icon={Factory}
            label={t('activeFactories')}
            value={format.number(r?.activeFactories ?? 0)}
            hint={t('activeHint')}
          />
          <StatCard
            loading={loading}
            icon={BarChart3}
            label={t('utilisation')}
            value={pct(r?.capacityUtilisationBps ?? null)}
            hint={t('utilisationHint')}
          />
          <StatCard
            loading={loading}
            icon={ShieldAlert}
            label={t('claimRate')}
            value={pct(r?.claimRateBps ?? null)}
            hint={t('delivered', { count: r?.delivered ?? 0 })}
          />
          <StatCard
            loading={loading}
            icon={Timer}
            label={t('assignTime')}
            value={
              r?.inspectorAssignHours === null || r?.inspectorAssignHours === undefined
                ? '—'
                : t('hours', { hours: r.inspectorAssignHours })
            }
            hint={t('assignHint')}
          />
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('economics')}</CardTitle>
          <CardDescription>{t('economicsBody')}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={r?.economics}
            columns={columns}
            loading={loading}
            error={false}
            onRetry={onRetry}
            initialSort={{ id: 'contribution', desc: false }}
            csvName="unit-economics"
            empty={{ icon: Coins, title: t('empty'), description: t('emptyBody') }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function GateCard({
  gate: g,
  pct,
  usd,
}: {
  gate: Gate | null;
  pct: (bps: number | null) => string;
  usd: (minor: number | null) => string;
}) {
  const t = useTranslations('kpis.gates');
  if (!g) return <StatCard label="" value="" loading />;
  const shown = (c: GateCheck) =>
    c.key === 'PAID_ORDERS'
      ? `${String(c.actual ?? 0)} / ${String(c.target ?? 0)}`
      : c.key === 'BREAK_EVEN'
        ? `${usd(c.actual)} / ${usd(c.target)}`
        : c.key === 'WORKING_CAPITAL'
          ? c.met
            ? t('inPlace')
            : t('notYet')
          : `${pct(c.actual)} / ${pct(c.target)}`;
  return (
    <Card size="sm" className={cn(g.met && 'border-success-ink/40')}>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {t(GATE_KEYS[g.gate].title)}
          <Badge variant={g.met ? 'success' : 'neutral'}>{g.met ? t('met') : t('open')}</Badge>
        </CardTitle>
        <CardDescription>{t(GATE_KEYS[g.gate].phase)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {g.checks.map((c) => (
            <li key={c.key} className="flex items-start gap-2">
              {c.met ? (
                <CheckCircle2 className="text-success-ink mt-0.5 size-4 shrink-0" aria-hidden />
              ) : (
                <Circle className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden />
              )}
              <span className="min-w-0 flex-1">{t(`checks.${c.key}`)}</span>
              <span className="tabular text-muted-foreground text-xs">{shown(c)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
