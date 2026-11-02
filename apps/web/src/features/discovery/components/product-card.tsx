'use client';

import type { PublicProduct } from '@garmentgate/shared';
import { Clock, ImageIcon, Package } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { FavoriteButton } from './save-controls';
import { Rendition } from '@/components/patterns/rendition';

export type ResultsView = 'grid' | 'list';

/** Lowest buyer price across tiers (the price at the highest quantity). */
export function fromPrice(p: PublicProduct): number | null {
  return p.priceTiers.reduce<number | null>(
    (min, tier) => (min === null || tier.unitPriceMinor < min ? tier.unitPriceMinor : min),
    null,
  );
}

export function ProductCard({
  product: p,
  view = 'grid',
  footer,
  priority = false,
}: {
  product: PublicProduct;
  view?: ResultsView;
  /** In the first row of results: load the image eagerly (it's the page's main content). */
  priority?: boolean;
  /** Extra actions under the card (e.g. "Remove from list"). */
  footer?: React.ReactNode;
}) {
  const t = useTranslations('discovery.card');
  const locale = useLocale();
  const showMoney = useMoney();
  const cover = p.images[0]?.urls;
  const price = fromPrice(p);
  const list = view === 'list';

  return (
    <li
      className={cn(
        'group bg-card relative flex flex-col overflow-hidden rounded-xl border shadow-xs transition-[box-shadow,border-color] duration-200 hover:border-border-strong hover:shadow-md',
      )}
    >
      <Link
        href={`/buyer/products/${p.id}`}
        className={cn(
          'focus-visible:ring-ring/40 flex flex-1 outline-none focus-visible:ring-3 focus-visible:ring-inset',
          list ? 'flex-row' : 'flex-col',
        )}
      >
        <div
          className={cn(
            'bg-muted relative shrink-0 overflow-hidden',
            list ? 'w-32 sm:w-48' : 'aspect-[4/3]',
          )}
        >
          {cover ? (
            <Rendition
              urls={cover}
              priority={priority}
              sizes={list ? '128px' : '(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw'}
              alt=""
              className="size-full object-cover transition-transform duration-300 ease-out-expo group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          ) : (
            <div className="text-subtle-foreground flex size-full items-center justify-center">
              <ImageIcon className="size-6" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className={cn('flex min-w-0 flex-1 flex-col gap-1.5', list ? 'p-3 sm:p-4' : 'p-4')}>
          <p className="text-muted-foreground truncate text-xs">{p.category.name}</p>
          <h3 className="line-clamp-2 font-semibold tracking-[-0.01em] pe-8">{p.title}</h3>
          <p className="text-muted-foreground truncate text-sm">
            {[p.fabric, p.gsm ? t('gsm', { gsm: p.gsm }) : null].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-auto space-y-2 pt-2">
            {price !== null ? (
              <p className="tabular font-semibold">
                {t('from', { price: showMoney(price, p.currency) })}
                <span className="text-muted-foreground text-xs font-normal"> {t('perPiece')}</span>
              </p>
            ) : null}
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="inline-flex items-center gap-1">
                <Package className="size-3.5" aria-hidden="true" />
                {t('moq', { count: p.moqPcs })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {t('leadTime', { count: p.leadTimeDays })}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="code">{p.manufacturerCode}</Badge>
              <span className="text-subtle-foreground truncate text-xs">
                {countryName(p.country, locale)}
              </span>
            </div>
          </div>
        </div>
      </Link>
      {footer ? <div className="border-t px-3 py-2">{footer}</div> : null}
      <FavoriteButton
        target={{ productId: p.id }}
        label={p.title}
        className={cn('absolute', list ? 'top-2 end-2' : 'top-3 end-3')}
        variant={list ? 'outline' : 'overlay'}
      />
    </li>
  );
}

export function ProductCardSkeleton({ view = 'grid' }: { view?: ResultsView }) {
  if (view === 'list') {
    return (
      <li className="bg-card flex overflow-hidden rounded-xl border">
        <Skeleton className="h-36 w-32 shrink-0 rounded-none sm:w-48" />
        <div className="flex-1 space-y-2 p-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-6 h-4 w-24" />
        </div>
      </li>
    );
  }
  return (
    <li className="bg-card overflow-hidden rounded-xl border">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-4 h-4 w-24" />
        <Skeleton className="h-5 w-28" />
      </div>
    </li>
  );
}

export function ProductGrid({ view, children }: { view: ResultsView; children: React.ReactNode }) {
  return (
    <ul className={cn(view === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-3')}>
      {children}
    </ul>
  );
}
