import type { Event, init } from '@sentry/nextjs';

/**
 * Before anything leaves for Sentry: no cookies, headers, bodies or query strings, and only the
 * user's opaque id. Pages and messages can show the other side's code but never identities;
 * this keeps reports at the same standard.
 */
export function scrubEvent<T extends Event>(event: T): T {
  if (event.request) {
    delete event.request.cookies;
    delete event.request.data;
    delete event.request.query_string;
    delete event.request.headers;
    if (event.request.url) event.request.url = event.request.url.split('?')[0];
  }
  if (event.user) event.user = event.user.id ? { id: event.user.id } : {};
  return event;
}

type DataCollection = NonNullable<NonNullable<Parameters<typeof init>[0]>['dataCollection']>;

/** Collect nothing personal: no user info, cookies, headers, bodies or query strings. */
export const SENTRY_DATA_COLLECTION: DataCollection = {
  userInfo: false,
  cookies: false,
  httpHeaders: false,
  httpBodies: [],
  urlQueryParams: false,
};
