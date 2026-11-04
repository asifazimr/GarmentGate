'use client';

import {
  type CapacitySearchQuery,
  CapacitySearchQuerySchema,
  type CapacitySearchResult,
  type CapacityWindow,
  dateOnly,
  isoDate,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarSearch, Handshake, Search, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import type { z } from 'zod';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/features/onboarding/api';
import { useTodayIso } from '@/lib/client-hooks';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useCapacitySearch } from '../api';
import { AvailabilityBar, MinutesLabel } from './parts';
import { PartnershipDialog } from './partnership-dialog';

type Mode = 'pieces' | 'minutes';
type FormValues = z.input<typeof CapacitySearchQuerySchema>;
const plusDays = (iso: string, days: number) =>
  isoDate(new Date(dateOnly(iso).getTime() + days * 86_400_000));
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);

/** Find open line time: category, quantity (pieces × SAM, or minutes) and dates. */
export function BookCapacity() {
  const today = useTodayIso();
  if (!today) return <Skeleton className="h-64 rounded-xl" />;
  return <SearchForm today={today} />;
}

function SearchForm({ today }: { today: string }) {
  const t = useTranslations('capacityBooking.search');
  const categories = useCategories();
  const [mode, setMode] = useState<Mode>('pieces');
  const [query, setQuery] = useState<CapacitySearchQuery | null>(null);
  const [partnership, setPartnership] = useState<{ lineId: string; categoryId: string } | null>(
    null,
  );
  const form = useForm<FormValues, unknown, CapacitySearchQuery>({
    resolver: zodResolver(CapacitySearchQuerySchema),
    defaultValues: { categoryId: '', from: plusDays(today, 14), to: plusDays(today, 90) },
  });
  const { errors } = form.formState;
  const [pieces, sam] = useWatch({ control: form.control, name: ['pieces', 'samPerPiece'] });
  const helperMinutes =
    mode === 'pieces' && Number(pieces) > 0 && Number(sam) > 0
      ? Math.ceil(Number(pieces) * Number(sam))
      : null;

  const items = useMemo(() => {
    const all = categories.data ?? [];
    const parents = new Map(all.filter((c) => c.parentId === null).map((c) => [c.id, c.name]));
    return all.map((c) => ({
      value: c.id,
      label: c.parentId ? `${parents.get(c.parentId) ?? ''} · ${c.name}` : c.name,
    }));
  }, [categories.data]);

  const onSubmit = form.handleSubmit((q) => setQuery(q));

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1.3fr)_auto] lg:items-start"
          >
            <Field data-invalid={!!errors.categoryId}>
              <FieldLabel htmlFor="cap-category">{t('category')}</FieldLabel>
              <Controller
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    items={items}
                    value={field.value || null}
                    onValueChange={(v) => field.onChange(v ?? '')}
                  >
                    <SelectTrigger
                      id="cap-category"
                      className="w-full"
                      aria-invalid={!!errors.categoryId}
                    >
                      <SelectValue placeholder={t('categoryPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {items.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.categoryId]} />
            </Field>

            <fieldset className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <legend className="text-sm font-medium">{t('quantity')}</legend>
                <div
                  role="group"
                  aria-label={t('quantityMode')}
                  className="bg-muted flex rounded-md p-0.5 text-xs"
                >
                  {(['pieces', 'minutes'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mode === m}
                      onClick={() => {
                        setMode(m);
                        if (m === 'minutes') {
                          form.setValue('pieces', undefined);
                          form.setValue('samPerPiece', undefined);
                        } else form.setValue('minutes', undefined);
                      }}
                      className={cn(
                        'min-h-8 rounded px-2.5 font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                        mode === m ? 'bg-card shadow-xs' : 'text-muted-foreground',
                      )}
                    >
                      {t(`modes.${m}`)}
                    </button>
                  ))}
                </div>
              </div>
              {mode === 'pieces' ? (
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    aria-label={t('pieces')}
                    placeholder={t('pieces')}
                    inputMode="numeric"
                    {...form.register('pieces', { setValueAs: blank })}
                  />
                  <Input
                    aria-label={t('sam')}
                    placeholder={t('samPlaceholder')}
                    inputMode="decimal"
                    {...form.register('samPerPiece', { setValueAs: blank })}
                  />
                </div>
              ) : (
                <Input
                  aria-label={t('minutes')}
                  placeholder={t('minutes')}
                  inputMode="numeric"
                  {...form.register('minutes', { setValueAs: blank })}
                />
              )}
              <FieldDescription>
                {helperMinutes ? t('helper', { minutes: helperMinutes }) : t('samHint')}
              </FieldDescription>
              <FieldError errors={[errors.minutes, errors.pieces, errors.samPerPiece]} />
            </fieldset>

            <div className="grid grid-cols-2 gap-2">
              <Field data-invalid={!!errors.from}>
                <FieldLabel htmlFor="cap-from">{t('from')}</FieldLabel>
                <Input id="cap-from" type="date" min={today} {...form.register('from')} />
                <FieldError errors={[errors.from]} />
              </Field>
              <Field data-invalid={!!errors.to}>
                <FieldLabel htmlFor="cap-to">{t('to')}</FieldLabel>
                <Input id="cap-to" type="date" min={today} {...form.register('to')} />
                <FieldError errors={[errors.to]} />
              </Field>
            </div>
            <Button type="submit" className="lg:mt-6">
              <Search />
              {t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Results
        query={query}
        onPartnership={(lineId) => {
          if (query) setPartnership({ lineId, categoryId: query.categoryId });
        }}
      />
      <PartnershipDialog target={partnership} onClose={() => setPartnership(null)} />
    </div>
  );
}

