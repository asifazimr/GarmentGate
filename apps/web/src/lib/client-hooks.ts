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
