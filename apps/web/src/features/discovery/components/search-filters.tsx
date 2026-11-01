'use client';

import { CertificationTypeSchema, type ProductSearchResult } from '@garmentgate/shared';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/features/onboarding/api';
import { countryName } from '@/lib/countries';
import { formString } from '@/lib/form-data';
import { formatMoney, fromMinor, toMinor } from '@/lib/format';
import { SEARCH_CURRENCY } from '../search-params';

export interface FilterValues {
  category: string[];
  fabric: string[];
  country: string[];
  cert: string[];
  gsmMin: number | null;
  gsmMax: number | null;
  moqMin: number | null;
  moqMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  leadTimeMax: number | null;
}

type ListKey = 'category' | 'fabric' | 'country' | 'cert';

const LEAD_TIMES = [30, 45, 60, 90] as const;
const COLLAPSED = 6;

/** Facet checkboxes, ranges and lead time. Rendered in the sidebar (desktop) and a sheet (mobile). */
export function SearchFilters({
  values,
  facets,
  priceRange,
  onChange,
  idPrefix,
}: {
  values: FilterValues;
  facets: ProductSearchResult['facets'] | undefined;
  priceRange: ProductSearchResult['priceRange'] | undefined;
  onChange: (patch: Partial<FilterValues>) => void;
  /** Keeps ids unique when the filters render twice (sidebar + sheet). */
  idPrefix: string;
}) {
  const t = useTranslations('discovery.filters');
  const tcert = useTranslations('certifications');
  const certLabel = (value: string) => {
    const type = CertificationTypeSchema.safeParse(value);
    return type.success ? tcert(type.data) : value;
  };
  const locale = useLocale();
  const categories = useCategories();
  const categoryName = (slug: string) =>
    categories.data?.find((c) => c.slug === slug)?.name ?? slug;

  const toggle = (key: ListKey, value: string, on: boolean) =>
    onChange({ [key]: on ? [...values[key], value] : values[key].filter((v) => v !== value) });

  return (
    <div className="space-y-6">
      <FacetGroup
        id={`${idPrefix}-category`}
        title={t('category')}
        counts={facets?.category}
        selected={values.category}
        label={categoryName}
        onToggle={(v, on) => toggle('category', v, on)}
      />
      <FacetGroup
        id={`${idPrefix}-fabric`}
        title={t('fabric')}
        counts={facets?.fabric}
        selected={values.fabric}
        label={(v) => v}
        onToggle={(v, on) => toggle('fabric', v, on)}
      />
      <RangeGroup
        id={`${idPrefix}-gsm`}
        title={t('gsm')}
        min={values.gsmMin}
        max={values.gsmMax}
        onChange={(min, max) => onChange({ gsmMin: min, gsmMax: max })}
      />
      <RangeGroup
        id={`${idPrefix}-moq`}
        title={t('moq')}
        unit={t('pcs')}
        min={values.moqMin}
        max={values.moqMax}
        onChange={(min, max) => onChange({ moqMin: min, moqMax: max })}
      />
      <RangeGroup
        id={`${idPrefix}-price`}
        title={t('price', { currency: SEARCH_CURRENCY })}
        money
        min={values.priceMin}
        max={values.priceMax}
        hint={
          priceRange
            ? t('priceHint', {
                min: formatMoney(priceRange.min, SEARCH_CURRENCY, locale),
                max: formatMoney(priceRange.max, SEARCH_CURRENCY, locale),
              })
            : undefined
        }
        onChange={(min, max) => onChange({ priceMin: min, priceMax: max })}
      />
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">{t('leadTime')}</legend>
        <Select
          items={[
            { value: 'any', label: t('any') },
            ...LEAD_TIMES.map((d) => ({ value: String(d), label: t('upTo', { days: d }) })),
          ]}
          value={values.leadTimeMax === null ? 'any' : String(values.leadTimeMax)}
          onValueChange={(next) =>
            onChange({ leadTimeMax: next === 'any' || next === null ? null : Number(next) })
          }
        >
          <SelectTrigger className="w-full" aria-label={t('leadTime')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">{t('any')}</SelectItem>
            {LEAD_TIMES.map((d) => (
              <SelectItem key={d} value={String(d)}>
                {t('upTo', { days: d })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
      <FacetGroup
        id={`${idPrefix}-country`}
        title={t('country')}
        counts={facets?.country}
        selected={values.country}
        label={(code) => countryName(code, locale)}
        onToggle={(v, on) => toggle('country', v, on)}
      />
      <FacetGroup
        id={`${idPrefix}-cert`}
        title={t('certifications')}
        counts={facets?.certifications}
        selected={values.cert}
        label={certLabel}
        onToggle={(v, on) => toggle('cert', v, on)}
      />
    </div>
  );
}

function FacetGroup({
  id,
  title,
  counts,
  selected,
  label,
  onToggle,
}: {
  id: string;
  title: string;
  counts: Record<string, number> | undefined;
  selected: string[];
  label: (value: string) => string;
  onToggle: (value: string, on: boolean) => void;
}) {
  const t = useTranslations('discovery.filters');
  const [expanded, setExpanded] = useState(false);
  // Selected values stay visible even when the current results have none.
  const options = [
    ...Object.entries(counts ?? {}).sort((a, b) => b[1] - a[1]),
    ...selected.filter((v) => !counts?.[v]).map((v) => [v, 0] as [string, number]),
  ];
  if (options.length === 0) return null;
  const shown = expanded ? options : options.slice(0, COLLAPSED);

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{title}</legend>
      <ul className="space-y-0.5">
        {shown.map(([value, count]) => {
          const inputId = `${id}-${value.replace(/\W+/g, '-')}`;
          return (
            <li key={value}>
              <label
                htmlFor={inputId}
                className="hover:bg-muted flex min-h-10 cursor-pointer items-center gap-2.5 rounded-md px-2 text-sm md:min-h-8"
              >
                <Checkbox
                  id={inputId}
                  checked={selected.includes(value)}
                  onCheckedChange={(on) => onToggle(value, on)}
                />
                <span className="min-w-0 flex-1 truncate">{label(value)}</span>
                <span className="text-subtle-foreground tabular text-xs">{count}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {options.length > COLLAPSED ? (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-1 px-2"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {expanded ? t('showLess') : t('showMore', { count: options.length - COLLAPSED })}
        </Button>
      ) : null}
    </fieldset>
  );
}

/** Min/max inputs that apply on blur or Enter. Money is typed in major units, stored in minor. */
function RangeGroup({
  id,
  title,
  min,
  max,
  unit,
  money = false,
  hint,
  onChange,
}: {
  id: string;
  title: string;
  min: number | null;
  max: number | null;
  unit?: string;
  money?: boolean;
  hint?: string;
  onChange: (min: number | null, max: number | null) => void;
}) {
  const t = useTranslations('discovery.filters');
  const show = (v: number | null) =>
    v === null ? '' : money ? fromMinor(v, SEARCH_CURRENCY) : String(v);
  const parse = (raw: string): number | null => {
    const clean = raw.trim();
    if (clean === '') return null;
    const n = money ? toMinor(clean, SEARCH_CURRENCY) : Number(clean.replace(/[,\s]/g, ''));
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
  };
  const commit = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const nextMin = parse(formString(data, 'min'));
    const nextMax = parse(formString(data, 'max'));
    if (nextMin !== min || nextMax !== max) onChange(nextMin, nextMax);
  };

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">
        {title}
        {unit ? <span className="text-muted-foreground font-normal"> ({unit})</span> : null}
      </legend>
      <form
        // Remount when the URL changes elsewhere (e.g. "Clear all").
        key={`${String(min)}-${String(max)}`}
        className="grid grid-cols-2 gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          commit(event.currentTarget);
        }}
        onBlur={(event) => commit(event.currentTarget)}
      >
        <Input
          id={`${id}-min`}
          name="min"
          inputMode={money ? 'decimal' : 'numeric'}
          placeholder={t('min')}
          aria-label={`${title} ${t('min')}`}
          defaultValue={show(min)}
        />
        <Input
          id={`${id}-max`}
          name="max"
          inputMode={money ? 'decimal' : 'numeric'}
          placeholder={t('max')}
          aria-label={`${title} ${t('max')}`}
          defaultValue={show(max)}
        />
        <button type="submit" hidden />
      </form>
      {hint ? <p className="text-subtle-foreground mt-1.5 text-xs">{hint}</p> : null}
    </fieldset>
  );
}
