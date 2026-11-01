import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// Prisma 7 no longer loads .env on its own.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed/index.ts',
  },
  // `prisma generate` needs no database; migrate/seed/studio do.
  ...(databaseUrl && { datasource: { url: databaseUrl } }),
});
