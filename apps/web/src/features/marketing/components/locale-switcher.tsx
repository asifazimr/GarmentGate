'use client';

import { LOCALES } from '@garmentgate/shared';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { chooseLocale } from '../locale-action';

/** Footer language picker for visitors (signed-in users choose in their settings). */
export function LocaleSwitcher({ locales }: { locales: string[] }) {
  const t = useTranslations('marketing.footer');
  const current = useLocale();
  const router = useRouter();
  const [pending, start] = useTransition();
  if (locales.length < 2) return null;
  return (
    <label className="inline-flex items-center gap-2 text-sm text-white/70">
      <Globe className="size-4" aria-hidden="true" />
      <span className="sr-only">{t('language')}</span>
      <select
        value={current}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          start(async () => {
            await chooseLocale(next);
            router.refresh();
          });
        }}
        className="min-h-11 rounded-md border border-white/20 bg-white/5 px-2 text-white outline-none focus-visible:ring-3 focus-visible:ring-white/30 md:min-h-8 [&>option]:text-black"
      >
        {LOCALES.filter((l) => locales.includes(l.code)).map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </label>
  );
}
