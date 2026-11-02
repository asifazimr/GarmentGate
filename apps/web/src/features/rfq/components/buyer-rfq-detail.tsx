'use client';

import type { BuyerQuote, BuyerRfqDetail as Detail } from '@garmentgate/shared';
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileSearch,
  Inbox,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError, apiSend } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useAcceptQuote, useBuyerRfq } from '../api';
import { OpenThreadButton } from '@/features/chat/components/open-thread-button';
import { AttachmentList } from './attachment-list';

const BADGE_ICON = { BEST_VALUE: Trophy, LOWEST_PRICE: Sparkles, FASTEST: Zap } as const;

export function BuyerRfqDetail({ code }: { code: string }) {
  const t = useTranslations('rfq.buyerDetail');
  const rfq = useBuyerRfq(code);

  if (rfq.isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }
  if (rfq.isError) {
    return rfq.error instanceof ApiError && rfq.error.status === 404 ? (
      <EmptyState
        icon={FileSearch}
        title={t('notFound')}
        action={<Button render={<Link href="/buyer/rfqs" />}>{t('back')}</Button>}
      />
    ) : (
      <ErrorState onRetry={() => void rfq.refetch()} retrying={rfq.isFetching} />
    );
  }
  return <DetailView rfq={rfq.data} />;
}

