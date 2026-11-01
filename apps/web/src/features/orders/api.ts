'use client';

import {
  AdminOrderSchema,
  AdminOrderSummarySchema,
  BuyerOrderSchema,
  BuyerOrderSummarySchema,
  ManufacturerOrderSchema,
  ManufacturerOrderSummarySchema,
  type MilestoneUpdateDto,
  OrderCreatedSchema,
  type OrderTransitionDto,
  type ProductionStage,
  type ReorderOrderDto,
  type RequestSampleDto,
  type SampleDecisionDto,
  type ShipSampleDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

export type OrderRole = 'BUYER' | 'MANUFACTURER' | 'ADMIN';

const keys = {
  list: (role: OrderRole) => ['orders', role, 'list'] as const,
  order: (role: OrderRole, code: string) => ['orders', role, code] as const,
};

const detailSchema = {
  BUYER: BuyerOrderSchema,
  MANUFACTURER: ManufacturerOrderSchema,
  ADMIN: AdminOrderSchema,
};

/** Polls while uploaded media is still being sanitized, so it appears without a refresh. */
const pollWhileProcessing = (
  order:
    | {
        milestones: { media: { processing: string }[] }[];
        samples: { photos: { processing: string }[] }[];
      }
    | undefined,
) =>
  order &&
  [...order.milestones.flatMap((m) => m.media), ...order.samples.flatMap((s) => s.photos)].some(
    (m) => m.processing === 'PENDING' || m.processing === 'PROCESSING',
  )
    ? 3_000
    : false;

export function useBuyerOrders() {
  return useQuery({
    queryKey: keys.list('BUYER'),
    queryFn: () => apiJson('/orders', z.array(BuyerOrderSummarySchema)),
  });
}
export function useFactoryOrders() {
  return useQuery({
    queryKey: keys.list('MANUFACTURER'),
    queryFn: () => apiJson('/orders', z.array(ManufacturerOrderSummarySchema)),
  });
}
export function useAdminOrders() {
  return useQuery({
    queryKey: keys.list('ADMIN'),
    queryFn: () => apiJson('/orders', z.array(AdminOrderSummarySchema)),
  });
}

export function useBuyerOrder(code: string) {
  return useQuery({
    queryKey: keys.order('BUYER', code),
    queryFn: () => apiJson(`/orders/${code}`, detailSchema.BUYER),
    refetchInterval: (q) => pollWhileProcessing(q.state.data),
  });
}
export function useFactoryOrder(code: string) {
  return useQuery({
    queryKey: keys.order('MANUFACTURER', code),
    queryFn: () => apiJson(`/orders/${code}`, detailSchema.MANUFACTURER),
    refetchInterval: (q) => pollWhileProcessing(q.state.data),
  });
}
export function useAdminOrder(code: string) {
  return useQuery({
    queryKey: keys.order('ADMIN', code),
    queryFn: () => apiJson(`/orders/${code}`, detailSchema.ADMIN),
    refetchInterval: (q) => pollWhileProcessing(q.state.data),
  });
}

/** Every mutation refreshes the order (and lists) for whichever role is looking. */
function useOrderMutation<T>(code: string, fn: (input: T) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
}

export const useTransition = (code: string) =>
  useOrderMutation(code, (dto: OrderTransitionDto) =>
    apiSend(`/orders/${code}/transition`, { method: 'POST', body: dto }),
  );
export const useRequestSample = (code: string) =>
  useOrderMutation(code, (dto: RequestSampleDto) =>
    apiSend(`/orders/${code}/samples`, { method: 'POST', body: dto }),
  );
export const useShipSample = (code: string) =>
  useOrderMutation(code, ({ id, dto }: { id: string; dto: ShipSampleDto }) =>
    apiSend(`/orders/${code}/samples/${id}/ship`, { method: 'POST', body: dto }),
  );
export const useDecideSample = (code: string) =>
  useOrderMutation(code, ({ id, dto }: { id: string; dto: SampleDecisionDto }) =>
    apiSend(`/orders/${code}/samples/${id}/decision`, { method: 'POST', body: dto }),
  );
export const useUpdateMilestone = (code: string) =>
  useOrderMutation(code, ({ stage, dto }: { stage: ProductionStage; dto: MilestoneUpdateDto }) =>
    apiSend(`/orders/${code}/milestones/${stage}`, { method: 'POST', body: dto }),
  );
export const useAddMilestoneMedia = (code: string) =>
  useOrderMutation(
    code,
    ({ stage, fileId, caption }: { stage: ProductionStage; fileId: string; caption?: string }) =>
      apiSend(`/orders/${code}/milestones/${stage}/media`, {
        method: 'POST',
        body: { fileId, caption },
      }),
  );
export function useReorder(code: string) {
  return useMutation({
    mutationFn: (dto: ReorderOrderDto) =>
      apiJson(`/orders/${code}/reorder`, OrderCreatedSchema, { method: 'POST', body: dto }),
  });
}

export const uploadOrderMedia = (code: string, file: File, onProgress: (p: number) => void) =>
  uploadFile(`/orders/${code}/uploads`, 'ORDER_MEDIA', file, onProgress);

export const purchaseOrderUrl = (code: string, side?: 'buyer' | 'manufacturer') =>
  `/api/orders/${code}/purchase-order${side ? `?side=${side}` : ''}`;
