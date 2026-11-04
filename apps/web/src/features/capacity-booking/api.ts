'use client';

import {
  AdminBookingSchema,
  BookingTermsSchema,
  BuyerBookingSchema,
  BuyerCapacityOverviewSchema,
  type CapacityBookingSettingsDto,
  CapacityBookingSettingsSchema,
  type CapacityBookingStatus,
  type CapacitySearchQuery,
  CapacitySearchResponseSchema,
  type ConvertBookingDto,
  ConvertedBookingSchema,
  type CreateBookingInput,
  type CreatePartnershipDto,
  ManufacturerBookingInboxSchema,
  ManufacturerBookingSchema,
  type PaymentMethod,
  PaymentStartSchema,
  AdminClaimSchema,
  type CapacitySlotDto,
  CapacitySlotSchema,
  type CapacitySlotUpdateDto,
  LineCalendarSchema,
  ManufacturerClaimSchema,
  ManufacturerLineSchema,
  type ProductionLineDto,
  type SupplierClaimDto,
  type SupplierClaimStatus,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const keys = {
  lines: ['capacity-booking', 'lines'] as const,
  calendar: (from: string, days: number) => ['capacity-booking', 'calendar', from, days] as const,
  claims: ['capacity-booking', 'claims'] as const,
  adminClaims: (status: SupplierClaimStatus | 'ALL') => ['admin', 'claims', status] as const,
  search: (q: CapacitySearchQuery | null) => ['capacity', 'search', q] as const,
  terms: (slotId: string, kind: string, minutes: number | null) =>
    ['capacity', 'terms', slotId, kind, minutes] as const,
  overview: ['capacity', 'bookings'] as const,
  booking: (code: string) => ['capacity', 'bookings', code] as const,
  inbox: ['capacity-booking', 'inbox'] as const,
  factoryBooking: (code: string) => ['capacity-booking', 'inbox', code] as const,
  settings: ['admin', 'capacity-booking', 'settings'] as const,
  adminBookings: (status: CapacityBookingStatus | 'ALL') =>
    ['admin', 'capacity-booking', 'bookings', status] as const,
};

const qs = (params: Record<string, string | number | undefined>) =>
  new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) => (v === undefined ? [] : [[k, String(v)]])),
  ).toString();

/** Lines and their calendar change together: refresh both after any edit. */
function useInvalidateLines() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['capacity-booking'] });
}

// ── Lines and windows ───────────────────────────────────────────────────────

export function useLines() {
  return useQuery({
    queryKey: keys.lines,
    queryFn: () => apiJson('/manufacturer/lines', z.array(ManufacturerLineSchema)),
  });
}

export function useLineCalendar(from: string | null, days: number) {
  return useQuery({
    queryKey: keys.calendar(from ?? '', days),
    queryFn: () =>
      apiJson(
        `/manufacturer/capacity/lines-calendar?from=${from ?? ''}&days=${String(days)}`,
        LineCalendarSchema,
      ),
    enabled: from !== null,
    placeholderData: (previous) => previous,
  });
}

export function useSaveLine(id: string | null) {
  const invalidate = useInvalidateLines();
  return useMutation({
    mutationFn: (dto: ProductionLineDto) =>
      apiJson(id ? `/manufacturer/lines/${id}` : '/manufacturer/lines', ManufacturerLineSchema, {
        method: id ? 'PUT' : 'POST',
        body: dto,
      }),
    onSettled: invalidate,
  });
}

export function useDeleteLine() {
  const invalidate = useInvalidateLines();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/manufacturer/lines/${id}`, { method: 'DELETE' }),
    onSettled: invalidate,
  });
}

export function useOpenSlot() {
  const invalidate = useInvalidateLines();
  return useMutation({
    mutationFn: (dto: CapacitySlotDto) =>
      apiJson('/manufacturer/slots', CapacitySlotSchema, { method: 'POST', body: dto }),
    onSettled: invalidate,
  });
}

export function useUpdateSlot() {
  const invalidate = useInvalidateLines();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: CapacitySlotUpdateDto }) =>
      apiJson(`/manufacturer/slots/${id}`, CapacitySlotSchema, { method: 'PATCH', body: dto }),
    onSettled: invalidate,
  });
}

export function useDeleteSlot() {
  const invalidate = useInvalidateLines();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/manufacturer/slots/${id}`, { method: 'DELETE' }),
    onSettled: invalidate,
  });
}

// ── Supplier claims ─────────────────────────────────────────────────────────

export function useClaims() {
  return useQuery({
    queryKey: keys.claims,
    queryFn: () => apiJson('/manufacturer/claims', z.array(ManufacturerClaimSchema)),
  });
}

export function useAddClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      details,
      onProgress,
    }: {
      file: File;
      details: Omit<SupplierClaimDto, 'evidenceFileId'>;
      onProgress: (p: number) => void;
    }) => {
      const evidenceFileId = await uploadFile(
        '/manufacturer/claims/uploads',
        'SUPPLIER_CLAIM_EVIDENCE',
        file,
        onProgress,
      );
      await apiSend('/manufacturer/claims', {
        method: 'POST',
        body: { ...details, evidenceFileId },
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.claims }),
  });
}

export function useRemoveClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/manufacturer/claims/${id}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.claims }),
  });
}

export function useAdminClaims(status: SupplierClaimStatus | 'ALL') {
  return useQuery({
    queryKey: keys.adminClaims(status),
    queryFn: () =>
      apiJson(
        status === 'ALL' ? '/admin/claims' : `/admin/claims?status=${status}`,
        z.array(AdminClaimSchema),
      ),
  });
}

export function useDecideClaim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      verdict,
      note,
    }: {
      id: string;
      verdict: 'verify' | 'reject';
      note?: string;
    }) => apiSend(`/admin/claims/${id}/${verdict}`, { method: 'POST', body: note ? { note } : {} }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin', 'claims'] }),
  });
}

