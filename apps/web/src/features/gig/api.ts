'use client';

import {
  AdminGigInspectorSchema,
  AdminInspectorApplicationSchema,
  type CheckInDto,
  type FactoryLocationDto,
  type GigSettings,
  GigSettingsSchema,
  type InspectorApplicationDto,
  InspectorMeSchema,
  type InspectorPayoutDetailsDto,
  type ReviewApplicationDto,
  TaskSchema,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

const mine = ['inspector', 'gig'] as const;
const staff = ['admin', 'gig'] as const;

function useAction<T, R>(fn: (input: T) => Promise<R>, key: readonly string[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
}

export const useApply = () =>
  useMutation({
    mutationFn: (dto: InspectorApplicationDto) =>
      apiSend('/inspectors/apply', { method: 'POST', body: dto }),
  });

export const useTasks = () =>
  useQuery({
    queryKey: [...mine, 'tasks'],
    queryFn: () => apiJson('/inspector/tasks', z.array(TaskSchema)),
  });
export const useClaim = () =>
  useAction(
    (id: string) => apiSend(`/inspector/tasks/${id}/claim`, { method: 'POST' }),
    ['inspector'],
  );
export const useCheckIn = (id: string) =>
  useAction(
    (dto: CheckInDto) =>
      apiJson(`/inspector/inspections/${id}/check-in`, z.object({ distanceM: z.number() }), {
        method: 'POST',
        body: dto,
      }),
    ['inspector'],
  );
export const useInspectorMe = () =>
  useQuery({
    queryKey: [...mine, 'me'],
    queryFn: () => apiJson('/inspector/me', InspectorMeSchema),
  });
export const useSetPayout = () =>
  useAction(
    (dto: InspectorPayoutDetailsDto) =>
      apiSend('/inspector/me/payout', { method: 'PUT', body: dto }),
    mine,
  );

export const useApplications = () =>
  useQuery({
    queryKey: [...staff, 'applications'],
    queryFn: () => apiJson('/admin/gig/applications', z.array(AdminInspectorApplicationSchema)),
  });
export const useReviewApplication = () =>
  useAction(
    ({ id, dto }: { id: string; dto: ReviewApplicationDto }) =>
      apiSend(`/admin/gig/applications/${id}/review`, { method: 'POST', body: dto }),
    staff,
  );
export const useGigInspectors = () =>
  useQuery({
    queryKey: [...staff, 'inspectors'],
    queryFn: () => apiJson('/admin/gig/inspectors', z.array(AdminGigInspectorSchema)),
  });
export const useVerifyPayout = () =>
  useAction(
    (userId: string) =>
      apiSend(`/admin/gig/inspectors/${userId}/verify-payout`, { method: 'POST' }),
    staff,
  );
export const usePayInspector = () =>
  useAction(
    ({ userId, bankReference }: { userId: string; bankReference: string }) =>
      apiSend(`/admin/gig/inspectors/${userId}/pay`, { method: 'POST', body: { bankReference } }),
    staff,
  );
export const useSetInspectorStatus = () =>
  useAction(
    ({ userId, status }: { userId: string; status: 'ACTIVE' | 'SUSPENDED' }) =>
      apiSend(`/admin/gig/inspectors/${userId}/status`, { method: 'POST', body: { status } }),
    staff,
  );
export const useLocateFactory = () =>
  useMutation({
    mutationFn: ({ code, dto }: { code: string; dto: FactoryLocationDto }) =>
      apiSend(`/admin/manufacturers/${code}/location`, { method: 'PUT', body: dto }),
  });
export const useRateInspection = () =>
  useAction(
    ({ id, rating }: { id: string; rating: number }) =>
      apiSend(`/admin/inspections/${id}/rate`, { method: 'POST', body: { rating } }),
    ['orders'],
  );

export const useGigSettings = () =>
  useQuery({
    queryKey: [...staff, 'settings'],
    queryFn: () => apiJson('/admin/gig/settings', GigSettingsSchema),
  });
export const useSaveGigSettings = () =>
  useAction(
    (dto: GigSettings) =>
      apiJson('/admin/gig/settings', GigSettingsSchema, { method: 'PUT', body: dto }),
    staff,
  );
