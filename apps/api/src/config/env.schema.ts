import { z } from 'zod';

const booleanString = z.enum(['true', 'false']).transform((value) => value === 'true');

const commaSeparatedUrls = z
  .string()
  .transform((value) =>
    value
      .split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0),
  )
  .pipe(z.array(z.url()).min(1));

/**
 * Every environment variable the API reads. Validated once at boot by ConfigModule;
 * the app refuses to start if anything is missing or malformed.
 */
export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

  /** Express "trust proxy" setting; the web app proxies /api/* to us from localhost. */
  TRUST_PROXY: z.string().default('loopback'),
  CORS_ORIGINS: commaSeparatedUrls,
  /** Public URL of the web app, used in email links. */
  WEB_APP_URL: z.url(),
  SWAGGER_ENABLED: booleanString.default(true),

  THROTTLE_TTL_MS: z.coerce.number().int().positive().default(60_000),
  THROTTLE_LIMIT: z.coerce.number().int().positive().default(100),

  JWT_ACCESS_SECRET: z.string().min(32, { error: 'Use at least 32 random characters' }),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
  /** Mark auth cookies Secure. Must be true anywhere served over HTTPS. */
  COOKIE_SECURE: booleanString.default(false),

  /** Without a key, emails are logged instead of sent (development only). */
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().min(3).default('GarmentGate <onboarding@resend.dev>'),

  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),

  MEILISEARCH_HOST: z.url(),
  MEILISEARCH_API_KEY: z.string().min(16),
  /** Prepended to index names, so e2e tests don't touch the dev indexes. */
  MEILISEARCH_INDEX_PREFIX: z
    .string()
    .regex(/^[a-z0-9_]*$/)
    .default(''),

  S3_ENDPOINT: z.url(),
  S3_REGION: z.string().min(1),
  S3_BUCKET: z.string().min(3),
  S3_ACCESS_KEY_ID: z.string().min(3),
  S3_SECRET_ACCESS_KEY: z.string().min(8),
  S3_FORCE_PATH_STYLE: booleanString.default(true),
});

export type Env = z.infer<typeof EnvSchema>;

/** Production must send real email and use secure cookies. */
export const ProductionEnvSchema = EnvSchema.refine(
  (env) => env.NODE_ENV !== 'production' || (env.COOKIE_SECURE && env.RESEND_API_KEY),
  { error: 'In production set COOKIE_SECURE=true and RESEND_API_KEY' },
);
