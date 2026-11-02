'use client';

import { ClipboardList, Factory } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useFactoryOrders } from '@/features/orders/api';
import { useRfqInbox } from '@/features/rfq/api';

const LIMIT = 5;

/**
 * What a factory needs to do next, one tap from the dashboard: invitations still waiting for a
 * quote (soonest deadline first) and orders in production with the stage to update.
 */
export function FactoryTodo() {
  const t = useTranslations('dashboard.manufacturer.todo');
  const tp = useTranslations('orders.timeline.phases');
  const format = useFormatter();
  const now = useNow({ updateInterval: 60_000 });
  const inbox = useRfqInbox();
  const orders = useFactoryOrders();

  const toQuote = (inbox.data ?? [])
    .filter((r) => r.myQuote === null && Date.parse(r.deadline) > now.getTime())
    .sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
  const inProduction = (orders.data ?? []).filter((o) =>
    ['IN_PRODUCTION', 'SAMPLING', 'QC'].includes(o.status),
  );

  const row =
    'hover:bg-surface focus-visible:ring-ring/40 flex min-h-11 items-center gap-3 px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-inset';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('quoteTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {inbox.isPending ? (
            <List />
          ) : inbox.isError ? (
            <ErrorState
              size="compact"
              onRetry={() => void inbox.refetch()}
              retrying={inbox.isFetching}
            />
          ) : toQuote.length === 0 ? (
            <EmptyState
              size="compact"
              icon={ClipboardList}
              title={t('quoteEmpty')}
              description={t('quoteEmptyBody')}
            />
          ) : (
            <ul className="divide-y border-y">
              {toQuote.slice(0, LIMIT).map((r) => (
                <li key={r.code}>
                  <Link href={`/manufacturer/rfqs/${r.code}`} className={row}>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{r.title}</span>
                      <span className="text-muted-foreground block text-xs">
                        {t('quoteMeta', {
                          quantity: r.quantity,
                          date: format.dateTime(new Date(r.deadline), { dateStyle: 'medium' }),
                        })}
                      </span>
                    </span>
                    <Badge variant="code">{r.code}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('ordersTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {orders.isPending ? (
            <List />
          ) : orders.isError ? (
            <ErrorState
              size="compact"
              onRetry={() => void orders.refetch()}
              retrying={orders.isFetching}
            />
          ) : inProduction.length === 0 ? (
            <EmptyState
              size="compact"
              icon={Factory}
              title={t('ordersEmpty')}
              description={t('ordersEmptyBody')}
            />
          ) : (
            <ul className="divide-y border-y">
              {inProduction.slice(0, LIMIT).map((o) => (
                <li key={o.code}>
                  <Link href={`/manufacturer/orders/${o.code}`} className={row}>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{o.title}</span>
                      <span className="text-muted-foreground block text-xs">
                        {o.currentStage
                          ? t('updateStage', { stage: tp(o.currentStage) })
                          : t('openOrder')}
                      </span>
                    </span>
                    <StatusBadge domain="order" status={o.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/** The same cards in their loading state: the Suspense fallback, so nothing shifts. */
export function FactoryTodoSkeleton() {
  const t = useTranslations('dashboard.manufacturer.todo');
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {[t('quoteTitle'), t('ordersTitle')].map((title) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <List />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function List() {
  return (
    <div className="space-y-2 px-4">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-12 rounded-lg" />
      ))}
    </div>
  );
}
