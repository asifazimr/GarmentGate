'use client';

import { type Currency, CurrencySchema } from '@garmentgate/shared';
import { useSyncExternalStore } from 'react';

/**
 * A website visitor's display currency (signed-in users keep theirs in their preferences).
 * Stored in a plain cookie; components re-read it when it changes.
 */
const COOKIE = 'gg_currency';
const EVENT = 'gg:currency';

function read(): Currency | null {
  const match = new RegExp(`(?:^|; )${COOKIE}=([^;]+)`).exec(document.cookie);
  const parsed = CurrencySchema.safeParse(match?.[1]);
  return parsed.success ? parsed.data : null;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function useVisitorCurrency(): Currency | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function setVisitorCurrency(currency: Currency): void {
  document.cookie = `${COOKIE}=${currency}; path=/; max-age=${String(365 * 86_400)}; samesite=lax`;
  window.dispatchEvent(new Event(EVENT));
}
