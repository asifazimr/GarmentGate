// Deterministic env for e2e tests: no dependency on a local .env file.
Object.assign(process.env, {
  NODE_ENV: 'test',
  LOG_LEVEL: 'silent',
  CORS_ORIGINS: 'http://localhost:3000',
  SWAGGER_ENABLED: 'true',
  THROTTLE_TTL_MS: '60000',
  THROTTLE_LIMIT: '5',
  DATABASE_URL: 'postgresql://garmentgate:garmentgate@localhost:5432/garmentgate',
  REDIS_URL: 'redis://localhost:6379',
  MEILISEARCH_HOST: 'http://localhost:7700',
  MEILISEARCH_API_KEY: 'test-master-key-0123456789',
  S3_ENDPOINT: 'http://localhost:9000',
  S3_REGION: 'us-east-1',
  S3_BUCKET: 'garmentgate',
  S3_ACCESS_KEY_ID: 'garmentgate',
  S3_SECRET_ACCESS_KEY: 'garmentgate-secret',
  S3_FORCE_PATH_STYLE: 'true',
});
