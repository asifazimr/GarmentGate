'use client';

import type { MediaReviewItem } from '@garmentgate/shared';
import { Check, ExternalLink, FileText, ShieldCheck, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaReviewQueue, useReviewMedia } from '../api';

/** Sanitized files waiting for a human check (logos, labels, faces, brand names). */
export function AdminMediaReview() {
  const t = useTranslations('rfq.review');
  const queue = useMediaReviewQueue();

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {queue.isPending ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i}>
              <Skeleton className="h-72 rounded-xl" />
            </li>
          ))}
        </ul>
      ) : queue.isError ? (
        <ErrorState onRetry={() => void queue.refetch()} retrying={queue.isFetching} />
      ) : queue.data.length === 0 ? (
        <EmptyState icon={ShieldCheck} title={t('empty')} description={t('emptyBody')} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {queue.data.map((item) => (
            <ReviewCard key={`${item.kind}-${item.id}`} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewCard({ item }: { item: MediaReviewItem }) {
  const t = useTranslations('rfq.review');
  const review = useReviewMedia();
  const decide = (decision: 'approve' | 'reject') =>
    review.mutate(
      {
        kind: item.kind,
        id: item.id,
        decision,
        ...(decision === 'reject' && { note: t('rejectNote') }),
      },
      {
        onSuccess: () => toast.success(decision === 'approve' ? t('approved') : t('rejected')),
        onError: () => toast.error(t('failed')),
      },
    );

  return (
    <li className="bg-card flex flex-col overflow-hidden rounded-xl border shadow-xs">
      <div className="bg-muted relative aspect-[4/3]">
        {item.urls ? (
          // eslint-disable-next-line @next/next/no-img-element -- short-lived signed rendition URL
          <img src={item.urls.medium} alt="" className="size-full object-contain" />
        ) : (
          <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-2 text-sm">
            <FileText className="size-8" aria-hidden="true" />
            {t('document')}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="brand">{t(`kinds.${item.kind}`)}</Badge>
          <Badge variant="code">{item.ownerCode}</Badge>
        </div>
        {item.context ? (
          <p className="text-muted-foreground line-clamp-2 text-sm">{item.context}</p>
        ) : null}
        {item.documentUrl || item.urls ? (
          <Button
            variant="outline"
            size="sm"
            render={
              <a
                href={item.documentUrl ?? item.urls?.large ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <ExternalLink />
            {t('open')}
          </Button>
        ) : null}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button variant="outline" disabled={review.isPending} onClick={() => decide('reject')}>
            <X />
            {t('reject')}
          </Button>
          <Button disabled={review.isPending} onClick={() => decide('approve')}>
            <Check />
            {t('approve')}
          </Button>
        </div>
      </div>
    </li>
  );
}
