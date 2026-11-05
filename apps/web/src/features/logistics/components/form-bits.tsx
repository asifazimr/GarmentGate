'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fromMinor, toMinor } from '@/lib/format';

export interface Option {
  value: string;
  label: string;
}

/** A labelled select over fixed options; `emptyLabel` adds a "none / any" choice (value ''). */
export function OptionSelect({
  id,
  value,
  onChange,
  options,
  emptyLabel,
  placeholder,
  invalid,
}: {
  id: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
  options: Option[];
  emptyLabel?: string;
  placeholder?: string;
  invalid?: boolean;
}) {
  const items = emptyLabel ? [{ value: '', label: emptyLabel }, ...options] : options;
  return (
    <Select
      items={items}
      value={value ?? (emptyLabel ? '' : null)}
      onValueChange={(v) => onChange(v ?? '')}
    >
      <SelectTrigger id={id} className="w-full" aria-invalid={invalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {items.map((o) => (
          <SelectItem key={o.value || 'none'} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** "12.5" (%) ⇄ 1250 bps. NaN for anything that isn't a plain number, so the schema refuses it. */
export const percentToBps = (v: string | number): number => {
  const n = Number(String(v).trim().replace(',', '.'));
  return String(v).trim() === '' || !Number.isFinite(n) ? Number.NaN : Math.round(n * 100);
};
export const bpsToPercent = (bps: number): string => String(bps / 100);

/** Human amount ⇄ minor units in `currency`; empty stays 0 where the field is optional. */
export const amountToMinor = (
  v: string,
  currency: string,
  emptyAs: number | null = null,
): number => (v.trim() === '' && emptyAs !== null ? emptyAs : toMinor(v, currency));
export const minorToAmount = (minor: number, currency: string): string =>
  fromMinor(minor, currency);
