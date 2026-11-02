'use client';

import type { FlaggedMessage } from '@garmentgate/shared';
import { Check, EyeOff, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserActions } from '@/features/admin/components/user-actions';
import { useDecideFlagged, useFlaggedMessages } from '../api';

/**
 * Messages where contact details were hidden, for staff to confirm or release, with the thread
 * leading up to them and the sender's track record so staff can warn or suspend the account.
 */
export function FlaggedMessages() {
  const t = useTranslations('chat.moderation');
  const queue = useFlaggedMessages();
  if (queue.isPending) return <Skeleton className="h-64 rounded-xl" />;
  if (queue.isError)
    return <ErrorState onRetry={() => void queue.refetch()} retrying={queue.isFetching} />;
  if (queue.data.length === 0)
    return <EmptyState icon={ShieldCheck} title={t('empty')} description={t('emptyBody')} />;
  return (
    <ul className="space-y-3">
      {queue.data.map((m) => (
        <Item key={m.id} message={m} />
      ))}
    </ul>
  );
}

function Item({ message: m }: { message: FlaggedMessage }) {
  const t = useTranslations('chat.moderation');
  const tr = useTranslations('chat.reasons');
  const format = useFormatter();
  const now = useNow({ updateInterval: 60_000 });
  const decide = useDecideFlagged();
  const act = (action: 'release' | 'confirm') =>
    decide.mutate(
      { id: m.id, action },
      { onSuccess: () => toast.success(action === 'release' ? t('released') : t('confirmed')) },
    );
  return (
    <li className="bg-card space-y-3 rounded-xl border p-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="code">{m.company.code}</Badge>
        <span className="font-medium">{m.company.name}</span>
        <span className="text-muted-foreground">
          · {m.sender.name} ({m.sender.email})
        </span>
        {m.sender.status !== 'ACTIVE' ? <Badge variant="danger">{t('suspended')}</Badge> : null}
        <span className="text-subtle-foreground ms-auto text-xs">
          {format.relativeTime(new Date(Math.min(Date.parse(m.createdAt), now.getTime())), now)}
        </span>
      </div>
      <p className="text-muted-foreground text-xs">
        <Link
          className="underline-offset-2 hover:underline"
          href={`/admin/messages/${m.conversationId}`}
        >
          {m.thread}
        </Link>
      </p>
      {m.context.length > 0 ? (
        <details className="text-sm">
          <summary className="text-muted-foreground cursor-pointer text-xs font-medium">
            {t('context', { count: m.context.length })}
          </summary>
          <ol className="mt-2 space-y-1.5 border-s-2 ps-3">
            {m.context.map((c, i) => (
              <li key={`${c.createdAt}-${String(i)}`}>
                <p className="text-muted-foreground text-xs">
                  {c.name} · {t(`from.${c.from}`)} ·{' '}
                  {format.dateTime(new Date(c.createdAt), {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </p>
                <p className="break-words whitespace-pre-wrap">{c.content || '—'}</p>
              </li>
            ))}
          </ol>
        </details>
      ) : null}
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <div className="bg-danger-soft/40 rounded-lg p-3">
          <p className="text-danger-ink mb-1 text-xs font-medium">{t('original')}</p>
          <p className="break-words whitespace-pre-wrap">{m.original || '—'}</p>
          {m.attachments.map((a) => (
            <p key={a.name} className="mt-1 text-xs">
              📎 {a.name} · {a.reasons.map((r) => tr(r)).join(', ')}
            </p>
          ))}
        </div>
        <div className="bg-surface rounded-lg p-3">
          <p className="text-muted-foreground mb-1 text-xs font-medium">{t('delivered')}</p>
          <p className="break-words whitespace-pre-wrap">{m.delivered || '—'}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {m.reasons.map((r) => (
          <Badge key={r} variant="danger">
            {tr(r)}
          </Badge>
        ))}
        <Badge variant={m.senderViolations >= 3 ? 'warning' : 'neutral'}>
          {t('violations', { count: m.senderViolations })}
        </Badge>
        {m.senderWarnings > 0 ? (
          <Badge variant="warning">{t('warnings', { count: m.senderWarnings })}</Badge>
        ) : null}
        <div className="ms-auto flex flex-wrap justify-end gap-2">
          <UserActions user={{ id: m.sender.id, name: m.sender.name, status: m.sender.status }} />
          <Button
            variant="outline"
            size="sm"
            disabled={decide.isPending}
            onClick={() => act('release')}
          >
            <Check />
            {t('release')}
          </Button>
          <Button size="sm" disabled={decide.isPending} onClick={() => act('confirm')}>
            <EyeOff />
            {t('confirm')}
          </Button>
        </div>
      </div>
    </li>
  );
}
