'use client';

import type { MilestoneStage, OrderStatus } from '@garmentgate/shared';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useMoney } from '@/lib/use-money';
import { useBuyerOrders, useFactoryOrders } from '../api';

interface Row {
  code: string;
  title: string;
  status: OrderStatus;
  quantity: number;
  currency: string;
  totalMinor: number;
  party: string;
  requestedShipDate: string | null;
  progressPercent: number;
  currentStage: MilestoneStage | null;
}

const BASE: Record<ListRole, string> = {
  BUYER: '/buyer',
  MANUFACTURER: '/manufacturer',
};

/** Staff use the admin orders table instead. */
type ListRole = 'BUYER' | 'MANUFACTURER';

export function OrderList({ role }: { role: ListRole }) {
  const t = useTranslations('orders.list');
  const buyer = useBuyerOrders(role === 'BUYER');
  const factory = useFactoryOrders(role === 'MANUFACTURER');
  const query = role === 'BUYER' ? buyer : factory;
  const rows: Row[] | undefined =
    role === 'BUYER'
      ? buyer.data?.map((o) => ({ ...o, party: o.manufacturerCode }))
      : factory.data?.map((o) => ({ ...o, party: o.buyerCode }));

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t(`description.${role}`)} />
      {query.isPending && !rows ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : query.isError ? (
        <ErrorState onRetry={() => void query.refetch()} retrying={query.isFetching} />
      ) : !rows || rows.length === 0 ? (
        <EmptyState
          icon={Package}
          title={t('empty')}
          description={t(`emptyBody.${role}`)}
          action={
            role === 'BUYER' ? (
              <Button render={<Link href="/buyer/rfqs/new" />}>{t('newRfq')}</Button>
            ) : (
              <Button variant="outline" render={<Link href="/manufacturer/rfqs" />}>
                {t('inbox')}
              </Button>
            )
          }
        />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {rows.map((o) => (
            <OrderRow key={o.code} row={o} href={`${BASE[role]}/orders/${o.code}`} />
          ))}
        </ul>
      )}
    </div>
  );
}

function OrderRow({ row: o, href }: { row: Row; href: string }) {
  const t = useTranslations('orders');
  const showMoney = useMoney();
  const format = useFormatter();
  return (
    <li>
      <Link
        href={href}
        className="hover:bg-surface focus-visible:ring-ring/40 grid gap-3 px-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-center sm:px-5"
      >
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="code">{o.code}</Badge>
            <StatusBadge domain="order" status={o.status} />
            <span className="text-muted-foreground text-xs">{o.party}</span>
          </div>
          <p className="truncate font-medium">{o.title}</p>
          <p className="text-muted-foreground text-xs">
            {t('list.meta', {
              quantity: o.quantity,
              total: showMoney(o.totalMinor, o.currency),
              date: o.requestedShipDate
                ? format.dateTime(new Date(o.requestedShipDate), { dateStyle: 'medium' })
                : '—',
            })}
          </p>
        </div>
        <div className="space-y-1.5">
          <Progress
            value={o.progressPercent}
            aria-label={t('list.progress', { percent: o.progressPercent })}
          />
          <p className="text-muted-foreground text-xs">
            {o.currentStage
              ? t(`timeline.phases.${o.currentStage}`)
              : t('list.progress', { percent: o.progressPercent })}
          </p>
        </div>
      </Link>
    </li>
  );
}
