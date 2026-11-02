import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { E2E_API_ENV } from './env';

/**
 * A freshly seeded database for every run (the journeys change orders, quotes and RFQs). Only
 * the e2e database is touched: its URL is set explicitly and wins over apps/api/.env.
 */
export default function globalSetup(): void {
  const api = fileURLToPath(new URL('../../api/', import.meta.url));
  if (!E2E_API_ENV.DATABASE_URL?.includes('_e2e'))
    throw new Error('Refusing to seed: the journeys database name must contain "_e2e"');
  const run = (command: string) =>
    execSync(command, { cwd: api, env: { ...process.env, ...E2E_API_ENV }, stdio: 'inherit' });
  run('node scripts/ensure-database.mjs');
  run('pnpm exec prisma migrate deploy');
  // The seed wipes app tables and loads the demo data (the logins in CLAUDE.md).
  run('pnpm exec prisma db seed');
}
