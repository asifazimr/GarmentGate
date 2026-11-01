'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useUnreadMessages } from '../api';

/** Unread message count for nav items; renders nothing at zero. */
export function UnreadBadge({ className, dot = false }: { className?: string; dot?: boolean }) {
  const t = useTranslations('chat');
  const unread = useUnreadMessages();
  const total = unread.data?.total ?? 0;
  if (total === 0) return null;
  if (dot) {
    return (
      <span
        className={cn('bg-danger size-2 rounded-full', className)}
        aria-label={t('unreadCount', { count: total })}
      />
    );
  }
  return (
    <span
      className={cn(
        'bg-primary text-primary-foreground tabular inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-semibold',
        className,
      )}
      aria-label={t('unreadCount', { count: total })}
    >
      {total > 99 ? '99+' : total}
    </span>
  );
}
