'use client';

import {
  AdminLogisticsClaimSchema,
  type LogisticsReportQuery,
  LogisticsReportSchema,
  type OpenClaimDto,
  type SettleClaimDto,
  type SubmitClaimDto,
  AdminLogisticsOrderSchema,
  type CreatePartnerUserInput,
  PartnerUserSchema,
  type TrackingEventInput,
  AdminShipmentRowSchema,
  AdminShipmentSchema,
  type CreateShipmentInput,
  DutyRateSchema,
  type HubReceiptInput,
  type UpdateLegInput,
  type UpdatePickupDto,
  type UpdateShipmentInput,
  FreightOptionSchema,
  type FreightQuoteRequest,
  HubSchema,
  LogisticsMarginRuleSchema,
  LogisticsPartnerSchema,
  type LogisticsSettings,
  LogisticsSettingsSchema,
  RateCardSchema,
} from '@garmentgate/shared';
import {
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const base = '/admin/logistics';
const keys = {
  all: ['admin', 'logistics'] as const,
  partners: ['admin', 'logistics', 'partners'] as const,
  hubs: ['admin', 'logistics', 'hubs'] as const,
  rateCards: ['admin', 'logistics', 'rate-cards'] as const,
  margins: ['admin', 'logistics', 'margins'] as const,
  duties: ['admin', 'logistics', 'duty-rates'] as const,
  settings: ['admin', 'logistics', 'settings'] as const,
};

function useList<S extends z.ZodType>(
  key: readonly unknown[],
  path: string,
  schema: S,
): UseQueryResult<z.output<S>[]> {
  return useQuery({ queryKey: key, queryFn: () => apiJson(`${base}/${path}`, z.array(schema)) });
}

export const usePartners = () => useList(keys.partners, 'partners', LogisticsPartnerSchema);
export const useHubs = () => useList(keys.hubs, 'hubs', HubSchema);
export const useRateCards = () => useList(keys.rateCards, 'rate-cards', RateCardSchema);
export const useMarginRules = () => useList(keys.margins, 'margins', LogisticsMarginRuleSchema);
export const useDutyRates = () => useList(keys.duties, 'duty-rates', DutyRateSchema);

/** Create (id null) or update a record; refreshes the whole logistics admin. */
/** The DTO was already validated by the form's shared schema; it is sent as is. */
function useSave(path: string): UseMutationResult<void, Error, { id: string | null; dto: object }> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string | null; dto: object }) =>
      apiSend(id ? `${base}/${path}/${id}` : `${base}/${path}`, {
        method: id ? 'PUT' : 'POST',
        body: dto,
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });
}

