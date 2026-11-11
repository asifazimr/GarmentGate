import { createHmac, timingSafeEqual } from 'node:crypto';
import { Logger } from '@nestjs/common';
export const TEXT_PROVIDER = Symbol('TEXT_PROVIDER');
export class ConsoleTextProvider {
    live = false;
    logger = new Logger('Texts');
    supports() {
        return true;
    }
    send(message) {
        this.logger.log(`[${message.channel} → ${message.to}] ${message.body}${message.contentSid ? ` (template ${message.contentSid})` : ''}`);
        return Promise.resolve({ providerRef: null, ok: true });
    }
}
export class TwilioTextProvider {
    accountSid;
    authToken;
    from;
    live = true;
    constructor(accountSid, authToken, from) {
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.from = from;
    }
    supports(channel) {
        return channel === 'SMS'
            ? !!(this.from.messagingServiceSid ?? this.from.sms)
            : !!this.from.whatsapp;
    }
    async send(m) {
        const form = new URLSearchParams();
        if (m.channel === 'WHATSAPP') {
            if (!this.from.whatsapp)
                return { providerRef: null, ok: false, error: 'No WhatsApp sender' };
            form.set('To', `whatsapp:${m.to}`);
            form.set('From', `whatsapp:${this.from.whatsapp}`);
        }
        else {
            form.set('To', m.to);
            if (this.from.messagingServiceSid)
                form.set('MessagingServiceSid', this.from.messagingServiceSid);
            else if (this.from.sms)
                form.set('From', this.from.sms);
            else
                return { providerRef: null, ok: false, error: 'No SMS sender' };
        }
        if (m.contentSid) {
            form.set('ContentSid', m.contentSid);
            form.set('ContentVariables', JSON.stringify(m.contentVariables ?? {}));
        }
        else
            form.set('Body', m.body);
        if (this.from.statusCallback)
            form.set('StatusCallback', this.from.statusCallback);
        const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
                authorization: `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64')}`,
                'content-type': 'application/x-www-form-urlencoded',
            },
            body: form,
            signal: AbortSignal.timeout(15_000),
        });
        const json = (await res.json().catch(() => ({})));
        return res.ok
            ? { providerRef: json.sid ?? null, ok: true }
            : {
                providerRef: null,
                ok: false,
                error: json.message ?? `Twilio HTTP ${String(res.status)}`,
            };
    }
}
export function textProviderFactory(config) {
    const sid = config.get('TWILIO_ACCOUNT_SID', { infer: true });
    const token = config.get('TWILIO_AUTH_TOKEN', { infer: true });
    if (!sid || !token)
        return new ConsoleTextProvider();
    return new TwilioTextProvider(sid, token, {
        messagingServiceSid: config.get('TWILIO_MESSAGING_SERVICE_SID', { infer: true }),
        sms: config.get('TWILIO_SMS_FROM', { infer: true }),
        whatsapp: config.get('TWILIO_WHATSAPP_FROM', { infer: true }),
        statusCallback: config.get('TWILIO_STATUS_CALLBACK_URL', { infer: true }),
    });
}
export function twilioSignatureValid(authToken, url, params, signature) {
    const data = url +
        Object.keys(params)
            .sort()
            .map((k) => `${k}${params[k] ?? ''}`)
            .join('');
    const expected = createHmac('sha1', authToken).update(data).digest();
    const given = Buffer.from(signature, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
}
//# sourceMappingURL=text-provider.js.map