'use client';

import {
  type ConfirmPhoneDto,
  MyMessagingSchema,
  type StartPhoneVerificationDto,
  type TextChannel,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson, apiSend } from '@/lib/api';

const key = ['me', 'messaging'] as const;

export const useMyMessaging = () =>
  useQuery({ queryKey: key, queryFn: () => apiJson('/me/messaging', MyMessagingSchema) });

function useAction<T>(fn: (input: T) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
}

export const useSendPhoneCode = () =>
  useAction((dto: StartPhoneVerificationDto) =>
    apiSend('/me/messaging/phone', { method: 'POST', body: dto }),
  );
export const useConfirmPhone = () =>
  useAction((dto: ConfirmPhoneDto) =>
    apiJson('/me/messaging/phone/verify', MyMessagingSchema, { method: 'POST', body: dto }),
  );
export const useRemovePhone = () =>
  useAction(() => apiSend('/me/messaging/phone', { method: 'DELETE' }));
export const useSetTextChannel = () =>
  useAction((channel: TextChannel) =>
    apiJson('/me/messaging/channel', MyMessagingSchema, { method: 'PUT', body: { channel } }),
  );
