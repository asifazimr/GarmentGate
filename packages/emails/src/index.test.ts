import { describe, expect, it } from 'vitest';
import { renderEmail } from './index.js';

describe('renderEmail', () => {
  it('renders the verification email with its link in HTML and plain text', async () => {
    const url = 'https://app.garmentgate.example/verify-email?token=abc123abc123abc123abc';
    const email = await renderEmail('verify-email', {
      firstName: 'Lena',
      verifyUrl: url,
      expiresInHours: 24,
    });
    expect(email.subject).toBe('Confirm your email for GarmentGate');
    expect(email.html).toContain(url.replaceAll('&', '&amp;'));
    expect(email.text).toContain('Hi Lena');
    expect(email.text).toContain(url);
  });

  it('uses a different subject for approved and rejected KYC', async () => {
    const base = { firstName: 'Emre', actionUrl: 'https://app.garmentgate.example/onboarding' };
    const approved = await renderEmail('kyc-decision', { ...base, approved: true });
    const rejected = await renderEmail('kyc-decision', {
      ...base,
      approved: false,
      reason: 'Upload all pages.',
    });
    expect(approved.subject).toContain('verified');
    expect(rejected.subject).toContain('Action needed');
    expect(rejected.text).toContain('Upload all pages.');
  });

  it('renders a notification with its link and a way to change settings', async () => {
    const email = await renderEmail('notification', {
      firstName: 'Jordan',
      title: 'ORD-2026-00017: shipment booked',
      body: 'Departs 2026-11-10.',
      actionUrl: 'https://app.garmentgate.example/buyer/orders/ORD-2026-00017',
      actionLabel: 'Open the order',
      preferencesUrl: 'https://app.garmentgate.example/buyer/settings',
    });
    expect(email.subject).toBe('ORD-2026-00017: shipment booked');
    expect(email.text).toContain('Departs 2026-11-10.');
    expect(email.text).toContain('/buyer/settings');
  });
});
