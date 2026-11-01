'use client';

import {
  type AddCertificationDto,
  type BuyerSourcingNeedsDto,
  CategorySchema,
  type CompanyInfoDto,
  type KycDocumentType,
  type ManufacturerCapabilitiesDto,
  type OnboardingState,
  OnboardingStateSchema,
  PresignUploadResponseSchema,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

export const onboardingQueryKey = ['onboarding'] as const;

export function useOnboarding() {
  return useQuery({
    queryKey: onboardingQueryKey,
    queryFn: () => apiJson('/onboarding', OnboardingStateSchema),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiJson('/categories', z.array(CategorySchema)),
    staleTime: 10 * 60_000,
  });
}

function useStateMutation<T>(fn: (input: T) => Promise<OnboardingState>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (state) => queryClient.setQueryData(onboardingQueryKey, state),
  });
}

export function useSaveCompany() {
  return useStateMutation((input: CompanyInfoDto) =>
    apiJson('/onboarding/company', OnboardingStateSchema, { method: 'PUT', body: input }),
  );
}

export function useSaveProfile() {
  return useStateMutation((input: ManufacturerCapabilitiesDto | BuyerSourcingNeedsDto) =>
    apiJson('/onboarding/profile', OnboardingStateSchema, { method: 'PUT', body: input }),
  );
}

export function useSubmitOnboarding() {
  return useStateMutation(() =>
    apiJson('/onboarding/submit', OnboardingStateSchema, { method: 'POST' }),
  );
}

/** Invalidates onboarding state after any document change. */
function useDocumentMutation<T>(fn: (input: T) => Promise<void>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: onboardingQueryKey }),
  });
}

export function useAddDocument() {
  return useDocumentMutation(
    async ({
      file,
      type,
      onProgress,
    }: {
      file: File;
      type: KycDocumentType;
      onProgress: (p: number) => void;
    }) => {
      const fileId = await uploadFile(file, 'KYC_DOCUMENT', onProgress);
      await apiSend('/kyc/documents', { method: 'POST', body: { fileId, type } });
    },
  );
}

export function useRemoveDocument() {
  return useDocumentMutation((id: string) => apiSend(`/kyc/documents/${id}`, { method: 'DELETE' }));
}

export function useAddCertification() {
  return useDocumentMutation(
    async ({
      file,
      details,
      onProgress,
    }: {
      file: File;
      details: Omit<AddCertificationDto, 'fileId'>;
      onProgress: (p: number) => void;
    }) => {
      const fileId = await uploadFile(file, 'CERTIFICATION', onProgress);
      await apiSend('/kyc/certifications', { method: 'POST', body: { ...details, fileId } });
    },
  );
}

export function useRemoveCertification() {
  return useDocumentMutation((id: string) =>
    apiSend(`/kyc/certifications/${id}`, { method: 'DELETE' }),
  );
}

// ── Direct-to-storage upload ────────────────────────────────────────────────

/** Presign with the API, then send the bytes straight to object storage with progress. */
async function uploadFile(
  file: File,
  purpose: 'KYC_DOCUMENT' | 'CERTIFICATION',
  onProgress: (percent: number) => void,
): Promise<string> {
  const presign = await apiJson('/kyc/uploads', PresignUploadResponseSchema, {
    method: 'POST',
    body: { purpose, fileName: file.name, contentType: file.type, sizeBytes: file.size },
  });

  const form = new FormData();
  for (const [key, value] of Object.entries(presign.fields)) form.append(key, value);
  form.append('file', file); // must be last

  await new Promise<void>((resolve, reject) => {
    // XHR (not fetch) because it reports upload progress.
    const xhr = new XMLHttpRequest();
    xhr.open('POST', presign.url);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error('Upload failed'));
    xhr.send(form);
  });
  return presign.fileId;
}
