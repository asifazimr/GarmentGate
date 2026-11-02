'use client';

import {
  ChatEvents,
  type ConversationDetail,
  NOTIFICATION_EVENT,
  type NotificationList,
  NotificationSchema,
  notificationHref,
  type MessageEvent,
  type ReadEvent,
  type TypingEvent,
} from '@garmentgate/shared';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { io, type Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { activityKey } from '@/features/activity/api';
import { useMe } from '@/features/auth/api';
import { refreshSession } from '@/lib/api';
import { notificationsKey } from '@/features/shell/api';
import { chatKeys, upsertMessage } from './api';

/** "Who is typing where", kept outside React state and read with useSyncExternalStore. */
class TypingStore {
  private typing = new Map<string, Map<string, { label: string; until: number }>>();
  private listeners = new Set<() => void>();
  private snapshot = new Map<string, string[]>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  get = (conversationId: string): string[] => this.snapshot.get(conversationId) ?? EMPTY;

  set(event: TypingEvent): void {
    const thread =
      this.typing.get(event.conversationId) ?? new Map<string, { label: string; until: number }>();
    if (event.typing) thread.set(event.userId, { label: event.label, until: Date.now() + 5_000 });
    else thread.delete(event.userId);
    this.typing.set(event.conversationId, thread);
    this.publish();
  }

  /** Drops typists who went quiet without saying so (closed tab, lost connection). */
  expire(): void {
    const now = Date.now();
    let changed = false;
    for (const thread of this.typing.values()) {
      for (const [user, entry] of thread) {
        if (entry.until < now) {
          thread.delete(user);
          changed = true;
        }
      }
    }
    if (changed) this.publish();
  }

  private publish(): void {
    this.snapshot = new Map(
      [...this.typing].map(([id, t]) => [id, [...t.values()].map((x) => x.label)]),
    );
    for (const listener of this.listeners) listener();
  }
}
const EMPTY: string[] = [];

interface ChatSocketValue {
  /** Subscribes to a thread's typing indicators while it's open; returns a cleanup. */
  joinThread: (conversationId: string) => () => void;
  setTyping: (conversationId: string, typing: boolean) => void;
  typing: TypingStore;
}
const ChatSocketContext = createContext<ChatSocketValue | null>(null);

/**
 * One Socket.io connection per signed-in tab, through the web app's /api proxy, authenticated
 * by the httpOnly session cookie. Events update the TanStack Query cache directly.
 */
export function ChatSocketProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const me = useMe();
  const userId = me.data?.id;
  const role = me.data?.role;
  const router = useRouter();
  const openLabel = useTranslations('shell.notifications')('view');
  const socketRef = useRef<Socket | null>(null);
  const joined = useRef(new Set<string>());
  const typing = useMemo(() => new TypingStore(), []);

  useEffect(() => {
    if (!userId) return;
    const socket = io({
      path: '/api/socket.io',
      addTrailingSlash: false,
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    const isOtherSide = (side: ReadEvent['side'], thread: ConversationDetail) =>
      // Staff threads have relay targets or a counterpart name; companies see "GarmentGate".
      (thread.counterpart.name === null) === (side === 'GARMENTGATE');

    socket.on('connect', () => {
      for (const id of joined.current) socket.emit('conversation:join', { conversationId: id });
    });
    // Access tokens last 15 minutes: refresh the session, then reconnect.
    socket.on('connect_error', () => {
      void refreshSession().then((ok) => {
        if (ok) socket.connect();
      });
    });
    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        void refreshSession().then((ok) => {
          if (ok) socket.connect();
        });
      }
    });
    socket.on(ChatEvents.message, (event: MessageEvent) => {
      upsertMessage(queryClient, {
        ...event.message,
        sender: { ...event.message.sender, isMe: event.message.sender.userId === userId },
      });
      typing.set({
        conversationId: event.conversationId,
        userId: event.message.sender.userId,
        label: '',
        typing: false,
      });
      void queryClient.invalidateQueries({ queryKey: chatKeys.list });
    });
    socket.on(ChatEvents.messageUpdated, (event: MessageEvent) => {
      upsertMessage(queryClient, {
        ...event.message,
        sender: { ...event.message.sender, isMe: event.message.sender.userId === userId },
      });
      void queryClient.invalidateQueries({ queryKey: chatKeys.flagged });
    });
    socket.on(ChatEvents.read, (event: ReadEvent) => {
      queryClient.setQueryData<ConversationDetail>(
        chatKeys.thread(event.conversationId),
        (thread) =>
          thread && isOtherSide(event.side, thread)
            ? { ...thread, otherSideReadAt: event.readAt }
            : thread,
      );
    });
    socket.on(ChatEvents.unread, () => {
      void queryClient.invalidateQueries({ queryKey: chatKeys.unread });
      void queryClient.invalidateQueries({ queryKey: chatKeys.list });
    });
    socket.on(
      ChatEvents.warning,
      () => void queryClient.invalidateQueries({ queryKey: chatKeys.warnings }),
    );
    socket.on(NOTIFICATION_EVENT, (payload: unknown) => {
      const parsed = NotificationSchema.safeParse(payload);
      if (!parsed.success) return;
      const n = parsed.data;
      queryClient.setQueryData<NotificationList>(notificationsKey, (list) =>
        list && !list.items.some((x) => x.id === n.id)
          ? { items: [n, ...list.items].slice(0, 20), unreadCount: list.unreadCount + 1 }
          : list,
      );
      void queryClient.invalidateQueries({ queryKey: notificationsKey });
      void queryClient.invalidateQueries({ queryKey: activityKey });
      const href = role ? notificationHref(role, n.link) : null;
      toast(n.title, {
        description: n.body,
        ...(href && { action: { label: openLabel, onClick: () => router.push(href) } }),
      });
    });
    socket.on(ChatEvents.typing, (event: TypingEvent) => {
      if (event.userId !== userId) typing.set(event);
    });
    const timer = setInterval(() => typing.expire(), 1_000);

    return () => {
      clearInterval(timer);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [queryClient, typing, userId, role, router, openLabel]);

  const joinThread = useCallback((conversationId: string) => {
    joined.current.add(conversationId);
    socketRef.current?.emit('conversation:join', { conversationId });
    return () => {
      joined.current.delete(conversationId);
      socketRef.current?.emit('conversation:leave', { conversationId });
    };
  }, []);

  const setTyping = useCallback((conversationId: string, value: boolean) => {
    socketRef.current?.emit('typing', { conversationId, typing: value });
  }, []);

  const value = useMemo(() => ({ joinThread, setTyping, typing }), [joinThread, setTyping, typing]);
  return <ChatSocketContext.Provider value={value}>{children}</ChatSocketContext.Provider>;
}

export function useChatSocket(): ChatSocketValue | null {
  return useContext(ChatSocketContext);
}

/** Labels of people typing in a thread right now ("GarmentGate", "Lena"). */
export function useTyping(conversationId: string): string[] {
  const chat = useChatSocket();
  return useSyncExternalStore(
    chat?.typing.subscribe ?? noopSubscribe,
    () => chat?.typing.get(conversationId) ?? EMPTY,
    () => EMPTY,
  );
}
const noopSubscribe = () => () => undefined;
