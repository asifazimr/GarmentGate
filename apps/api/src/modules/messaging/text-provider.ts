import { createHmac, timingSafeEqual } from 'node:crypto';
import { Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { TextChannel } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';

export interface TextMessage {
  channel: TextChannel;
  /** E.164. */
  to: string;
  body: string;
  /** WhatsApp: an approved Twilio Content template and its variables ({{1}}, {{2}}, …). */
  contentSid?: string;
  contentVariables?: Record<string, string>;
}

export interface TextResult {
  providerRef: string | null;
  /** Accepted by the provider (queued/sent), or the reason it refused. */
  ok: boolean;
  error?: string;
}

export interface TextProvider {
  /** Real delivery (Twilio configured) vs the console. */
  readonly live: boolean;
  /** Whether this channel can be sent at all with the current configuration. */
  supports(channel: TextChannel): boolean;
  send(message: TextMessage): Promise<TextResult>;
}

export const TEXT_PROVIDER = Symbol('TEXT_PROVIDER');

/** Development and unconfigured environments: texts go to the API log. */
export class ConsoleTextProvider implements TextProvider {
  readonly live = false;
  private readonly logger = new Logger('Texts');

  supports(): boolean {
    return true;
  }

  send(message: TextMessage): Promise<TextResult> {
    this.logger.log(
      `[${message.channel} → ${message.to}] ${message.body}${message.contentSid ? ` (template ${message.contentSid})` : ''}`,
    );
    return Promise.resolve({ providerRef: null, ok: true });
  }
}

/** Twilio's Messages REST API (no SDK): SMS and WhatsApp, with delivery receipts. */
export class TwilioTextProvider implements TextProvider {
  readonly live = true;

  constructor(
    private readonly accountSid: string,
    private readonly authToken: string,
    private readonly from: {
      messagingServiceSid?: string;
      sms?: string;
      whatsapp?: string;
      statusCallback?: string;
    },
  ) {}

  supports(channel: TextChannel): boolean {
    return channel === 'SMS'
      ? !!(this.from.messagingServiceSid ?? this.from.sms)
      : !!this.from.whatsapp;
  }

  async send(m: TextMessage): Promise<TextResult> {
    const form = new URLSearchParams();
    if (m.channel === 'WHATSAPP') {
      if (!this.from.whatsapp) return { providerRef: null, ok: false, error: 'No WhatsApp sender' };
      form.set('To', `whatsapp:${m.to}`);
      form.set('From', `whatsapp:${this.from.whatsapp}`);
    } else {
      form.set('To', m.to);
      if (this.from.messagingServiceSid)
        form.set('MessagingServiceSid', this.from.messagingServiceSid);
      else if (this.from.sms) form.set('From', this.from.sms);
      else return { providerRef: null, ok: false, error: 'No SMS sender' };
    }
    if (m.contentSid) {
      form.set('ContentSid', m.contentSid);
      form.set('ContentVariables', JSON.stringify(m.contentVariables ?? {}));
    } else form.set('Body', m.body);
    if (this.from.statusCallback) form.set('StatusCallback', this.from.statusCallback);

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          authorization: `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64')}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: form,
        signal: AbortSignal.timeout(15_000),
      },
    );
    const json = (await res.json().catch(() => ({}))) as { sid?: string; message?: string };
    return res.ok
      ? { providerRef: json.sid ?? null, ok: true }
      : {
          providerRef: null,
          ok: false,
          error: json.message ?? `Twilio HTTP ${String(res.status)}`,
        };
  }
}

export function textProviderFactory(config: ConfigService<Env, true>): TextProvider {
  const sid = config.get('TWILIO_ACCOUNT_SID', { infer: true });
  const token = config.get('TWILIO_AUTH_TOKEN', { infer: true });
  if (!sid || !token) return new ConsoleTextProvider();
  return new TwilioTextProvider(sid, token, {
    messagingServiceSid: config.get('TWILIO_MESSAGING_SERVICE_SID', { infer: true }),
    sms: config.get('TWILIO_SMS_FROM', { infer: true }),
    whatsapp: config.get('TWILIO_WHATSAPP_FROM', { infer: true }),
    statusCallback: config.get('TWILIO_STATUS_CALLBACK_URL', { infer: true }),
  });
}

/**
 * Twilio's request signature: base64 HMAC-SHA1 of the full URL followed by every POST
 * parameter (sorted by name, name then value), keyed with the auth token.
 */
export function twilioSignatureValid(
  authToken: string,
  url: string,
  params: Record<string, string>,
  signature: string,
): boolean {
  const data =
    url +
    Object.keys(params)
      .sort()
      .map((k) => `${k}${params[k] ?? ''}`)
      .join('');
  const expected = createHmac('sha1', authToken).update(data).digest();
  const given = Buffer.from(signature, 'base64');
  return given.length === expected.length && timingSafeEqual(given, expected);
}
