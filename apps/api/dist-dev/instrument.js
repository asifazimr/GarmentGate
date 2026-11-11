import * as Sentry from '@sentry/nestjs';
import { scrubEvent } from './common/monitoring/scrub.js';
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: Boolean(process.env.SENTRY_DSN),
    environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0),
    dataCollection: {
        userInfo: false,
        cookies: false,
        httpHeaders: false,
        httpBodies: [],
        urlQueryParams: false,
    },
    beforeSend: scrubEvent,
});
//# sourceMappingURL=instrument.js.map