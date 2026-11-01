'use client';

import { FilePlus2, FileText } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/lib/format';
import { useBuyerRfqs } from '../api';

export function BuyerRfqList() {
  const t = useTranslations('rfq.buyerList');
  const locale = useLocale();
  const format = useFormatter();
  const rfqs = useBuyerRfqs();
  const newButton = (
    <Button render={<Link href="/buyer/rfqs/new" />}>
      <FilePlus2 />
      {t('new')}
    </Button>
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} actions={newButton} />
      {rfqs.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : rfqs.isError ? (
        <ErrorState onRetry={() => void rfqs.refetch()} retrying={rfqs.isFetching} />
      ) : rfqs.data.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={t('empty')}
          description={t('emptyBody')}
          action={newButton}
        />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {rfqs.data.map((r) => (
            <li key={r.code}>
              <Link
                href={`/buyer/rfqs/${r.code}`}
                className="hover:bg-surface focus-visible:ring-ring/40 grid gap-2 px-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="code">{r.code}</Badge>
                    <StatusBadge domain="rfq" status={r.status} />
                    {r.orderCode ? <Badge variant="code">{r.orderCode}</Badge> : null}
                  </div>
                  <p className="truncate font-medium">{r.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {t('meta', {
                      category: r.categoryName,
                      quantity: r.quantity,
                      date: format.dateTime(new Date(r.deadline), { dateStyle: 'medium' }),
                    })}
                  </p>
                </div>
                <div className="flex items-baseline gap-4 sm:text-end">
                  <div>
                    <p className="tabular text-lg font-semibold">{r.offers}</p>
                    <p className="text-muted-foreground text-xs">
                      {t('offers', { count: r.offers })}
                    </p>
                  </div>
                  <div>
                    <p className="tabular text-lg font-semibold">
                      {r.bestUnitPriceMinor !== null
                        ? formatMoney(r.bestUnitPriceMinor, r.currency, locale)
                        : '—'}
                    </p>
                    <p className="text-muted-foreground text-xs">{t('best')}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
