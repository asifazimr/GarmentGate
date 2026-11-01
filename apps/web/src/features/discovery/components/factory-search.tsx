'use client';

import { ManufacturerSortSchema } from '@garmentgate/shared';
import { Factory, Search } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useEffect, useEffectEvent, useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useFactorySearch } from '../api';
import { FactoryCard, FactoryCardSkeleton } from './factory-card';

const SORTS = ManufacturerSortSchema.options;
const parsers = {
  q: parseAsString.withDefault(''),
  sort: parseAsStringLiteral(SORTS).withDefault('relevance'),
  page: parseAsInteger.withDefault(1),
};

export function FactorySearch() {
  const t = useTranslations('discovery.factories');
  const [params, setParams] = useQueryStates(parsers, { history: 'replace' });
  const [draft, setDraft] = useState(params.q);
  const [synced, setSynced] = useState(params.q);
  if (params.q !== synced) {
    setSynced(params.q);
    setDraft(params.q);
  }
  const commit = useEffectEvent((q: string) => void setParams({ q: q || null, page: 1 }));
  useEffect(() => {
    if (draft.trim() === params.q) return;
    const timer = setTimeout(() => commit(draft.trim()), 250);
    return () => clearTimeout(timer);
  }, [draft, params.q]);

  const search = useFactorySearch({
    q: params.q || undefined,
    sort: params.sort,
    page: params.page,
  });
  const data = search.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Button variant="outline" render={<Link href="/buyer/search" />}>
            {t('browseProducts')}
          </Button>
        }
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <InputGroup className="h-11 flex-1 bg-card shadow-xs">
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
          />
        </InputGroup>
        <Select
          items={SORTS.map((s) => ({ value: s, label: t(`sorts.${s}`) }))}
          value={params.sort}
          onValueChange={(next) => {
            const sort = SORTS.find((s) => s === next);
            if (sort) void setParams({ sort: sort === 'relevance' ? null : sort, page: 1 });
          }}
        >
          <SelectTrigger className="h-11 w-full sm:w-52" aria-label={t('sortLabel')}>
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
      </div>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {data ? t('results', { count: data.total }) : ' '}
      </p>
      {search.isPending ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <FactoryCardSkeleton key={i} />
          ))}
        </ul>
      ) : search.isError ? (
        <ErrorState onRetry={() => void search.refetch()} retrying={search.isFetching} />
      ) : data?.hits.length === 0 ? (
        <EmptyState
          icon={Factory}
          title={t('empty')}
          description={t('emptyBody')}
          action={
            <Button variant="outline" onClick={() => void setParams({ q: null, page: 1 })}>
              {t('reset')}
            </Button>
          }
        />
      ) : data ? (
        <ul
          className={cn(
            'grid gap-4 transition-opacity duration-150 sm:grid-cols-2 xl:grid-cols-3',
            search.isPlaceholderData && 'opacity-60',
          )}
        >
          {data.hits.map((m) => (
            <FactoryCard key={m.publicCode} factory={m} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
