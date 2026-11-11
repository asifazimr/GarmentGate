# Messages

`en.json` is the source of every string in the web app; its shape types all
`useTranslations` keys.

To translate, fill `<locale>.json` (`bn`, `es`, `fr`, `ar`) with the same keys. Anything
missing falls back to English, so a catalog can grow gradually. Keep ICU placeholders
(`{count, plural, …}`, `{name}`) exactly as in English.

A locale is offered to users once it's marked `enabled` in
`packages/shared/src/i18n/locales.ts`; until then it only appears in development. Arabic
is right to left: the layout sets `dir="rtl"`, and styles use logical properties
(`ms-*`, `pe-*`, `start-*`, `text-start`) so they flip on their own.

Arabic (`ar.json`) is translated but **hidden** for now (`hidden: true` in `locales.ts`): it isn't offered anywhere, even in development. Set `hidden: false` to bring it back.
