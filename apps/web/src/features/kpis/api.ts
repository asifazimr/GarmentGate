'use client';

import {
  type KpiQuery,
  KpiReportSchema,
  type UnitEconomicsSettings,
  UnitEconomicsSettingsSchema,
} from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiJson } from '@/lib/api';

const keys = {
  all: ['admin', 'kpis'] as const,
  settings: ['admin', 'kpis', 'settings'] as const,
};

export function useKpis(query: KpiQuery | null) {
  return useQuery({
    queryKey: [...keys.all, query],
    queryFn: () =>
      apiJson(`/admin/kpis?${new URLSearchParams(query ?? {}).toString()}`, KpiReportSchema),
    enabled: query !== null,
  });
}

export function useUnitEconomics() {
  return useQuery({
    queryKey: keys.settings,
    queryFn: () => apiJson('/admin/kpis/settings', UnitEconomicsSettingsSchema),
  });
}

export function useSaveUnitEconomics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UnitEconomicsSettings) =>
      apiJson('/admin/kpis/settings', UnitEconomicsSettingsSchema, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });
}
