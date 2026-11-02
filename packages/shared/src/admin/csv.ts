export type CsvValue = string | number | boolean | null | undefined;

/** Cells that a spreadsheet would run as a formula: prefixed so they stay plain text. */
const FORMULA = /^[=+\-@\t\r]/;

function cell(value: CsvValue): string {
  if (value === null || value === undefined) return '';
  let text = String(value);
  // Negative numbers are data, not formulas.
  if (typeof value !== 'number' && FORMULA.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

/**
 * RFC 4180 CSV with a header row and CRLF line ends. Text that starts like a formula
 * (=, +, -, @) is prefixed with an apostrophe so exported user content can't run in a
 * spreadsheet (CSV injection).
 */
export function toCsv(headers: readonly string[], rows: readonly (readonly CsvValue[])[]): string {
  return [headers, ...rows].map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}
