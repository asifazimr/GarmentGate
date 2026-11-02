'use client';

import {
  type AddEvidenceDto,
  AdminDisputeSchema,
  AdminDisputeSummarySchema,
  BuyerDisputeSchema,
  ManufacturerDisputeSchema,
  type OpenDisputeDto,
  OrderReviewsSchema,
  PublicReviewSchema,
  type ResolveDisputeDto,
  type SubmitReviewDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import type { OrderRole } from '@/features/orders/api';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const disputeSchema = {
  BUYER: z.object({ dispute: BuyerDisputeSchema.nullable() }),
  MANUFACTURER: z.object({ dispute: ManufacturerDisputeSchema.nullable() }),
  ADMIN: z.object({ dispute: AdminDisputeSchema.nullable() }),
};

const keys = {
  dispute: (role: OrderRole, code: string) => ['disputes', role, code] as const,
  adminList: ['disputes', 'admin-list'] as const,
  reviews: (code: string) => ['reviews', code] as const,
  factoryReviews: (code: string) => ['reviews', 'factory', code] as const,
};

/** Polls while evidence is still being sanitized, so it appears without a refresh. */
const pollWhileProcessing = (
  data: { dispute: { evidence: { processing: string }[] } | null } | undefined,
) =>
  data?.dispute?.evidence.some((e) => e.processing === 'PENDING' || e.processing === 'PROCESSING')
    ? 3_000
    : false;

export function useBuyerDispute(code: string) {
  return useQuery({
    queryKey: keys.dispute('BUYER', code),
    queryFn: () => apiJson(`/orders/${code}/dispute`, disputeSchema.BUYER),
    refetchInterval: (q) => pollWhileProcessing(q.state.data),
  });
}
export function useFactoryDispute(code: string) {
  return useQuery({
    queryKey: keys.dispute('MANUFACTURER', code),
    queryFn: () => apiJson(`/orders/${code}/dispute`, disputeSchema.MANUFACTURER),
    refetchInterval: (q) => pollWhileProcessing(q.state.data),
  });
}
export function useAdminDispute(code: string) {
  return useQuery({
    queryKey: keys.dispute('ADMIN', code),
    queryFn: () => apiJson(`/orders/${code}/dispute`, disputeSchema.ADMIN),
    refetchInterval: (q) => pollWhileProcessing(q.state.data),
  });
}

export function useAdminDisputes() {
  return useQuery({
    queryKey: keys.adminList,
    queryFn: () => apiJson('/admin/disputes', z.array(AdminDisputeSummarySchema)),
  });
}

/** Dispute changes move the order too: refresh both. */
function useDisputeMutation<T>(fn: (input: T) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['disputes'] });
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      void queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}

export const useOpenDispute = (code: string) =>
  useDisputeMutation((dto: OpenDisputeDto) =>
    apiSend(`/orders/${code}/dispute`, { method: 'POST', body: dto }),
  );
export const useAddEvidence = (code: string) =>
  useDisputeMutation((dto: AddEvidenceDto) =>
    apiSend(`/orders/${code}/dispute/evidence`, { method: 'POST', body: dto }),
  );
export const useAssignDispute = () =>
  useDisputeMutation((id: string) => apiSend(`/admin/disputes/${id}/assign`, { method: 'POST' }));
export const useResolveDispute = () =>
  useDisputeMutation(({ id, dto }: { id: string; dto: ResolveDisputeDto }) =>
    apiSend(`/admin/disputes/${id}/resolve`, { method: 'POST', body: dto }),
  );

export const uploadEvidence = (code: string, file: File, onProgress: (p: number) => void) =>
  uploadFile(`/orders/${code}/dispute/uploads`, 'DISPUTE_EVIDENCE', file, onProgress);

// ── Reviews ─────────────────────────────────────────────────────────────────

export function useOrderReviews(code: string, enabled = true) {
  return useQuery({
    queryKey: keys.reviews(code),
    queryFn: () => apiJson(`/orders/${code}/reviews`, OrderReviewsSchema),
    enabled,
  });
}

export function useSubmitReview(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SubmitReviewDto) =>
      apiSend(`/orders/${code}/reviews`, { method: 'POST', body: dto }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: keys.reviews(code) }),
  });
}

export function useFactoryReviews(code: string) {
  return useQuery({
    queryKey: keys.factoryReviews(code),
    queryFn: () =>
      apiJson(`/manufacturers/${encodeURIComponent(code)}/reviews`, z.array(PublicReviewSchema)),
  });
}
