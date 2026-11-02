import { describe, expect, it } from 'vitest';
import { availableLocales, isLocale, localeDir } from './locales.js';

describe('locales', () => {
  it('knows which locales read right to left', () => {
    expect(localeDir('ar')).toBe('rtl');
    expect(localeDir('en')).toBe('ltr');
    expect(localeDir('bn')).toBe('ltr');
  });

  it('only offers enabled locales outside development', () => {
    expect(availableLocales(false)).toEqual(['en']);
    expect(availableLocales(true)).toEqual(['en', 'bn', 'es', 'fr', 'ar']);
  });

  it('rejects unknown locale codes', () => {
    expect(isLocale('ar')).toBe(true);
    expect(isLocale('xx')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
