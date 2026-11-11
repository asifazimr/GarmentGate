import { z } from 'zod';
const booleanString = z.enum(['true', 'false']).transform((value) => value === 'true');
const unsetIfEmpty = (schema) => z.preprocess((v) => (v === '' ? undefined : v), schema.optional());
const commaSeparatedUrls = z
    .string()
    .transform((value) => value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0))
    .pipe(z.array(z.url()).min(1));
export const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(4000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
    TRUST_PROXY: z.string().default('loopback'),
    CORS_ORIGINS: commaSeparatedUrls,
    WEB_APP_URL: z.url(),
    SWAGGER_ENABLED: booleanString.default(true),
    REQUIRE_EMAIL_VERIFICATION: booleanString.default(true),
    THROTTLE_TTL_MS: z.coerce.number().int().positive().default(60_000),
    THROTTLE_LIMIT: z.coerce.number().int().positive().default(100),
    JWT_ACCESS_SECRET: z.string().min(32, { error: 'Use at least 32 random characters' }),
    JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
    REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
    COOKIE_SECURE: booleanString.default(false),
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().min(3).default('GarmentGate <onboarding@resend.dev>'),
    PLATFORM_LEGAL_NAME: z.string().min(2).default('GarmentGate Trading Ltd.'),
    PLATFORM_ADDRESS: z.string().min(2).default('1 Sourcing Way, London EC2A 1AA, United Kingdom'),
    PLATFORM_EMAIL: z.email().default('orders@garmentgate.example'),
    PLATFORM_BANK_DETAILS: z
        .string()
        .min(5)
        .default('Bank: Example Bank plc|Account name: GarmentGate Trading Ltd.|IBAN: GB00 EXAM 0000 0000 0000 00|SWIFT/BIC: EXAMGB2L'),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    TWILIO_ACCOUNT_SID: unsetIfEmpty(z.string().regex(/^AC[0-9a-f]{32}$/i)),
    TWILIO_AUTH_TOKEN: unsetIfEmpty(z.string().min(16)),
    TWILIO_MESSAGING_SERVICE_SID: unsetIfEmpty(z.string().regex(/^MG[0-9a-f]{32}$/i)),
    TWILIO_SMS_FROM: unsetIfEmpty(z.string().regex(/^\+[1-9]\d{7,14}$/)),
    TWILIO_WHATSAPP_FROM: unsetIfEmpty(z.string().regex(/^\+[1-9]\d{7,14}$/)),
    TWILIO_STATUS_CALLBACK_URL: unsetIfEmpty(z.url()),
    DATABASE_URL: z.url(),
    REDIS_URL: z.url(),
    MEILISEARCH_HOST: z.url(),
    MEILISEARCH_API_KEY: z.string().min(16),
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
    CLAMAV_HOST: unsetIfEmpty(z.string().min(1)),
    CLAMAV_PORT: z.coerce.number().int().positive().default(3310),
    SENTRY_DSN: unsetIfEmpty(z.url()),
    SENTRY_ENVIRONMENT: unsetIfEmpty(z.string().min(1)),
    SENTRY_TRACES_SAMPLE_RATE: z.coerce.number().min(0).max(1).default(0),
});
const PLACEHOLDER = /change-me|dev-master-key|garmentgate-dev-secret|^x+$/i;
export const ProductionEnvSchema = EnvSchema.superRefine((env, ctx) => {
    if (env.NODE_ENV !== 'production')
        return;
    const fail = (path, message) => {
        ctx.addIssue({ code: 'custom', path: [path], message });
    };
    if (!env.COOKIE_SECURE)
        fail('COOKIE_SECURE', 'In production set COOKIE_SECURE=true');
    if (!env.RESEND_API_KEY)
        fail('RESEND_API_KEY', 'In production set RESEND_API_KEY');
    for (const [key, value] of [
        ['JWT_ACCESS_SECRET', env.JWT_ACCESS_SECRET],
        ['MEILISEARCH_API_KEY', env.MEILISEARCH_API_KEY],
        ['S3_SECRET_ACCESS_KEY', env.S3_SECRET_ACCESS_KEY],
    ])
        if (PLACEHOLDER.test(value))
            fail(key, `${key} is still a placeholder: generate a real secret`);
    if (env.CORS_ORIGINS.some((o) => !o.startsWith('https://')))
        fail('CORS_ORIGINS', 'In production every CORS origin must be https://');
    if (!env.WEB_APP_URL.startsWith('https://'))
        fail('WEB_APP_URL', 'In production WEB_APP_URL must be https://');
    if (env.TWILIO_ACCOUNT_SID && !env.TWILIO_AUTH_TOKEN)
        fail('TWILIO_AUTH_TOKEN', 'Texts need TWILIO_AUTH_TOKEN with TWILIO_ACCOUNT_SID');
    if (env.TWILIO_ACCOUNT_SID && !env.TWILIO_MESSAGING_SERVICE_SID && !env.TWILIO_SMS_FROM)
        fail('TWILIO_SMS_FROM', 'Texts need TWILIO_MESSAGING_SERVICE_SID or TWILIO_SMS_FROM');
    if (env.TWILIO_STATUS_CALLBACK_URL && !env.TWILIO_STATUS_CALLBACK_URL.startsWith('https://'))
        fail('TWILIO_STATUS_CALLBACK_URL', 'In production the Twilio callback must be https://');
    if (env.STRIPE_SECRET_KEY && !env.STRIPE_WEBHOOK_SECRET)
        fail('STRIPE_WEBHOOK_SECRET', 'Card payments need STRIPE_WEBHOOK_SECRET to verify webhooks');
});
//# sourceMappingURL=env.schema.js.map