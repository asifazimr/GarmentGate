import { defineConfig, devices } from '@playwright/test';
import { E2E_API_ENV } from './e2e/env';

/**
 * The four main journeys in a real browser against the built web app and API.
 * Build first (`pnpm build`), stop `pnpm dev` (same ports), then `pnpm --filter web test:journeys`.
 * Locally, PW_CHANNEL=chrome uses the installed Chrome instead of Playwright's Chromium.
 */
export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...(process.env.PW_CHANNEL && { channel: process.env.PW_CHANNEL }),
  },
  // One phone-sized project (mobile first): the journeys change shared seed data, so they run
  // once, in order.
  projects: [{ name: 'mobile', use: { ...devices['Pixel 7'] } }],
  webServer: [
    {
      command: 'node dist/main.js',
      cwd: '../api',
      url: 'http://localhost:4000/health',
      env: E2E_API_ENV,
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: 'pnpm start',
      url: 'http://localhost:3000/login',
      env: { API_URL: 'http://localhost:4000' },
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
});
