import { z } from 'zod';
import { NotificationTypeSchema } from '../notifications/notification.schema.js';

/**
 * Texts (SMS and WhatsApp, through Twilio): the same notifications people get in the app, for
 * the events that matter on the move. People verify their mobile number with a code, pick SMS
 * or WhatsApp, and choose per category; staff choose which events may text at all, a daily cap
 * per person, and the WhatsApp templates (WhatsApp only allows approved templates for messages
 * GarmentGate starts). Texts carry the in-app wording, which never names the other side.
 */

export const TextChannelSchema = z.enum(['SMS', 'WHATSAPP']);
export type TextChannel = z.infer<typeof TextChannelSchema>;

/** E.164: +, country code, number; no spaces. */
export const E164 = /^\+[1-9]\d{7,14}$/;

/** Accepts "+880 1711-555 555" and stores "+8801711555555". */
export const PhoneNumberSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s().-]/g, ''))
  .pipe(
    z.string().regex(E164, {
      error: 'Enter your mobile number with the country code, e.g. +8801711555555',
    }),
  );

export const StartPhoneVerificationSchema = z.object({ phone: PhoneNumberSchema });
export type StartPhoneVerificationDto = z.output<typeof StartPhoneVerificationSchema>;

export const ConfirmPhoneSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, { error: 'Enter the 6-digit code' }),
});
export type ConfirmPhoneDto = z.infer<typeof ConfirmPhoneSchema>;

export const SetTextChannelSchema = z.object({ channel: TextChannelSchema });
export type SetTextChannelDto = z.infer<typeof SetTextChannelSchema>;

/** Phone codes: how long they last and how many tries. */
export const PHONE_CODE_TTL_MS = 10 * 60_000;
export const PHONE_CODE_MAX_ATTEMPTS = 5;

/** "+8801711555555" → "+880 ••• ••55 55"-style masking for display. */
export function maskPhone(e164: string): string {
  if (e164.length <= 6) return e164;
  return `${e164.slice(0, 4)}${'•'.repeat(e164.length - 6)}${e164.slice(-2)}`;
}

export const MessagingSettingsSchema = z.object({
  smsEnabled: z.boolean(),
  whatsappEnabled: z.boolean(),
  /** The notification types that may be texted (the rest stay in the app and email). */
  types: z.array(NotificationTypeSchema).max(NotificationTypeSchema.options.length),
  /** Texts per person per day (UTC), to cap cost and noise. */
  dailyLimitPerUser: z.number().int().min(0).max(100),
  /** Approved Twilio Content templates (HX…) per type; WhatsApp sends only where one is set. */
  whatsappTemplates: z.partialRecord(
    NotificationTypeSchema,
    z
      .string()
      .trim()
      .regex(/^HX[0-9a-f]{32}$/i, { error: 'A Twilio Content SID (HX…)' }),
  ),
});
export type MessagingSettings = z.infer<typeof MessagingSettingsSchema>;

export const DEFAULT_MESSAGING_SETTINGS: MessagingSettings = {
  smsEnabled: true,
  whatsappEnabled: false,
  types: [
    'RFQ_INVITATION',
    'QUOTE_OFFERED',
    'ORDER_UPDATE',
    'QC_RESULT',
    'PAYMENT_UPDATE',
    'DISPUTE_UPDATE',
  ],
  dailyLimitPerUser: 10,
  whatsappTemplates: {},
};

/** The SMS text: brand, title, body and the link, kept to two SMS segments. */
export function textBody(title: string, body: string, url: string): string {
  const max = 300;
  const tail = ` ${url}`;
  const head = `GarmentGate: ${title}. ${body}`.replace(/\s+/g, ' ').trim();
  const room = max - tail.length;
  const clipped = head.length > room ? `${head.slice(0, Math.max(0, room - 1)).trimEnd()}…` : head;
  return `${clipped}${tail}`;
}

/** The signed-in person's texting setup. */
export const MyMessagingSchema = z.strictObject({
  phone: z.string().nullable(),
  verified: z.boolean(),
  /** A code was sent and is waiting to be entered. */
  pending: z.boolean(),
  channel: TextChannelSchema,
  smsAvailable: z.boolean(),
  whatsappAvailable: z.boolean(),
});
export type MyMessaging = z.infer<typeof MyMessagingSchema>;

export const OutboundMessageStatusSchema = z.enum([
  'QUEUED',
  'SENT',
  'DELIVERED',
  'FAILED',
  'SKIPPED',
]);
export type OutboundMessageStatus = z.infer<typeof OutboundMessageStatusSchema>;

export const AdminOutboundMessageSchema = z.object({
  id: z.uuid(),
  channel: TextChannelSchema,
  to: z.string(),
  user: z.object({ name: z.string(), email: z.string(), role: z.string() }).nullable(),
  type: z.string(),
  body: z.string(),
  status: OutboundMessageStatusSchema,
  error: z.string().nullable(),
  providerRef: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type AdminOutboundMessage = z.infer<typeof AdminOutboundMessageSchema>;

export const AdminMessagingSchema = z.object({
  /** Twilio credentials are set (otherwise texts are written to the API log). */
  live: z.boolean(),
  settings: MessagingSettingsSchema,
  messages: z.array(AdminOutboundMessageSchema),
});
export type AdminMessaging = z.infer<typeof AdminMessagingSchema>;

export const TestTextSchema = z.object({ phone: PhoneNumberSchema, channel: TextChannelSchema });
export type TestTextDto = z.output<typeof TestTextSchema>;
