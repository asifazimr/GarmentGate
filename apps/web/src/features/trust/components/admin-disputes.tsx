'use client';

import { Scale } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminDisputes } from '../api';

/** Every dispute, open ones first; each row opens the order, where staff mediate and resolve. */
export function AdminDisputes() {
  const t = useTranslations('trust.disputes');
  const format = useFormatter();
  const disputes = useAdminDisputes();

  return (
    <div className="space-y-6">
      <PageHeader title={t('admin.title')} description={t('admin.description')} />
      {disputes.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : disputes.isError ? (
        <ErrorState onRetry={() => void disputes.refetch()} retrying={disputes.isFetching} />
      ) : disputes.data.length === 0 ? (
        <EmptyState icon={Scale} title={t('admin.empty')} description={t('admin.emptyBody')} />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {disputes.data.map((d) => (
            <li key={d.id}>
              <Link
                href={`/admin/orders/${d.orderCode}`}
                className="hover:bg-surface focus-visible:ring-ring/40 flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:px-5"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="code">{d.orderCode}</Badge>
                    <StatusBadge domain="dispute" status={d.status} />
                    {d.evidenceToReview > 0 ? (
                      <Badge variant="warning">
                        {t('admin.toReview', { count: d.evidenceToReview })}
                      </Badge>
                    ) : null}
                  </div>
                  <p className="font-medium">{t(`reasons.${d.reason}`)}</p>
                  <p className="text-muted-foreground text-xs">
                    {d.buyerCode} → {d.manufacturerCode} ·{' '}
                    {format.dateTime(new Date(d.openedAt), { dateStyle: 'medium' })}
                  </p>
                </div>
                <span className="text-muted-foreground text-sm">
                  {d.assignedTo ?? t('admin.unassigned')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
