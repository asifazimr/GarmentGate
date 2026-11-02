'use client';

import {
  AdminKycCompanyDetailSchema,
  AdminKycCompanySchema,
  type KycStatus,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

const keys = {
  all: ['admin', 'kyc'] as const,
  list: (status: KycStatus) => ['admin', 'kyc', 'list', status] as const,
  detail: (id: string) => ['admin', 'kyc', 'detail', id] as const,
};

export function useKycQueue(status: KycStatus) {
  return useQuery({
    queryKey: keys.list(status),
    queryFn: () => apiJson(`/admin/kyc/companies?status=${status}`, z.array(AdminKycCompanySchema)),
  });
}

export function useKycDetail(id: string | null) {
  return useQuery({
    queryKey: keys.detail(id ?? ''),
    queryFn: () => apiJson(`/admin/kyc/companies/${id ?? ''}`, AdminKycCompanyDetailSchema),
    enabled: id !== null,
  });
}

export function useKycDecision() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      decision,
      reason,
      note,
    }: {
      id: string;
      decision: 'approve' | 'reject';
      reason?: string;
      /** Internal note on an approval (audit log only). */
      note?: string;
    }) =>
      apiSend(`/admin/kyc/companies/${id}/${decision}`, {
        method: 'POST',
        body: decision === 'reject' ? { reason } : { note },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });
}

export async function openFile(fileId: string): Promise<void> {
  // Open the tab synchronously so pop-up blockers allow it, then point it at the signed URL.
  const tab = window.open('', '_blank');
  if (tab) tab.opener = null;
  try {
    const { url } = await apiJson(`/kyc/files/${fileId}/url`, z.object({ url: z.url() }));
    if (tab) tab.location.href = url;
    else window.location.assign(url);
  } catch (error) {
    tab?.close();
    throw error;
  }
}
