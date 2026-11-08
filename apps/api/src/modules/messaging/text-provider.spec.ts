import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { twilioSignatureValid } from './text-provider.js';

describe('Twilio signatures', () => {
  const token = 'test_auth_token_1234567890';
  const url = 'https://api.garmentgate.example/messaging/twilio/status';
  const params = { MessageSid: 'SM123', MessageStatus: 'delivered', AccountSid: 'AC1' };
  const sign = (p: Record<string, string>) =>
    createHmac('sha1', token)
      .update(url + 'AccountSidAC1MessageSidSM123MessageStatus' + (p.MessageStatus ?? ''))
      .digest('base64');

  it('accepts a correctly signed callback and refuses a tampered one', () => {
    const signature = sign(params);
    expect(twilioSignatureValid(token, url, params, signature)).toBe(true);
    expect(
      twilioSignatureValid(token, url, { ...params, MessageStatus: 'failed' }, signature),
    ).toBe(false);
    expect(twilioSignatureValid('another_token_000000000', url, params, signature)).toBe(false);
    expect(twilioSignatureValid(token, url, params, 'short')).toBe(false);
  });
});
