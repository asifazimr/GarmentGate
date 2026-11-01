'use client';

import {
  AcceptQuoteResultSchema,
  BuyerRfqDetailSchema,
  BuyerRfqSummarySchema,
  ManufacturerQuoteSchema,
  ManufacturerRfqDetailSchema,
  ManufacturerRfqSummarySchema,
  type MarginRuleDto,
  MarginRuleSchema,
  type MediaReviewKind,
  MediaReviewItemSchema,
  type QuoteDto,
  RfqCreatedSchema,
  type RfqDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const keys = {
  buyerList: ['rfqs', 'buyer'] as const,
  buyer: (code: string) => ['rfqs', 'buyer', code] as const,
  inbox: ['rfqs', 'factory'] as const,
  factory: (code: string) => ['rfqs', 'factory', code] as const,
  margins: ['admin', 'margins'] as const,
  review: ['admin', 'media-review'] as const,
};

/** Poll while files are still being sanitized, so they appear without a refresh. */
const pollWhileProcessing = (files: { processing: string }[] | undefined) =>
  files?.some((f) => f.processing === 'PENDING' || f.processing === 'PROCESSING') ? 2_000 : false;

// ── Buyer ───────────────────────────────────────────────────────────────────

export const uploadRfqFile = (file: File, onProgress: (p: number) => void) =>
  uploadFile('/rfqs/uploads', 'TECH_PACK', file, onProgress);

export function useBuyerRfqs() {
  return useQuery({
    queryKey: keys.buyerList,
    queryFn: () => apiJson('/rfqs', z.array(BuyerRfqSummarySchema)),
  });
}

export function useBuyerRfq(code: string) {
  return useQuery({
    queryKey: keys.buyer(code),
    queryFn: () => apiJson(`/rfqs/${encodeURIComponent(code)}`, BuyerRfqDetailSchema),
    refetchInterval: (query) => pollWhileProcessing(query.state.data?.attachments),
  });
}

export function useCreateRfq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: RfqDto) => apiJson('/rfqs', RfqCreatedSchema, { method: 'POST', body: dto }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['rfqs'] });
      void queryClient.invalidateQueries({ queryKey: ['buyer', 'dashboard'] });
    },
  });
}

export function useAcceptQuote(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) =>
      apiJson(
        `/rfqs/${encodeURIComponent(code)}/quotes/${quoteId}/accept`,
        AcceptQuoteResultSchema,
        {
          method: 'POST',
        },
      ),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['rfqs'] });
      void queryClient.invalidateQueries({ queryKey: ['buyer', 'dashboard'] });
    },
  });
}

// ── Manufacturer ────────────────────────────────────────────────────────────

export function useRfqInbox() {
  return useQuery({
    queryKey: keys.inbox,
    queryFn: () => apiJson('/manufacturer/rfqs', z.array(ManufacturerRfqSummarySchema)),
  });
}

export function useFactoryRfq(code: string) {
  return useQuery({
    queryKey: keys.factory(code),
    queryFn: () =>
      apiJson(`/manufacturer/rfqs/${encodeURIComponent(code)}`, ManufacturerRfqDetailSchema),
  });
}

export function useSubmitQuote(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: QuoteDto) =>
      apiJson(`/manufacturer/rfqs/${encodeURIComponent(code)}/quote`, ManufacturerQuoteSchema, {
        method: 'PUT',
        body: dto,
      }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['rfqs', 'factory'] }),
  });
}

// ── Admin ───────────────────────────────────────────────────────────────────

export function useMarginRules() {
  return useQuery({
    queryKey: keys.margins,
    queryFn: () => apiJson('/admin/margins', z.array(MarginRuleSchema)),
  });
}

export function useSaveMarginRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string | null; dto: MarginRuleDto }) =>
      id
        ? apiSend(`/admin/margins/${id}`, { method: 'PUT', body: dto })
        : apiSend('/admin/margins', { method: 'POST', body: dto }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: keys.margins }),
  });
}

export function useDeleteMarginRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/admin/margins/${id}`, { method: 'DELETE' }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: keys.margins }),
  });
}

export function useMediaReviewQueue() {
  return useQuery({
    queryKey: keys.review,
    queryFn: () => apiJson('/admin/media/pending', z.array(MediaReviewItemSchema)),
  });
}

export function useReviewMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      kind,
      id,
      decision,
      note,
    }: {
      kind: MediaReviewKind;
      id: string;
      decision: 'approve' | 'reject';
      note?: string;
    }) =>
      apiSend(`/admin/media/${kind}/${id}/${decision}`, {
        method: 'POST',
        ...(decision === 'reject' && { body: { note } }),
      }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: keys.review }),
  });
}
