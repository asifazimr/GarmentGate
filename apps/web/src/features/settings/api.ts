'use client';

import {
  NotificationPreferencesSchema,
  type UpdateNotificationPreferencesDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson } from '@/lib/api';

const key = ['notification-preferences'] as const;

export function useNotificationPreferences() {
  return useQuery({
    queryKey: key,
    queryFn: () => apiJson('/notifications/preferences', NotificationPreferencesSchema),
  });
}

export function useSaveNotificationPreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateNotificationPreferencesDto) =>
      apiJson('/notifications/preferences', NotificationPreferencesSchema, {
        method: 'PUT',
        body: dto,
      }),
    onSuccess: (data) => queryClient.setQueryData(key, data),
  });
}
