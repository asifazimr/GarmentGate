import { z } from 'zod';
export declare const EnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        test: "test";
        production: "production";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        error: "error";
        fatal: "fatal";
        warn: "warn";
        info: "info";
        debug: "debug";
        trace: "trace";
        silent: "silent";
    }>>;
    TRUST_PROXY: z.ZodDefault<z.ZodString>;
    CORS_ORIGINS: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>, z.ZodArray<z.ZodURL>>;
    WEB_APP_URL: z.ZodURL;
    SWAGGER_ENABLED: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    REQUIRE_EMAIL_VERIFICATION: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    THROTTLE_TTL_MS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    THROTTLE_LIMIT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    JWT_ACCESS_SECRET: z.ZodString;
    JWT_ACCESS_TTL_SECONDS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    REFRESH_TOKEN_TTL_DAYS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    COOKIE_SECURE: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    RESEND_API_KEY: z.ZodOptional<z.ZodString>;
    EMAIL_FROM: z.ZodDefault<z.ZodString>;
    PLATFORM_LEGAL_NAME: z.ZodDefault<z.ZodString>;
    PLATFORM_ADDRESS: z.ZodDefault<z.ZodString>;
    PLATFORM_EMAIL: z.ZodDefault<z.ZodEmail>;
    PLATFORM_BANK_DETAILS: z.ZodDefault<z.ZodString>;
    STRIPE_SECRET_KEY: z.ZodOptional<z.ZodString>;
    STRIPE_PUBLISHABLE_KEY: z.ZodOptional<z.ZodString>;
    STRIPE_WEBHOOK_SECRET: z.ZodOptional<z.ZodString>;
    TWILIO_ACCOUNT_SID: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_AUTH_TOKEN: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_MESSAGING_SERVICE_SID: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_SMS_FROM: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_WHATSAPP_FROM: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_STATUS_CALLBACK_URL: z.ZodPreprocess<z.ZodOptional<z.ZodURL>, unknown>;
    DATABASE_URL: z.ZodURL;
    REDIS_URL: z.ZodURL;
    MEILISEARCH_HOST: z.ZodURL;
    MEILISEARCH_API_KEY: z.ZodString;
    MEILISEARCH_INDEX_PREFIX: z.ZodDefault<z.ZodString>;
    S3_ENDPOINT: z.ZodURL;
    S3_REGION: z.ZodString;
    S3_BUCKET: z.ZodString;
    S3_ACCESS_KEY_ID: z.ZodString;
    S3_SECRET_ACCESS_KEY: z.ZodString;
    S3_FORCE_PATH_STYLE: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    CLAMAV_HOST: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    CLAMAV_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    SENTRY_DSN: z.ZodPreprocess<z.ZodOptional<z.ZodURL>, unknown>;
    SENTRY_ENVIRONMENT: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    SENTRY_TRACES_SAMPLE_RATE: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type Env = z.infer<typeof EnvSchema>;
export declare const ProductionEnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        test: "test";
        production: "production";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        error: "error";
        fatal: "fatal";
        warn: "warn";
        info: "info";
        debug: "debug";
        trace: "trace";
        silent: "silent";
    }>>;
    TRUST_PROXY: z.ZodDefault<z.ZodString>;
    CORS_ORIGINS: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>, z.ZodArray<z.ZodURL>>;
    WEB_APP_URL: z.ZodURL;
    SWAGGER_ENABLED: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    REQUIRE_EMAIL_VERIFICATION: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    THROTTLE_TTL_MS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    THROTTLE_LIMIT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    JWT_ACCESS_SECRET: z.ZodString;
    JWT_ACCESS_TTL_SECONDS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    REFRESH_TOKEN_TTL_DAYS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    COOKIE_SECURE: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    RESEND_API_KEY: z.ZodOptional<z.ZodString>;
    EMAIL_FROM: z.ZodDefault<z.ZodString>;
    PLATFORM_LEGAL_NAME: z.ZodDefault<z.ZodString>;
    PLATFORM_ADDRESS: z.ZodDefault<z.ZodString>;
    PLATFORM_EMAIL: z.ZodDefault<z.ZodEmail>;
    PLATFORM_BANK_DETAILS: z.ZodDefault<z.ZodString>;
    STRIPE_SECRET_KEY: z.ZodOptional<z.ZodString>;
    STRIPE_PUBLISHABLE_KEY: z.ZodOptional<z.ZodString>;
    STRIPE_WEBHOOK_SECRET: z.ZodOptional<z.ZodString>;
    TWILIO_ACCOUNT_SID: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_AUTH_TOKEN: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_MESSAGING_SERVICE_SID: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_SMS_FROM: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_WHATSAPP_FROM: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    TWILIO_STATUS_CALLBACK_URL: z.ZodPreprocess<z.ZodOptional<z.ZodURL>, unknown>;
    DATABASE_URL: z.ZodURL;
    REDIS_URL: z.ZodURL;
    MEILISEARCH_HOST: z.ZodURL;
    MEILISEARCH_API_KEY: z.ZodString;
    MEILISEARCH_INDEX_PREFIX: z.ZodDefault<z.ZodString>;
    S3_ENDPOINT: z.ZodURL;
    S3_REGION: z.ZodString;
    S3_BUCKET: z.ZodString;
    S3_ACCESS_KEY_ID: z.ZodString;
    S3_SECRET_ACCESS_KEY: z.ZodString;
    S3_FORCE_PATH_STYLE: z.ZodDefault<z.ZodPipe<z.ZodEnum<{
        true: "true";
        false: "false";
    }>, z.ZodTransform<boolean, "true" | "false">>>;
    CLAMAV_HOST: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    CLAMAV_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    SENTRY_DSN: z.ZodPreprocess<z.ZodOptional<z.ZodURL>, unknown>;
    SENTRY_ENVIRONMENT: z.ZodPreprocess<z.ZodOptional<z.ZodString>, unknown>;
    SENTRY_TRACES_SAMPLE_RATE: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
