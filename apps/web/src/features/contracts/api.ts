'use client';

import {
  AdminContractSchema,
  AdminMerchandiserSchema,
  BuyerContractSchema,
  type CallOffDto,
  type CreateContractDto,
  ManufacturerContractSchema,
  MerchandiserSchema,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

export const useBuyerContracts = () =>
  useQuery({
    queryKey: ['contracts', 'buyer'],
    queryFn: () => apiJson('/contracts', z.array(BuyerContractSchema)),
  });

export const useFactoryContracts = () =>
  useQuery({
    queryKey: ['contracts', 'factory'],
    queryFn: () => apiJson('/manufacturer/contracts', z.array(ManufacturerContractSchema)),
  });

export const useAdminContracts = () =>
  useQuery({
    queryKey: ['admin', 'contracts'],
    queryFn: () => apiJson('/admin/contracts', z.array(AdminContractSchema)),
  });

export function useCallOff(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CallOffDto) =>
      apiJson(`/contracts/${code}/call-offs`, z.object({ orderCode: z.string() }), {
        method: 'POST',
        body: dto,
      }),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['contracts'] });
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useCreateContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateContractDto) =>
      apiJson('/admin/contracts', z.object({ code: z.string() }), { method: 'POST', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin', 'contracts'] }),
  });
}

export function useEndContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => apiSend(`/admin/contracts/${code}/end`, { method: 'POST' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin', 'contracts'] }),
  });
}

export const useMyMerchandiser = () =>
  useQuery({
    queryKey: ['buyer', 'merchandiser'],
    queryFn: () => apiJson('/buyer/merchandiser', MerchandiserSchema.nullable()),
    staleTime: 10 * 60_000,
  });

export const useAccountMerchandiser = (buyerCode: string) =>
  useQuery({
    queryKey: ['admin', 'merchandiser', buyerCode],
    queryFn: () =>
      apiJson(`/admin/buyers/${buyerCode}/merchandiser`, AdminMerchandiserSchema.nullable()),
  });

export function useSetMerchandiser(buyerCode: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string | null) =>
      apiSend(`/admin/buyers/${buyerCode}/merchandiser`, { method: 'PUT', body: { userId } }),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['admin', 'merchandiser', buyerCode] }),
  });
}
