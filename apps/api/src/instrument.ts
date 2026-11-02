import * as Sentry from '@sentry/nestjs';
import { scrubEvent } from './common/monitoring/scrub.js';

/**
 * Error monitoring. Imported first in main.ts, before Nest and its config load, so it reads
 * process.env directly (the one exception to the ConfigService rule); the same variables are
 * validated by env.schema.ts at boot. Without SENTRY_DSN it does nothing.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
  release: process.env.SENTRY_RELEASE,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0),
  // Identities and contact details must never leave the platform: collect no user info,
  // cookies, headers, bodies or query strings (scrubEvent removes anything that slips through).
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: false,
    httpBodies: [],
    urlQueryParams: false,
  },
  beforeSend: scrubEvent,
});
