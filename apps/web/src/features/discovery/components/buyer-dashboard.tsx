'use client';

import type { BuyerDashboard as Dashboard } from '@garmentgate/shared';
import {
  ArrowRight,
  Factory,
  FilePlus2,
  FileText,
  Heart,
  Landmark,
  Package,
  Search,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityFeed } from '@/features/activity/activity-feed';
import { useMe } from '@/features/auth/api';
import { useIsClient } from '@/lib/client-hooks';
import { useMoney } from '@/lib/use-money';
import { useBuyerDashboard } from '../api';
import { FactoryCard, FactoryCardSkeleton } from './factory-card';

/** Buyer home: what's in production, what's waiting on quotes, and factories worth a look. */
export function BuyerDashboard() {
  const t = useTranslations('dashboard');
  const tb = useTranslations('dashboard.buyer');
  const showMoney = useMoney();
  const format = useFormatter();
  const me = useMe();
  // The user may already be cached from sign-in; the prerendered HTML never has it.
  const user = useIsClient() ? me.data : undefined;
  const dashboard = useBuyerDashboard();
  const data = dashboard.data;

  const escrow = data?.stats.inEscrow ?? [];
  const stats = [
    {
      label: tb('stats.activeOrders'),
      icon: Truck,
      value: data && format.number(data.stats.activeOrders),
    },
    {
      label: tb('stats.openRfqs'),
      icon: FileText,
      value: data && format.number(data.stats.openRfqs),
    },
    {
      label: tb('stats.savedItems'),
      icon: Heart,
      value: data && format.number(data.stats.savedItems),
    },
    {
      label: tb('stats.inEscrow'),
      icon: Landmark,
      value:
        data &&
        (escrow.length > 0
          ? escrow.map((e) => showMoney(e.amountMinor, e.currency)).join(' · ')
          : showMoney(0, 'USD')),
      hint: tb('stats.inEscrowHint'),
    },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        // A placeholder holds the eyebrow's line, so the header doesn't jump when it loads.
        eyebrow={user ? (user.company?.publicCode ?? undefined) : <Skeleton className="h-4 w-24" />}
        title={!user ? <Skeleton className="h-8 w-64" /> : t('welcome', { name: user.firstName })}
        description={tb('subtitle')}
        actions={
          <>
            <Button variant="outline" render={<Link href="/buyer/rfqs/new" />}>
              <FilePlus2 />
              {tb('actions.rfq')}
            </Button>
            <Button render={<Link href="/buyer/search" />}>
              <Search />
              {tb('discover')}
            </Button>
          </>
        }
      />

      {dashboard.isError ? (
        <ErrorState onRetry={() => void dashboard.refetch()} retrying={dashboard.isFetching} />
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label}>
                <StatCard
                  label={s.label}
                  icon={s.icon}
                  value={s.value ?? ''}
                  hint={s.hint}
                  loading={dashboard.isPending}
                />
              </li>
            ))}
          </ul>

          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              id="active-orders"
              title={tb('activeOrders')}
              href="/buyer/orders"
              linkLabel={tb('viewAll')}
            >
              {dashboard.isPending ? (
                <ListSkeleton />
              ) : data && data.activeOrders.length > 0 ? (
                <ul className="divide-y">
                  {data.activeOrders.map((order) => (
                    <OrderRow key={order.code} order={order} />
                  ))}
                </ul>
              ) : (
                <EmptyState
                  size="compact"
                  icon={Package}
                  title={tb('noOrders')}
                  description={tb('noOrdersBody')}
                  action={
                    <Button variant="outline" render={<Link href="/buyer/search" />}>
                      {tb('discover')}
                    </Button>
                  }
                />
              )}
            </Section>

            <Section
              id="open-rfqs"
              title={tb('openRfqs')}
              href="/buyer/rfqs"
              linkLabel={tb('viewAll')}
            >
              {dashboard.isPending ? (
                <ListSkeleton />
              ) : data && data.openRfqs.length > 0 ? (
                <ul className="divide-y">
                  {data.openRfqs.map((rfq) => (
                    <li key={rfq.code}>
                      <Link
                        href={`/buyer/rfqs/${encodeURIComponent(rfq.code)}`}
                        className="hover:bg-surface focus-visible:ring-ring/40 flex items-center gap-3 px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:px-5"
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="code">{rfq.code}</Badge>
                            <StatusBadge domain="rfq" status={rfq.status} />
                          </div>
                          <p className="truncate font-medium">{rfq.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {tb('rfqMeta', {
                              quantity: rfq.quantity,
                              date: format.dateTime(new Date(rfq.deadline), {
                                dateStyle: 'medium',
                              }),
                            })}
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="tabular text-lg font-semibold">{rfq.offers}</p>
                          <p className="text-muted-foreground text-xs">
                            {tb('offers', { count: rfq.offers })}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  size="compact"
                  icon={FileText}
                  title={tb('noRfqs')}
                  description={tb('noRfqsBody')}
                  action={
                    <Button variant="outline" render={<Link href="/buyer/search" />}>
                      {tb('discover')}
                    </Button>
                  }
                />
              )}
            </Section>
          </div>

          <ActivityFeed />

          <section aria-labelledby="recommended" className="space-y-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 id="recommended" className="text-lg font-semibold tracking-[-0.01em]">
                  {tb('recommended')}
                </h2>
                <p className="text-muted-foreground text-sm">{tb('recommendedBody')}</p>
              </div>
              <Button variant="ghost" size="sm" render={<Link href="/buyer/factories" />}>
                {tb('allFactories')}
                <ArrowRight className="rtl:rotate-180" />
              </Button>
            </div>
            {dashboard.isPending ? (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }, (_, i) => (
                  <FactoryCardSkeleton key={i} />
                ))}
              </ul>
            ) : data && data.recommended.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {data.recommended.map((m) => (
                  <FactoryCard key={m.publicCode} factory={m} />
                ))}
              </ul>
            ) : (
              <EmptyState
                size="compact"
                icon={Factory}
                title={tb('noRecommended')}
                action={
                  <Button variant="outline" render={<Link href="/buyer/factories" />}>
                    {tb('allFactories')}
                  </Button>
                }
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Section({
  id,
  title,
  href,
  linkLabel,
  children,
}: {
  id: string;
  title: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <Card className="gap-0 overflow-hidden py-0">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
          <h2 id={id} className="font-semibold tracking-[-0.01em]">
            {title}
          </h2>
          <Button variant="ghost" size="sm" render={<Link href={href} />}>
            {linkLabel}
            <ArrowRight className="rtl:rotate-180" />
          </Button>
        </div>
        {children}
      </Card>
    </section>
  );
}

function OrderRow({ order }: { order: Dashboard['activeOrders'][number] }) {
  const tb = useTranslations('dashboard.buyer');
  const showMoney = useMoney();
  const format = useFormatter();
  return (
    <li>
      <Link
        href={`/buyer/orders/${encodeURIComponent(order.code)}`}
        className="hover:bg-surface focus-visible:ring-ring/40 block space-y-2.5 px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-inset sm:px-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="code">{order.code}</Badge>
          <StatusBadge domain="order" status={order.status} />
          <span className="text-muted-foreground ms-auto tabular text-sm font-medium">
            {showMoney(order.totalMinor, order.currency)}
          </span>
        </div>
        <p className="truncate font-medium">{order.title}</p>
        <div className="space-y-1.5">
          <Progress
            value={order.progressPercent}
            aria-label={tb('progress', { percent: order.progressPercent })}
          />
          <p className="text-muted-foreground flex flex-wrap justify-between gap-x-3 text-xs">
            <span>
              {order.currentMilestone
                ? tb(`stages.${order.currentMilestone}`)
                : tb('progress', { percent: order.progressPercent })}
              {' · '}
              {order.manufacturerCode}
            </span>
            {order.shipBy ? (
              <span>
                {tb('shipBy', {
                  date: format.dateTime(new Date(order.shipBy), { dateStyle: 'medium' }),
                })}
              </span>
            ) : null}
          </p>
        </div>
      </Link>
    </li>
  );
}

function ListSkeleton() {
  return (
    <ul className="divide-y">
      {Array.from({ length: 3 }, (_, i) => (
        <li key={i} className="space-y-2 px-4 py-3 sm:px-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-2 w-full" />
        </li>
      ))}
    </ul>
  );
}
