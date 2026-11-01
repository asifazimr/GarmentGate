import { describe, expect, it } from 'vitest';
import { REDACTED, filterContactDetails } from './contact-filter.js';

describe('filterContactDetails', () => {
  it.each([
    ['Email me at rahim.k@dhakaknit.com please', 'EMAIL'],
    ['rahim [at] dhakaknit [dot] com', 'OBFUSCATED_CONTACT'],
    ['rahim(at)gmail(dot)com', 'OBFUSCATED_CONTACT'],
    ['rahim at gmail dot com', 'OBFUSCATED_CONTACT'],
    ['see https://dhakaknit.com/catalog', 'URL'],
    ['see www.dhakaknit.com', 'URL'],
    ['our site dhakaknit.com.bd has more', 'URL'],
    ['call +880 1711-234567', 'PHONE'],
    ['call 01711234567', 'PHONE'],
    ['call (020) 7946 0958', 'PHONE'],
    ['WhatsApp me', 'SOCIAL_HANDLE'],
    ['wechat id: factory_bd88', 'SOCIAL_HANDLE'],
    ['find us on Instagram @dhaka.knit', 'SOCIAL_HANDLE'],
    ['zero one seven one one two three four five six seven', 'OBFUSCATED_CONTACT'],
  ])('redacts %j (%s)', (input, flag) => {
    const result = filterContactDetails(input);
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain(flag);
    expect(result.filtered).toContain(REDACTED);
  });

  it('removes the contact detail itself, not just flags it', () => {
    const result = filterContactDetails('For faster updates WhatsApp me at +880 1711-234567');
    expect(result.filtered).not.toMatch(/1711|234567|whatsapp/i);
    expect(result.reasons).toEqual(['PHONE', 'SOCIAL_HANDLE']);
  });

  it.each([
    '6000 pcs at 340 GSM brushed fleece, FOB Chattogram',
    'Target price EUR 11.50 per piece, delivery by 2026-03-15',
    'Reference RFQ-2026-00042 and ORD-2026-00017',
    'Monthly capacity 450,000 pieces with 1,200 machines',
    'Composition: 95% cotton, 5% elastane. Sizes XS-XXL.',
    'We work with brands at scale. Lead time 45-60 days.',
    'MOQ 1000 per colour, 3 colours, 6 sizes',
  ])('leaves normal sourcing text alone: %j', (input) => {
    const result = filterContactDetails(input);
    expect(result).toEqual({ filtered: input, flagged: false, reasons: [] });
  });
});
