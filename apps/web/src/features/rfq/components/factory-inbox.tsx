'use client';

import type { ManufacturerRfqSummary } from '@garmentgate/shared';
import { Inbox } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useRfqInbox } from '../api';

type Filter = 'new' | 'quoted' | 'all';

/** Matched and invited RFQs; the buyer is only ever a BYR- code. */
export function FactoryInbox() {
  const t = useTranslations('rfq.inbox');
  const inbox = useRfqInbox();
  const [filter, setFilter] = useState<Filter>('new');
  const items = (inbox.data ?? []).filter((r) =>
    filter === 'all' ? true : filter === 'new' ? r.myQuote === null : r.myQuote !== null,
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <div role="group" aria-label={t('filter')} className="bg-muted inline-flex rounded-lg p-0.5">
        {(['new', 'quoted', 'all'] as const).map((f) => (
          <Button
            key={f}
            variant="ghost"
            size="sm"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(filter === f && 'bg-card hover:bg-card shadow-xs')}
          >
            {t(`filters.${f}`)}
            {inbox.data ? (
              <span className="text-muted-foreground tabular text-xs">
                {
                  inbox.data.filter((r) =>
                    f === 'all' ? true : f === 'new' ? r.myQuote === null : r.myQuote !== null,
                  ).length
                }
              </span>
            ) : null}
          </Button>
        ))}
      </div>
      {inbox.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : inbox.isError ? (
        <ErrorState onRetry={() => void inbox.refetch()} retrying={inbox.isFetching} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={t(`empty.${filter}`)}
          description={t('emptyBody')}
          action={
            <Button variant="outline" render={<Link href="/manufacturer/profile" />}>
              {t('improveMatching')}
            </Button>
          }
        />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {items.map((r) => (
            <InboxRow key={r.code} rfq={r} />
          ))}
        </ul>
      )}
    </div>
  );
}

function InboxRow({ rfq: r }: { rfq: ManufacturerRfqSummary }) {
  const t = useTranslations('rfq.inbox');
  const locale = useLocale();
  const showMoney = useMoney();
  const format = useFormatter();
  const due = new Date(r.deadline);
  return (
    <li>
      <Link
        href={`/manufacturer/rfqs/${r.code}`}
        className="hover:bg-surface focus-visible:ring-ring/40 grid gap-2 px-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5"
      >
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="code">{r.code}</Badge>
            <Badge variant="neutral">{r.buyerCode}</Badge>
            {r.reasons.includes('INVITED') ? <Badge variant="brand">{t('invited')}</Badge> : null}
            {r.myQuote ? (
              <StatusBadge domain="quote" status={r.myQuote.status} />
            ) : (
              <Badge variant="info">{t('new')}</Badge>
            )}
          </div>
          <p className="truncate font-medium">{r.title}</p>
          <p className="text-muted-foreground text-xs">
            {t('meta', {
              category: r.categoryName,
              quantity: r.quantity,
              country: r.destinationCountry ? countryName(r.destinationCountry, locale) : '—',
            })}
          </p>
        </div>
        <div className="text-start sm:text-end">
          <p className="text-sm font-medium">
            {t('due', { date: format.dateTime(due, { dateStyle: 'medium' }) })}
          </p>
          {r.myQuote ? (
            <p className="text-muted-foreground tabular text-xs">
              {t('yourPrice', { price: showMoney(r.myQuote.unitPriceMinor, r.currency) })}
            </p>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
