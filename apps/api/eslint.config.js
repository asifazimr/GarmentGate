import nest from '@garmentgate/config/eslint/nest';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  nest,
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
]);
