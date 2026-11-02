import { describe, expect, it } from 'vitest';
import { checkOrigin } from './origin-check.js';

const allowed = ['https://app.garmentgate.com'];
const req = (
  method: string,
  headers: Record<string, string> = {},
  path = '/orders/ORD-1/transition',
) => ({
  method,
  path,
  headers,
});

describe('checkOrigin', () => {
  it('lets reads through from anywhere', () => {
    expect(checkOrigin(req('GET', { origin: 'https://evil.example' }), allowed)).toBe('allow');
  });

  it('allows state changes from our own origin', () => {
    expect(checkOrigin(req('POST', { origin: 'https://app.garmentgate.com' }), allowed)).toBe(
      'allow',
    );
  });

  it('refuses state changes from another origin, including look-alikes', () => {
    for (const origin of [
      'https://evil.example',
      'https://app.garmentgate.com.evil.example',
      'http://app.garmentgate.com',
      'null',
    ])
      expect(checkOrigin(req('POST', { origin }), allowed)).toBe('deny');
  });

  it('refuses requests the browser marks as cross-site even without an Origin', () => {
    expect(checkOrigin(req('DELETE', { 'sec-fetch-site': 'cross-site' }), allowed)).toBe('deny');
    expect(checkOrigin(req('PUT', { 'sec-fetch-site': 'same-origin' }), allowed)).toBe('allow');
  });

  it('allows non-browser clients and the signed Stripe webhook', () => {
    expect(checkOrigin(req('POST'), allowed)).toBe('allow');
    expect(
      checkOrigin(
        req('POST', { origin: 'https://stripe.com' }, '/payments/stripe/webhook'),
        allowed,
      ),
    ).toBe('allow');
  });
});
