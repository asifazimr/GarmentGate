import { describe, expect, it } from 'vitest';
import { EnvSchema } from './env.schema.js';

const validEnv = {
  CORS_ORIGINS: 'http://localhost:3000, https://app.garmentgate.com',
  DATABASE_URL: 'postgresql://u:p@localhost:5432/db',
  REDIS_URL: 'redis://localhost:6379',
  MEILISEARCH_HOST: 'http://localhost:7700',
  MEILISEARCH_API_KEY: 'a-very-long-master-key',
  S3_ENDPOINT: 'http://localhost:9000',
  S3_REGION: 'us-east-1',
  S3_BUCKET: 'garmentgate',
  S3_ACCESS_KEY_ID: 'garmentgate',
  S3_SECRET_ACCESS_KEY: 'garmentgate-secret',
};

describe('EnvSchema', () => {
  it('applies defaults and coerces types', () => {
    const env = EnvSchema.parse(validEnv);
    expect(env.PORT).toBe(4000);
    expect(env.NODE_ENV).toBe('development');
    expect(env.SWAGGER_ENABLED).toBe(true);
    expect(env.CORS_ORIGINS).toEqual(['http://localhost:3000', 'https://app.garmentgate.com']);
  });

  it('parses boolean strings', () => {
    expect(EnvSchema.parse({ ...validEnv, SWAGGER_ENABLED: 'false' }).SWAGGER_ENABLED).toBe(false);
  });

  it('rejects a missing required variable', () => {
    const { DATABASE_URL: _omit, ...rest } = validEnv;
    expect(EnvSchema.safeParse(rest).success).toBe(false);
  });

  it('rejects a malformed CORS origin', () => {
    expect(EnvSchema.safeParse({ ...validEnv, CORS_ORIGINS: 'not a url' }).success).toBe(false);
  });
});
