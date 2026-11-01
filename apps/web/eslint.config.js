import next from '@garmentgate/config/eslint/next';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  next,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
]);
