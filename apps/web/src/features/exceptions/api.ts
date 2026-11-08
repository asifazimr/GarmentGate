'use client';

import { OrderExceptionSchema, type ReplaceFactoryDto } from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

export function useExceptions() {
  return useQuery({
    queryKey: ['admin', 'exceptions'],
    queryFn: () => apiJson('/admin/exceptions', z.array(OrderExceptionSchema)),
  });
}

export function useReplaceFactory(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ReplaceFactoryDto) =>
      apiSend(`/admin/orders/${code}/replace-factory`, { method: 'POST', body: dto }),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'exceptions'] });
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      void queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}
