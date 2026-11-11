'use server';

import { availableLocales, isLocale, LOCALE_COOKIE } from '@garmentgate/shared';
import { cookies } from 'next/headers';

/** Remembers a visitor's language (the proxy reads it to pick the locale). */
export async function chooseLocale(locale: string): Promise<void> {
  if (
    !isLocale(locale) ||
    !availableLocales(process.env.NODE_ENV !== 'production').includes(locale)
  )
    return;
  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 365 * 86_400,
    sameSite: 'lax',
  });
}
