import nextVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import base from './base.js';

/** ESLint config for Next.js apps (App Router). */
export default defineConfig([
  nextVitals,
  base,
  // shadcn/ui components are vendored from the registry; keep them diffable against upstream.
  globalIgnores(['next-env.d.ts', 'out/**', 'build/**', 'src/components/ui/**']),
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // `onClick={() => setOpen(true)}` is idiomatic React.
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      // Allow `onSubmit={form.handleSubmit(async …)}`; floating promises elsewhere are still errors.
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },
]);
