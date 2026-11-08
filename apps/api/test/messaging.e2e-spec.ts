import { createHmac } from 'node:crypto';
import {
  AdminMessagingSchema,
  DEFAULT_MESSAGING_SETTINGS,
  maskPhone,
  MyMessagingSchema,
  NotificationPreferencesSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  TEXT_PROVIDER,
  type TextMessage,
  type TextProvider,
} from '../src/modules/messaging/text-provider.js';
import { Notifier } from '../src/modules/notifications/notifier.service.js';
import {
  client,
  createAdmin,
  createTestApp,
  registerAgent,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

type Agent = ReturnType<typeof client>;
const TOKEN = 'test_twilio_token_1234567890';
const CALLBACK = 'https://api.garmentgate.test/messaging/twilio/status';

/** Twilio without the network: records what would be sent. */
const sent: TextMessage[] = [];
const fake: TextProvider = {
  live: false,
  supports: () => true,
  send: (m) => {
    sent.push(m);
    return Promise.resolve({
      providerRef: `SM${String(sent.length)}${String(Date.now())}`,
      ok: true,
    });
  },
};

async function until<T>(fn: () => Promise<T | null | undefined>, ms = 10_000): Promise<T> {
  const end = Date.now() + ms;
  for (;;) {
    const v = await fn();
    if (v) return v;
    if (Date.now() > end) throw new Error('Timed out waiting');
    await new Promise((r) => setTimeout(r, 100));
  }
}

describe('texts: SMS and WhatsApp (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let user: Agent;
  let userId = '';
  const phone = '+447700900123';
  const me = async () =>
    MyMessagingSchema.parse((await user.get('/me/messaging').expect(200)).body);
  const notify = (type: 'ORDER_UPDATE' | 'MILESTONE_UPDATE', title: string) =>
    ctx.app.get(Notifier).notify({
      to: { userIds: [userId] },
      type,
      title,
      body: 'ORD-2026-00018 moved on.',
      link: { orderCode: 'ORD-2026-00018' },
    });
  const texts = (type: string) =>
    ctx.prisma.outboundMessage.findMany({ where: { userId, type }, orderBy: { createdAt: 'asc' } });
  const settings = (patch: object) =>
    admin
      .put('/admin/messaging/settings')
      .send({ ...DEFAULT_MESSAGING_SETTINGS, ...patch })
      .expect(200);

  beforeAll(async () => {
    ctx = await createTestApp((b) => b.overrideProvider(TEXT_PROVIDER).useValue(fake));
    admin = client(ctx.app);
    await admin
      .post('/auth/login')
      .send({ email: await createAdmin(ctx.prisma), password: 'CorrectHorse42' })
      .expect(200);
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'messaging' } });
    const email = uniqueEmail('texter');
    user = (await registerAgent(ctx.app, 'BUYER', email)).agent;
    userId = (await ctx.prisma.user.findUniqueOrThrow({ where: { email } })).id;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('verifies a mobile number with a texted code, never logging the code', async () => {
    expect(await me()).toMatchObject({ phone: null, verified: false, channel: 'SMS' });
    await user.post('/me/messaging/phone').send({ phone: '07700 900123' }).expect(400);
    await user.post('/me/messaging/phone').send({ phone: '+44 7700 900123' }).expect(204);
    const text = sent.at(-1);
    expect(text).toMatchObject({ channel: 'SMS', to: phone });
    const code = /\b(\d{6})\b/.exec(text?.body ?? '')?.[1] ?? '';
    expect(code).toHaveLength(6);
    expect(await me()).toMatchObject({ pending: true, verified: false });

    const wrong = code === '000000' ? '111111' : '000000';
    await user.post('/me/messaging/phone/verify').send({ code: wrong }).expect(400);
    const verified = MyMessagingSchema.parse(
      (await user.post('/me/messaging/phone/verify').send({ code }).expect(200)).body,
    );
    expect(verified).toMatchObject({ verified: true, pending: false, phone: maskPhone(phone) });
    await user.post('/me/messaging/phone/verify').send({ code }).expect(409); // used up

    const log = await texts('VERIFY');
    expect(log).toHaveLength(1);
    expect(log[0]?.body).not.toContain(code);
  });

  it('texts allowed events to people who want them, and nothing else', async () => {
    const prefs = NotificationPreferencesSchema.parse(
      (await user.get('/notifications/preferences').expect(200)).body,
    );
    expect(prefs.preferences.find((p) => p.category === 'ORDERS')?.text).toBe(true);

    await notify('ORDER_UPDATE', 'Order shipped');
    const [first] = await until(async () => {
      const rows = await texts('ORDER_UPDATE');
      return rows.length > 0 ? rows : null;
    });
    expect(first).toMatchObject({ channel: 'SMS', to: phone, status: 'SENT' });
    expect(first?.body).toMatch(/^GarmentGate: Order shipped\. ORD-2026-00018 moved on\. http/);
    expect(first?.body).toContain('/orders/ORD-2026-00018');

    // MILESTONE_UPDATE isn't on the staff list: in the app only.
    await notify('MILESTONE_UPDATE', 'Cutting done');
    await new Promise((r) => setTimeout(r, 500));
    expect(await texts('MILESTONE_UPDATE')).toHaveLength(0);

    // Switched off by the person: no text.
    await user
      .put('/notifications/preferences')
      .send({ preferences: [{ category: 'ORDERS', inApp: true, email: true, text: false }] })
      .expect(200);
    await notify('ORDER_UPDATE', 'Order delivered');
    await new Promise((r) => setTimeout(r, 500));
    expect(await texts('ORDER_UPDATE')).toHaveLength(1);
    await user
      .put('/notifications/preferences')
      .send({ preferences: [{ category: 'ORDERS', inApp: true, email: true, text: true }] })
      .expect(200);
  });

  it('caps texts per day and sends WhatsApp only through an approved template', async () => {
    await settings({ dailyLimitPerUser: 1 });
    await notify('ORDER_UPDATE', 'Over the cap');
    const skipped = await until(async () =>
      (await texts('ORDER_UPDATE')).find((t) => t.status === 'SKIPPED'),
    );
    expect(skipped.error).toBe('Daily text limit reached');

    const template = `HX${'b'.repeat(32)}`;
    await user.put('/me/messaging/channel').send({ channel: 'WHATSAPP' }).expect(200);
    // WhatsApp on but no template for this event: falls back to SMS.
    await settings({ dailyLimitPerUser: 10, whatsappEnabled: true });
    await notify('ORDER_UPDATE', 'Fallback');
    await until(async () =>
      (await texts('ORDER_UPDATE')).find((t) => t.body.includes('Fallback') && t.channel === 'SMS'),
    );
    await settings({
      dailyLimitPerUser: 10,
      whatsappEnabled: true,
      whatsappTemplates: { ORDER_UPDATE: template },
    });
    await notify('ORDER_UPDATE', 'On WhatsApp');
    await until(async () => (await texts('ORDER_UPDATE')).find((t) => t.channel === 'WHATSAPP'));
    const wa = sent.find((m) => m.channel === 'WHATSAPP');
    expect(wa).toMatchObject({
      contentSid: template,
      contentVariables: { '1': 'On WhatsApp', '2': 'ORD-2026-00018 moved on.' },
    });
    await user.put('/me/messaging/channel').send({ channel: 'SMS' }).expect(200);
  });

  it('takes signed Twilio delivery receipts only', async () => {
    const row = (await texts('ORDER_UPDATE')).find((t) => t.status === 'SENT' && t.providerRef);
    const sid = row?.providerRef ?? '';
    const params = { MessageSid: sid, MessageStatus: 'delivered', AccountSid: 'AC1' };
    const sign = (p: Record<string, string>) =>
      createHmac('sha1', TOKEN)
        .update(
          CALLBACK +
            Object.keys(p)
              .sort()
              .map((k) => `${k}${p[k] ?? ''}`)
              .join(''),
        )
        .digest('base64');
    await client(ctx.app).post('/messaging/twilio/status').type('form').send(params).expect(403);
    await client(ctx.app)
      .post('/messaging/twilio/status')
      .set('x-twilio-signature', sign({ ...params, MessageStatus: 'failed' }))
      .type('form')
      .send(params)
      .expect(403);
    await client(ctx.app)
      .post('/messaging/twilio/status')
      .set('x-twilio-signature', sign(params))
      .type('form')
      .send(params)
      .expect(204);
    expect(
      (await ctx.prisma.outboundMessage.findUniqueOrThrow({ where: { id: row?.id ?? '' } })).status,
    ).toBe('DELIVERED');
    // A late "sent" never moves it back.
    const late = { ...params, MessageStatus: 'sent' };
    await client(ctx.app)
      .post('/messaging/twilio/status')
      .set('x-twilio-signature', sign(late))
      .type('form')
      .send(late)
      .expect(204);
    expect(
      (await ctx.prisma.outboundMessage.findUniqueOrThrow({ where: { id: row?.id ?? '' } })).status,
    ).toBe('DELIVERED');
  });

  it('gives staff the log, settings and a test send', async () => {
    const overview = AdminMessagingSchema.parse(
      (await admin.get('/admin/messaging').expect(200)).body,
    );
    expect(overview.live).toBe(false);
    expect(overview.messages.some((m) => m.type === 'VERIFY' && m.to === phone)).toBe(true);
    await admin.post('/admin/messaging/test').send({ phone, channel: 'SMS' }).expect(204);
    expect(sent.at(-1)?.body).toMatch(/test message/);
    await user.get('/admin/messaging').expect(403);
    await user.put('/admin/messaging/settings').send(DEFAULT_MESSAGING_SETTINGS).expect(403);

    await user.delete('/me/messaging/phone').expect(204);
    expect(await me()).toMatchObject({ phone: null, verified: false });
  });
});
