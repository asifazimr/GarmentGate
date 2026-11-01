import nextVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import base from './base.js';

/** ESLint config for Next.js apps (App Router). */
export default defineConfig([
  nextVitals,
  base,
  globalIgnores(['next-env.d.ts', 'out/**', 'build/**']),
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
