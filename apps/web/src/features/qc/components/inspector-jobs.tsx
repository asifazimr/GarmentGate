'use client';

import { ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { countryName } from '@/lib/countries';
import { useInspectorJobs } from '../api';

/** An inspector's jobs: open ones first, by date; staff see every open inspection. */
export function InspectorJobs() {
  const t = useTranslations('qc.inspector');
  const tq = useTranslations('qc');
  const format = useFormatter();
  const locale = useLocale();
  const jobs = useInspectorJobs();

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {jobs.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : jobs.isError ? (
        <ErrorState onRetry={() => void jobs.refetch()} retrying={jobs.isFetching} />
      ) : jobs.data.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title={t('empty')} description={t('emptyBody')} />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {jobs.data.map((j) => (
            <li key={j.id}>
              <Link
                href={`/inspector/inspections/${j.id}`}
                className="hover:bg-surface focus-visible:ring-ring/40 grid gap-2 px-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-center sm:px-5"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="code">{j.orderCode}</Badge>
                    <StatusBadge domain="inspection" status={j.result} />
                    <span className="text-muted-foreground text-xs">{tq(`types.${j.type}`)}</span>
                  </div>
                  <p className="truncate font-medium">{j.title}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {j.factory.name} · {j.factory.address || countryName(j.factory.country, locale)}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm sm:text-end">
                  {j.inspectedAt
                    ? tq('inspectedOn', {
                        date: format.dateTime(new Date(j.inspectedAt), { dateStyle: 'medium' }),
                      })
                    : j.scheduledAt
                      ? tq('scheduledFor', {
                          date: format.dateTime(new Date(j.scheduledAt), { dateStyle: 'medium' }),
                        })
                      : tq('notScheduled')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
