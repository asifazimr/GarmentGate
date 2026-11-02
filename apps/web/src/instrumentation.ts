import * as Sentry from '@sentry/nextjs';
import { SENTRY_DATA_COLLECTION, scrubEvent } from '@/lib/sentry-scrub';

/** Server and edge error monitoring (no-op without SENTRY_DSN). */
export function register(): void {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enabled: Boolean(process.env.SENTRY_DSN),
      environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0),
      dataCollection: SENTRY_DATA_COLLECTION,
      beforeSend: scrubEvent,
    });
  }
}

/** Errors thrown while rendering server components, route handlers and the proxy. */
export const onRequestError = Sentry.captureRequestError;
