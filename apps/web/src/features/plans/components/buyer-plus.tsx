'use client';

import type { BuyerPlus, PlanInterval } from '@garmentgate/shared';
import { Check, CreditCard, Crown } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiError } from '@/lib/api';
import { useClientSearchParam } from '@/lib/client-hooks';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useBuyerPlus, useCancelPlus, usePlusCheckout } from '../plus-api';

/** The buyer's GarmentGate Plus: what it includes, join by card, cancel, payments. */
export function BuyerPlusPage() {
  const t = useTranslations('plans.plus');
  const returned = useClientSearchParam('checkout');
  const plus = useBuyerPlus(returned === 'success');
  const waiting = returned === 'success' && plus.data?.active === false;
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {returned === 'success' ? (
        <p className="bg-success-soft text-success-ink rounded-lg px-4 py-3 text-sm" role="status">
          {waiting ? t('activating') : t('thanks')}
        </p>
      ) : returned === 'cancelled' ? (
        <p className="bg-surface text-muted-foreground rounded-lg px-4 py-3 text-sm">
          {t('notCharged')}
        </p>
      ) : null}
      {plus.isPending ? (
        <Skeleton className="h-96 rounded-xl" />
      ) : plus.isError ? (
        <ErrorState onRetry={() => void plus.refetch()} retrying={plus.isFetching} />
      ) : (
        <PlusView plus={plus.data} />
      )}
    </div>
  );
}

function PlusView({ plus }: { plus: BuyerPlus }) {
  const t = useTranslations('plans.plus');
  const locale = useLocale();
  const format = useFormatter();
  const [interval, setBilling] = useState<PlanInterval>(plus.subscription?.interval ?? 'YEAR');
  const checkout = usePlusCheckout();
  const cancel = useCancelPlus();
  const s = plus.settings;
  const sub = plus.subscription;
  const price = interval === 'YEAR' ? s.yearlyUsdMinor : s.monthlyUsdMinor;
  const perks = [
    s.freeInspections ? t('perks.inspections') : null,
    s.sampleDiscountBps > 0
      ? s.sampleDiscountBps >= 10_000
        ? t('perks.freeSamples')
        : t('perks.samples', {
            percent: format.number(s.sampleDiscountBps / 100, { maximumFractionDigits: 1 }),
          })
      : null,
    s.priorityRfqs ? t('perks.priority') : null,
    s.merchandiser ? t('perks.merchandiser') : null,
  ].filter((p): p is string => p !== null);

  const join = async () => {
    try {
      const { url } = await checkout.mutateAsync({ interval });
      window.location.assign(url);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t('failed'));
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <Card className={cn(plus.active && 'border-primary ring-primary/20 ring-2')}>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Crown className="size-4" aria-hidden="true" />
            {t('name')}
            {plus.active ? <Badge variant="success">{t('member')}</Badge> : null}
            {sub?.status === 'PAST_DUE' ? <Badge variant="warning">{t('pastDue')}</Badge> : null}
            {sub?.cancelAtPeriodEnd ? <Badge variant="neutral">{t('ending')}</Badge> : null}
          </CardTitle>
          <CardDescription>
            {sub?.currentPeriodEnd
              ? t(sub.cancelAtPeriodEnd || sub.source === 'MANUAL' ? 'endsOn' : 'renewsOn', {
                  date: format.dateTime(new Date(sub.currentPeriodEnd), { dateStyle: 'medium' }),
                })
              : sub?.source === 'MANUAL'
                ? t('byGarmentGate')
                : t('pitch')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <ul className="space-y-2 text-sm">
            {perks.map((p) => (
              <li key={p} className="flex gap-2">
                <Check className="text-success-ink mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          {plus.active ? (
            sub?.source === 'STRIPE' && !sub.cancelAtPeriodEnd ? (
              <Button
                variant="outline"
                disabled={cancel.isPending}
                onClick={() =>
                  cancel
                    .mutateAsync()
                    .then(() => toast.success(t('cancelled')))
                    .catch((err: unknown) =>
                      toast.error(err instanceof ApiError ? err.message : t('failed')),
                    )
                }
              >
                {t('cancel')}
              </Button>
            ) : null
          ) : (
            <div className="space-y-4">
              <div
                role="group"
                aria-label={t('billing')}
                className="bg-surface inline-flex rounded-lg border p-1"
              >
                {(['MONTH', 'YEAR'] as const).map((i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={interval === i}
                    onClick={() => setBilling(i)}
                    className={cn(
                      'focus-visible:ring-ring/40 min-h-11 rounded-md px-4 text-sm outline-none focus-visible:ring-3 md:min-h-8',
                      interval === i ? 'bg-card font-medium shadow-xs' : 'text-muted-foreground',
                    )}
                  >
                    {t(`interval.${i}`)}
                  </button>
                ))}
              </div>
              <p className="tabular text-2xl font-semibold">
                {formatMoney(price, 'USD', locale)}
                <span className="text-muted-foreground text-sm font-normal">
                  {' '}
                  {t(`per.${interval}`)}
                </span>
              </p>
              {plus.cardEnabled ? (
                <Button onClick={() => void join()} disabled={checkout.isPending || price <= 0}>
                  <CreditCard />
                  {t('join')}
                </Button>
              ) : (
                <p className="text-muted-foreground text-sm">{t('byTransfer')}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <aside className="space-y-4">
        <Card size="sm">
          <CardHeader>
            <CardTitle>{t('merchandiserTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {plus.merchandiser ?? (
              <span className="text-muted-foreground">
                {plus.active ? t('merchandiserSoon') : t('merchandiserNone')}
              </span>
            )}
          </CardContent>
        </Card>
        {plus.invoices.length > 0 ? (
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('payments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y text-sm">
                {plus.invoices.map((i) => (
                  <li key={i.id} className="flex justify-between gap-2 py-2">
                    <span>{format.dateTime(new Date(i.paidAt), { dateStyle: 'medium' })}</span>
                    <span className="tabular">
                      {formatMoney(i.amountMinor, i.currency, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}
      </aside>
    </div>
  );
}
