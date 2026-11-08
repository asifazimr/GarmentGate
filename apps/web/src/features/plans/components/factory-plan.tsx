'use client';

import {
  type FactoryPlan,
  type PaidTier,
  type PlanInterval,
  PlanTierSchema,
  priceOf,
} from '@garmentgate/shared';
import { Check, CreditCard, Sparkles } from 'lucide-react';
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
import { useCancelPlan, useCheckout, useFactoryPlan } from '../api';

/** The factory's plan: compare Free / Pro / Premium, pay by card, cancel, see invoices. */
export function FactoryPlanPage() {
  const t = useTranslations('plans.factory');
  const returned = useClientSearchParam('checkout');
  // Back from Stripe: the webhook may land a moment later, so keep checking briefly.
  const plan = useFactoryPlan(returned === 'success');
  const waiting = returned === 'success' && plan.data?.subscription === null;

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
      {plan.isPending ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      ) : plan.isError ? (
        <ErrorState onRetry={() => void plan.refetch()} retrying={plan.isFetching} />
      ) : (
        <PlanView plan={plan.data} />
      )}
    </div>
  );
}

function PlanView({ plan }: { plan: FactoryPlan }) {
  const t = useTranslations('plans.factory');
  const tt = useTranslations('plans.tiers');
  const locale = useLocale();
  const format = useFormatter();
  const [interval, setBilling] = useState<PlanInterval>(plan.subscription?.interval ?? 'MONTH');
  const checkout = useCheckout();
  const cancel = useCancelPlan();
  const sub = plan.subscription;

  const upgrade = async (tier: PaidTier) => {
    try {
      const { url } = await checkout.mutateAsync({ tier, interval });
      window.location.assign(url);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t('checkoutFailed'));
    }
  };

  const limit = plan.terms[plan.tier].maxProducts;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Sparkles className="size-4" aria-hidden="true" />
            {t('current', { tier: tt(plan.tier) })}
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
                : t('freeBody')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground tabular">
            {limit === null
              ? t('listedUnlimited', { count: plan.listedProducts })
              : t('listed', { count: plan.listedProducts, max: limit })}
          </span>
          {sub?.source === 'STRIPE' && !sub.cancelAtPeriodEnd ? (
            <Button
              variant="outline"
              disabled={cancel.isPending}
              onClick={() =>
                cancel
                  .mutateAsync()
                  .then(() => toast.success(t('cancelled')))
                  .catch((err: unknown) =>
                    toast.error(err instanceof ApiError ? err.message : t('checkoutFailed')),
                  )
              }
            >
              {t('cancel')}
            </Button>
          ) : null}
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">{t('compare')}</h2>
        <div
          role="group"
          aria-label={t('billing')}
          className="bg-surface flex rounded-lg border p-1"
        >
          {(['MONTH', 'YEAR'] as const).map((i) => (
            <button
              key={i}
              type="button"
              aria-pressed={interval === i}
              onClick={() => setBilling(i)}
              className={cn(
                'focus-visible:ring-ring/40 min-h-11 rounded-md px-4 text-sm outline-none focus-visible:ring-3 md:min-h-8',
                interval === i ? 'bg-card shadow-xs font-medium' : 'text-muted-foreground',
              )}
            >
              {t(`interval.${i}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PlanTierSchema.options.map((tier) => {
          const terms = plan.terms[tier];
          const price = priceOf(terms, interval);
          const current = plan.tier === tier;
          const perks = [
            terms.maxProducts === null
              ? t('perks.unlimited')
              : t('perks.products', { count: terms.maxProducts }),
            terms.searchBoost > 0 ? t('perks.boost', { level: terms.searchBoost }) : null,
            terms.markupDiscountBps > 0
              ? t('perks.markup', {
                  points: format.number(terms.markupDiscountBps / 100, {
                    maximumFractionDigits: 2,
                  }),
                })
              : null,
            terms.rfqHeadStart
              ? t('perks.headStart', { hours: plan.rfqHeadStartHours })
              : plan.rfqHeadStartHours > 0
                ? t('perks.waits', { hours: plan.rfqHeadStartHours })
                : null,
          ].filter((p): p is string => p !== null);
          return (
            <Card key={tier} className={cn(current && 'border-primary ring-primary/20 ring-2')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {tt(tier)}
                  {current ? <Badge variant="info">{t('yourPlan')}</Badge> : null}
                </CardTitle>
                <p className="tabular text-2xl font-semibold">
                  {price === 0 ? t('free') : formatMoney(price, 'USD', locale)}
                  {price > 0 ? (
                    <span className="text-muted-foreground text-sm font-normal">
                      {' '}
                      {t(`per.${interval}`)}
                    </span>
                  ) : null}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check
                        className="text-success-ink mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                {tier !== 'FREE' && !current && plan.cardEnabled ? (
                  <Button
                    className="w-full"
                    disabled={checkout.isPending || sub?.source === 'MANUAL'}
                    onClick={() => void upgrade(tier)}
                  >
                    <CreditCard />
                    {t('upgrade', { tier: tt(tier) })}
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
      {!plan.cardEnabled || sub?.source === 'MANUAL' ? (
        <p className="text-muted-foreground text-sm">{t('byTransfer')}</p>
      ) : (
        <p className="text-muted-foreground text-xs">{t('stripeNote')}</p>
      )}

      {plan.invoices.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-[-0.01em]">{t('invoices')}</h2>
          <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
            {plan.invoices.map((i) => (
              <li
                key={i.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm sm:px-5"
              >
                <span>{format.dateTime(new Date(i.paidAt), { dateStyle: 'medium' })}</span>
                <span className="tabular">{formatMoney(i.amountMinor, i.currency, locale)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
