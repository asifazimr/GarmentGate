import { describe, expect, it } from 'vitest';
import { LeadInputSchema } from './public-site.js';

describe('lead form', () => {
  const base = {
    kind: 'SALES',
    name: 'Ana Ruiz',
    email: ' Ana@Example.COM ',
    message: 'We need 20,000 polo shirts for spring.',
  };

  it('normalises and accepts a minimal enquiry', () => {
    const lead = LeadInputSchema.parse({ ...base, company: '', country: '', phone: '' });
    expect(lead).toMatchObject({
      email: 'ana@example.com',
      company: undefined,
      country: undefined,
    });
  });

  it('refuses short messages and odd source paths', () => {
    expect(LeadInputSchema.safeParse({ ...base, message: 'hi' }).success).toBe(false);
    expect(LeadInputSchema.safeParse({ ...base, source: 'https://evil.example' }).success).toBe(
      false,
    );
    expect(LeadInputSchema.parse({ ...base, source: '/pricing' }).source).toBe('/pricing');
  });
});
