'use client';

import type { Category } from '@garmentgate/shared';
import { Check, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { countries, countryName } from '@/lib/countries';
import { cn } from '@/lib/utils';

/** Single country, as an ISO code. */
export function CountrySelect({
  id,
  value,
  onChange,
  placeholder,
  invalid,
}: {
  id: string;
  value: string | undefined;
  onChange: (code: string) => void;
  placeholder: string;
  invalid?: boolean;
}) {
  const locale = useLocale();
  const items = useMemo(
    () => countries(locale).map((c) => ({ value: c.code, label: c.name })),
    [locale],
  );
  return (
    <Select
      items={items}
      value={value ?? null}
      onValueChange={(next) => {
        if (typeof next === 'string') onChange(next);
      }}
    >
      <SelectTrigger id={id} className="w-full" aria-invalid={invalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Several countries: pick from a list, remove with the chip's × button. */
export function CountryMultiSelect({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string[];
  onChange: (codes: string[]) => void;
  placeholder: string;
}) {
  const locale = useLocale();
  const items = useMemo(
    () =>
      countries(locale)
        .filter((c) => !value.includes(c.code))
        .map((c) => ({ value: c.code, label: c.name })),
    [locale, value],
  );
  return (
    <div className="space-y-2">
      <Select
        items={items}
        value={null}
        onValueChange={(next) => {
          if (typeof next === 'string') onChange([...value, next]);
        }}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {value.map((code) => (
            <li key={code}>
              <span className="bg-secondary inline-flex items-center gap-1 rounded-full py-1 ps-3 pe-1 text-sm">
                {countryName(code, locale)}
                <button
                  type="button"
                  onClick={() => onChange(value.filter((c) => c !== code))}
                  aria-label={`Remove ${countryName(code, locale)}`}
                  className="hover:bg-background flex size-7 items-center justify-center rounded-full"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Toggle chips for categories, grouped under their parent. */
export function CategoryPicker({
  categories,
  value,
  onChange,
  invalid,
  labelledBy,
}: {
  categories: Category[] | undefined;
  value: string[];
  onChange: (ids: string[]) => void;
  invalid?: boolean;
  labelledBy: string;
}) {
  if (!categories) {
    return (
      <div className="flex flex-wrap gap-2" aria-busy="true">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="h-11 w-28 rounded-full" />
        ))}
      </div>
    );
  }
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);

  // Parents with subcategories get their own labelled row; childless ones share a final row.
  const parents = categories.filter((c) => c.parentId === null);
  const groups: { id: string; label: string | null; options: Category[] }[] = parents
    .map((parent) => ({
      id: parent.id,
      label: parent.name,
      options: categories.filter((c) => c.parentId === parent.id),
    }))
    .filter((group) => group.options.length > 0);
  const standalone = parents.filter((p) => !categories.some((c) => c.parentId === p.id));
  if (standalone.length > 0) groups.push({ id: 'standalone', label: null, options: standalone });

  return (
    <div role="group" aria-labelledby={labelledBy} className="space-y-3">
      {groups.map(({ id, label, options }) => {
        return (
          <div key={id} className="space-y-1.5">
            {label ? (
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {label}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const selected = value.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggle(option.id)}
                    className={cn(
                      'inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                      selected
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'hover:border-foreground/30',
                      invalid && !selected && 'border-destructive/50',
                    )}
                  >
                    {selected ? <Check className="size-4" aria-hidden="true" /> : null}
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
