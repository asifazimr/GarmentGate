'use client';

import {
  type HandoverRequestDto,
  type BookPickupDto,
  BuyerOrderLogisticsSchema,
  BuyerTrackingSchema,
  ConsolidationCandidateSchema,
  ConsolidationOptionSchema,
  type ConsolidationQuoteRequestInput,
  FactoryOrderLogisticsSchema,
  type OrderPackingDto,
  BuyerShippingOptionSchema,
  type PaymentMethod,
  PaymentStartSchema,
  type ShippingQuoteRequestInput,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

const key = (code: string) => ['orders', code, 'logistics'] as const;

/** The buyer's shipping for an order. */
export function useOrderLogistics(code: string) {
  return useQuery({
    queryKey: key(code),
    queryFn: () => apiJson(`/orders/${code}/logistics`, BuyerOrderLogisticsSchema),
  });
}

export function useShippingQuotes(code: string) {
  return useMutation({
    mutationFn: (dto: ShippingQuoteRequestInput) =>
      apiJson(`/orders/${code}/logistics/quotes`, z.array(BuyerShippingOptionSchema), {
        method: 'POST',
        body: dto,
      }),
  });
}

export function useAcceptShipping(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: string) =>
      apiSend(`/orders/${code}/logistics/quotes/${quoteId}/accept`, { method: 'POST' }),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: key(code) });
      // The order's terms follow the chosen option.
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useStartShippingPayment(code: string) {
  return useMutation({
    mutationFn: (method: PaymentMethod) =>
      apiJson(`/orders/${code}/logistics/payments`, PaymentStartSchema, {
        method: 'POST',
        body: { method },
      }),
  });
}

export function useMarkShippingSent(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payerReference }: { id: string; payerReference: string }) =>
      apiSend(`/orders/${code}/payments/${id}/sent`, { method: 'POST', body: { payerReference } }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: key(code) }),
  });
}

export function useSetHsCode(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hsCode: string) =>
      apiSend(`/admin/logistics/orders/${code}/hs-code`, { method: 'PATCH', body: { hsCode } }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
}

// ── Factory: packing and pickup ─────────────────────────────────────────────

const factoryKey = (code: string) => ['orders', code, 'logistics', 'factory'] as const;

export function useFactoryLogistics(code: string) {
  return useQuery({
    queryKey: factoryKey(code),
    queryFn: () => apiJson(`/orders/${code}/logistics/factory`, FactoryOrderLogisticsSchema),
  });
}

export function useSavePacking(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: OrderPackingDto) =>
      apiSend(`/orders/${code}/logistics/packing`, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: factoryKey(code) }),
  });
}

export function useBookPickup(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: BookPickupDto) =>
      apiSend(`/orders/${code}/logistics/pickup`, { method: 'POST', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: factoryKey(code) }),
  });
}

export const cartonMarkingsUrl = (code: string) => `/api/orders/${code}/logistics/carton-markings`;

// ── Buyer: shipping orders together ─────────────────────────────────────────

export function useConsolidationCandidates(code: string, enabled: boolean) {
  return useQuery({
    queryKey: ['orders', code, 'logistics', 'candidates'],
    queryFn: () =>
      apiJson(
        `/orders/${code}/logistics/consolidation-candidates`,
        z.array(ConsolidationCandidateSchema),
      ),
    enabled,
  });
}

export function useConsolidationQuotes() {
  return useMutation({
    mutationFn: (dto: ConsolidationQuoteRequestInput) =>
      apiJson('/logistics/consolidations/quotes', z.array(ConsolidationOptionSchema), {
        method: 'POST',
        body: dto,
      }),
  });
}

export function useAcceptConsolidation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (consolidationCode: string) =>
      apiSend(`/logistics/consolidations/${consolidationCode}/accept`, { method: 'POST' }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
}

// ── Buyer: tracking ─────────────────────────────────────────────────────────

export function useTracking(code: string) {
  return useQuery({
    queryKey: ['orders', code, 'logistics', 'tracking'],
    queryFn: () => apiJson(`/orders/${code}/logistics/tracking`, BuyerTrackingSchema.nullable()),
  });
}

export const buyerDocumentUrl = (code: string, type: string) =>
  `/api/orders/${code}/logistics/documents/${type}`;

/** The buyer's own forwarder collects at GarmentGate's hub (FCA). */
export function useChooseHandover(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: HandoverRequestDto) =>
      apiSend(`/orders/${code}/logistics/handover`, { method: 'PUT', body: dto }),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: key(code) });
      void queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
