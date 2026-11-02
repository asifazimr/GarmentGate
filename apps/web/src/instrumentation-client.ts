import * as Sentry from '@sentry/nextjs';
import { SENTRY_DATA_COLLECTION, scrubEvent } from '@/lib/sentry-scrub';

/**
 * Browser error monitoring (no-op without NEXT_PUBLIC_SENTRY_DSN). No Session Replay: recordings
 * would capture identities, prices and messages.
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
  tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0),
  dataCollection: SENTRY_DATA_COLLECTION,
  beforeSend: scrubEvent,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
