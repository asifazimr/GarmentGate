/**
 * The API the journeys run against: its own database, Redis DB and search indexes, so they
 * never touch development data. Docker services must be up (`pnpm db:up`).
 */
export const E2E_API_ENV: Record<string, string> = {
  NODE_ENV: 'test',
  PORT: '4000',
  LOG_LEVEL: 'warn',
  TRUST_PROXY: 'loopback',
  CORS_ORIGINS: 'http://localhost:3000',
  WEB_APP_URL: 'http://localhost:3000',
  SWAGGER_ENABLED: 'false',
  // The journeys sign in a handful of times from one machine.
  THROTTLE_LIMIT: '1000',
  JWT_ACCESS_SECRET: 'e2e-access-secret-that-is-long-enough-0123456789',
  COOKIE_SECURE: 'false',
  RESEND_API_KEY: '',
  DATABASE_URL:
    process.env.E2E_DATABASE_URL ??
    'postgresql://garmentgate:garmentgate@localhost:5432/garmentgate_e2e',
  REDIS_URL: process.env.E2E_REDIS_URL ?? 'redis://localhost:6379/2',
  MEILISEARCH_HOST: process.env.E2E_MEILISEARCH_HOST ?? 'http://localhost:7700',
  MEILISEARCH_API_KEY:
    process.env.E2E_MEILISEARCH_API_KEY ?? 'garmentgate-dev-master-key-change-me',
  MEILISEARCH_INDEX_PREFIX: 'e2e_',
  S3_ENDPOINT: process.env.E2E_S3_ENDPOINT ?? 'http://localhost:9000',
  S3_REGION: 'us-east-1',
  S3_BUCKET: 'garmentgate',
  S3_ACCESS_KEY_ID: 'garmentgate',
  S3_SECRET_ACCESS_KEY: 'garmentgate-dev-secret',
  S3_FORCE_PATH_STYLE: 'true',
};

/** Demo logins from the seed (CLAUDE.md). */
export const PASSWORD = 'Password123!';
export const USERS = {
  buyerWithOffers: 'lena@gruenfeld-basics.example',
  buyer: 'jordan@northboundsupply.example',
  factory: 'rafiq.hossain@meghnaknit.example',
};
