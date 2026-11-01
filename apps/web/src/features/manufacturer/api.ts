'use client';

import {
  type AddCertificationDto,
  CapacityCalendarSchema,
  CertificationSchema,
  ManufacturerCapabilitiesSchema,
  type ManufacturerCapabilitiesDto,
  ManufacturerProductSchema,
  type MediaPurpose,
  OwnedImageSchema,
  type ProductDto,
  PublicManufacturerSchema,
  type UpdateCapacityMonthDto,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';
import { uploadFile } from '@/lib/upload';

const keys = {
  profile: ['manufacturer', 'profile'] as const,
  preview: ['manufacturer', 'preview'] as const,
  certifications: ['manufacturer', 'certifications'] as const,
  products: ['manufacturer', 'products'] as const,
  product: (id: string) => ['manufacturer', 'products', id] as const,
  capacity: (months: number) => ['manufacturer', 'capacity', months] as const,
};

export const uploadMedia = (file: File, purpose: MediaPurpose, onProgress: (p: number) => void) =>
  uploadFile('/manufacturer/uploads', purpose, file, onProgress);

/** Poll while any image is still in the pipeline, so thumbnails appear without a refresh. */
const pollWhileProcessing = (images: { processing: string }[] | undefined) =>
  images?.some((i) => i.processing === 'PENDING' || i.processing === 'PROCESSING') ? 2_000 : false;

// ── Profile ─────────────────────────────────────────────────────────────────

const ProfileSchema = z.object({
  publicCode: z.string(),
  capabilities: ManufacturerCapabilitiesSchema.nullable(),
  photos: z.array(OwnedImageSchema),
});

export function useManufacturerProfile() {
  return useQuery({
    queryKey: keys.profile,
    queryFn: () => apiJson('/manufacturer/profile', ProfileSchema),
    refetchInterval: (query) => pollWhileProcessing(query.state.data?.photos),
  });
}

export function useUpdateCapabilities() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ManufacturerCapabilitiesDto) =>
      apiSend('/manufacturer/profile', { method: 'PUT', body: dto }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: keys.profile });
      void queryClient.invalidateQueries({ queryKey: keys.preview });
    },
  });
}

export function useProfilePreview(enabled: boolean) {
  return useQuery({
    queryKey: keys.preview,
    queryFn: () => apiJson('/manufacturer/profile/preview', PublicManufacturerSchema),
    enabled,
  });
}

export function useAddPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, onProgress }: { file: File; onProgress: (p: number) => void }) => {
      const fileId = await uploadMedia(file, 'FACTORY_PHOTO', onProgress);
      await apiSend('/manufacturer/photos', { method: 'POST', body: { fileId } });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.profile }),
  });
}

export function useRemovePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/manufacturer/photos/${id}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.profile }),
  });
}

export function useReorderPhotos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) =>
      apiSend('/manufacturer/photos/order', { method: 'PUT', body: { ids } }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.profile }),
  });
}

// ── Certifications ──────────────────────────────────────────────────────────

export function useCertifications() {
  return useQuery({
    queryKey: keys.certifications,
    queryFn: () => apiJson('/manufacturer/certifications', z.array(CertificationSchema)),
  });
}

export function useAddCertification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      details,
      onProgress,
    }: {
      file: File;
      details: Omit<AddCertificationDto, 'fileId'>;
      onProgress: (p: number) => void;
    }) => {
      const fileId = await uploadMedia(file, 'CERTIFICATION', onProgress);
      await apiSend('/manufacturer/certifications', {
        method: 'POST',
        body: { ...details, fileId },
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.certifications }),
  });
}

export function useRemoveCertification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/manufacturer/certifications/${id}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.certifications }),
  });
}

// ── Products ────────────────────────────────────────────────────────────────

export function useProducts() {
  return useQuery({
    queryKey: keys.products,
    queryFn: () => apiJson('/manufacturer/products', z.array(ManufacturerProductSchema)),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: keys.product(id),
    queryFn: () => apiJson(`/manufacturer/products/${id}`, ManufacturerProductSchema),
    refetchInterval: (query) => pollWhileProcessing(query.state.data?.images),
  });
}

export function useSaveProduct(id: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ProductDto) =>
      id
        ? apiJson(`/manufacturer/products/${id}`, ManufacturerProductSchema, {
            method: 'PUT',
            body: dto,
          })
        : apiJson('/manufacturer/products', ManufacturerProductSchema, {
            method: 'POST',
            body: dto,
          }),
    onSuccess: (product) => {
      queryClient.setQueryData(keys.product(product.id), product);
      void queryClient.invalidateQueries({ queryKey: keys.products });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/manufacturer/products/${id}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.products }),
  });
}

export function useAddProductImage(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, onProgress }: { file: File; onProgress: (p: number) => void }) => {
      const fileId = await uploadMedia(file, 'PRODUCT_IMAGE', onProgress);
      return apiJson(`/manufacturer/products/${productId}/images`, ManufacturerProductSchema, {
        method: 'POST',
        body: { fileId },
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: keys.product(productId) });
      void queryClient.invalidateQueries({ queryKey: keys.products });
    },
  });
}

export function useRemoveProductImage(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) =>
      apiSend(`/manufacturer/products/${productId}/images/${imageId}`, { method: 'DELETE' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.product(productId) }),
  });
}

export function useReorderProductImages(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: string[]) =>
      apiSend(`/manufacturer/products/${productId}/images/order`, { method: 'PUT', body: { ids } }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.product(productId) }),
  });
}

// ── Capacity ────────────────────────────────────────────────────────────────

export function useCapacity(months = 12) {
  return useQuery({
    queryKey: keys.capacity(months),
    queryFn: () => apiJson(`/manufacturer/capacity?months=${months}`, CapacityCalendarSchema),
  });
}

export function useUpdateCapacityMonth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ month, dto }: { month: string; dto: UpdateCapacityMonthDto }) =>
      apiSend(`/manufacturer/capacity/${month}`, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['manufacturer', 'capacity'] }),
  });
}
