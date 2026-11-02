'use client';

import { convertMinor, CurrencySchema, FxRatesSchema } from '@garmentgate/shared';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';
import { useMe } from '@/features/auth/api';
import { apiJson } from './api';
import { formatMoney } from './format';

/** Reference rates change rarely: fetch once an hour at most. */
function useFxRates(enabled: boolean) {
  return useQuery({
    queryKey: ['fx', 'rates'],
    queryFn: () => apiJson('/fx/rates', FxRatesSchema),
    enabled,
    staleTime: 60 * 60_000,
    gcTime: 2 * 60 * 60_000,
  });
}

/**
 * Formats money in its own currency and, when the user picked a display currency, adds an
 * approximate conversion at GarmentGate's reference rate: "US$4.55 (≈ €4.18)". The exact
 * amount always comes first; conversions are for orientation only.
 */
export function useMoney(): (minor: number, currency: string) => string {
  const locale = useLocale();
  const me = useMe();
  const target = me.data?.displayCurrency ?? null;
  const rates = useFxRates(target !== null);
  const table = rates.data;
  return useCallback(
    (minor: number, currency: string) => {
      const exact = formatMoney(minor, currency, locale);
      const from = CurrencySchema.safeParse(currency);
      if (!target || !table || !from.success || from.data === target) return exact;
      if (!table[from.data] || !table[target]) return exact;
      const converted = convertMinor(BigInt(minor), from.data, target, table);
      return `${exact} (≈ ${formatMoney(converted, target, locale)})`;
    },
    [locale, target, table],
  );
}
