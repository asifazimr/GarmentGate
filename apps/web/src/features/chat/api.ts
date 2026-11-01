'use client';

import {
  AccountWarningSchema,
  type ChatMessage,
  ChatMessageSchema,
  type ConversationDetail,
  ConversationDetailSchema,
  ConversationSummarySchema,
  FlaggedMessageSchema,
  type OpenConversationDto,
  type SendMessageDto,
  UnreadSchema,
} from '@garmentgate/shared';
import { type QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

export const chatKeys = {
  all: ['chat'] as const,
  list: ['chat', 'list'] as const,
  thread: (id: string) => ['chat', 'thread', id] as const,
  unread: ['chat', 'unread'] as const,
  warnings: ['chat', 'warnings'] as const,
  flagged: ['chat', 'flagged'] as const,
};

const OlderSchema = z.object({ messages: z.array(ChatMessageSchema), hasMore: z.boolean() });

export function useConversations() {
  return useQuery({
    queryKey: chatKeys.list,
    queryFn: () => apiJson('/conversations', z.array(ConversationSummarySchema)),
  });
}

/** Polls only while attachments are still being sanitized; everything else arrives by socket. */
export function useConversation(id: string) {
  return useQuery({
    queryKey: chatKeys.thread(id),
    queryFn: () => apiJson(`/conversations/${id}`, ConversationDetailSchema),
    refetchInterval: (query) =>
      query.state.data?.messages.some((m) =>
        m.attachments.some((a) => a.processing === 'PENDING' || a.processing === 'PROCESSING'),
      )
        ? 2_000
        : false,
  });
}

export function useUnreadMessages() {
  return useQuery({
    queryKey: chatKeys.unread,
    queryFn: () => apiJson('/conversations/unread', UnreadSchema),
    staleTime: 60_000,
  });
}

export function useChatWarnings() {
  return useQuery({
    queryKey: chatKeys.warnings,
    queryFn: () => apiJson('/chat/warnings', z.array(AccountWarningSchema)),
    staleTime: 5 * 60_000,
  });
}

export function useAcknowledgeWarning() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/chat/warnings/${id}/acknowledge`, { method: 'POST' }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: chatKeys.warnings }),
  });
}

export function useOpenConversation() {
  return useMutation({
    mutationFn: (dto: OpenConversationDto) =>
      apiJson('/conversations', ConversationSummarySchema, { method: 'POST', body: dto }),
  });
}

export const uploadChatFile = (
  conversationId: string,
  file: File,
  onProgress: (p: number) => void,
) => uploadFile(`/conversations/${conversationId}/uploads`, 'MESSAGE_ATTACHMENT', file, onProgress);

/** Adds or replaces a message in a cached thread (socket events and own sends). */
export function upsertMessage(queryClient: QueryClient, message: ChatMessage): void {
  queryClient.setQueryData<ConversationDetail>(
    chatKeys.thread(message.conversationId),
    (thread) => {
      if (!thread) return thread;
      const exists = thread.messages.some((m) => m.id === message.id);
      return {
        ...thread,
        messages: exists
          ? thread.messages.map((m) => (m.id === message.id ? message : m))
          : [...thread.messages, message],
      };
    },
  );
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SendMessageDto) =>
      apiJson(`/conversations/${conversationId}/messages`, ChatMessageSchema, {
        method: 'POST',
        body: dto,
      }),
    onSuccess: (message) => {
      upsertMessage(queryClient, message);
      void queryClient.invalidateQueries({ queryKey: chatKeys.list });
    },
  });
}

export function useMarkRead(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiSend(`/conversations/${conversationId}/read`, { method: 'POST' }),
    // The socket nudges the list; refresh the badge right away so it clears without waiting.
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: chatKeys.unread }),
  });
}

export function useOlderMessages(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (before: string) =>
      apiJson(
        `/conversations/${conversationId}/messages?before=${encodeURIComponent(before)}`,
        OlderSchema,
      ),
    onSuccess: (page) =>
      queryClient.setQueryData<ConversationDetail>(chatKeys.thread(conversationId), (thread) =>
        thread
          ? {
              ...thread,
              hasMore: page.hasMore,
              messages: [
                ...page.messages.filter((m) => !thread.messages.some((x) => x.id === m.id)),
                ...thread.messages,
              ],
            }
          : thread,
      ),
  });
}

// ── Staff ───────────────────────────────────────────────────────────────────

export function useRelayMessage() {
  return useMutation({
    mutationFn: ({
      messageId,
      toConversationId,
    }: {
      messageId: string;
      toConversationId: string;
    }) =>
      apiJson(`/admin/messages/${messageId}/relay`, ChatMessageSchema, {
        method: 'POST',
        body: { toConversationId },
      }),
  });
}

export function useFlaggedMessages() {
  return useQuery({
    queryKey: chatKeys.flagged,
    queryFn: () => apiJson('/admin/moderation/messages', z.array(FlaggedMessageSchema)),
  });
}

export function useDecideFlagged() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'release' | 'confirm' }) =>
      apiSend(`/admin/moderation/messages/${id}`, { method: 'POST', body: { action } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: chatKeys.flagged });
      void queryClient.invalidateQueries({ queryKey: chatKeys.list });
    },
  });
}
