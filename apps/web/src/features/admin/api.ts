'use client';

import {
  AdminCertificationSchema,
  AdminOverviewSchema,
  AdminUserSchema,
  AuditEntrySchema,
  type CertificationStatus,
  type ConfirmPaymentDto,
  FinanceInboxSchema,
  LedgerBalancesSchema,
  OrderFinanceSchema,
  type OverrideOrderStatusDto,
  type PayoutDto,
  type RefundDto,
  type RejectCertificationDto,
  type RejectPaymentDto,
  type SuspendUserDto,
  type WarnUserDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const keys = {
  overview: (months: number) => ['admin', 'overview', months] as const,
  users: ['admin', 'users'] as const,
  audit: (query: string) => ['admin', 'audit', query] as const,
  certifications: (status: CertificationStatus | 'ALL') =>
    ['admin', 'certifications', status] as const,
  inbox: ['payments', 'admin', 'inbox'] as const,
  balances: ['payments', 'admin', 'balances'] as const,
  orderFinance: (code: string) => ['payments', 'admin', 'order', code] as const,
};

/** Admin mutations refresh every admin view and the payment/order views they affect. */
function useAdminMutation<T>(fn: (input: T) => Promise<unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin'] });
      void queryClient.invalidateQueries({ queryKey: ['payments'] });
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
      // Sender status and warnings show in the flagged-message queue.
      void queryClient.invalidateQueries({ queryKey: ['chat', 'flagged'] });
    },
  });
}

export function useOverview(months: number) {
  return useQuery({
    queryKey: keys.overview(months),
    queryFn: () => apiJson(`/admin/overview?months=${String(months)}`, AdminOverviewSchema),
  });
}

// ── Users ───────────────────────────────────────────────────────────────────

export function useAdminUsers() {
  return useQuery({
    queryKey: keys.users,
    queryFn: () => apiJson('/admin/users', z.array(AdminUserSchema)),
  });
}
export const useSuspendUser = () =>
  useAdminMutation(({ id, dto }: { id: string; dto: SuspendUserDto }) =>
    apiSend(`/admin/users/${id}/suspend`, { method: 'POST', body: dto }),
  );
export const useReactivateUser = () =>
  useAdminMutation((id: string) => apiSend(`/admin/users/${id}/reactivate`, { method: 'POST' }));
export const useWarnUser = () =>
  useAdminMutation(({ id, dto }: { id: string; dto: WarnUserDto }) =>
    apiSend(`/admin/users/${id}/warn`, { method: 'POST', body: dto }),
  );

// ── Audit log ───────────────────────────────────────────────────────────────

/** The audit log for the last `days` days; the start is computed when the query runs. */
export function useAuditLog(days: number) {
  return useQuery({
    queryKey: keys.audit(String(days)),
    queryFn: () => {
      const from = new Date(Date.now() - days * 86_400_000);
      from.setUTCMinutes(0, 0, 0);
      const params = new URLSearchParams({ limit: '2000', from: from.toISOString() });
      return apiJson(`/admin/audit?${params.toString()}`, z.array(AuditEntrySchema));
    },
  });
}

// ── Certifications ──────────────────────────────────────────────────────────

export function useAdminCertifications(status: CertificationStatus | 'ALL') {
  return useQuery({
    queryKey: keys.certifications(status),
    queryFn: () =>
      apiJson(
        `/admin/certifications${status === 'ALL' ? '' : `?status=${status}`}`,
        z.array(AdminCertificationSchema),
      ),
  });
}
export const useVerifyCertification = () =>
  useAdminMutation((id: string) =>
    apiSend(`/admin/certifications/${id}/verify`, { method: 'POST' }),
  );
export const useRejectCertification = () =>
  useAdminMutation(({ id, dto }: { id: string; dto: RejectCertificationDto }) =>
    apiSend(`/admin/certifications/${id}/reject`, { method: 'POST', body: dto }),
  );

// ── Orders ──────────────────────────────────────────────────────────────────

export const useOverrideStatus = (code: string) =>
  useAdminMutation((dto: OverrideOrderStatusDto) =>
    apiSend(`/admin/orders/${code}/override`, { method: 'POST', body: dto }),
  );

// ── Payments ────────────────────────────────────────────────────────────────

export function useFinanceInbox() {
  return useQuery({
    queryKey: keys.inbox,
    queryFn: () => apiJson('/admin/finance/inbox', FinanceInboxSchema),
  });
}
export function useLedgerBalances() {
  return useQuery({
    queryKey: keys.balances,
    queryFn: () => apiJson('/admin/finance/balances', LedgerBalancesSchema),
  });
}
export function useOrderFinance(code: string | null) {
  return useQuery({
    queryKey: keys.orderFinance(code ?? ''),
    queryFn: () => apiJson(`/admin/finance/orders/${code ?? ''}`, OrderFinanceSchema),
    enabled: code !== null,
  });
}

export const uploadPaymentProof = (
  paymentId: string,
  file: File,
  onProgress: (p: number) => void,
) => uploadFile(`/admin/finance/payments/${paymentId}/uploads`, 'PAYMENT_PROOF', file, onProgress);

export const useConfirmPayment = () =>
  useAdminMutation(({ id, dto }: { id: string; dto: ConfirmPaymentDto }) =>
    apiSend(`/admin/finance/payments/${id}/confirm`, { method: 'POST', body: dto }),
  );
export const useRejectPayment = () =>
  useAdminMutation(({ id, dto }: { id: string; dto: RejectPaymentDto }) =>
    apiSend(`/admin/finance/payments/${id}/reject`, { method: 'POST', body: dto }),
  );
export const useApproveRelease = () =>
  useAdminMutation((id: string) =>
    apiSend(`/admin/finance/releases/${id}/approve`, { method: 'POST' }),
  );
export const useRecordPayout = () =>
  useAdminMutation(({ id, dto }: { id: string; dto: PayoutDto }) =>
    apiSend(`/admin/finance/releases/${id}/payout`, { method: 'POST', body: dto }),
  );
export const useRefund = (code: string) =>
  useAdminMutation((dto: RefundDto) =>
    apiSend(`/admin/finance/orders/${code}/refunds`, { method: 'POST', body: dto }),
  );
