'use client';

import type { PublicManufacturer } from '@garmentgate/shared';
import { BadgeCheck, Factory, Gauge } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { countryName } from '@/lib/countries';
import { FavoriteButton } from './save-controls';
import { Rendition } from '@/components/patterns/rendition';

/** Anonymised factory tile: public code, country, headline, score. */
export function FactoryCard({
  factory: m,
  footer,
}: {
  factory: PublicManufacturer;
  footer?: React.ReactNode;
}) {
  const t = useTranslations('discovery.factories');
  const locale = useLocale();
  const cover = m.photos[0]?.urls;

  return (
    <li className="group bg-card relative flex flex-col overflow-hidden rounded-xl border shadow-xs transition-[box-shadow,border-color] duration-200 hover:border-border-strong hover:shadow-md">
      <Link
        href={`/buyer/factories/${encodeURIComponent(m.publicCode)}`}
        className="focus-visible:ring-ring/40 flex flex-1 flex-col outline-none focus-visible:ring-3 focus-visible:ring-inset"
      >
        <div className="bg-muted relative aspect-[16/9] overflow-hidden">
          {cover ? (
            <Rendition
              urls={cover}
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="text-subtle-foreground flex size-full items-center justify-center">
              <Factory className="size-6" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex flex-wrap items-center gap-2 pe-10">
            <Badge variant="code">{m.publicCode}</Badge>
            <span className="text-muted-foreground text-xs">{countryName(m.country, locale)}</span>
          </div>
          {m.headline ? (
            <h3 className="line-clamp-2 font-semibold tracking-[-0.01em]">{m.headline}</h3>
          ) : null}
          <p className="text-muted-foreground line-clamp-1 text-sm">
            {m.categories.map((c) => c.name).join(' · ')}
          </p>
          <div className="text-muted-foreground mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs">
            <span className="inline-flex items-center gap-1">
              <Gauge className="size-3.5" aria-hidden="true" />
              {t('score', { score: m.scores.performanceScore })}
            </span>
            {m.certifications.length > 0 ? (
              <span className="inline-flex items-center gap-1">
                <BadgeCheck className="text-success-ink size-3.5" aria-hidden="true" />
                {t('certs', { count: m.certifications.length })}
              </span>
            ) : null}
            {m.capabilities.moqPcs !== null ? (
              <span>{t('moq', { count: m.capabilities.moqPcs })}</span>
            ) : null}
          </div>
        </div>
      </Link>
      {footer ? <div className="border-t px-3 py-2">{footer}</div> : null}
      <FavoriteButton
        target={{ manufacturerCode: m.publicCode }}
        label={m.publicCode}
        className="absolute top-3 end-3"
      />
    </li>
  );
}

export function FactoryCardSkeleton() {
  return (
    <li className="bg-card overflow-hidden rounded-xl border">
      <Skeleton className="aspect-[16/9] rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </li>
  );
}
