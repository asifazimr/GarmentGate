'use client';

import { type Notification, notificationHref } from '@garmentgate/shared';
import { Activity } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMe } from '@/features/auth/api';
import { cn } from '@/lib/utils';
import { useActivity } from './api';
import { CATEGORY_ICONS } from './notification-icons';

const dayKey = (iso: string) => iso.slice(0, 10);

/**
 * Everything that happened on the account, newest first and grouped by day, each entry linking
 * to where it happened. Live: new events arrive over the socket.
 */
export function ActivityFeed({
  className,
  emptyAction,
}: {
  className?: string;
  /** The next step to offer when nothing has happened yet. */
  emptyAction?: React.ReactNode;
}) {
  const t = useTranslations('activity');
  const format = useFormatter();
  const activity = useActivity();
  const items = activity.data?.pages.flatMap((p) => p.items) ?? [];
  const days = [...new Set(items.map((n) => dayKey(n.createdAt)))];

  return (
    <Card className={cn('h-fit', className)}>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.isPending ? (
          <ul className="space-y-4">
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="flex gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </li>
            ))}
          </ul>
        ) : activity.isError ? (
          <ErrorState
            size="compact"
            onRetry={() => void activity.refetch()}
            retrying={activity.isFetching}
          />
        ) : items.length === 0 ? (
          <EmptyState
            size="compact"
            icon={Activity}
            title={t('empty')}
            description={t('emptyBody')}
            action={emptyAction}
          />
        ) : (
          <div className="space-y-5">
            {days.map((day) => (
              <section key={day} aria-label={format.dateTime(new Date(day), { dateStyle: 'full' })}>
                <h3 className="text-subtle-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                  {format.dateTime(new Date(day), { dateStyle: 'medium' })}
                </h3>
                <ol className="space-y-1">
                  {items
                    .filter((n) => dayKey(n.createdAt) === day)
                    .map((n) => (
                      <ActivityItem key={n.id} notification={n} />
                    ))}
                </ol>
              </section>
            ))}
            {activity.hasNextPage ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                disabled={activity.isFetchingNextPage}
                onClick={() => void activity.fetchNextPage()}
              >
                {t('more')}
              </Button>
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityItem({ notification: n }: { notification: Notification }) {
  const format = useFormatter();
  const now = useNow({ updateInterval: 60_000 });
  const me = useMe();
  const Icon = CATEGORY_ICONS[n.category];
  const href = me.data ? notificationHref(me.data.role, n.link) : null;
  const body = (
    <>
      <span
        className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{n.title}</span>
        <span className="text-muted-foreground line-clamp-2 text-[0.8125rem]">{n.body}</span>
      </span>
      <time
        dateTime={n.createdAt}
        className="text-subtle-foreground shrink-0 text-xs whitespace-nowrap"
      >
        {format.relativeTime(new Date(n.createdAt), now)}
      </time>
    </>
  );
  const row = 'flex items-start gap-3 rounded-lg px-2 py-2';
  return (
    <li>
      {href ? (
        <Link
          href={href}
          className={cn(
            row,
            'hover:bg-surface focus-visible:ring-ring/40 outline-none focus-visible:ring-3',
          )}
        >
          {body}
        </Link>
      ) : (
        <div className={row}>{body}</div>
      )}
    </li>
  );
}
