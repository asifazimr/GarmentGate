import type en from '../../messages/en.json';

// Type-checks message keys in useTranslations / getTranslations.
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
  }
}