function Results({
  query,
  onPartnership,
}: {
  query: CapacitySearchQuery | null;
  onPartnership: (lineId: string) => void;
}) {
  const t = useTranslations('capacityBooking.search');
  const search = useCapacitySearch(query);
  if (!query)
    return (
      <EmptyState icon={CalendarSearch} title={t('introTitle')} description={t('introBody')} />
    );
  if (search.isPending)
    return (
      <div className="space-y-4" aria-busy="true">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-44 rounded-xl" />
        ))}
      </div>
    );
  if (search.isError)
    return <ErrorState onRetry={() => void search.refetch()} retrying={search.isFetching} />;
  if (search.data.results.length === 0)
    return (
      <EmptyState icon={CalendarSearch} title={t('emptyTitle')} description={t('emptyBody')} />
    );
  return (
    <ul className="space-y-4" aria-label={t('resultsLabel')}>
      {search.data.results.map((r) => (
        <li key={r.manufacturer.publicCode}>
          <FactoryResult
            result={r}
            minutes={search.data.minutes}
            categoryId={query.categoryId}
            onPartnership={onPartnership}
          />
        </li>
      ))}
    </ul>
  );
}

function FactoryResult({
  result,
  minutes,
  categoryId,
  onPartnership,
}: {
  result: CapacitySearchResult;
  minutes: number;
  categoryId: string;
  onPartnership: (lineId: string) => void;
}) {
  const t = useTranslations('capacityBooking.search');
  const tclaim = useTranslations('supplierClaims');
  const locale = useLocale();
  const m = result.manufacturer;
  return (
    <Card size="sm">
      <CardHeader className="flex flex-wrap items-center gap-2">
        <Badge variant="code" className="h-7 px-2.5 text-xs">
          {m.publicCode}
        </Badge>
        <Badge variant="neutral">{countryName(m.country, locale)}</Badge>
        <span className="text-muted-foreground text-xs">
          {t('score', { score: m.performanceScore })}
        </span>
        {m.brandBadges.map((b) => (
          <Badge key={`${b.tier}-${b.region}`} variant="success" className="h-auto py-0.5">
            <ShieldCheck aria-hidden="true" />
            {tclaim('badge', {
              count: b.brandCount,
              tier: b.tier,
              region: tclaim(`regionIn.${b.region}`),
            })}
          </Badge>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="ms-auto"
          render={<Link href={`/buyer/factories/${m.publicCode}`} />}
        >
          {t('profile')}
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {result.windows.map((w) => (
            <li key={w.slotId}>
              <WindowRow
                window={w}
                minutes={minutes}
                categoryId={categoryId}
                onPartnership={onPartnership}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function WindowRow({
  window: w,
  minutes,
  categoryId,
  onPartnership,
}: {
  window: CapacityWindow;
  minutes: number;
  categoryId: string;
  onPartnership: (lineId: string) => void;
}) {
  const t = useTranslations('capacityBooking.search');
  const format = useFormatter();
  const showMoney = useMoney();
  const range = format.dateTimeRange(dateOnly(w.startDate), dateOnly(w.endDate), {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
  return (
    <div className="grid gap-3 py-3 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center">
      <div>
        <p className="text-sm font-medium">{t('line', { number: w.lineNumber })}</p>
        <p className="text-muted-foreground text-xs">{range}</p>
      </div>
      <div className="space-y-1.5">
        <AvailabilityBar
          total={w.totalMinutes}
          free={w.freeMinutes}
          requested={w.fits ? minutes : undefined}
          label={t('availability', { free: w.freeMinutes, total: w.totalMinutes })}
        />
        <p className="text-muted-foreground text-xs">
          {t('free')}:{' '}
          <MinutesLabel minutes={w.freeMinutes} pieces={w.fits ? null : w.estimatedPieces} />
          {w.quote ? (
            <>
              {' · '}
              <span className="text-foreground font-medium">
                {showMoney(w.quote.buyerAmountMinor, w.quote.currency)}
              </span>{' '}
              {t('deposit', { amount: showMoney(w.quote.depositMinor, w.quote.currency) })}
            </>
          ) : (
            <span className="text-warning-ink"> · {t('tooSmall')}</span>
          )}
        </p>
      </div>
      <div className="flex gap-2 sm:justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPartnership(w.lineId)}
          title={t('partnershipHint')}
        >
          <Handshake />
          <span className="sr-only sm:not-sr-only">{t('partnership')}</span>
        </Button>
        <Button
          size="sm"
          render={
            <Link
              href={`/buyer/capacity/book/${w.slotId}?category=${categoryId}${w.fits ? `&minutes=${String(minutes)}` : ''}`}
            />
          }
        >
          {t('book')}
        </Button>
      </div>
    </div>
  );
}