// ── Buyer: search and bookings ──────────────────────────────────────────────

export function useCapacitySearch(query: CapacitySearchQuery | null) {
  return useQuery({
    queryKey: keys.search(query),
    queryFn: () =>
      apiJson(
        `/capacity/search?${qs({
          categoryId: query?.categoryId,
          minutes: query?.minutes,
          pieces: query?.pieces,
          samPerPiece: query?.samPerPiece,
          from: query?.from,
          to: query?.to,
        })}`,
        CapacitySearchResponseSchema,
      ),
    enabled: query !== null,
    placeholderData: (previous) => previous,
  });
}

export function useBookingTerms(slotId: string, kind: 'SLOT' | 'LINE', minutes: number | null) {
  return useQuery({
    queryKey: keys.terms(slotId, kind, minutes),
    queryFn: () =>
      apiJson(
        `/capacity/slots/${slotId}/terms?${qs({ kind, minutes: minutes ?? undefined })}`,
        BookingTermsSchema,
      ),
    retry: false,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateBookingInput) =>
      apiJson('/capacity/bookings', z.object({ code: z.string() }), { method: 'POST', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['capacity'] }),
  });
}

export function useCapacityOverview() {
  return useQuery({
    queryKey: keys.overview,
    queryFn: () => apiJson('/capacity/bookings', BuyerCapacityOverviewSchema),
  });
}

export function useBuyerBooking(code: string) {
  return useQuery({
    queryKey: keys.booking(code),
    queryFn: () => apiJson(`/capacity/bookings/${code}`, BuyerBookingSchema),
    // Staff confirm transfers and the factory answers elsewhere: keep it fresh while waiting.
    refetchInterval: (q) => (q.state.data?.status === 'HELD' ? 15_000 : false),
  });
}

function useBookingAction<T, R>(fn: (input: T) => Promise<R>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['capacity'] }),
  });
}

export function useStartDeposit(code: string) {
  return useMutation({
    mutationFn: (method: PaymentMethod) =>
      apiJson(`/capacity/bookings/${code}/deposit`, PaymentStartSchema, {
        method: 'POST',
        body: { method },
      }),
  });
}

export const useMarkDepositSent = (code: string) =>
  useBookingAction(({ id, payerReference }: { id: string; payerReference: string }) =>
    apiSend(`/capacity/bookings/${code}/deposit/${id}/sent`, {
      method: 'POST',
      body: { payerReference },
    }),
  );

export const useCancelBooking = (code: string) =>
  useBookingAction((reason: string) =>
    apiSend(`/capacity/bookings/${code}/cancel`, { method: 'POST', body: { reason } }),
  );

export const useConvertBooking = (code: string) =>
  useBookingAction((dto: ConvertBookingDto) =>
    apiJson(`/capacity/bookings/${code}/convert`, ConvertedBookingSchema, {
      method: 'POST',
      body: dto,
    }),
  );

export function useRequestPartnership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePartnershipDto) =>
      apiJson('/capacity/partnerships', z.object({ code: z.string() }), {
        method: 'POST',
        body: dto,
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['capacity'] }),
  });
}

export function useCancelPartnership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, reason }: { code: string; reason: string }) =>
      apiSend(`/capacity/partnerships/${code}/cancel`, { method: 'POST', body: { reason } }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['capacity'] }),
  });
}

// ── Factory: requests inbox ─────────────────────────────────────────────────

export function useBookingInbox() {
  return useQuery({
    queryKey: keys.inbox,
    queryFn: () => apiJson('/manufacturer/bookings', ManufacturerBookingInboxSchema),
  });
}

export function useFactoryBooking(code: string) {
  return useQuery({
    queryKey: keys.factoryBooking(code),
    queryFn: () => apiJson(`/manufacturer/bookings/${code}`, ManufacturerBookingSchema),
  });
}

export function useAnswerRequest() {
  const invalidate = useInvalidateLines();
  return useMutation({
    mutationFn: ({
      kind,
      code,
      verdict,
      reason,
    }: {
      kind: 'bookings' | 'partnerships';
      code: string;
      verdict: 'accept' | 'decline';
      reason?: string;
    }) =>
      apiSend(`/manufacturer/${kind}/${code}/${verdict}`, {
        method: 'POST',
        body: reason ? { reason } : {},
      }),
    onSettled: invalidate,
  });
}

// ── Staff ───────────────────────────────────────────────────────────────────

export function useBookingSettings() {
  return useQuery({
    queryKey: keys.settings,
    queryFn: () => apiJson('/admin/capacity-booking/settings', CapacityBookingSettingsSchema),
  });
}

export function useSaveBookingSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CapacityBookingSettingsDto) =>
      apiJson('/admin/capacity-booking/settings', CapacityBookingSettingsSchema, {
        method: 'PUT',
        body: dto,
      }),
    onSuccess: (data) => queryClient.setQueryData(keys.settings, data),
  });
}

export function useAdminBookings(status: CapacityBookingStatus | 'ALL') {
  return useQuery({
    queryKey: keys.adminBookings(status),
    queryFn: () =>
      apiJson(
        status === 'ALL'
          ? '/admin/capacity-booking/bookings'
          : `/admin/capacity-booking/bookings?status=${status}`,
        z.array(AdminBookingSchema),
      ),
  });
}

export function useAdminBookingAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      code,
      action,
      reason,
    }: {
      code: string;
      action: 'cancel' | 'compensation';
      reason?: string;
    }) =>
      apiSend(`/admin/capacity-booking/bookings/${code}/${action}`, {
        method: 'POST',
        body: reason ? { reason } : {},
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin', 'capacity-booking'] }),
  });
}
