import { availableLocales, DEFAULT_LOCALE, LOCALE_COOKIE } from '@garmentgate/shared';
import { defineRouting } from 'next-intl/routing';

/**
 * Locales live in a cookie, not the URL: links stay `/buyer/orders`, and the proxy rewrites each
 * request to `/<locale>/…` so every locale still prerenders on its own. Unfinished translations
 * are only routable in development (for checking layouts, including right-to-left).
 */
export const routing = defineRouting({
  locales: availableLocales(process.env.NODE_ENV !== 'production'),
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'never',
  localeCookie: { name: LOCALE_COOKIE, maxAge: 365 * 86_400 },
});
