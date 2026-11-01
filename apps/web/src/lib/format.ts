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
