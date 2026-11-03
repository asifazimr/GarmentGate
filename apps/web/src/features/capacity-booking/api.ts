'use client';

import {
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
};

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
