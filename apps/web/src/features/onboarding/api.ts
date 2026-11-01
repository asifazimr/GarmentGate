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
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

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
      const fileId = await uploadKyc(file, 'KYC_DOCUMENT', onProgress);
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
      const fileId = await uploadKyc(file, 'CERTIFICATION', onProgress);
      await apiSend('/kyc/certifications', { method: 'POST', body: { ...details, fileId } });
    },
  );
}

export function useRemoveCertification() {
  return useDocumentMutation((id: string) =>
    apiSend(`/kyc/certifications/${id}`, { method: 'DELETE' }),
  );
}

const uploadKyc = (
  file: File,
  purpose: 'KYC_DOCUMENT' | 'CERTIFICATION',
  onProgress: (p: number) => void,
) => uploadFile('/kyc/uploads', purpose, file, onProgress);
