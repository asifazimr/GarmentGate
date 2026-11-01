'use client';

import {
  BuyerDashboardSchema,
  type ManufacturerSearchQuery,
  ManufacturerSearchResultSchema,
  type ProductRequestDto,
  ProductRequestResultSchema,
  type ProductSearchQuery,
  ProductSearchResultSchema,
  PublicManufacturerSchema,
  PublicProductSchema,
  type SavedIndex,
  SavedIndexSchema,
  type ShortlistItemInput,
  ShortlistSchema,
} from '@garmentgate/shared';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiJson, apiSend } from '@/lib/api';

const keys = {
  search: (q: Partial<ProductSearchQuery>) => ['discovery', 'search', q] as const,
  factories: (q: Partial<ManufacturerSearchQuery>) => ['discovery', 'factories', q] as const,
  product: (id: string) => ['discovery', 'product', id] as const,
  factory: (code: string) => ['discovery', 'factory', code] as const,
  factoryProducts: (code: string) => ['discovery', 'factory', code, 'products'] as const,
  saved: ['shortlists', 'saved'] as const,
  shortlists: ['shortlists', 'lists'] as const,
  dashboard: ['buyer', 'dashboard'] as const,
};

/** Builds a query string, leaving out empty values and joining arrays as CSV. */
function toQueryString(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value)) {
      if (value.length > 0) search.set(key, value.join(','));
    } else if (typeof value === 'string' || typeof value === 'number') {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

// ── Search ──────────────────────────────────────────────────────────────────

export function useProductSearch(query: Partial<ProductSearchQuery>) {
  return useQuery({
    queryKey: keys.search(query),
    queryFn: () => apiJson(`/catalog/search${toQueryString(query)}`, ProductSearchResultSchema),
    // Keep the current results on screen while the next keystroke's results load.
    placeholderData: keepPreviousData,
  });
}

export function useFactorySearch(query: Partial<ManufacturerSearchQuery>) {
  return useQuery({
    queryKey: keys.factories(query),
    queryFn: () =>
      apiJson(
        `/catalog/manufacturers/search${toQueryString(query)}`,
        ManufacturerSearchResultSchema,
      ),
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: keys.product(id),
    queryFn: () => apiJson(`/catalog/products/${encodeURIComponent(id)}`, PublicProductSchema),
  });
}

export function useFactory(code: string | undefined) {
  return useQuery({
    queryKey: keys.factory(code ?? ''),
    queryFn: () =>
      apiJson(`/manufacturers/${encodeURIComponent(code ?? '')}`, PublicManufacturerSchema),
    enabled: code !== undefined,
  });
}

export function useFactoryProducts(code: string) {
  return useQuery({
    queryKey: keys.factoryProducts(code),
    queryFn: () =>
      apiJson(
        `/catalog/products?manufacturer=${encodeURIComponent(code)}`,
        z.array(PublicProductSchema),
      ),
  });
}

// ── Requests ────────────────────────────────────────────────────────────────

export function useRequestProduct(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ProductRequestDto) =>
      apiJson(`/catalog/products/${productId}/request`, ProductRequestResultSchema, {
        method: 'POST',
        body: dto,
      }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: keys.dashboard }),
  });
}

// ── Shortlists ──────────────────────────────────────────────────────────────

export function useSaved() {
  return useQuery({
    queryKey: keys.saved,
    queryFn: () => apiJson('/shortlists/saved', SavedIndexSchema),
    staleTime: 60_000,
  });
}

export function useShortlists() {
  return useQuery({
    queryKey: keys.shortlists,
    queryFn: () => apiJson('/shortlists', z.array(ShortlistSchema)),
  });
}

/** Lists that contain this product or factory. */
export function savedIn(index: SavedIndex | undefined, target: ShortlistItemInput): string[] {
  if (!index) return [];
  return 'productId' in target
    ? (index.products[target.productId] ?? [])
    : (index.manufacturers[target.manufacturerCode] ?? []);
}

function withSaved(
  index: SavedIndex,
  listId: string,
  target: ShortlistItemInput,
  save: boolean,
): SavedIndex {
  const update = (current: string[] = []) =>
    save ? [...new Set([...current, listId])] : current.filter((id) => id !== listId);
  if ('productId' in target) {
    return {
      ...index,
      products: { ...index.products, [target.productId]: update(index.products[target.productId]) },
    };
  }
  const code = target.manufacturerCode;
  return {
    ...index,
    manufacturers: { ...index.manufacturers, [code]: update(index.manufacturers[code]) },
  };
}

/** Adds to or removes from a list, updating hearts immediately. */
export function useToggleSaved() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      listId,
      target,
      save,
    }: {
      listId: string;
      target: ShortlistItemInput;
      save: boolean;
    }) =>
      apiSend(`/shortlists/${listId}/items${save ? '' : '/remove'}`, {
        method: 'POST',
        body: target,
      }),
    onMutate: async ({ listId, target, save }) => {
      await queryClient.cancelQueries({ queryKey: keys.saved });
      const previous = queryClient.getQueryData<SavedIndex>(keys.saved);
      if (previous) queryClient.setQueryData(keys.saved, withSaved(previous, listId, target, save));
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(keys.saved, context.previous);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['shortlists'] });
      void queryClient.invalidateQueries({ queryKey: keys.dashboard });
    },
  });
}

export function useCreateShortlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      apiJson('/shortlists', z.object({ id: z.string() }), { method: 'POST', body: { name } }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['shortlists'] }),
  });
}

export function useRenameShortlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      apiSend(`/shortlists/${id}`, { method: 'PATCH', body: { name } }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['shortlists'] }),
  });
}

export function useDeleteShortlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiSend(`/shortlists/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shortlists'] });
      void queryClient.invalidateQueries({ queryKey: keys.dashboard });
    },
  });
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export function useBuyerDashboard() {
  return useQuery({
    queryKey: keys.dashboard,
    queryFn: () => apiJson('/buyer/dashboard', BuyerDashboardSchema),
  });
}
