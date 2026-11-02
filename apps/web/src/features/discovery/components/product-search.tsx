'use client';

import { CertificationTypeSchema, type ProductSearchQuery } from '@garmentgate/shared';
import { useLocale, useTranslations } from 'next-intl';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Loader2,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useEffect, useEffectEvent, useMemo, useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCategories } from '@/features/onboarding/api';
import { countryName } from '@/lib/countries';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useProductSearch } from '../api';
import { FILTER_KEYS, PAGE_SIZE, SEARCH_CURRENCY, searchParsers } from '../search-params';
import { ProductCard, ProductCardSkeleton, ProductGrid } from './product-card';
import { type FilterValues, SearchFilters } from './search-filters';

const SORTS = [
  'relevance',
  'price_asc',
  'price_desc',
  'moq_asc',
  'lead_time_asc',
  'score_desc',
  'newest',
] as const;

const DEBOUNCE_MS = 250;

export function ProductSearch() {
  const t = useTranslations('discovery.search');
  const [params, setParams] = useQueryStates(searchParsers, { history: 'replace' });
  const [sheetOpen, setSheetOpen] = useState(false);

  const query = useMemo<Partial<ProductSearchQuery>>(
    () => ({
      q: params.q || undefined,
      category: params.category,
      fabric: params.fabric,
      country: params.country,
      cert: params.cert as ProductSearchQuery['cert'],
      gsmMin: params.gsmMin ?? undefined,
      gsmMax: params.gsmMax ?? undefined,
      moqMin: params.moqMin ?? undefined,
      moqMax: params.moqMax ?? undefined,
      priceMin: params.priceMin ?? undefined,
      priceMax: params.priceMax ?? undefined,
      leadTimeMax: params.leadTimeMax ?? undefined,
      sort: params.sort,
      page: params.page,
      pageSize: PAGE_SIZE,
    }),
    [params],
  );
  const search = useProductSearch(query);

  const filters: FilterValues = {
    category: params.category,
    fabric: params.fabric,
    country: params.country,
    cert: params.cert,
    gsmMin: params.gsmMin,
    gsmMax: params.gsmMax,
    moqMin: params.moqMin,
    moqMax: params.moqMax,
    priceMin: params.priceMin,
    priceMax: params.priceMax,
    leadTimeMax: params.leadTimeMax,
  };
  const activeCount = FILTER_KEYS.reduce((n, key) => {
    const value = params[key];
    return n + (Array.isArray(value) ? value.length : value === null ? 0 : 1);
  }, 0);
  // Any filter change starts again from page 1.
  const changeFilters = (patch: Partial<FilterValues>) => void setParams({ ...patch, page: 1 });
  const clearFilters = () =>
    void setParams({ ...Object.fromEntries(FILTER_KEYS.map((k) => [k, null])), page: 1 });

  const data = search.data;
  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const view = params.view;

  return (
    <div className="space-y-6">
      <SearchBox value={params.q} onSearch={(q) => void setParams({ q: q || null, page: 1 })} />

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside aria-label={t('filters')} className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="flex h-8 items-center justify-between">
              <h2 className="text-sm font-semibold">{t('filters')}</h2>
              {activeCount > 0 ? (
                <Button variant="link" size="sm" className="px-0" onClick={clearFilters}>
                  {t('clearAll')}
                </Button>
              ) : null}
            </div>
            <SearchFilters
              idPrefix="side"
              values={filters}
              facets={data?.facets}
              priceRange={data?.priceRange}
              onChange={changeFilters}
            />
          </div>
        </aside>

        <section aria-labelledby="results-heading" className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="results-heading"
              className="text-muted-foreground flex basis-full items-center gap-2 text-sm sm:me-auto sm:basis-auto"
              aria-live="polite"
            >
              {data ? t('results', { count: data.total }) : t('searching')}
              {search.isFetching && data ? (
                <Loader2
                  className="size-3.5 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
              ) : null}
            </h2>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none lg:hidden"
              onClick={() => setSheetOpen(true)}
              aria-haspopup="dialog"
            >
              <SlidersHorizontal />
              {t('filters')}
              {activeCount > 0 ? (
                <Badge className="ms-0.5 h-5 min-w-5 px-1">{activeCount}</Badge>
              ) : null}
            </Button>
            <Select
              items={SORTS.map((s) => ({ value: s, label: t(`sorts.${s}`) }))}
              value={params.sort}
              onValueChange={(next) => {
                const sort = SORTS.find((s) => s === next);
                if (sort) void setParams({ sort: sort === 'relevance' ? null : sort, page: 1 });
              }}
            >
              <SelectTrigger className="flex-1 sm:w-44 sm:flex-none" aria-label={t('sortLabel')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {SORTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {t(`sorts.${s}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div
              role="group"
              aria-label={t('viewLabel')}
              className="bg-muted hidden rounded-lg p-0.5 sm:flex"
            >
              {(['grid', 'list'] as const).map((v) => {
                const Icon = v === 'grid' ? LayoutGrid : List;
                return (
                  <Button
                    key={v}
                    variant="ghost"
                    size="icon-sm"
                    aria-pressed={view === v}
                    aria-label={t(v)}
                    onClick={() => void setParams({ view: v === 'grid' ? null : v })}
                    className={cn(view === v && 'bg-card shadow-xs hover:bg-card')}
                  >
                    <Icon />
                  </Button>
                );
              })}
            </div>
          </div>

          <ActiveFilters values={filters} onChange={changeFilters} onClear={clearFilters} />

          {search.isPending ? (
            <ProductGrid view={view}>
              {Array.from({ length: 6 }, (_, i) => (
                <ProductCardSkeleton key={i} view={view} />
              ))}
            </ProductGrid>
          ) : search.isError ? (
            <ErrorState onRetry={() => void search.refetch()} retrying={search.isFetching} />
          ) : data?.hits.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={t('empty')}
              description={activeCount > 0 || params.q ? t('emptyFiltered') : t('emptyBody')}
              action={
                activeCount > 0 || params.q ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      void setParams({
                        ...Object.fromEntries(FILTER_KEYS.map((k) => [k, null])),
                        q: null,
                        page: 1,
                      })
                    }
                  >
                    {t('reset')}
                  </Button>
                ) : null
              }
            />
          ) : data ? (
            <>
              <div
                className={cn(
                  'transition-opacity duration-150',
                  search.isPlaceholderData && 'opacity-60',
                )}
              >
                <ProductGrid view={view}>
                  {data.hits.map((p, i) => (
                    <ProductCard key={p.id} product={p} view={view} priority={i < 4} />
                  ))}
                </ProductGrid>
              </div>
              {pages > 1 ? (
                <nav
                  aria-label={t('pagination')}
                  className="flex items-center justify-between gap-3 pt-2"
                >
                  <Button
                    variant="outline"
                    disabled={params.page <= 1}
                    onClick={() => void setParams({ page: params.page - 1 })}
                  >
                    <ChevronLeft className="rtl:rotate-180" />
                    {t('previous')}
                  </Button>
                  <span className="text-muted-foreground tabular text-sm">
                    {t('page', { page: params.page, pages })}
                  </span>
                  <Button
                    variant="outline"
                    disabled={params.page >= pages}
                    onClick={() => void setParams({ page: params.page + 1 })}
                  >
                    {t('next')}
                    <ChevronRight className="rtl:rotate-180" />
                  </Button>
                </nav>
              ) : null}
            </>
          ) : null}
        </section>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="gap-0">
          <SheetHeader className="border-b">
            <SheetTitle>{t('filters')}</SheetTitle>
            <SheetDescription className="sr-only">{t('filtersBody')}</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto px-4 py-5">
            <SearchFilters
              idPrefix="sheet"
              values={filters}
              facets={data?.facets}
              priceRange={data?.priceRange}
              onChange={changeFilters}
            />
          </div>
          <SheetFooter className="flex-row border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearFilters}
              disabled={activeCount === 0}
            >
              {t('clearAll')}
            </Button>
            <Button className="flex-1" onClick={() => setSheetOpen(false)}>
              {data ? t('showResults', { count: data.total }) : t('filters')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/** Instant search: updates the URL a moment after typing stops. */
function SearchBox({ value, onSearch }: { value: string; onSearch: (q: string) => void }) {
  const t = useTranslations('discovery.search');
  const [draft, setDraft] = useState(value);
  const commit = useEffectEvent((q: string) => onSearch(q));

  // Follow the URL when it changes elsewhere (Back button, "Reset search").
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }

  useEffect(() => {
    if (draft.trim() === value) return;
    const timer = setTimeout(() => commit(draft.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [draft, value]);

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(draft.trim());
      }}
    >
      <InputGroup className="h-12 bg-card shadow-xs md:h-11">
        <InputGroupAddon>
          <Search aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          className="text-base md:text-sm"
          enterKeyHint="search"
        />
        {draft ? (
          <InputGroupAddon align="inline-end">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t('clearSearch')}
              onClick={() => {
                setDraft('');
                onSearch('');
              }}
            >
              <X />
            </Button>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    </form>
  );
}

/** Removable chips for every active filter. */
function ActiveFilters({
  values,
  onChange,
  onClear,
}: {
  values: FilterValues;
  onChange: (patch: Partial<FilterValues>) => void;
  onClear: () => void;
}) {
  const t = useTranslations('discovery.filters');
  const ts = useTranslations('discovery.search');
  const tcert = useTranslations('certifications');
  const certLabel = (value: string) => {
    const type = CertificationTypeSchema.safeParse(value);
    return type.success ? tcert(type.data) : value;
  };
  const locale = useLocale();
  const categories = useCategories();
  const money = (v: number) => formatMoney(v, SEARCH_CURRENCY, locale);
  const range = (min: number | null, max: number | null, fmt: (v: number) => string) =>
    min !== null && max !== null
      ? `${fmt(min)}–${fmt(max)}`
      : min !== null
        ? `≥ ${fmt(min)}`
        : `≤ ${fmt(max ?? 0)}`;

  const chips: { key: string; label: string; remove: () => void }[] = [
    ...values.category.map((v) => ({
      key: `c-${v}`,
      label: categories.data?.find((c) => c.slug === v)?.name ?? v,
      remove: () => onChange({ category: values.category.filter((x) => x !== v) }),
    })),
    ...values.fabric.map((v) => ({
      key: `f-${v}`,
      label: v,
      remove: () => onChange({ fabric: values.fabric.filter((x) => x !== v) }),
    })),
    ...values.country.map((v) => ({
      key: `o-${v}`,
      label: countryName(v, locale),
      remove: () => onChange({ country: values.country.filter((x) => x !== v) }),
    })),
    ...values.cert.map((v) => ({
      key: `x-${v}`,
      label: certLabel(v),
      remove: () => onChange({ cert: values.cert.filter((x) => x !== v) }),
    })),
    ...(values.gsmMin !== null || values.gsmMax !== null
      ? [
          {
            key: 'gsm',
            label: `${t('gsm')} ${range(values.gsmMin, values.gsmMax, String)}`,
            remove: () => onChange({ gsmMin: null, gsmMax: null }),
          },
        ]
      : []),
    ...(values.moqMin !== null || values.moqMax !== null
      ? [
          {
            key: 'moq',
            label: `${t('moq')} ${range(values.moqMin, values.moqMax, (v) => v.toLocaleString(locale))}`,
            remove: () => onChange({ moqMin: null, moqMax: null }),
          },
        ]
      : []),
    ...(values.priceMin !== null || values.priceMax !== null
      ? [
          {
            key: 'price',
            label: range(values.priceMin, values.priceMax, money),
            remove: () => onChange({ priceMin: null, priceMax: null }),
          },
        ]
      : []),
    ...(values.leadTimeMax !== null
      ? [
          {
            key: 'lead',
            label: t('upTo', { days: values.leadTimeMax }),
            remove: () => onChange({ leadTimeMax: null }),
          },
        ]
      : []),
  ];
  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label={ts('activeFilters')}>
      {chips.map((chip) => (
        <li key={chip.key}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={chip.remove}
            aria-label={ts('removeFilter', { filter: chip.label })}
          >
            {chip.label}
            <X />
          </Button>
        </li>
      ))}
      <li>
        <Button variant="link" size="sm" onClick={onClear}>
          {ts('clearAll')}
        </Button>
      </li>
    </ul>
  );
}
