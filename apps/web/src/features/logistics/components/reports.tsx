'use client';

import { type LogisticsReport, LogisticsReportQuerySchema } from '@garmentgate/shared';
import { BarChart3, Coins, Handshake, ShieldAlert, Ship } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { StatCard } from '@/components/patterns/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTodayIso } from '@/lib/client-hooks';
import { formatMoney } from '@/lib/format';
import { useLogisticsReport } from '../api';

type Month = LogisticsReport['months'][number];
type Mode = LogisticsReport['modes'][number];
type PartnerRow = LogisticsReport['partners'][number];

const firstOfYear = (today: string) => `${today.slice(0, 4)}-01-01`;

/** Logistics revenue per currency: what buyers paid, partner costs, insurance, claims, margin. */
export function ReportsTab() {
  const t = useTranslations('logistics.reports');
  const today = useTodayIso();
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const range = today ? { from: from ?? firstOfYear(today), to: to ?? today } : null;
  const parsed = range ? LogisticsReportQuerySchema.safeParse(range) : null;
  const report = useLogisticsReport(parsed?.success ? parsed.data : null);
  const rangeError = parsed && !parsed.success ? parsed.error.issues[0]?.message : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <p className="text-muted-foreground max-w-xl flex-1 basis-64 text-sm">{t('description')}</p>
        <Field className="w-40">
          <FieldLabel htmlFor="rp-from">{t('from')}</FieldLabel>
          <Input
            id="rp-from"
            type="date"
            value={range?.from ?? ''}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Field>
        <Field className="w-40" data-invalid={!!rangeError}>
          <FieldLabel htmlFor="rp-to">{t('to')}</FieldLabel>
          <Input
            id="rp-to"
            type="date"
            value={range?.to ?? ''}
            onChange={(e) => setTo(e.target.value)}
          />
          <FieldError errors={rangeError ? [{ message: rangeError }] : []} />
        </Field>
      </div>
      {report.isError ? (
        <ErrorState onRetry={() => void report.refetch()} retrying={report.isFetching} />
      ) : (
        <ReportBody
          report={report.data}
          loading={report.isPending}
          onRetry={() => void report.refetch()}
        />
      )}
    </div>
  );
}

