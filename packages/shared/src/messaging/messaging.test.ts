import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MESSAGING_SETTINGS,
  maskPhone,
  MessagingSettingsSchema,
  PhoneNumberSchema,
  textBody,
} from './messaging.js';

describe('texts', () => {
  it('normalises phone numbers to E.164', () => {
    expect(PhoneNumberSchema.parse(' +880 1711-555 555 ')).toBe('+8801711555555');
    expect(PhoneNumberSchema.parse('+1 (415) 555-0100')).toBe('+14155550100');
    expect(PhoneNumberSchema.safeParse('01711555555').success).toBe(false);
    expect(PhoneNumberSchema.safeParse('+0123456789').success).toBe(false);
  });

  it('masks numbers for display', () => {
    expect(maskPhone('+8801711555555')).toBe('+880••••••••55');
  });

  it('keeps texts within two segments, link intact', () => {
    const url = 'https://app.garmentgate.com/buyer/orders/ORD-2026-00018';
    const short = textBody('Order shipped', 'ORD-2026-00018 left the hub.', url);
    expect(short).toBe(`GarmentGate: Order shipped. ORD-2026-00018 left the hub. ${url}`);
    const long = textBody('Payment received', 'x'.repeat(1000), url);
    expect(long.length).toBeLessThanOrEqual(300);
    expect(long.endsWith(` ${url}`)).toBe(true);
    expect(long).toContain('…');
  });

  it('ships valid defaults and refuses bad template ids', () => {
    expect(MessagingSettingsSchema.parse(DEFAULT_MESSAGING_SETTINGS)).toEqual(
      DEFAULT_MESSAGING_SETTINGS,
    );
    expect(
      MessagingSettingsSchema.safeParse({
        ...DEFAULT_MESSAGING_SETTINGS,
        whatsappTemplates: { ORDER_UPDATE: 'not-a-sid' },
      }).success,
    ).toBe(false);
    expect(
      MessagingSettingsSchema.parse({
        ...DEFAULT_MESSAGING_SETTINGS,
        whatsappTemplates: { ORDER_UPDATE: `HX${'a'.repeat(32)}` },
      }).whatsappTemplates.ORDER_UPDATE,
    ).toBe(`HX${'a'.repeat(32)}`);
  });
});