function useRemove(path: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`${base}/${path}/${id}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });
}

export const useSavePartner = () => useSave('partners');
export const useSaveHub = () => useSave('hubs');
export const useSaveRateCard = () => useSave('rate-cards');
export const useRetireRateCard = () => useRemove('rate-cards');
export const useSaveMarginRule = () => useSave('margins');
export const useDeleteMarginRule = () => useRemove('margins');
export const useSaveDutyRate = () => useSave('duty-rates');
export const useDeleteDutyRate = () => useRemove('duty-rates');

export function useLogisticsSettings() {
  return useQuery({
    queryKey: keys.settings,
    queryFn: () => apiJson(`${base}/settings`, LogisticsSettingsSchema),
  });
}

export function useSaveLogisticsSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: LogisticsSettings) =>
      apiJson(`${base}/settings`, LogisticsSettingsSchema, { method: 'PUT', body: dto }),
    onSuccess: (data) => queryClient.setQueryData(keys.settings, data),
  });
}

export function useQuotePreview() {
  return useMutation({
    mutationFn: (dto: FreightQuoteRequest) =>
      apiJson(`${base}/quote-preview`, z.array(FreightOptionSchema), { method: 'POST', body: dto }),
  });
}

// ── Board, hub receiving and shipments ──────────────────────────────────────

export const useLogisticsBoard = () =>
  useList(['admin', 'logistics', 'board'], 'orders', AdminLogisticsOrderSchema);
export const useShipments = () =>
  useList(['admin', 'logistics', 'shipments'], 'shipments', AdminShipmentRowSchema);

export function useShipment(code: string) {
  return useQuery({
    queryKey: ['admin', 'logistics', 'shipments', code],
    queryFn: () => apiJson(`${base}/shipments/${code}`, AdminShipmentSchema),
  });
}

function useAdminAction<T, R>(fn: (input: T) => Promise<R>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });
}

export const useUpdatePickup = () =>
  useAdminAction(({ id, dto }: { id: string; dto: UpdatePickupDto }) =>
    apiSend(`${base}/pickups/${id}`, { method: 'PATCH', body: dto }),
  );

export const uploadHubPhoto = (file: File, onProgress: (p: number) => void) =>
  uploadFile(`${base}/hub-photos/uploads`, 'HUB_PHOTO', file, onProgress);

export const useReceiveAtHub = () =>
  useAdminAction((dto: HubReceiptInput) =>
    apiSend(`${base}/hub-receipts`, { method: 'POST', body: dto }),
  );

export const useCreateShipment = () =>
  useAdminAction((dto: CreateShipmentInput) =>
    apiJson(`${base}/shipments`, z.object({ code: z.string() }), { method: 'POST', body: dto }),
  );

export const useUpdateShipment = (code: string) =>
  useAdminAction((dto: UpdateShipmentInput) =>
    apiSend(`${base}/shipments/${code}`, { method: 'PATCH', body: dto }),
  );

export const useUpdateLeg = (code: string) =>
  useAdminAction(({ id, dto }: { id: string; dto: UpdateLegInput }) =>
    apiSend(`${base}/shipments/${code}/legs/${id}`, { method: 'PATCH', body: dto }),
  );

export const shipmentDocumentUrl = (code: string, type: string) =>
  `/api${base}/shipments/${code}/documents/${type}`;

export const useShipmentEvent = (code: string) =>
  useAdminAction((dto: TrackingEventInput) =>
    apiSend(`${base}/shipments/${code}/events`, { method: 'POST', body: dto }),
  );

export const usePublishUpload = (code: string) =>
  useAdminAction(({ id, buyerVisible }: { id: string; buyerVisible: boolean }) =>
    apiSend(`${base}/shipments/${code}/uploads/${id}`, { method: 'PATCH', body: { buyerVisible } }),
  );

export const usePayLeg = (code: string) =>
  useAdminAction((legId: string) =>
    apiSend(`${base}/shipments/${code}/legs/${legId}/payout`, { method: 'POST' }),
  );

export function usePartnerUsers(partnerId: string | null) {
  return useQuery({
    queryKey: ['admin', 'logistics', 'partners', partnerId, 'users'],
    queryFn: () => apiJson(`${base}/partners/${partnerId ?? ''}/users`, z.array(PartnerUserSchema)),
    enabled: partnerId !== null,
  });
}

export const useInvitePartnerUser = (partnerId: string) =>
  useAdminAction((dto: CreatePartnerUserInput) =>
    apiSend(`${base}/partners/${partnerId}/users`, { method: 'POST', body: dto }),
  );

// ── Claims and reports ──────────────────────────────────────────────────────

export const useClaims = () =>
  useList(['admin', 'logistics', 'claims'], 'claims', AdminLogisticsClaimSchema);

export const useOpenClaim = () =>
  useAdminAction((dto: OpenClaimDto) =>
    apiJson(`${base}/claims`, z.object({ code: z.string() }), { method: 'POST', body: dto }),
  );

export const useSubmitClaim = () =>
  useAdminAction(({ code, dto }: { code: string; dto: SubmitClaimDto }) =>
    apiSend(`${base}/claims/${code}/submit`, { method: 'POST', body: dto }),
  );

export const useSettleClaim = () =>
  useAdminAction(({ code, dto }: { code: string; dto: SettleClaimDto }) =>
    apiSend(`${base}/claims/${code}/settle`, { method: 'POST', body: dto }),
  );

export function useLogisticsReport(query: LogisticsReportQuery | null) {
  return useQuery({
    queryKey: ['admin', 'logistics', 'reports', query],
    queryFn: () =>
      apiJson(
        `${base}/reports?${new URLSearchParams(query ?? {}).toString()}`,
        LogisticsReportSchema,
      ),
    enabled: query !== null,
  });
}
