'use client';

import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

export interface HelpEntry {
  topic: string;
  topicTitle: string;
  q: string;
  a: string;
}

/** Instant search over every help answer; topics show below until something is typed. */
export function HelpSearch({ entries }: { entries: HelpEntry[] }) {
  const t = useTranslations('marketing.help');
  const [query, setQuery] = useState('');
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const hits = useMemo(
    () =>
      words.length === 0
        ? []
        : entries.filter((e) => {
            const text = `${e.q} ${e.a} ${e.topicTitle}`.toLowerCase();
            return words.every((w) => text.includes(w));
          }),
    [entries, words],
  );
  return (
    <div className="mx-auto max-w-2xl">
      <label htmlFor="help-search" className="sr-only">
        {t('search')}
      </label>
      <div className="relative">
        <Search
          className="text-muted-foreground pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2"
          aria-hidden="true"
        />
        <Input
          id="help-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="h-14 rounded-xl ps-12 text-base shadow-sm md:h-14"
        />
      </div>
      {words.length > 0 ? (
        <div className="mt-4" aria-live="polite">
          <p className="text-muted-foreground mb-3 text-sm">
            {t('results', { count: hits.length, query: query.trim() })}
          </p>
          {hits.length === 0 ? (
            <p className="text-sm">
              {t('noResultsBody')}{' '}
              <Link
                href="/contact?topic=SUPPORT"
                className="text-primary-ink font-medium hover:underline"
              >
                {t('stillStuck.title')}
              </Link>
            </p>
          ) : (
            <div className="bg-card divide-y rounded-2xl border">
              {hits.map((h) => (
                <details key={`${h.topic}-${h.q}`} className="group px-5 py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="text-muted-foreground block font-mono text-[0.6875rem] tracking-[0.1em] uppercase">
                        {h.topicTitle}
                      </span>
                      <span className="font-medium">{h.q}</span>
                    </span>
                    <ChevronDown
                      className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="text-muted-foreground pb-5 leading-relaxed">{h.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
