'use client';

import type { AdminKycCompany, KycStatus } from '@garmentgate/shared';
import { CheckCheck, Inbox } from 'lucide-react';
import { useFormatter, useLocale, useNow, useTranslations } from 'next-intl';
import { useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { countryName } from '@/lib/countries';
import { useKycQueue } from '../api';
import { KycReviewDialog } from './kyc-review-dialog';

const TABS = ['PENDING_REVIEW', 'REJECTED', 'VERIFIED'] as const satisfies readonly KycStatus[];

export function KycQueue() {
  const t = useTranslations('admin');
  const [status, setStatus] = useState<(typeof TABS)[number]>('PENDING_REVIEW');
  const [selected, setSelected] = useState<string | null>(null);
  const queue = useKycQueue(status);

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('subtitle')} />

      <Tabs
        value={status}
        onValueChange={(value) => {
          const tab = TABS.find((candidate) => candidate === value);
          if (tab) setStatus(tab);
        }}
      >
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {t(`tabs.${tab}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <section aria-busy={queue.isPending} aria-live="polite">
        {queue.isPending ? (
          <QueueSkeleton />
        ) : queue.isError ? (
          <ErrorState
            description={queue.error.message}
            onRetry={() => void queue.refetch()}
            retrying={queue.isFetching}
          />
        ) : queue.data.length === 0 ? (
          <EmptyState
            icon={status === 'PENDING_REVIEW' ? CheckCheck : Inbox}
            title={status === 'PENDING_REVIEW' ? t('emptyPending') : t('empty')}
          />
        ) : (
          <ul className="bg-card divide-y rounded-xl border shadow-xs">
            {queue.data.map((company) => (
              <QueueRow
                key={company.id}
                company={company}
                onReview={() => setSelected(company.id)}
              />
            ))}
          </ul>
        )}
      </section>
      <KycReviewDialog companyId={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function QueueRow({ company, onReview }: { company: AdminKycCompany; onReview: () => void }) {
  const t = useTranslations('admin');
  const format = useFormatter();
  const locale = useLocale();
  // Re-renders every minute so "3 minutes ago" stays true.
  const now = useNow({ updateInterval: 60_000 });
  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium">{company.legalName}</p>
          <Badge variant="code">{company.publicCode ?? '—'}</Badge>
          <Badge variant="neutral">{t(`types.${company.type}`)}</Badge>
          <StatusBadge domain="kyc" status={company.kycStatus} />
        </div>
        <p className="text-muted-foreground text-sm">
          {countryName(company.country, locale)}
          {company.owner ? ` · ${company.owner.name} · ${company.owner.email}` : ''}
          {company.owner && !company.owner.emailVerified ? ` · ${t('emailUnverified')}` : ''}
        </p>
        <p className="text-muted-foreground text-sm">
          {company.submittedAt
            ? `${t('columns.submitted')}: ${format.relativeTime(new Date(company.submittedAt), now)}`
            : null}
          {` · ${t('columns.documents')}: ${company.documentCount + company.certificationCount}`}
        </p>
      </div>
      <Button variant="outline" onClick={onReview} className="w-full sm:w-auto">
        {t('review')}
      </Button>
    </li>
  );
}

function QueueSkeleton() {
  return (
    <ul className="bg-card divide-y rounded-xl border">
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i} className="flex items-center gap-6 p-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
          <Skeleton className="h-9 w-24" />
        </li>
      ))}
    </ul>
  );
}
