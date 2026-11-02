'use client';

import {
  type AddShipmentDocumentDto,
  type AssignInspectionDto,
  type BookInspectionDto,
  type BookShipmentDto,
  BuyerPaymentsSchema,
  type CreateInspectorDto,
  type GeneratedDocumentType,
  type InspectionReportDto,
  InspectorJobDetailSchema,
  InspectorJobSchema,
  InspectorSchema,
  type MarkSentDto,
  PaymentStartSchema,
  type StartPaymentDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

/** Mutations on an order refresh every cached view of it (buyer, factory, staff). */
function useOrderMutation<T, R = unknown>(fn: (input: T) => Promise<R>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      void queryClient.invalidateQueries({ queryKey: ['inspector'] });
      void queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}

// ── Inspections ─────────────────────────────────────────────────────────────

export const useBookInspection = (code: string) =>
  useOrderMutation((dto: BookInspectionDto) =>
    apiSend(`/orders/${code}/inspections`, { method: 'POST', body: dto }),
  );

export const useAssignInspection = () =>
  useOrderMutation(({ id, dto }: { id: string; dto: AssignInspectionDto }) =>
    apiSend(`/admin/inspections/${id}`, { method: 'PATCH', body: dto }),
  );

export function useInspectors(enabled = true) {
  return useQuery({
    queryKey: ['inspectors'],
    queryFn: () => apiJson('/admin/inspectors', z.array(InspectorSchema)),
    enabled,
  });
}

export function useCreateInspector() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateInspectorDto) =>
      apiJson('/admin/inspectors', z.object({ id: z.uuid() }), { method: 'POST', body: dto }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['inspectors'] }),
  });
}

export function useInspectorJobs() {
  return useQuery({
    queryKey: ['inspector', 'jobs'],
    queryFn: () => apiJson('/inspector/inspections', z.array(InspectorJobSchema)),
  });
}

export function useInspectorJob(id: string) {
  return useQuery({
    queryKey: ['inspector', 'job', id],
    queryFn: () => apiJson(`/inspector/inspections/${id}`, InspectorJobDetailSchema),
    // Photos appear once the media worker has sanitized them.
    refetchInterval: (q) =>
      q.state.data?.inspection.photos.some((p) => p.processing !== 'READY') ? 3_000 : false,
  });
}

export const useAddInspectionPhoto = (id: string) =>
  useOrderMutation((body: { fileId: string; caption?: string }) =>
    apiSend(`/inspector/inspections/${id}/photos`, { method: 'POST', body }),
  );

export const useFileReport = (id: string) =>
  useOrderMutation((dto: InspectionReportDto) =>
    apiSend(`/inspector/inspections/${id}/report`, { method: 'POST', body: dto }),
  );

export const uploadInspectionFile = (id: string, file: File, onProgress: (p: number) => void) =>
  uploadFile(`/inspector/inspections/${id}/uploads`, 'INSPECTION', file, onProgress);

// ── Shipment ────────────────────────────────────────────────────────────────

export const useBookShipment = (code: string) =>
  useOrderMutation((dto: BookShipmentDto) =>
    apiSend(`/orders/${code}/shipment`, { method: 'PUT', body: dto }),
  );

export const useAddShipmentDocument = (code: string) =>
  useOrderMutation((dto: AddShipmentDocumentDto) =>
    apiSend(`/orders/${code}/shipment/documents`, { method: 'POST', body: dto }),
  );

export const usePublishShipmentDocument = (code: string) =>
  useOrderMutation(({ id, buyerVisible }: { id: string; buyerVisible: boolean }) =>
    apiSend(`/orders/${code}/shipment/documents/${id}`, {
      method: 'PATCH',
      body: { buyerVisible },
    }),
  );

export const uploadShipmentDocument = (code: string, file: File, onProgress: (p: number) => void) =>
  uploadFile(`/orders/${code}/shipment/uploads`, 'SHIPMENT_DOCUMENT', file, onProgress);

export const generatedDocumentUrl = (code: string, type: GeneratedDocumentType) =>
  `/api/orders/${code}/shipment/documents/generated/${type}`;

// ── Balance (buyer) ─────────────────────────────────────────────────────────

export function useBuyerPayments(code: string, enabled = true) {
  return useQuery({
    queryKey: ['payments', code],
    queryFn: () => apiJson(`/orders/${code}/payments`, BuyerPaymentsSchema),
    enabled,
  });
}

export const useStartPayment = (code: string) =>
  useOrderMutation((dto: StartPaymentDto) =>
    apiJson(`/orders/${code}/payments`, PaymentStartSchema, { method: 'POST', body: dto }),
  );

export const useMarkSent = (code: string) =>
  useOrderMutation(({ id, dto }: { id: string; dto: MarkSentDto }) =>
    apiSend(`/orders/${code}/payments/${id}/sent`, { method: 'POST', body: dto }),
  );
