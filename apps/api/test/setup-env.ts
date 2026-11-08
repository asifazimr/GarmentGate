// Deterministic env for e2e tests: no dependency on a local .env file.
// Needs the docker services (`pnpm db:up`); uses its own database, garmentgate_test.
export const TEST_DATABASE_URL =
  'postgresql://garmentgate:garmentgate@localhost:5432/garmentgate_test';

Object.assign(process.env, {
  NODE_ENV: 'test',
  LOG_LEVEL: 'silent',
  TRUST_PROXY: 'loopback',
  CORS_ORIGINS: 'http://localhost:3000',
  WEB_APP_URL: 'http://localhost:3000',
  SWAGGER_ENABLED: 'true',
  REQUIRE_EMAIL_VERIFICATION: 'true',
  THROTTLE_TTL_MS: '60000',
  THROTTLE_LIMIT: '1000',
  JWT_ACCESS_SECRET: 'test-access-secret-that-is-long-enough-0123456789',
  JWT_ACCESS_TTL_SECONDS: '900',
  REFRESH_TOKEN_TTL_DAYS: '30',
  COOKIE_SECURE: 'false',
  RESEND_API_KEY: '',
  DATABASE_URL: TEST_DATABASE_URL,
  REDIS_URL: 'redis://localhost:6379/1',
  MEILISEARCH_HOST: 'http://localhost:7700',
  MEILISEARCH_API_KEY: 'garmentgate-dev-master-key-change-me',
  MEILISEARCH_INDEX_PREFIX: 'test_',
  S3_ENDPOINT: 'http://localhost:9000',
  S3_REGION: 'us-east-1',
  S3_BUCKET: 'garmentgate',
  S3_ACCESS_KEY_ID: 'garmentgate',
  S3_SECRET_ACCESS_KEY: 'garmentgate-dev-secret',
  S3_FORCE_PATH_STYLE: 'true',
  STRIPE_SECRET_KEY: 'sk_test_offline',
  STRIPE_PUBLISHABLE_KEY: 'pk_test_offline',
  STRIPE_WEBHOOK_SECRET: 'whsec_test_offline',
  // Twilio receipts are signed with the auth token (no account SID: texts use a test provider).
  TWILIO_AUTH_TOKEN: 'test_twilio_token_1234567890',
  TWILIO_STATUS_CALLBACK_URL: 'https://api.garmentgate.test/messaging/twilio/status',
});
