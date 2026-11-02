import type { Event } from '@sentry/nestjs';

const SECRET_HEADERS = /^(cookie|authorization|x-forwarded-for|x-real-ip|stripe-signature)$/i;

/**
 * Strips anything that could identify a buyer or factory, or let someone act as them, before an
 * event leaves the API: cookies, auth headers, client IPs, request bodies (messages, RFQs and
 * quotes can contain contact details; logins contain passwords) and query strings (tokens).
 * Only the user's opaque id is kept, to group errors per account.
 */
export function scrubEvent<T extends Event>(event: T): T {
  const request = event.request;
  if (request) {
    delete request.cookies;
    delete request.data;
    delete request.query_string;
    if (request.headers)
      request.headers = Object.fromEntries(
        Object.entries(request.headers).filter(([k]) => !SECRET_HEADERS.test(k)),
      );
    if (request.url) request.url = request.url.split('?')[0];
  }
  if (event.user) event.user = event.user.id ? { id: event.user.id } : {};
  return event;
}
