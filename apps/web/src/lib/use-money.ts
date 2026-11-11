'use client';

import { convertMinor, type Currency, CurrencySchema, FxRatesSchema } from '@garmentgate/shared';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';
import { useMe } from '@/features/auth/api';
import { apiJson } from './api';
import { formatMoney } from './format';
import { useVisitorCurrency } from './visitor-currency';

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
  const approx = useApproxMoney();
  return useCallback(
    (minor: number, currency: string) => {
      const exact = formatMoney(minor, currency, locale);
      const converted = approx(minor, currency);
      return converted ? `${exact} (≈ ${converted})` : exact;
    },
    [locale, approx],
  );
}

/** The display currency: the signed-in user's preference, else the visitor's choice. */
export function useDisplayCurrency(): Currency | null {
  const me = useMe();
  const visitor = useVisitorCurrency();
  return me.data ? (me.data.displayCurrency ?? visitor) : visitor;
}

/**
 * The approximate amount in the display currency ("€4.18"), or null when there's nothing to
 * convert (same currency, no choice, rates not loaded).
 */
export function useApproxMoney(): (minor: number, currency: string) => string | null {
  const locale = useLocale();
  const target = useDisplayCurrency();
  const rates = useFxRates(target !== null);
  const table = rates.data;
  return useCallback(
    (minor: number, currency: string) => {
      const from = CurrencySchema.safeParse(currency);
      if (!target || !table || !from.success || from.data === target) return null;
      if (!table[from.data] || !table[target]) return null;
      return formatMoney(convertMinor(BigInt(minor), from.data, target, table), target, locale);
    },
    [locale, target, table],
  );
}
