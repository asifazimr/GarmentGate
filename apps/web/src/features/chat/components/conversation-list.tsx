'use client';

import type { ConversationSummary } from '@garmentgate/shared';
import { MessageSquare, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useConversations } from '../api';

export function ConversationList({ base, activeId }: { base: string; activeId: string | null }) {
  const t = useTranslations('chat');
  const list = useConversations();

  if (list.isPending) {
    return (
      <ul className="space-y-1 p-2">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i}>
            <Skeleton className="h-16 rounded-lg" />
          </li>
        ))}
      </ul>
    );
  }
  if (list.isError)
    return <ErrorState onRetry={() => void list.refetch()} retrying={list.isFetching} />;
  if (list.data.length === 0) {
    return (
      <EmptyState
        size="compact"
        icon={MessageSquare}
        title={t('empty')}
        description={t('emptyBody')}
      />
    );
  }
  return (
    <ul className="divide-y">
      {list.data.map((c) => (
        <Row key={c.id} conversation={c} href={`${base}/${c.id}`} active={c.id === activeId} />
      ))}
    </ul>
  );
}

function Row({
  conversation: c,
  href,
  active,
}: {
  conversation: ConversationSummary;
  href: string;
  active: boolean;
}) {
  const t = useTranslations('chat');
  const format = useFormatter();
  const now = useNow({ updateInterval: 60_000 });
  const staff = c.counterpart.name !== null;
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'focus-visible:ring-ring/40 flex gap-3 px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-inset',
          active ? 'bg-primary-soft/60' : 'hover:bg-surface',
        )}
      >
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            {c.context ? <Badge variant="code">{c.context.code}</Badge> : null}
            {staff ? (
              <Badge variant={c.type === 'BUYER_PLATFORM' ? 'info' : 'progress'}>
                {c.type === 'BUYER_PLATFORM' ? t('buyer') : t('factory')} {c.counterpart.code}
              </Badge>
            ) : null}
            {c.lastMessage ? (
              <span className="text-subtle-foreground ms-auto shrink-0 text-xs">
                {format.relativeTime(
                  new Date(Math.min(Date.parse(c.lastMessage.at), now.getTime())),
                  now,
                )}
              </span>
            ) : null}
          </div>
          <p className={cn('truncate text-sm', c.unread > 0 ? 'font-semibold' : 'font-medium')}>
            {staff ? c.counterpart.name : (c.context?.title ?? c.subject)}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground min-w-0 flex-1 truncate text-xs">
              {c.lastMessage
                ? `${c.lastMessage.fromMe ? `${t('you')}: ` : ''}${c.lastMessage.preview}`
                : t('noMessages')}
            </p>
            {c.flagged > 0 ? (
              <Badge variant="danger" aria-label={t('flaggedCount', { count: c.flagged })}>
                <ShieldAlert aria-hidden="true" />
                {c.flagged}
              </Badge>
            ) : null}
            {c.unread > 0 ? (
              <span
                className="bg-primary text-primary-foreground tabular inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-semibold"
                aria-label={t('unreadCount', { count: c.unread })}
              >
                {c.unread > 99 ? '99+' : c.unread}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
