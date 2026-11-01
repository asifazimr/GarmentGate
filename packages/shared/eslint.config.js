import base from '@garmentgate/config/eslint/base';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  base,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
]);
