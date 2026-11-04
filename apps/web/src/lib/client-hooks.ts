'use client';

import { useCallback, useSyncExternalStore } from 'react';

const noopSubscribe = () => () => undefined;

/** True after hydration. For UI that depends on browser-only state (theme, platform). */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * A query-string value read in the browser only (null while prerendering). Unlike
 * useSearchParams it doesn't turn the page dynamic, so forms like sign-in stay in the static
 * HTML and paint immediately.
 */
export function useClientSearchParam(name: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

/** True on Apple platforms, so shortcuts read ⌘ rather than Ctrl. Server render assumes Mac. */
export function useIsMac(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => /mac|iphone|ipad/i.test(navigator.userAgent),
    () => true,
  );
}

const STORAGE_EVENT = 'gg:local-flag';

function readFlag(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

/**
 * A boolean persisted in localStorage (per browser), synced across components and tabs.
 * Renders `false` on the server and during hydration.
 */
export function useLocalFlag(key: string): [boolean, (value: boolean) => void] {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const handler = (event: Event) => {
        if (event instanceof StorageEvent ? event.key === key : true) onChange();
      };
      window.addEventListener('storage', handler);
      window.addEventListener(STORAGE_EVENT, handler);
      return () => {
        window.removeEventListener('storage', handler);
        window.removeEventListener(STORAGE_EVENT, handler);
      };
    },
    [key],
  );
  const value = useSyncExternalStore(
    subscribe,
    () => readFlag(key),
    () => false,
  );
  const set = useCallback(
    (next: boolean) => {
      try {
        window.localStorage.setItem(key, next ? '1' : '0');
      } catch {
        // Storage unavailable (private mode): the flag just won't persist.
      }
      window.dispatchEvent(new Event(STORAGE_EVENT));
    },
    [key],
  );
  return [value, set];
}

/** Today's UTC date (`2026-11-03`) in the browser; null while prerendering. */
export function useTodayIso(): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().toISOString().slice(0, 10),
    () => null,
  );
}

const tickers = new Map<number, { now: number; listeners: Set<() => void>; timer: number }>();
const firstSeen = new Map<number, number>();

/** Stable between renders (useSyncExternalStore requires it): the ticker's time, or a fixed first read. */
function nowSnapshot(intervalMs: number): number {
  const ticker = tickers.get(intervalMs);
  if (ticker) return ticker.now;
  let value = firstSeen.get(intervalMs);
  if (value === undefined) {
    value = Date.now();
    firstSeen.set(intervalMs, value);
  }
  return value;
}

/**
 * The current time in ms, ticking every `intervalMs` in the browser (one timer per interval,
 * shared); null while prerendering. For countdowns.
 */
export function useNow(intervalMs = 1000): number | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      let ticker = tickers.get(intervalMs);
      if (!ticker) {
        const created = { now: Date.now(), listeners: new Set<() => void>(), timer: 0 };
        created.timer = window.setInterval(() => {
          created.now = Date.now();
          for (const l of created.listeners) l();
        }, intervalMs);
        tickers.set(intervalMs, created);
        ticker = created;
      }
      ticker.listeners.add(onChange);
      const current = ticker;
      return () => {
        current.listeners.delete(onChange);
        if (current.listeners.size === 0) {
          window.clearInterval(current.timer);
          tickers.delete(intervalMs);
        }
      };
    },
    [intervalMs],
  );
  return useSyncExternalStore(
    subscribe,
    () => nowSnapshot(intervalMs),
    () => null,
  );
}
