import { describe, expect, it } from 'vitest';
import { scrubEvent } from './scrub.js';

describe('scrubEvent', () => {
  it('removes cookies, auth headers, IPs, bodies and query strings', () => {
    const event = scrubEvent({
      request: {
        url: 'https://api.garmentgate.com/auth/password/reset?token=secret',
        cookies: { gg_at: 'jwt' },
        data: { body: 'call me on +880 1711 000000' },
        query_string: 'token=secret',
        headers: {
          cookie: 'gg_at=jwt',
          authorization: 'Bearer jwt',
          'x-forwarded-for': '203.0.113.9',
          'user-agent': 'Mozilla/5.0',
        },
      },
      user: { id: 'u1', email: 'rafiq@factory.example', ip_address: '203.0.113.9' },
    });
    expect(event.request).toEqual({
      url: 'https://api.garmentgate.com/auth/password/reset',
      headers: { 'user-agent': 'Mozilla/5.0' },
    });
    expect(event.user).toEqual({ id: 'u1' });
  });

  it('leaves events without request or user alone', () => {
    expect(scrubEvent({ message: 'boom' })).toEqual({ message: 'boom' });
  });
});
