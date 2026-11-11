import type { DirectoryCategory, DirectoryCountry } from '@garmentgate/shared';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

/** Top-level categories (those with factories), each with its live sub-categories. */
export function topLevel(categories: DirectoryCategory[]) {
  const live = categories.filter((c) => c.factories > 0 || c.products > 0);
  return live
    .filter((c) => c.parentSlug === null)
    .map((parent) => ({ parent, children: live.filter((c) => c.parentSlug === parent.slug) }));
}

/** A category tile: name, live counts and its sub-categories. */
export async function CategoryCard({
  category,
  subcategories,
  counts = true,
  className,
}: {
  category: DirectoryCategory;
  subcategories: DirectoryCategory[];
  /** Worldwide totals; off where the page is about one country. */
  counts?: boolean;
  className?: string;
}) {
  const t = await getTranslations('marketing.directory');
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        'bg-card hover:border-border-strong group flex h-full flex-col rounded-2xl border p-6 shadow-xs transition-[border-color,box-shadow] outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/40',
        className,
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-lg font-semibold tracking-[-0.01em]">{category.name}</span>
        <ArrowRight
          className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
          aria-hidden="true"
        />
      </span>
      {counts ? (
        <span className="text-muted-foreground mt-2 text-sm">
          {t('factories', { count: category.factories })} ·{' '}
          {t('countries', { count: category.countries.length })}
        </span>
      ) : null}
      {counts && category.minMoq ? (
        <span className="text-subtle-foreground mt-1 font-mono text-xs">
          {t('moqFrom', { count: category.minMoq })}
        </span>
      ) : null}
      {subcategories.length > 0 ? (
        <span className="mt-4 flex flex-wrap gap-1.5">
          {subcategories.map((c) => (
            <span key={c.slug} className="bg-surface rounded-full border px-2.5 py-0.5 text-xs">
              {c.name}
            </span>
          ))}
        </span>
      ) : null}
    </Link>
  );
}

/** A country tile: code, name and live totals. */
export async function CountryCard({ country, name }: { country: DirectoryCountry; name: string }) {
  const t = await getTranslations('marketing.directory');
  return (
    <Link
      href={`/sourcing/${country.code.toLowerCase()}`}
      className="bg-card hover:border-border-strong group flex h-full flex-col rounded-2xl border p-6 shadow-xs transition-[border-color,box-shadow] outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/40"
    >
      <span className="flex items-center gap-3">
        <span className="bg-brand-deep text-brand-gold flex size-11 items-center justify-center rounded-xl font-mono text-sm font-semibold">
          {country.code}
        </span>
        <span className="text-lg font-semibold">{name}</span>
        <ArrowRight
          className="text-muted-foreground ms-auto size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
          aria-hidden="true"
        />
      </span>
      <span className="text-muted-foreground mt-4 text-sm">
        {t('factories', { count: country.factories })} ·{' '}
        {t('products', { count: country.products })}
      </span>
      {country.minMoq ? (
        <span className="text-subtle-foreground mt-1 font-mono text-xs">
          {t('moqFrom', { count: country.minMoq })}
        </span>
      ) : null}
    </Link>
  );
}

/** Four key facts as a strip: factories, one more figure, lowest MOQ and lead times. */
export async function FactStrip({
  factories,
  second,
  minMoq,
  leadTimeDays,
}: {
  factories: number;
  second: { label: string; value: string };
  minMoq: number | null;
  leadTimeDays: { min: number; max: number } | null;
}) {
  const t = await getTranslations('marketing.directory.facts');
  const cells: [string, string][] = [
    [t('factories'), String(factories)],
    [second.label, second.value],
    [t('moq'), minMoq ? t('pcs', { count: minMoq }) : t('none')],
    [t('leadTime'), leadTimeDays ? t('days', leadTimeDays) : t('none')],
  ];
  return (
    <dl className="bg-border grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-4">
      {cells.map(([label, value]) => (
        <div key={label} className="bg-card px-6 py-6">
          <dt className="text-muted-foreground text-sm">{label}</dt>
          <dd className="font-display tabular mt-2 text-3xl tracking-[-0.02em]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
