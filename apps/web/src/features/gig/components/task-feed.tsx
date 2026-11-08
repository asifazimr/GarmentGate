'use client';

import { ClipboardList, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { useClaim, useTasks } from '../api';

/** Open inspections near the inspector, nearest first: claim one and it becomes a job. */
export function TaskFeed() {
  const t = useTranslations('gig.tasks');
  const tq = useTranslations('qc');
  const format = useFormatter();
  const locale = useLocale();
  const money = useMoney();
  const router = useRouter();
  const tasks = useTasks();
  const claim = useClaim();

  const take = async (id: string) => {
    try {
      await claim.mutateAsync(id);
      toast.success(t('claimed'));
      router.push(`/inspector/inspections/${id}`);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t('claimFailed'));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {tasks.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : tasks.isError ? (
        <ErrorState onRetry={() => void tasks.refetch()} retrying={tasks.isFetching} />
      ) : tasks.data.length === 0 ? (
        <EmptyState icon={ClipboardList} title={t('empty')} description={t('emptyBody')} />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {tasks.data.map((task) => (
            <li
              key={task.inspectionId}
              className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5"
            >
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="code">{task.orderCode}</Badge>
                  <span className="text-muted-foreground text-xs">{tq(`types.${task.type}`)}</span>
                  <Badge variant="success">{money(task.payUsdMinor, 'USD')}</Badge>
                </div>
                <p className="truncate font-medium">{task.title}</p>
                <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {[task.factory.city, countryName(task.factory.country, locale)]
                      .filter(Boolean)
                      .join(', ')}
                    {task.distanceKm !== null
                      ? ` · ${t('distance', { km: format.number(task.distanceKm, { maximumFractionDigits: 0 }) })}`
                      : null}
                  </span>
                  <span className="tabular">{t('pieces', { count: task.quantity })}</span>
                  <span>
                    {task.scheduledAt
                      ? tq('scheduledFor', {
                          date: format.dateTime(new Date(task.scheduledAt), {
                            dateStyle: 'medium',
                          }),
                        })
                      : tq('notScheduled')}
                  </span>
                </p>
              </div>
              <Button
                onClick={() => void take(task.inspectionId)}
                disabled={claim.isPending}
                className="sm:w-auto"
              >
                {t('claim')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