function ReportBody({
  report,
  loading,
  onRetry,
}: {
  report?: LogisticsReport;
  loading: boolean;
  onRetry: () => void;
}) {
  const t = useTranslations('logistics.reports');
  const tm = useTranslations('logistics.modes');
  const locale = useLocale();
  const format = useFormatter();
  const money = (minor: number, currency: string) => formatMoney(minor, currency, locale);
  const pct = (bps: number) =>
    format.number(bps / 10_000, { style: 'percent', maximumFractionDigits: 1 });
  const { monthColumns, modeColumns, partnerColumns } = useMemo(() => {
    const money = (minor: number, currency: string) => formatMoney(minor, currency, locale);
    const pct = (bps: number) =>
      format.number(bps / 10_000, { style: 'percent', maximumFractionDigits: 1 });

    const figureColumns = <R extends Month | Mode>(): DataColumn<R>[] => [
      { id: 'shipments', header: t('columns.shipments'), value: (r) => r.shipments, align: 'end' },
      {
        id: 'revenue',
        header: t('columns.revenue'),
        value: (r) => r.revenueMinor,
        cell: (r) => <span className="tabular">{money(r.revenueMinor, r.currency)}</span>,
        align: 'end',
        searchable: false,
      },
      {
        id: 'cost',
        header: t('columns.cost'),
        value: (r) => r.partnerCostMinor + r.insuranceMinor + r.claimsNetMinor,
        cell: (r) => (
          <span className="tabular">
            {money(r.partnerCostMinor, r.currency)}
            <span className="text-muted-foreground block text-xs">
              {t('costBreakdown', {
                insurance: money(r.insuranceMinor, r.currency),
                claims: money(r.claimsNetMinor, r.currency),
              })}
            </span>
          </span>
        ),
        align: 'end',
        searchable: false,
      },
      {
        id: 'margin',
        header: t('columns.margin'),
        value: (r) => r.marginMinor,
        cell: (r) => (
          <span className="tabular font-medium">
            {money(r.marginMinor, r.currency)}
            <span className="text-muted-foreground block text-xs font-normal">
              {pct(r.marginBps)}
            </span>
          </span>
        ),
        align: 'end',
        searchable: false,
      },
    ];

    const monthColumns: DataColumn<Month>[] = [
      {
        id: 'month',
        header: t('columns.month'),
        value: (r) => `${r.month} ${r.currency}`,
        cell: (r) => (
          <span>
            {format.dateTime(new Date(`${r.month}-01T00:00:00Z`), {
              year: 'numeric',
              month: 'long',
              timeZone: 'UTC',
            })}
            <span className="text-muted-foreground block text-xs">{r.currency}</span>
          </span>
        ),
      },
      ...figureColumns<Month>(),
    ];
    const modeColumns: DataColumn<Mode>[] = [
      {
        id: 'mode',
        header: t('columns.mode'),
        value: (r) => `${tm(r.mode)} ${r.currency}`,
        cell: (r) => (
          <span>
            {tm(r.mode)}
            <span className="text-muted-foreground block text-xs">{r.currency}</span>
          </span>
        ),
      },
      ...figureColumns<Mode>(),
    ];
    const partnerColumns: DataColumn<PartnerRow>[] = [
      {
        id: 'partner',
        header: t('columns.partner'),
        value: (r) => `${r.name} ${r.currency}`,
        cell: (r) => (
          <span>
            {r.name}
            <span className="text-muted-foreground block text-xs">
              {t('legs', { count: r.legs })} · {r.currency}
            </span>
          </span>
        ),
      },
      {
        id: 'cost',
        header: t('columns.partnerCost'),
        value: (r) => r.costMinor,
        cell: (r) => <span className="tabular">{money(r.costMinor, r.currency)}</span>,
        align: 'end',
        searchable: false,
      },
      {
        id: 'paid',
        header: t('columns.paid'),
        value: (r) => r.paidMinor,
        cell: (r) => <span className="tabular">{money(r.paidMinor, r.currency)}</span>,
        align: 'end',
        searchable: false,
      },
      {
        id: 'chargeback',
        header: t('columns.chargeback'),
        value: (r) => r.chargebackMinor,
        cell: (r) => <span className="tabular">{money(r.chargebackMinor, r.currency)}</span>,
        align: 'end',
        searchable: false,
      },
      {
        id: 'outstanding',
        header: t('columns.outstanding'),
        value: (r) => r.outstandingMinor,
        cell: (r) => (
          <span className="tabular font-medium">
            {money(r.outstandingMinor, r.currency)}
            {r.outstandingMinor < 0 ? (
              <span className="text-muted-foreground block text-xs font-normal">{t('owesUs')}</span>
            ) : null}
          </span>
        ),
        align: 'end',
        searchable: false,
      },
    ];

    return { monthColumns, modeColumns, partnerColumns };
  }, [t, tm, format, locale]);

  const totals = report?.totals ?? [];
  return (
    <div className="space-y-6">
      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <StatCard key={i} label="" value="" loading />
          ))}
        </div>
      ) : totals.length === 0 ? null : (
        totals.map((c) => (
          <div key={c.currency} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Coins}
              label={t('revenue', { currency: c.currency })}
              value={money(c.revenueMinor, c.currency)}
              hint={t('shipments', { count: c.shipments })}
            />
            <StatCard
              icon={Ship}
              label={t('partnerCost')}
              value={money(c.partnerCostMinor, c.currency)}
              hint={t('insurance', { amount: money(c.insuranceMinor, c.currency) })}
            />
            <StatCard
              icon={ShieldAlert}
              label={t('claimsNet')}
              value={money(c.claimsNetMinor, c.currency)}
            />
            <StatCard
              icon={BarChart3}
              label={t('margin')}
              value={money(c.marginMinor, c.currency)}
              hint={pct(c.marginBps)}
            />
          </div>
        ))
      )}
      {report ? (
        <p className="text-muted-foreground text-sm">
          {t('claimsCount', {
            open: report.claims.open,
            settled: report.claims.settled,
            rejected: report.claims.rejected,
          })}
        </p>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle>{t('byMonth')}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={report?.months}
            columns={monthColumns}
            loading={loading}
            error={false}
            onRetry={onRetry}
            csvName="logistics-revenue-by-month"
            empty={{ icon: BarChart3, title: t('empty'), description: t('emptyBody') }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('byMode')}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={report?.modes}
            columns={modeColumns}
            loading={loading}
            error={false}
            onRetry={onRetry}
            csvName="logistics-revenue-by-mode"
            empty={{ icon: Ship, title: t('empty'), description: t('emptyBody') }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('byPartner')}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={report?.partners}
            columns={partnerColumns}
            loading={loading}
            error={false}
            onRetry={onRetry}
            csvName="logistics-partner-costs"
            empty={{ icon: Handshake, title: t('emptyPartners'), description: t('emptyBody') }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
