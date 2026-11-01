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

  CORS_ORIGINS: commaSeparatedUrls,
  SWAGGER_ENABLED: booleanString.default(true),

  THROTTLE_TTL_MS: z.coerce.number().int().positive().default(60_000),
  THROTTLE_LIMIT: z.coerce.number().int().positive().default(100),

  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),

  MEILISEARCH_HOST: z.url(),
  MEILISEARCH_API_KEY: z.string().min(16),

  S3_ENDPOINT: z.url(),
  S3_REGION: z.string().min(1),
  S3_BUCKET: z.string().min(3),
  S3_ACCESS_KEY_ID: z.string().min(3),
  S3_SECRET_ACCESS_KEY: z.string().min(8),
  S3_FORCE_PATH_STYLE: booleanString.default(true),
});

export type Env = z.infer<typeof EnvSchema>;
