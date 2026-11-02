import { describe, expect, it } from 'vitest';
import { EnvSchema, ProductionEnvSchema } from './env.schema.js';

const validEnv = {
  CORS_ORIGINS: 'http://localhost:3000, https://app.garmentgate.com',
  WEB_APP_URL: 'http://localhost:3000',
  JWT_ACCESS_SECRET: 'x'.repeat(32),
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

  it('treats empty optional settings from a copied .env.example as unset', () => {
    const env = EnvSchema.parse({
      ...validEnv,
      CLAMAV_HOST: '',
      SENTRY_DSN: '',
      SENTRY_ENVIRONMENT: '',
    });
    expect(env.CLAMAV_HOST).toBeUndefined();
    expect(env.SENTRY_DSN).toBeUndefined();
    expect(EnvSchema.safeParse({ ...validEnv, SENTRY_DSN: 'not a url' }).success).toBe(false);
  });

  describe('in production', () => {
    const prod = {
      ...validEnv,
      NODE_ENV: 'production',
      CORS_ORIGINS: 'https://app.garmentgate.com',
      WEB_APP_URL: 'https://app.garmentgate.com',
      JWT_ACCESS_SECRET: 'k7Qv2mN9pX4rT8wZ1aB5cD3eF6gH0jL2',
      COOKIE_SECURE: 'true',
      RESEND_API_KEY: 're_123',
    };
    const issues = (env: object) => {
      const result = ProductionEnvSchema.safeParse(env);
      return result.success ? [] : result.error.issues.map((i) => i.path.join('.'));
    };

    it('accepts a complete production configuration', () => {
      expect(issues(prod)).toEqual([]);
    });

    it('requires secure cookies and a mail key', () => {
      expect(issues({ ...prod, COOKIE_SECURE: 'false', RESEND_API_KEY: undefined })).toEqual([
        'COOKIE_SECURE',
        'RESEND_API_KEY',
      ]);
    });

    it('refuses the placeholder secrets from .env.example', () => {
      expect(
        issues({
          ...prod,
          JWT_ACCESS_SECRET: 'change-me-to-a-long-random-string-at-least-32-chars',
          MEILISEARCH_API_KEY: 'garmentgate-dev-master-key-change-me',
          S3_SECRET_ACCESS_KEY: 'garmentgate-dev-secret',
        }),
      ).toEqual(['JWT_ACCESS_SECRET', 'MEILISEARCH_API_KEY', 'S3_SECRET_ACCESS_KEY']);
    });

    it('requires HTTPS origins and a webhook secret with card payments', () => {
      expect(
        issues({
          ...prod,
          CORS_ORIGINS: 'http://app.garmentgate.com',
          STRIPE_SECRET_KEY: 'sk_live',
        }),
      ).toEqual(['CORS_ORIGINS', 'STRIPE_WEBHOOK_SECRET']);
    });

    it('does not apply outside production', () => {
      expect(
        EnvSchema.safeParse({ ...validEnv, JWT_ACCESS_SECRET: 'change-me-'.repeat(4) }).success,
      ).toBe(true);
    });
  });
});
