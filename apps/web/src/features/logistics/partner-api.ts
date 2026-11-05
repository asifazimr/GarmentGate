'use client';

import {
  type PartnerLegRefsInput,
  PartnerLegSchema,
  type ShipmentUploadKind,
  type TrackingEventInput,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const keys = {
  all: ['partner'] as const,
  leg: (id: string) => ['partner', 'legs', id] as const,
};

export function usePartnerLegs() {
  return useQuery({
    queryKey: ['partner', 'legs'],
    queryFn: () => apiJson('/partner/legs', z.array(PartnerLegSchema)),
  });
}

export function usePartnerLeg(id: string) {
  return useQuery({
    queryKey: keys.leg(id),
    queryFn: () => apiJson(`/partner/legs/${id}`, PartnerLegSchema),
  });
}

function usePartnerAction<T, R>(fn: (input: T) => Promise<R>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });
}

export const useAcceptLeg = () =>
  usePartnerAction((id: string) => apiSend(`/partner/legs/${id}/accept`, { method: 'POST' }));

export const useLegRefs = (id: string) =>
  usePartnerAction((dto: PartnerLegRefsInput) =>
    apiSend(`/partner/legs/${id}`, { method: 'PATCH', body: dto }),
  );

export const useLegEvent = (id: string) =>
  usePartnerAction((dto: TrackingEventInput) =>
    apiSend(`/partner/legs/${id}/events`, { method: 'POST', body: dto }),
  );

export const useLegUpload = (id: string) =>
  usePartnerAction(
    async ({
      file,
      kind,
      onProgress,
    }: {
      file: File;
      kind: ShipmentUploadKind;
      onProgress: (p: number) => void;
    }) => {
      const fileId = await uploadFile(
        `/partner/legs/${id}/uploads`,
        'LOGISTICS_DOCUMENT',
        file,
        onProgress,
      );
      await apiSend(`/partner/legs/${id}/files`, { method: 'POST', body: { fileId, kind } });
    },
  );

export const partnerDocumentUrl = (id: string, type: string) =>
  `/api/partner/legs/${id}/documents/${type}`;
