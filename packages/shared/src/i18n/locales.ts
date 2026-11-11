import { z } from 'zod';

/**
 * Languages GarmentGate knows about. English is the source; the others are ready for
 * translation (a messages file each). `enabled` locales are offered to everyone; the rest
 * only appear in development, so layouts (including RTL) can be checked before launch.
 * `hidden` locales are offered nowhere, not even in development (their files and RTL support
 * stay, ready to bring back).
 */
export const LOCALES = [
  { code: 'en', name: 'English', dir: 'ltr', enabled: true, hidden: false },
  { code: 'bn', name: 'বাংলা', dir: 'ltr', enabled: false, hidden: false },
  { code: 'es', name: 'Español', dir: 'ltr', enabled: false, hidden: false },
  { code: 'fr', name: 'Français', dir: 'ltr', enabled: false, hidden: false },
  // Arabic is paused for now: translated and right-to-left ready, but not offered.
  { code: 'ar', name: 'العربية', dir: 'rtl', enabled: false, hidden: true },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];
export const LOCALE_CODES = LOCALES.map((l) => l.code) as [Locale, ...Locale[]];
export const LocaleSchema = z.enum(LOCALE_CODES);
export const DEFAULT_LOCALE: Locale = 'en';

/** Remembers the chosen language between visits (set by the API with the user's preference). */
export const LOCALE_COOKIE = 'gg_locale';

export const isLocale = (value: unknown): value is Locale => LocaleSchema.safeParse(value).success;

export const localeDir = (locale: Locale): 'ltr' | 'rtl' =>
  LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr';

/** Locales users can pick: the enabled ones, or all but hidden ones while developing. */
export const availableLocales = (includePreview: boolean): Locale[] =>
  LOCALES.filter((l) => !l.hidden && (l.enabled || includePreview)).map((l) => l.code);
