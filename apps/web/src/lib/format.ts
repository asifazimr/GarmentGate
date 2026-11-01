/** Human file size in the UI locale, e.g. "1.2 MB". */
export function formatBytes(bytes: number, locale: string): string {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const;
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: units[unit],
    unitDisplay: 'short',
    maximumFractionDigits: unit === 0 ? 0 : 1,
  }).format(value);
}

/** Money from integer minor units, using the currency's own exponent (JPY 0, USD 2…). */
export function formatMoney(
  amountMinor: number | bigint,
  currency: string,
  locale: string,
): string {
  const format = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  const major = Number(amountMinor) / 10 ** digits;
  return format.format(major);
}

/** Decimal places used by a currency (USD 2, JPY 0, …). */
export function currencyDigits(currency: string): number {
  return (
    new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
      .maximumFractionDigits ?? 2
  );
}

/** "3.60" → 360 for USD. Returns NaN for anything that isn't a plain positive amount. */
export function toMinor(value: string, currency: string): number {
  const digits = currencyDigits(currency);
  const clean = value.trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(clean)) return Number.NaN;
  const [whole = '0', fraction = ''] = clean.split('.');
  if (fraction.length > digits) return Number.NaN;
  return Number(whole) * 10 ** digits + Number(fraction.padEnd(digits, '0') || '0');
}

/** 360 → "3.60" for USD: the editable form of a minor-unit amount. */
export function fromMinor(minor: number, currency: string): string {
  const digits = currencyDigits(currency);
  return (minor / 10 ** digits).toFixed(digits);
}
