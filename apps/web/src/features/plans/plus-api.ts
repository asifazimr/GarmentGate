'use client';

import {
  BuyerPlusSchema,
  type BuyerPlusSettings,
  BuyerPlusSettingsSchema,
  type GrantPlusDto,
  type PlusCheckoutDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

const mine = ['buyer', 'plus'] as const;
const staff = ['admin', 'plans'] as const;

/** `poll`: just back from Stripe Checkout, re-check briefly until the webhook has landed. */
export const useBuyerPlus = (poll = false) =>
  useQuery({
    queryKey: mine,
    queryFn: () => apiJson('/buyer/plus', BuyerPlusSchema),
    refetchInterval: (query) =>
      poll && query.state.data?.active === false && query.state.dataUpdateCount < 10
        ? 2_000
        : false,
  });

export const usePlusCheckout = () =>
  useMutation({
    mutationFn: (dto: PlusCheckoutDto) =>
      apiJson('/buyer/plus/checkout', z.object({ url: z.url() }), { method: 'POST', body: dto }),
  });

export function useCancelPlus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiSend('/buyer/plus/cancel', { method: 'POST' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: mine }),
  });
}

export const usePlusSettings = () =>
  useQuery({
    queryKey: [...staff, 'plus-settings'],
    queryFn: () => apiJson('/admin/plus/settings', BuyerPlusSettingsSchema),
  });

export function useSavePlusSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: BuyerPlusSettings) =>
      apiJson('/admin/plus/settings', BuyerPlusSettingsSchema, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}

export function useGrantPlus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, dto }: { code: string; dto: GrantPlusDto }) =>
      apiSend(`/admin/buyers/${code}/plus`, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}