function DetailView({ rfq }: { rfq: Detail }) {
  const t = useTranslations('rfq.buyerDetail');
  const ti = useTranslations('rfq.wizard.incoterms');
  const locale = useLocale();
  const showMoney = useMoney();
  const format = useFormatter();
  const [accepting, setAccepting] = useState<BuyerQuote | null>(null);
  const date = (iso: string | null) =>
    iso ? format.dateTime(new Date(iso), { dateStyle: 'medium' }) : '—';
  const money = (minor: number) => showMoney(minor, rfq.currency);
  const canAccept = rfq.status === 'OPEN' || rfq.status === 'CLOSED';
  const live = rfq.quotes.filter((q) => q.status === 'OFFERED');

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" className="-ms-2" render={<Link href="/buyer/rfqs" />}>
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="code">{rfq.code}</Badge>
          <StatusBadge domain="rfq" status={rfq.status} />
          <Badge variant="brand">{rfq.category.name}</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
          {rfq.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground text-sm">
            {t('reached', { count: rfq.factoriesReached })} ·{' '}
            {t('quotesDue', { date: date(rfq.deadline) })}
          </p>
          <OpenThreadButton target={{ rfqCode: rfq.code }} base="/buyer" />
        </div>
      </header>

      {rfq.orderCode ? (
        <div className="bg-success-soft text-success-ink flex flex-wrap items-center gap-3 rounded-xl p-4">
          <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
          <p className="flex-1 text-sm font-medium">{t('awarded', { order: rfq.orderCode })}</p>
          <Button variant="outline" size="sm" render={<Link href="/buyer/orders" />}>
            {t('viewOrders')}
          </Button>
        </div>
      ) : null}

      <section aria-labelledby="quotes-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="quotes-heading" className="text-lg font-semibold tracking-[-0.01em]">
              {t('quotes')}
            </h2>
            <p className="text-muted-foreground text-sm">{t('quotesBody')}</p>
          </div>
          <p className="text-muted-foreground text-sm">{t('offerCount', { count: live.length })}</p>
        </div>
        {rfq.quotes.length === 0 ? (
          <EmptyState
            size="compact"
            icon={Inbox}
            title={t('noQuotes')}
            description={t('noQuotesBody', { date: date(rfq.deadline) })}
          />
        ) : (
          <>
            {/* Desktop: side-by-side comparison table */}
            <div className="bg-card hidden overflow-x-auto rounded-xl border shadow-xs lg:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-start text-xs">
                    <th scope="col" className="p-3 text-start font-medium">
                      {t('factory')}
                    </th>
                    <th scope="col" className="p-3 text-end font-medium">
                      {t('unitPrice')}
                    </th>
                    <th scope="col" className="p-3 text-end font-medium">
                      {t('total', { quantity: rfq.quantity })}
                    </th>
                    <th scope="col" className="p-3 text-end font-medium">
                      {t('leadTime')}
                    </th>
                    <th scope="col" className="p-3 text-end font-medium">
                      {t('score')}
                    </th>
                    <th scope="col" className="p-3 text-start font-medium">
                      {t('certifications')}
                    </th>
                    <th scope="col" className="p-3">
                      <span className="sr-only">{t('actions')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rfq.quotes.map((q) => (
                    <tr
                      key={q.id}
                      className={cn(
                        q.badges.includes('BEST_VALUE') && 'bg-primary-soft/40',
                        q.status !== 'OFFERED' && q.status !== 'ACCEPTED' && 'opacity-60',
                      )}
                    >
                      <td className="p-3 align-top">
                        <FactoryCell quote={q} />
                      </td>
                      <td className="tabular p-3 text-end align-top font-semibold">
                        {money(q.unitPriceMinor)}
                      </td>
                      <td className="tabular p-3 text-end align-top">{money(q.totalMinor)}</td>
                      <td className="tabular p-3 text-end align-top">
                        {t('days', { count: q.leadTimeDays })}
                      </td>
                      <td className="tabular p-3 text-end align-top">
                        {q.manufacturer.performanceScore}
                      </td>
                      <td className="p-3 align-top">
                        <Certs quote={q} />
                      </td>
                      <td className="p-3 text-end align-top">
                        <QuoteAction
                          quote={q}
                          canAccept={canAccept}
                          onAccept={() => setAccepting(q)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: one card per offer */}
            <ul className="grid gap-3 lg:hidden">
              {rfq.quotes.map((q) => (
                <li
                  key={q.id}
                  className={cn(
                    'bg-card space-y-3 rounded-xl border p-4 shadow-xs',
                    q.badges.includes('BEST_VALUE') && 'border-primary ring-primary/20 ring-2',
                    q.status !== 'OFFERED' && q.status !== 'ACCEPTED' && 'opacity-60',
                  )}
                >
                  <FactoryCell quote={q} />
                  <dl className="grid grid-cols-3 gap-2 text-center">
                    <Stat label={t('unitPrice')} value={money(q.unitPriceMinor)} strong />
                    <Stat label={t('leadTime')} value={t('days', { count: q.leadTimeDays })} />
                    <Stat label={t('score')} value={String(q.manufacturer.performanceScore)} />
                  </dl>
                  <p className="text-muted-foreground text-sm">
                    {t('total', { quantity: rfq.quantity })}:{' '}
                    <span className="text-foreground tabular font-medium">
                      {money(q.totalMinor)}
                    </span>
                  </p>
                  <Certs quote={q} />
                  <QuoteAction
                    quote={q}
                    canAccept={canAccept}
                    onAccept={() => setAccepting(q)}
                    block
                  />
                </li>
              ))}
            </ul>
            <p className="text-subtle-foreground text-xs">{t('priceNote')}</p>
          </>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card size="sm">
          <CardHeader>
            <CardTitle>{t('request')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {rfq.description}
            </p>
            {rfq.attachments.length > 0 ? (
              <AttachmentList files={rfq.attachments} showReview />
            ) : null}
          </CardContent>
        </Card>
        <Card size="sm" className="h-fit">
          <CardHeader>
            <CardTitle>{t('terms')}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y text-sm">
              {[
                [t('quantityLabel'), `${format.number(rfq.quantity)} pcs`],
                [
                  t('target'),
                  rfq.targetUnitPriceMinor !== null ? money(rfq.targetUnitPriceMinor) : '—',
                ],
                [t('quotesDueLabel'), date(rfq.deadline)],
                [t('delivery'), date(rfq.requiredDeliveryDate)],
                [
                  t('destination'),
                  rfq.destinationCountry ? countryName(rfq.destinationCountry, locale) : '—',
                ],
                [t('incoterm'), rfq.incoterm ? `${rfq.incoterm} · ${ti(rfq.incoterm)}` : '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-end font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>

      <AcceptDialog rfq={rfq} quote={accepting} onClose={() => setAccepting(null)} />
    </div>
  );
}

function FactoryCell({ quote: q }: { quote: BuyerQuote }) {
  const t = useTranslations('rfq.buyerDetail');
  const locale = useLocale();
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="code">{q.manufacturer.code}</Badge>
        {q.status !== 'OFFERED' ? <StatusBadge domain="quote" status={q.status} /> : null}
      </div>
      <p className="text-muted-foreground text-xs">{countryName(q.manufacturer.country, locale)}</p>
      {q.badges.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {q.badges.map((b) => {
            const Icon = BADGE_ICON[b];
            return (
              <Badge key={b} variant={b === 'BEST_VALUE' ? 'default' : 'brand'}>
                <Icon aria-hidden="true" />
                {t(`badges.${b}`)}
              </Badge>
            );
          })}
        </div>
      ) : null}
      {q.notes ? (
        <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">“{q.notes}”</p>
      ) : null}
    </div>
  );
}

function Certs({ quote: q }: { quote: BuyerQuote }) {
  const tcert = useTranslations('certifications');
  if (q.manufacturer.certifications.length === 0)
    return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <ul className="flex flex-wrap gap-1">
      {q.manufacturer.certifications.map((c) => (
        <li key={c}>
          <Badge variant="success">
            <BadgeCheck aria-hidden="true" />
            {tcert(c)}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function Stat({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="bg-surface rounded-lg p-2">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className={cn('tabular', strong ? 'font-semibold' : 'font-medium')}>{value}</dd>
    </div>
  );
}

function QuoteAction({
  quote: q,
  canAccept,
  onAccept,
  block = false,
}: {
  quote: BuyerQuote;
  canAccept: boolean;
  onAccept: () => void;
  block?: boolean;
}) {
  const t = useTranslations('rfq.buyerDetail');
  const format = useFormatter();
  if (q.status === 'ACCEPTED') return <StatusBadge domain="quote" status="ACCEPTED" />;
  if (q.status !== 'OFFERED' || !canAccept) return null;
  return (
    <div className={cn('space-y-1', block ? '' : 'text-end')}>
      <Button
        size="sm"
        className={cn(block && 'w-full')}
        onClick={onAccept}
        variant={q.badges.includes('BEST_VALUE') ? 'default' : 'outline'}
      >
        {t('accept')}
      </Button>
      {q.validUntil ? (
        <p className="text-subtle-foreground inline-flex items-center gap-1 text-xs">
          <Clock className="size-3" aria-hidden="true" />
          {t('validUntil', {
            date: format.dateTime(new Date(q.validUntil), { dateStyle: 'medium' }),
          })}
        </p>
      ) : null}
    </div>
  );
}

function AcceptDialog({
  rfq,
  quote,
  onClose,
}: {
  rfq: Detail;
  quote: BuyerQuote | null;
  onClose: () => void;
}) {
  const t = useTranslations('rfq.buyerDetail');
  const tc = useTranslations('common');
  const locale = useLocale();
  const showMoney = useMoney();
  const router = useRouter();
  const accept = useAcceptQuote(rfq.code);
  const [error, setError] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  // Most buyers order straight from an approved catalog style: confirm and pay in one go.
  const confirmAndPay = async (code: string) => {
    setConfirming(true);
    setError(null);
    try {
      await apiSend(`/orders/${code}/transition`, {
        method: 'POST',
        body: { to: 'DEPOSIT_PENDING' },
      });
      router.push(`/buyer/orders/${code}?pay=deposit`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : tc('networkError'));
      setConfirming(false);
    }
  };
  const close = () => {
    setError(null);
    setOrderCode(null);
    onClose();
  };

  return (
    <Dialog open={quote !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        {orderCode ? (
          <div className="grid gap-5">
            <div className="flex flex-col items-center gap-3 pt-2 text-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                className="bg-success-soft text-success-ink flex size-12 items-center justify-center rounded-full"
              >
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </motion.span>
              <DialogTitle>{t('acceptedTitle')}</DialogTitle>
              <DialogDescription>{t('acceptedBody', { order: orderCode })}</DialogDescription>
            </div>
            <FormAlert message={error} />
            <DialogFooter>
              <Button
                variant="outline"
                render={<Link href={`/buyer/orders/${orderCode}`} />}
                disabled={confirming}
              >
                {t('sampleFirst')}
              </Button>
              <Button disabled={confirming} onClick={() => void confirmAndPay(orderCode)}>
                {confirming ? t('confirming') : t('confirmAndPay')}
              </Button>
            </DialogFooter>
          </div>
        ) : quote ? (
          <div className="grid gap-5">
            <DialogHeader>
              <DialogTitle>{t('acceptTitle', { code: quote.manufacturer.code })}</DialogTitle>
              <DialogDescription>{t('acceptBody')}</DialogDescription>
            </DialogHeader>
            <FormAlert message={error} />
            <dl className="bg-surface divide-y rounded-lg border text-sm">
              {[
                [t('unitPrice'), showMoney(quote.unitPriceMinor, quote.currency)],
                [t('quantityLabel'), `${rfq.quantity.toLocaleString(locale)} pcs`],
                [t('totalLabel'), showMoney(quote.totalMinor, quote.currency)],
                [t('leadTime'), t('days', { count: quote.leadTimeDays })],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 px-3 py-2">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="tabular font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                {tc('cancel')}
              </Button>
              <Button
                disabled={accept.isPending}
                onClick={() =>
                  accept.mutate(quote.id, {
                    onSuccess: (res) => setOrderCode(res.orderCode),
                    onError: (err) =>
                      setError(err instanceof ApiError ? err.message : tc('networkError')),
                  })
                }
              >
                {accept.isPending ? t('accepting') : t('confirmAccept')}
              </Button>
            </DialogFooter>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
