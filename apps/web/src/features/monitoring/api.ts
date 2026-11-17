'use client';

import {
  AdminCameraSchema,
  type AssignCamerasDto,
  BuyerMonitoringSchema,
  type CreateCameraDto,
  FactoryCameraSchema,
  FactoryOrderMonitoringSchema,
  type MonitoringSettings,
  MonitoringSettingsSchema,
  type ReviewCameraDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { ApiError, apiJson, apiSend } from '@/lib/api';

const cameras = ['manufacturer', 'cameras'] as const;
const staff = ['admin', 'monitoring'] as const;
const orderKey = (code: string) => ['orders', code, 'monitoring'] as const;

/** Signed playback links expire: refresh the panel well before they do. */
const REFRESH_MS = 5 * 60_000;

// ── Factory ──────────────────────────────────────────────────────────────────

export const useFactoryCameras = () =>
  useQuery({
    queryKey: cameras,
    queryFn: () => apiJson('/manufacturer/cameras', z.array(FactoryCameraSchema)),
    // Live state changes as the factory starts its encoder.
    refetchInterval: 15_000,
  });

export function useCreateCamera() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCameraDto) =>
      apiJson('/manufacturer/cameras', FactoryCameraSchema, { method: 'POST', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: cameras }),
  });
}

export function useCameraAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'submit' | 'remove' }) =>
      action === 'submit'
        ? apiSend(`/manufacturer/cameras/${id}/submit`, { method: 'POST' })
        : apiSend(`/manufacturer/cameras/${id}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: cameras }),
  });
}

export const useFactoryOrderCameras = (code: string) =>
  useQuery({
    queryKey: ['manufacturer', 'orders', code, 'cameras'],
    queryFn: () => apiJson(`/manufacturer/orders/${code}/cameras`, FactoryOrderMonitoringSchema),
  });

export function useAssignCameras(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AssignCamerasDto) =>
      apiSend(`/manufacturer/orders/${code}/cameras`, { method: 'PUT', body: dto }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['manufacturer', 'orders', code, 'cameras'] }),
  });
}

// ── Buyer (and staff) ────────────────────────────────────────────────────────

export const useOrderMonitoring = (code: string) =>
  useQuery({
    queryKey: orderKey(code),
    queryFn: () => apiJson(`/orders/${code}/monitoring`, BuyerMonitoringSchema),
    refetchInterval: REFRESH_MS,
    // A factory gets 403 here: don't retry what it can never see.
    retry: (count, err) => !(err instanceof ApiError && err.status < 500) && count < 2,
  });

export function useAddMonitoring(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiSend(`/orders/${code}/monitoring`, { method: 'POST' }),
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: orderKey(code) }),
        queryClient.invalidateQueries({ queryKey: ['payments', code] }),
      ]),
  });
}

// ── Staff ────────────────────────────────────────────────────────────────────

export const useAdminCameras = () =>
  useQuery({
    queryKey: [...staff, 'cameras'],
    queryFn: () => apiJson('/admin/monitoring/cameras', z.array(AdminCameraSchema)),
    refetchInterval: REFRESH_MS,
  });

export function useReviewCamera() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ReviewCameraDto }) =>
      apiSend(`/admin/monitoring/cameras/${id}/review`, { method: 'POST', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}

export function useDisableCamera() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiSend(`/admin/monitoring/cameras/${id}/disable`, { method: 'POST' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}

export const useMonitoringSettings = () =>
  useQuery({
    queryKey: [...staff, 'settings'],
    queryFn: () => apiJson('/admin/monitoring/settings', MonitoringSettingsSchema),
  });

export function useSaveMonitoringSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: MonitoringSettings) =>
      apiJson('/admin/monitoring/settings', MonitoringSettingsSchema, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: staff }),
  });
}
