'use client';

import type { OrderSample, OrderStatus } from '@garmentgate/shared';
import { ArrowLeft, FileDown, PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiError } from '@/lib/api';

export function OrderLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-28 rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Skeleton className="h-[28rem] rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}

export function OrderError({
  error,
  retry,
  retrying,
  back,
}: {
  error: Error;
  retry: () => void;
  retrying: boolean;
  back: string;
}) {
  const t = useTranslations('orders');
  return error instanceof ApiError && error.status === 404 ? (
    <EmptyState
      icon={PackageSearch}
      title={t('notFound')}
      action={<Button render={<Link href={back} />}>{t('back')}</Button>}
    />
  ) : (
    <ErrorState onRetry={retry} retrying={retrying} />
  );
}

export function OrderHeader({
  back,
  code,
  status,
  title,
  party,
  progress,
  actions,
}: {
  back: string;
  code: string;
  status: OrderStatus;
  title: string;
  party: ReactNode;
  progress: number;
  actions?: ReactNode;
}) {
  const t = useTranslations('orders');
  return (
    <header className="space-y-4">
      <Button variant="ghost" size="sm" className="-ms-2" render={<Link href={back} />}>
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="code">{code}</Badge>
            <StatusBadge domain="order" status={status} />
            {party}
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
            {title}
          </h1>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="flex items-center gap-3">
        <Progress
          value={progress}
          className="flex-1"
          aria-label={t('list.progress', { percent: progress })}
        />
        <span className="text-muted-foreground tabular text-sm">{progress}%</span>
      </div>
    </header>
  );
}

export function PoButton({ href, label }: { href: string; label: string }) {
  return (
    <Button variant="outline" render={<a href={href} target="_blank" rel="noopener noreferrer" />}>
      <FileDown />
      {label}
    </Button>
  );
}

export function SummaryCard({
  rows,
  children,
}: {
  rows: [string, ReactNode][];
  children?: ReactNode;
}) {
  const t = useTranslations('orders');
  return (
    <Card size="sm" className="h-fit">
      <CardHeader>
        <CardTitle>{t('summary')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="divide-y text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="tabular text-end font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        {children}
      </CardContent>
    </Card>
  );
}

/** Sample rounds in the "sample" step: what was asked, how it shipped, what the buyer decided. */
export function SampleRounds({
  samples,
  action,
}: {
  samples: OrderSample[];
  action?: (s: OrderSample) => ReactNode;
}) {
  const t = useTranslations('orders.samples');
  const format = useFormatter();
  if (samples.length === 0) return null;
  return (
    <ul className="space-y-2">
      {samples.map((s) => (
        <li key={s.id} className="bg-surface space-y-1.5 rounded-lg border p-3 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{t('round', { round: s.round })}</span>
            <StatusBadge domain="sample" status={s.status} />
            <span className="text-muted-foreground text-xs">
              {t('pieces', { count: s.quantity })}
            </span>
          </div>
          {s.requestNotes ? (
            <p className="text-muted-foreground">{t('brief', { text: s.requestNotes })}</p>
          ) : null}
          {s.trackingNumber ? (
            <p className="text-muted-foreground text-xs">
              {t('shipped', {
                courier: s.courier ?? '',
                tracking: s.trackingNumber,
                date: s.shippedAt
                  ? format.dateTime(new Date(s.shippedAt), { dateStyle: 'medium' })
                  : '',
              })}
            </p>
          ) : null}
          {s.feedback ? <p>{t('feedback', { text: s.feedback })}</p> : null}
          {action ? action(s) : null}
        </li>
      ))}
    </ul>
  );
}
