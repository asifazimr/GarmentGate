import { execSync } from 'node:child_process';
import pg from 'pg';
import { TEST_DATABASE_URL } from './setup-env.js';

/** Creates garmentgate_test if needed, applies migrations, and resets data once per run. */
export default async function globalSetup(): Promise<void> {
  const serverUrl = new URL(TEST_DATABASE_URL);
  serverUrl.pathname = '/postgres';
  const admin = new pg.Client({ connectionString: serverUrl.toString() });
  await admin.connect();
  const exists = await admin.query("SELECT 1 FROM pg_database WHERE datname = 'garmentgate_test'");
  if (exists.rowCount === 0) await admin.query('CREATE DATABASE garmentgate_test');
  await admin.end();

  execSync('pnpm exec prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
    stdio: 'ignore',
  });

  const db = new pg.Client({ connectionString: TEST_DATABASE_URL });
  await db.connect();
  const { rows } = await db.query<{ tablename: string }>(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'",
  );
  await db.query(
    `TRUNCATE ${rows.map((r) => `"${r.tablename}"`).join(', ')} RESTART IDENTITY CASCADE`,
  );
  await db.query(`
    INSERT INTO categories (id, slug, name, "sortOrder") VALUES
      ('0198a000-0000-7000-8000-000000000001', 't-shirts', 'T-shirts', 0),
      ('0198a000-0000-7000-8000-000000000002', 'hoodies', 'Hoodies', 1)`);
  await db.end();
}
