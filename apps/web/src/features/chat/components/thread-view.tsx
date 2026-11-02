'use client';

import {
  CHAT_FILE_MAX_BYTES,
  CHAT_FILE_TYPES,
  CHAT_MAX_FILES,
  type ChatContext,
  type ChatMessage,
  type ConversationDetail,
  filterContactDetails,
} from '@garmentgate/shared';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCheck,
  Download,
  FileText,
  Forward,
  Loader2,
  MessageSquare,
  Paperclip,
  Send,
  ShieldAlert,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { Fragment, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { ApiError } from '@/lib/api';
import { formatBytes } from '@/lib/format';
import { cn } from '@/lib/utils';
import {
  uploadChatFile,
  useAcknowledgeWarning,
  useChatWarnings,
  useConversation,
  useMarkRead,
  useOlderMessages,
  useRelayMessage,
  useSendMessage,
} from '../api';
import { useChatSocket, useTyping } from '../socket';

export function ThreadView({
  id,
  base,
  contextHref,
}: {
  id: string;
  base: string;
  contextHref: (kind: ChatContext['kind'], code: string) => string | null;
}) {
  const t = useTranslations('chat');
  const thread = useConversation(id);

  if (thread.isPending) {
    return (
      <div className="flex h-full flex-col gap-3 p-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-16 w-1/2" />
        <Skeleton className="ms-auto h-16 w-1/2" />
        <Skeleton className="h-16 w-2/5" />
      </div>
    );
  }
  if (thread.isError) {
    return thread.error instanceof ApiError && thread.error.status === 404 ? (
      <EmptyState
        icon={MessageSquare}
        title={t('notFound')}
        action={<Button render={<Link href={base} />}>{t('back')}</Button>}
      />
    ) : (
      <ErrorState onRetry={() => void thread.refetch()} retrying={thread.isFetching} />
    );
  }
  return <Thread key={id} thread={thread.data} base={base} contextHref={contextHref} />;
}

function Thread({
  thread,
  base,
  contextHref,
}: {
  thread: ConversationDetail;
  base: string;
  contextHref: (kind: ChatContext['kind'], code: string) => string | null;
}) {
  const t = useTranslations('chat');
  const chat = useChatSocket();
  const markRead = useMarkRead(thread.id);
  const older = useOlderMessages(thread.id);
  const typing = useTyping(thread.id);
  const staff = thread.counterpart.name !== null;
  const scroller = useRef<HTMLDivElement>(null);
  const last = thread.messages.at(-1);
  const lastId = last?.id;
  // Your own message already counts as read up to that point (the server records it on send).
  const unreadFromOthers = last !== undefined && !last.sender.isMe;

  // Live typing for this thread while it's open.
  useEffect(() => chat?.joinThread(thread.id), [chat, thread.id]);

  // Reading the thread marks it read (and sends a read receipt) whenever new messages arrive.
  const markReadNow = markRead.mutate;
  useEffect(() => {
    if (unreadFromOthers) markReadNow();
  }, [markReadNow, lastId, unreadFromOthers]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lastId]);

  const href = thread.context ? contextHref(thread.context.kind, thread.context.code) : null;
  const myLast = [...thread.messages].reverse().find((m) => m.sender.isMe);
  const seen =
    myLast && thread.otherSideReadAt !== null && thread.otherSideReadAt >= myLast.createdAt;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b px-3 py-3 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          render={<Link href={base} />}
          aria-label={t('back')}
        >
          <ArrowLeft className="rtl:rotate-180" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {thread.context ? (
              href ? (
                <Badge variant="code" render={<Link href={href} />}>
                  {thread.context.code}
                </Badge>
              ) : (
                <Badge variant="code">{thread.context.code}</Badge>
              )
            ) : null}
            {staff ? (
              <Badge variant={thread.type === 'BUYER_PLATFORM' ? 'info' : 'progress'}>
                {thread.type === 'BUYER_PLATFORM' ? t('buyer') : t('factory')}{' '}
                {thread.counterpart.code}
              </Badge>
            ) : null}
          </div>
          <h2 className="truncate font-semibold">
            {staff ? thread.counterpart.name : (thread.context?.title ?? thread.subject)}
          </h2>
        </div>
      </header>

      {!staff ? <WarningBanner /> : null}

      <div
        ref={scroller}
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4 sm:px-4"
        aria-live="polite"
      >
        {thread.hasMore ? (
          <div className="flex justify-center pb-2">
            <Button
              variant="outline"
              size="sm"
              disabled={older.isPending}
              onClick={() => {
                const first = thread.messages[0];
                if (first) older.mutate(first.createdAt);
              }}
            >
              {t('loadOlder')}
            </Button>
          </div>
        ) : null}
        {thread.messages.length === 0 ? (
          <p className="text-muted-foreground py-10 text-center text-sm">
            {staff ? t('startStaff') : t('start')}
          </p>
        ) : null}
        {thread.messages.map((m, i) => {
          const prev = thread.messages[i - 1];
          const newDay = prev?.createdAt.slice(0, 10) !== m.createdAt.slice(0, 10);
          const grouped = !newDay && prev.sender.userId === m.sender.userId;
          return (
            <Fragment key={m.id}>
              {newDay ? <DayDivider iso={m.createdAt} /> : null}
              <Bubble
                message={m}
                staff={staff}
                relayTargets={thread.relayTargets}
                grouped={grouped}
              />
              {m.id === myLast?.id ? (
                <p className="text-subtle-foreground flex items-center justify-end gap-1 pe-1 text-[0.6875rem]">
                  {seen ? (
                    <CheckCheck className="text-primary-ink size-3.5" aria-hidden="true" />
                  ) : (
                    <Check className="size-3.5" aria-hidden="true" />
                  )}
                  {seen ? t('read') : t('sent')}
                </p>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      <p className="text-muted-foreground h-5 px-4 text-xs" aria-live="polite">
        {typing.length > 0 ? t('typing', { names: typing.join(', '), count: typing.length }) : ''}
      </p>
      <Composer conversationId={thread.id} staff={staff} />
    </div>
  );
}

function DayDivider({ iso }: { iso: string }) {
  const format = useFormatter();
  return (
    <div className="flex items-center gap-3 py-3" role="separator">
      <span className="bg-border h-px flex-1" />
      <span className="text-subtle-foreground text-xs">
        {format.dateTime(new Date(iso), { dateStyle: 'medium' })}
      </span>
      <span className="bg-border h-px flex-1" />
    </div>
  );
}

function Bubble({
  message: m,
  staff,
  relayTargets,
  grouped,
}: {
  message: ChatMessage;
  staff: boolean;
  relayTargets: ConversationDetail['relayTargets'];
  grouped: boolean;
}) {
  const t = useTranslations('chat');
  const format = useFormatter();
  const relay = useRelayMessage();
  const mine = m.sender.isMe;
  // Companies see GarmentGate on the left; staff see the company on the left.
  return (
    <div
      className={cn('flex flex-col gap-1', mine ? 'items-end' : 'items-start', !grouped && 'pt-2')}
    >
      {!grouped ? (
        <p className="text-subtle-foreground px-1 text-xs">
          {mine ? t('you') : m.sender.label}
          {m.relayedFrom ? ` · ${t('relayedFrom', { code: m.relayedFrom })}` : ''} ·{' '}
          {format.dateTime(new Date(m.createdAt), { timeStyle: 'short' })}
        </p>
      ) : null}
      <div
        className={cn(
          'max-w-[85%] space-y-2 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-xs sm:max-w-[70%]',
          mine
            ? 'bg-primary text-primary-foreground rounded-ee-md'
            : 'bg-card rounded-es-md border',
        )}
      >
        {m.body ? <p className="break-words whitespace-pre-wrap">{m.body}</p> : null}
        {m.attachments.length > 0 ? (
          <ul className="space-y-1.5">
            {m.attachments.map((a) => (
              <li key={a.id}>
                <a
                  href={a.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!a.url}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border p-2 text-xs',
                    mine ? 'border-primary-foreground/25 bg-primary-foreground/10' : 'bg-surface',
                    !a.url && 'pointer-events-none opacity-70',
                  )}
                >
                  {a.thumbUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- short-lived signed rendition URL
                    <img src={a.thumbUrl} alt="" className="size-10 rounded object-cover" />
                  ) : (
                    <FileText className="size-5 shrink-0" aria-hidden="true" />
                  )}
                  <span className="min-w-0 flex-1 truncate font-medium">{a.name}</span>
                  {a.url ? (
                    <Download className="size-3.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <Loader2
                      className="size-3.5 shrink-0 animate-spin motion-reduce:animate-none"
                      aria-label={t('preparing')}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {m.flagged && mine ? (
        <p className="text-warning-ink flex max-w-[85%] items-start gap-1 px-1 text-xs sm:max-w-[70%]">
          <ShieldAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {t('hiddenNotice')}
        </p>
      ) : null}
      {staff && m.flagged ? (
        <div className="border-danger-soft bg-danger-soft/40 max-w-[85%] space-y-1 rounded-lg border px-3 py-2 text-xs sm:max-w-[70%]">
          <p className="text-danger-ink flex items-center gap-1 font-medium">
            <ShieldAlert className="size-3.5" aria-hidden="true" />
            {t('flagged', { reasons: m.reasons.map((r) => t(`reasons.${r}`)).join(', ') })}
          </p>
          {m.original ? (
            <p className="text-muted-foreground break-words whitespace-pre-wrap">
              {t('original')}: {m.original}
            </p>
          ) : null}
        </div>
      ) : null}
      {staff && !mine && m.sender.side === 'COMPANY' && relayTargets.length > 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="xs" className="text-muted-foreground" />}
          >
            <Forward />
            {t('relay')}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t('relayTo')}</DropdownMenuLabel>
              {relayTargets.map((target) => (
                <DropdownMenuItem
                  key={target.id}
                  className="min-h-9"
                  onClick={() =>
                    relay.mutate(
                      { messageId: m.id, toConversationId: target.id },
                      {
                        onSuccess: () => toast.success(t('relayed', { to: target.label })),
                        onError: () => toast.error(t('failed')),
                      },
                    )
                  }
                >
                  {target.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
}

interface PendingFile {
  key: string;
  name: string;
  size: number;
  progress: number;
  fileId: string | null;
}

function Composer({ conversationId, staff }: { conversationId: string; staff: boolean }) {
  const t = useTranslations('chat');
  const locale = useLocale();
  const chat = useChatSocket();
  const send = useSendMessage(conversationId);
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<PendingFile[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uploading = files.some((f) => f.fileId === null);
  // A hint only: the server filters for real.
  const looksLikeContact = !staff && body.length > 5 && filterContactDetails(body).flagged;

  const stopTyping = () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = null;
    chat?.setTyping(conversationId, false);
  };
  const onType = (value: string) => {
    setBody(value);
    if (!typingTimer.current) chat?.setTyping(conversationId, true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(stopTyping, 3_000);
  };

  const addFiles = (list: FileList | null) => {
    for (const file of Array.from(list ?? []).slice(0, CHAT_MAX_FILES - files.length)) {
      if (
        !(CHAT_FILE_TYPES as readonly string[]).includes(file.type) ||
        file.size > CHAT_FILE_MAX_BYTES
      ) {
        toast.error(t('fileRejected', { name: file.name }));
        continue;
      }
      const key = `${file.name}-${String(file.size)}-${String(Date.now())}`;
      setFiles((f) => [...f, { key, name: file.name, size: file.size, progress: 0, fileId: null }]);
      uploadChatFile(conversationId, file, (progress) =>
        setFiles((f) => f.map((x) => (x.key === key ? { ...x, progress } : x))),
      )
        .then((fileId) => setFiles((f) => f.map((x) => (x.key === key ? { ...x, fileId } : x))))
        .catch(() => {
          toast.error(t('uploadFailed'));
          setFiles((f) => f.filter((x) => x.key !== key));
        });
    }
  };

  const submit = () => {
    const text = body.trim();
    const attachments = files.flatMap((f) => (f.fileId ? [f.fileId] : []));
    if ((!text && attachments.length === 0) || uploading || send.isPending) return;
    stopTyping();
    send.mutate(
      { body: text, attachments },
      {
        onSuccess: (message) => {
          setBody('');
          setFiles([]);
          if (message.flagged && !staff) toast.warning(t('hiddenToast'));
        },
        onError: (error) => toast.error(error instanceof ApiError ? error.message : t('failed')),
      },
    );
  };

  return (
    <form
      className="border-t p-3 sm:p-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      {files.length > 0 ? (
        <ul className="mb-2 flex flex-wrap gap-2">
          {files.map((f) => (
            <li
              key={f.key}
              className="bg-surface flex items-center gap-2 rounded-lg border px-2 py-1 text-xs"
            >
              <FileText className="size-3.5" aria-hidden="true" />
              <span className="max-w-40 truncate">{f.name}</span>
              <span className="text-muted-foreground tabular">
                {f.fileId ? formatBytes(f.size, locale) : `${String(f.progress)}%`}
              </span>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
                aria-label={t('removeFile', { name: f.name })}
                onClick={() => setFiles((x) => x.filter((y) => y.key !== f.key))}
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {looksLikeContact ? (
        <p className="text-warning-ink mb-2 flex items-center gap-1.5 text-xs">
          <AlertTriangle className="size-3.5" aria-hidden="true" />
          {t('contactHint')}
        </p>
      ) : null}
      <div className="flex items-end gap-2">
        <input
          ref={fileInput}
          type="file"
          multiple
          accept={CHAT_FILE_TYPES.join(',')}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t('attach')}
          disabled={files.length >= CHAT_MAX_FILES}
          onClick={() => fileInput.current?.click()}
        >
          <Paperclip />
        </Button>
        <Textarea
          value={body}
          onChange={(e) => onType(e.target.value)}
          onBlur={stopTyping}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          maxLength={4000}
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          className="max-h-40 min-h-11 flex-1 resize-none field-sizing-content md:min-h-9"
        />
        <Button
          type="submit"
          size="icon"
          aria-label={t('send')}
          disabled={send.isPending || uploading || (!body.trim() && files.length === 0)}
        >
          {send.isPending ? (
            <Loader2 className="animate-spin motion-reduce:animate-none" />
          ) : (
            <Send />
          )}
        </Button>
      </div>
    </form>
  );
}

function WarningBanner() {
  const t = useTranslations('chat');
  const warnings = useChatWarnings();
  const ack = useAcknowledgeWarning();
  const warning = warnings.data?.[0];
  if (!warning) return null;
  return (
    <div
      role="alert"
      className="bg-warning-soft text-warning-ink flex flex-wrap items-center gap-3 border-b px-4 py-2.5 text-sm"
    >
      <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
      <p className="min-w-0 flex-1">
        {warning.level === 'FINAL_WARNING' ? t('finalWarning') : t('warning')}
      </p>
      <Button size="sm" variant="outline" onClick={() => ack.mutate(warning.id)}>
        {t('understood')}
      </Button>
    </div>
  );
}
