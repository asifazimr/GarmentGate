'use client';

import type { AdminKycCompany, KycStatus } from '@garmentgate/shared';
import { AlertTriangle, Inbox } from 'lucide-react';
import { useFormatter, useLocale, useNow, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/features/account/components/app-header';
import { countryName } from '@/lib/countries';
import { cn } from '@/lib/utils';
import { useKycQueue } from '../api';
import { KycReviewDialog } from './kyc-review-dialog';

const TABS = ['PENDING_REVIEW', 'REJECTED', 'VERIFIED'] as const satisfies readonly KycStatus[];

export function KycQueue() {
  const t = useTranslations('admin');
  const tc = useTranslations('common');
  const [status, setStatus] = useState<(typeof TABS)[number]>('PENDING_REVIEW');
  const [selected, setSelected] = useState<string | null>(null);
  const queue = useKycQueue(status);

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </header>

        <div role="tablist" aria-label={t('title')} className="bg-muted inline-flex rounded-lg p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={status === tab}
              onClick={() => setStatus(tab)}
              className={cn(
                'min-h-11 rounded-md px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-9',
                status === tab
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        <section role="tabpanel" aria-busy={queue.isPending}>
          {queue.isPending ? (
            <QueueSkeleton />
          ) : queue.isError ? (
            <Alert variant="destructive">
              <AlertTriangle />
              <AlertTitle>{t('title')}</AlertTitle>
              <AlertDescription>{queue.error.message}</AlertDescription>
              <AlertAction>
                <Button variant="outline" size="sm" onClick={() => void queue.refetch()}>
                  {tc('retry')}
                </Button>
              </AlertAction>
            </Alert>
          ) : queue.data.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center">
              <Inbox className="size-8" aria-hidden="true" />
              <p>{status === 'PENDING_REVIEW' ? t('emptyPending') : t('empty')}</p>
            </div>
          ) : (
            <ul className="divide-y rounded-2xl border">
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
      </main>
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
          <Badge variant="secondary" className="font-mono">
            {company.publicCode ?? '—'}
          </Badge>
          <Badge variant="outline">{t(`types.${company.type}`)}</Badge>
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
    <ul className="divide-y rounded-2xl border">
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
