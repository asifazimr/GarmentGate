import { defineConfig } from 'eslint/config';
import globals from 'globals';
import base from './base.js';

/** ESLint config for NestJS apps. */
export default defineConfig([
  base,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // Nest modules, DTOs and guards are classes by convention.
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      // Decorated constructor params need runtime imports for DI metadata.
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
]);
