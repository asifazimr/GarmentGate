'use client';

import { useEffect, useRef } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

const PREFIX = 'gg:onboarding-draft:';

function read(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

/**
 * Keeps unsaved input in this browser so a half-filled step survives a closed tab.
 * Completed steps are saved on the server; this only covers what hasn't been saved yet.
 * Restores the draft once, only when the server has nothing for this step.
 */
export function useFormDraft<T extends FieldValues>(
  form: UseFormReturn<T>,
  key: string,
  { enabled, onRestore }: { enabled: boolean; onRestore?: () => void },
) {
  const restored = useRef(false);

  useEffect(() => {
    if (!enabled || restored.current) return;
    restored.current = true;
    const draft = read(key);
    if (draft && typeof draft === 'object') {
      form.reset({ ...form.getValues(), ...(draft as Partial<T>) });
      onRestore?.();
    }
  }, [enabled, form, key, onRestore]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const subscription = form.watch((values) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          window.localStorage.setItem(PREFIX + key, JSON.stringify(values));
        } catch {
          // Storage full or blocked (private mode): drafts are a convenience only.
        }
      }, 400);
    });
    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [form, key]);

  return {
    clear: () => {
      try {
        window.localStorage.removeItem(PREFIX + key);
      } catch {
        // ignore
      }
    },
  };
}
