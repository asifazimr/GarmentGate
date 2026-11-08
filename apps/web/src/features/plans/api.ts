'use client';

import {
  AdminPlansSchema,
  FactoryPlanSchema,
  type GrantPlanDto,
  type PlanCheckoutDto,
  type PlanSettings,
  PlanSettingsSchema,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

const mine = ['manufacturer', 'plan'] as const;
const staff = ['admin', 'plans'] as const;

/** `poll`: just back from Stripe Checkout, re-check briefly until the webhook has landed. */
export const useFactoryPlan = (poll = false) =>
  useQuery({
    queryKey: mine,
    queryFn: () => apiJson('/manufacturer/plan', FactoryPlanSchema),
    refetchInterval: (query) =>
      poll && query.state.data?.subscription === null && query.state.dataUpdateCount < 10
        ? 2_000
        : false,
  });

export const useCheckout = () =>
  useMutation({
    mutationFn: (dto: PlanCheckoutDto) =>
      apiJson('/manufacturer/plan/checkout', z.object({ url: z.url() }), {
        method: 'POST',
        body: dto,
      }),
  });

export function useCancelPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiSend('/manufacturer/plan/cancel', { method: 'POST' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: mine }),
  });
}

export const useAdminPlans = () =>
  useQuery({ queryKey: staff, queryFn: () => apiJson('/admin/plans', AdminPlansSchema) });

export const usePlanSettings = () =>
  useQuery({
    queryKey: [...staff, 'settings'],
    queryFn: () => apiJson('/admin/plans/settings', PlanSettingsSchema),
  });

export function useSavePlanSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: PlanSettings) =>
      apiJson('/admin/plans/settings', PlanSettingsSchema, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}

export function useGrantPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, dto }: { code: string; dto: GrantPlanDto }) =>
      apiSend(`/admin/manufacturers/${code}/plan`, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}
