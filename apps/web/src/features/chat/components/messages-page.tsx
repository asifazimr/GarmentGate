'use client';

import type { Role } from '@garmentgate/shared';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ConversationList } from './conversation-list';
import { ThreadView } from './thread-view';

const BASE: Record<Role, string> = {
  BUYER: '/buyer',
  MANUFACTURER: '/manufacturer',
  ADMIN: '/admin',
  INSPECTOR: '/inspector',
};

/** Where an RFQ / order lives for each role (null: no page yet). */
function contextHref(role: Role) {
  return (kind: 'RFQ' | 'ORDER', code: string): string | null => {
    if (kind === 'RFQ') return role === 'ADMIN' ? null : `${BASE[role]}/rfqs/${code}`;
    return `${BASE[role]}/orders/${code}`;
  };
}

/** Inbox and thread side by side on desktop; one at a time on mobile. */
export function MessagesPage({
  role,
  conversationId,
}: {
  role: Role;
  conversationId: string | null;
}) {
  const t = useTranslations('chat');
  const base = `${BASE[role]}/messages`;
  return (
    <div className="bg-card -mx-4 -mt-6 flex h-[calc(100dvh-4rem-4.5rem)] overflow-hidden border-y shadow-xs sm:mx-0 sm:mt-0 sm:rounded-xl sm:border lg:h-[calc(100dvh-4rem-4rem)]">
      <aside
        aria-label={t('inbox')}
        className={cn(
          'w-full shrink-0 overflow-y-auto border-e lg:block lg:w-80',
          conversationId ? 'hidden' : 'block',
        )}
      >
        <div className="border-b px-4 py-3">
          <h1 className="font-semibold">{t('title')}</h1>
          <p className="text-muted-foreground text-xs">
            {role === 'ADMIN' ? t('subtitleStaff') : t('subtitle')}
          </p>
        </div>
        <ConversationList base={base} activeId={conversationId} />
      </aside>
      <section
        aria-label={t('thread')}
        className={cn('min-w-0 flex-1', conversationId ? 'block' : 'hidden lg:block')}
      >
        {conversationId ? (
          <ThreadView id={conversationId} base={base} contextHref={contextHref(role)} />
        ) : (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm">
            <MessageSquare className="size-8" aria-hidden="true" />
            {t('pick')}
          </div>
        )}
      </section>
    </div>
  );
}
