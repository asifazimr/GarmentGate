import { DEFAULT_LOCALE, isLocale, type Locale } from '@garmentgate/shared';
import { locale as rootLocale } from 'next/root-params';
import { getRequestConfig } from 'next-intl/server';
import en from '../../messages/en.json';

type Messages = typeof en;

/** Each locale's catalog is merged over English, so a missing key shows the English text. */
function merge<T>(base: T, override: unknown): T {
  if (typeof base !== 'object' || base === null || typeof override !== 'object' || !override)
    return (typeof override === typeof base ? override : base) as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override)) {
    out[key] = key in out ? merge(out[key], value) : value;
  }
  return out as T;
}

async function messagesFor(locale: Locale): Promise<Messages> {
  if (locale === DEFAULT_LOCALE) return en;
  const catalog = (await import(`../../messages/${locale}.json`)) as { default: unknown };
  return merge(en, catalog.default);
}

export default getRequestConfig(async () => {
  // The [locale] root segment, read as a root param so pages stay static per locale.
  const requested = await rootLocale();
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;
  return { locale, messages: await messagesFor(locale), timeZone: 'UTC' };
});
