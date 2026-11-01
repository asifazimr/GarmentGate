'use client';

import type { Notification, NotificationType } from '@garmentgate/shared';
import {
  Bell,
  BellRing,
  CheckCheck,
  FileText,
  MessageSquare,
  Package,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useMarkAllNotificationsRead, useMarkNotificationRead, useNotifications } from './api';

const ICONS: Record<NotificationType, typeof Bell> = {
  EMAIL_VERIFIED: ShieldCheck,
  KYC_SUBMITTED: ShieldCheck,
  KYC_APPROVED: ShieldCheck,
  KYC_REJECTED: ShieldCheck,
  RFQ_INVITATION: FileText,
  QUOTE_RECEIVED: FileText,
  QUOTE_OFFERED: FileText,
  ORDER_UPDATE: Package,
  MESSAGE_RECEIVED: MessageSquare,
  PAYMENT_UPDATE: Wallet,
  DISPUTE_UPDATE: Scale,
  SYSTEM: BellRing,
};

export function NotificationsBell() {
  const t = useTranslations('shell.notifications');
  const notifications = useNotifications();
  const markAll = useMarkAllNotificationsRead();
  const unread = notifications.data?.unreadCount ?? 0;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label={unread > 0 ? `${t('open')} (${t('unread', { count: unread })})` : t('open')}
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/40 relative flex size-11 items-center justify-center rounded-lg outline-none focus-visible:ring-3 md:size-9"
          />
        }
      >
        <Bell className="size-5 md:size-[1.125rem]" aria-hidden="true" />
        {unread > 0 ? (
          <span className="bg-destructive ring-background absolute top-2 end-2 flex min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] leading-4 font-semibold text-white ring-2 md:top-1 md:end-1">
            {unread > 9 ? '9+' : unread}
          </span>
        ) : null}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(24rem,calc(100vw-1rem))] gap-0 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="text-sm font-semibold">{t('title')}</p>
            {unread > 0 ? (
              <p className="text-muted-foreground text-xs">{t('unread', { count: unread })}</p>
            ) : null}
          </div>
          {unread > 0 ? (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => markAll.mutate()}
              disabled={markAll.isPending}
            >
              <CheckCheck />
              {t('markAllRead')}
            </Button>
          ) : null}
        </div>
        <div className="max-h-[min(28rem,70dvh)] overflow-y-auto">
          {notifications.isPending ? (
            <ul className="divide-y">
              {Array.from({ length: 3 }, (_, i) => (
                <li key={i} className="flex gap-3 px-4 py-3.5">
                  <Skeleton className="size-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </li>
              ))}
            </ul>
          ) : notifications.isError ? (
            <ErrorState
              size="compact"
              title={t('error')}
              onRetry={() => void notifications.refetch()}
              retrying={notifications.isFetching}
            />
          ) : notifications.data.items.length === 0 ? (
            <EmptyState
              size="compact"
              icon={Bell}
              title={t('empty')}
              description={t('emptyBody')}
            />
          ) : (
            <ul className="divide-y">
              {notifications.data.items.map((n) => (
                <NotificationRow key={n.id} notification={n} />
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotificationRow({ notification: n }: { notification: Notification }) {
  const format = useFormatter();
  const now = useNow({ updateInterval: 60_000 });
  const markRead = useMarkNotificationRead();
  const Icon = ICONS[n.type];
  const unread = n.readAt === null;
  return (
    <li>
      <button
        type="button"
        onClick={() => unread && markRead.mutate(n.id)}
        className={cn(
          'hover:bg-surface flex w-full gap-3 px-4 py-3.5 text-start transition-colors',
          unread && 'bg-primary-soft/40',
        )}
      >
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full',
            unread ? 'bg-primary-soft text-primary-ink' : 'bg-muted text-muted-foreground',
          )}
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className={cn('text-sm', unread ? 'font-semibold' : 'font-medium')}>
              {n.title}
            </span>
            {unread ? (
              <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" aria-hidden="true" />
            ) : null}
          </span>
          <span className="text-muted-foreground line-clamp-2 text-[0.8125rem]">{n.body}</span>
          <span className="text-subtle-foreground mt-1 block text-xs">
            {format.relativeTime(new Date(n.createdAt), now)}
          </span>
        </span>
      </button>
    </li>
  );
}
