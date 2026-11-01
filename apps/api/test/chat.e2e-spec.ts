import type { AddressInfo } from 'node:net';
import { hash } from '@node-rs/argon2';
import {
  AccountWarningSchema,
  ChatEvents,
  type ChatMessage,
  ChatMessageSchema,
  ConversationDetailSchema,
  ConversationSummarySchema,
  FlaggedMessageSchema,
  type MessageEvent,
  REDACTED,
  type ReadEvent,
  type TypingEvent,
  UnreadSchema,
} from '@garmentgate/shared';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { io, type Socket } from 'socket.io-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  client,
  cookiesFrom,
  createAdmin,
  createTestApp,
  PASSWORD,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
const BUYER = { legalName: 'Corvalis Apparel AG', first: 'Margit', last: 'Ellsworth' };
const FACTORY = { legalName: 'Pemberline Knitwear Ltd.', first: 'Tobias', last: 'Quennell' };

type Agent = ReturnType<typeof client>;
interface Session {
  agent: Agent;
  cookie: string;
}

async function login(ctx: TestContext, email: string): Promise<Session> {
  const agent = client(ctx.app);
  const res = await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  const cookies = cookiesFrom(res);
  return {
    agent,
    cookie: Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join('; '),
  };
}

async function company(ctx: TestContext, kind: 'BUYER' | 'MANUFACTURER', n: string) {
  const email = uniqueEmail(`chat${kind.toLowerCase()}`);
  const who = kind === 'BUYER' ? BUYER : FACTORY;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: kind,
      firstName: who.first,
      lastName: who.last,
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: kind,
          legalName: who.legalName,
          country: kind === 'BUYER' ? 'CH' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(kind === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-CH-5${run}${n}` } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: `MFR-BD-5${run}${n}`,
                    isListed: true,
                    moqPcs: 100,
                    monthlyCapacityPcs: 100_000,
                    categories: { connect: [{ id: TSHIRTS }] },
                  },
                },
              }),
        },
      },
    },
  });
  return {
    ...(await login(ctx, email)),
    userId: user.id,
    code: kind === 'BUYER' ? `BYR-CH-5${run}${n}` : `MFR-BD-5${run}${n}`,
  };
}

/** Collects socket events so tests can wait for (or rule out) them. */
class Listener {
  readonly events: { name: string; payload: unknown }[] = [];
  constructor(readonly socket: Socket) {
    socket.onAny((name: string, payload: unknown) => this.events.push({ name, payload }));
  }
  async next<T>(
    name: string,
    match: (p: T) => boolean = () => true,
    timeoutMs = 5_000,
  ): Promise<T> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const hit = this.events.find((e) => e.name === name && match(e.payload as T));
      if (hit) return hit.payload as T;
      await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error(`No ${name} event`);
  }
  has(name: string, match: (p: unknown) => boolean = () => true): boolean {
    return this.events.some((e) => e.name === name && match(e.payload));
  }
}

async function connect(url: string, cookie?: string): Promise<Socket> {
  const socket = io(url, {
    path: '/socket.io',
    transports: ['websocket'],
    extraHeaders: cookie ? { cookie } : {},
    reconnection: false,
  });
  await new Promise<void>((resolve, reject) => {
    socket.once('connect', () => {
      resolve();
    });
    socket.once('connect_error', (e) => {
      reject(e);
    });
  });
  return socket;
}

async function waitFor<T>(fn: () => Promise<T | null>, timeoutMs = 20_000): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = await fn();
    if (value !== null) return value;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Timed out waiting for condition');
}

const leaks = (body: unknown, who: { legalName: string; first: string; last: string }) =>
  [who.legalName, who.first, who.last].filter((s) => JSON.stringify(body).includes(s));

describe('relayed real-time chat (e2e)', () => {
  let ctx: TestContext;
  let url = '';
  let admin: Session & { userId: string };
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let stranger: Awaited<ReturnType<typeof company>>;
  let rfqCode = '';
  let buyerThread = '';
  let factoryThread = '';
  const sockets: Socket[] = [];
  let adminWs: Listener;
  let buyerWs: Listener;
  let factoryWs: Listener;
  let strangerWs: Listener;

  beforeAll(async () => {
    ctx = await createTestApp();
    await ctx.app.listen(0);
    const server = ctx.app.getHttpServer() as unknown as { address(): AddressInfo };
    url = `http://127.0.0.1:${String(server.address().port)}`;
    const adminEmail = await createAdmin(ctx.prisma);
    const adminUser = await ctx.prisma.user.findUniqueOrThrow({ where: { email: adminEmail } });
    admin = { ...(await login(ctx, adminEmail)), userId: adminUser.id };
    buyer = await company(ctx, 'BUYER', '1');
    factory = await company(ctx, 'MANUFACTURER', '2');
    stranger = await company(ctx, 'BUYER', '3');

    const res = await buyer.agent
      .post('/rfqs')
      .send({
        categoryId: TSHIRTS,
        title: `Chat test tee ${run}`,
        description: 'Combed cotton tee, 180 GSM, four colours, sizes S to XXL.',
        quantity: 3000,
        currency: 'EUR',
        deadline: new Date(Date.now() + 10 * DAY).toISOString(),
        destinationCountry: 'CH',
        incoterm: 'FOB',
      })
      .expect(201);
    rfqCode = (res.body as { code: string }).code;

    const connectAs = async (s: Session) => {
      const socket = await connect(url, s.cookie);
      sockets.push(socket);
      return new Listener(socket);
    };
    adminWs = await connectAs(admin);
    buyerWs = await connectAs(buyer);
    factoryWs = await connectAs(factory);
    strangerWs = await connectAs(stranger);
  }, 60_000);

  afterAll(async () => {
    for (const s of sockets) s.disconnect();
    await ctx.app.close();
  });

  it('keeps one thread per side, never shared between buyer and factory', async () => {
    const open = async (s: Session, body: object, status = 201) =>
      (await s.agent.post('/conversations').send(body).expect(status)).body as unknown;

    const b = ConversationSummarySchema.parse(await open(buyer, { rfqCode }));
    expect(b.type).toBe('BUYER_PLATFORM');
    expect(ConversationSummarySchema.parse(await open(buyer, { rfqCode })).id).toBe(b.id);
    const f = ConversationSummarySchema.parse(await open(factory, { rfqCode }));
    expect(f.type).toBe('MANUFACTURER_PLATFORM');
    expect(f.id).not.toBe(b.id);
    buyerThread = b.id;
    factoryThread = f.id;

    expect(ConversationSummarySchema.parse(await open(admin, { rfqCode })).id).toBe(buyerThread);
    expect(
      ConversationSummarySchema.parse(await open(admin, { rfqCode, factoryCode: factory.code })).id,
    ).toBe(factoryThread);

    await factory.agent.get(`/conversations/${buyerThread}`).expect(404);
    await buyer.agent.get(`/conversations/${factoryThread}`).expect(404);
    await stranger.agent.get(`/conversations/${buyerThread}`).expect(404);
    await open(stranger, { rfqCode }, 404);
    await open(factory, { rfqCode, factoryCode: 'MFR-BD-0001' }, 201); // ignored: factories only get their own thread

    // The database refuses a factory member in the buyer's thread, whatever the code does.
    await expect(
      ctx.prisma.conversationParticipant.create({
        data: { conversationId: buyerThread, userId: factory.userId },
      }),
    ).rejects.toThrow();
  });

  it('delivers filtered messages in real time, only to that company and staff', async () => {
    await factoryWs.socket.emitWithAck('conversation:join', { conversationId: factoryThread });
    const sent = ChatMessageSchema.parse(
      (
        await factory.agent
          .post(`/conversations/${factoryThread}/messages`)
          .send({ body: 'Ready in 40 days. WhatsApp +880 1711 234567 or tobias at gmail dot com' })
          .expect(201)
      ).body,
    );
    expect(sent.body).toBe(`Ready in 40 days. ${REDACTED} or ${REDACTED}`);
    expect(sent.flagged).toBe(true);
    expect(sent.original).toBeNull(); // the sender doesn't get the original back
    expect(sent.sender.isMe).toBe(true);

    const toStaff = await adminWs.next<MessageEvent>(
      ChatEvents.message,
      (e) => e.message.id === sent.id,
    );
    expect(toStaff.message.original).toContain('1711 234567');
    expect(toStaff.message.reasons).toEqual(
      expect.arrayContaining(['PHONE', 'SOCIAL_HANDLE', 'OBFUSCATED_CONTACT']),
    );
    expect(toStaff.message.sender.label).toBe(`${FACTORY.first} ${FACTORY.last} · ${factory.code}`);
    const toFactory = await factoryWs.next<MessageEvent>(
      ChatEvents.message,
      (e) => e.message.id === sent.id,
    );
    expect(toFactory.message.original).toBeNull();
    expect(toFactory.message.body).not.toContain('1711');

    await new Promise((r) => setTimeout(r, 300));
    const leaked = (l: Listener) =>
      l.has(ChatEvents.message, (e) => (e as MessageEvent).message.id === sent.id);
    expect(leaked(buyerWs)).toBe(false);
    expect(leaked(strangerWs)).toBe(false);
  });

  it('shows typing indicators worded for each side', async () => {
    await adminWs.socket.emitWithAck('conversation:join', { conversationId: factoryThread });
    factoryWs.socket.emit('typing', { conversationId: factoryThread, typing: true });
    const seenByStaff = await adminWs.next<TypingEvent>(
      ChatEvents.typing,
      (e) => e.userId === factory.userId,
    );
    expect(seenByStaff.label).toBe(`${FACTORY.first} · ${factory.code}`);

    adminWs.socket.emit('typing', { conversationId: factoryThread, typing: true });
    const seenByFactory = await factoryWs.next<TypingEvent>(
      ChatEvents.typing,
      (e) => e.userId === admin.userId,
    );
    expect(seenByFactory.label).toBe('GarmentGate');

    // A socket that hasn't joined (or can't access) a thread can't type into it.
    const ack = (await buyerWs.socket.emitWithAck('conversation:join', {
      conversationId: factoryThread,
    })) as { ok: boolean };
    expect(ack.ok).toBe(false);
  });

  it('tracks unread counts and read receipts', async () => {
    const unread = async (s: Session) =>
      UnreadSchema.parse((await s.agent.get('/conversations/unread').expect(200)).body).total;
    expect(await unread(buyer)).toBe(0);
    expect(await unread(admin)).toBeGreaterThanOrEqual(1);

    await admin.agent
      .post(`/conversations/${buyerThread}/messages`)
      .send({ body: 'We have one offer so far.' })
      .expect(201);
    await buyerWs.next(ChatEvents.message);
    expect(await unread(buyer)).toBe(1);
    const notes = await ctx.prisma.notification.findMany({
      where: {
        userId: (
          await ctx.prisma.user.findFirstOrThrow({
            where: {
              firstName: BUYER.first,
              company: { buyerProfile: { publicCode: buyer.code } },
            },
          })
        ).id,
      },
    });
    expect(notes.some((n) => n.type === 'MESSAGE_RECEIVED')).toBe(true);

    await buyer.agent.post(`/conversations/${buyerThread}/read`).expect(204);
    expect(await unread(buyer)).toBe(0);
    const receipt = await adminWs.next<ReadEvent>(
      ChatEvents.read,
      (e) => e.conversationId === buyerThread && e.side === 'COMPANY',
    );
    const detail = ConversationDetailSchema.parse(
      (await admin.agent.get(`/conversations/${buyerThread}`).expect(200)).body,
    );
    expect(detail.otherSideReadAt).toBe(receipt.readAt);
    expect(detail.relayTargets.map((t) => t.label)).toContain(`Factory ${factory.code}`);
  });

  it('lets staff relay a message under the factory code only', async () => {
    const thread = ConversationDetailSchema.parse(
      (await admin.agent.get(`/conversations/${factoryThread}`).expect(200)).body,
    );
    const source = thread.messages.find((m) => m.sender.side === 'COMPANY');
    await buyer.agent
      .post(`/admin/messages/${source?.id ?? ''}/relay`)
      .send({ toConversationId: buyerThread })
      .expect(403);
    await admin.agent
      .post(`/admin/messages/${source?.id ?? ''}/relay`)
      .send({ toConversationId: factoryThread })
      .expect(404);
    await admin.agent
      .post(`/admin/messages/${source?.id ?? ''}/relay`)
      .send({ toConversationId: buyerThread })
      .expect(201);

    const relayed = await buyerWs.next<MessageEvent>(
      ChatEvents.message,
      (e) => e.message.relayedFrom !== null,
    );
    expect(relayed.message.relayedFrom).toBe(factory.code);
    expect(relayed.message.sender.label).toBe('GarmentGate');
    expect(relayed.message.body).not.toMatch(/1711|gmail|whatsapp/i);
    const buyerView = (await buyer.agent.get(`/conversations/${buyerThread}`).expect(200))
      .body as unknown;
    expect(leaks(buyerView, FACTORY)).toEqual([]);
    const factoryView = (await factory.agent.get(`/conversations/${factoryThread}`).expect(200))
      .body as unknown;
    expect(leaks(factoryView, BUYER)).toEqual([]);
  });

  it('checks attachment names and PDF text, and warns repeat offenders', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc
      .addPage()
      .drawText('Questions? Call +880 1711 765432 any time.', { x: 50, y: 700, size: 12, font });
    const bytes = Buffer.from(await doc.save());
    const presign = await factory.agent
      .post(`/conversations/${factoryThread}/uploads`)
      .send({
        fileName: 'quote_tobias_01711765432.pdf',
        contentType: 'application/pdf',
        sizeBytes: bytes.length,
      })
      .expect(201);
    const {
      fileId,
      url: uploadUrl,
      fields,
    } = presign.body as { fileId: string; url: string; fields: Record<string, string> };
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    form.append('file', new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
    expect((await fetch(uploadUrl, { method: 'POST', body: form })).status).toBeLessThan(300);

    const sent = ChatMessageSchema.parse(
      (
        await factory.agent
          .post(`/conversations/${factoryThread}/messages`)
          .send({ attachments: [fileId] })
          .expect(201)
      ).body,
    );
    expect(sent.attachments[0]?.name).toBe(`quote_tobias_${REDACTED}.pdf`);
    expect(sent.attachments[0]?.flagged).toBe(true);

    // The PDF's text is read in the background (no OCR) and the message flagged.
    const updated = await factoryWs.next<MessageEvent>(
      ChatEvents.messageUpdated,
      (e) => e.message.id === sent.id,
      20_000,
    );
    expect(updated.message.flagged).toBe(true);
    const attachment = await ctx.prisma.messageAttachment.findFirstOrThrow({ where: { fileId } });
    expect(attachment.scannedAt).not.toBeNull();
    expect(attachment.flagReasons).toContain('PHONE');

    const ready = await waitFor(async () => {
      const d = ConversationDetailSchema.parse(
        (await factory.agent.get(`/conversations/${factoryThread}`).expect(200)).body,
      );
      const a = d.messages.find((m) => m.id === sent.id)?.attachments[0];
      return a?.url ? a : null;
    });
    const sanitized = await PDFDocument.load(
      new Uint8Array(await (await fetch(ready.url ?? '')).arrayBuffer()),
      { updateMetadata: false },
    );
    expect(sanitized.getProducer()).toBeUndefined();

    // Three hits (message, file name, PDF text) in 30 days: an automatic warning.
    const warnings = AccountWarningSchema.array().parse(
      (await factory.agent.get('/chat/warnings').expect(200)).body,
    );
    expect(warnings[0]).toMatchObject({ level: 'WARNING', violations: 3 });
    await factory.agent.post(`/chat/warnings/${warnings[0]?.id ?? ''}/acknowledge`).expect(204);
    expect((await factory.agent.get('/chat/warnings').expect(200)).body).toEqual([]);
    expect(
      await ctx.prisma.notification.count({
        where: { userId: admin.userId, title: 'Warning issued' },
      }),
    ).toBe(1);
  });

  it('puts flagged messages in the review queue, where staff can release or confirm', async () => {
    await factory.agent.get('/admin/moderation/messages').expect(403);
    const queue = FlaggedMessageSchema.array().parse(
      (await admin.agent.get('/admin/moderation/messages').expect(200)).body,
    );
    const mine = queue.filter((q) => q.company.code === factory.code);
    expect(mine).toHaveLength(2);
    expect(mine[0]?.senderViolations).toBe(3);
    expect(mine.flatMap((m) => m.attachments.map((a) => a.name))).toContain(
      'quote_tobias_01711765432.pdf',
    );

    const text = mine.find((m) => m.attachments.length === 0);
    const file = mine.find((m) => m.attachments.length > 0);
    await admin.agent
      .post(`/admin/moderation/messages/${text?.id ?? ''}`)
      .send({ action: 'release' })
      .expect(204);
    const released = await factoryWs.next<MessageEvent>(
      ChatEvents.messageUpdated,
      (e) => e.message.id === text?.id,
    );
    expect(released.message.body).toContain('+880 1711 234567');
    await admin.agent
      .post(`/admin/moderation/messages/${file?.id ?? ''}`)
      .send({ action: 'confirm' })
      .expect(204);
    const after = FlaggedMessageSchema.array().parse(
      (await admin.agent.get('/admin/moderation/messages').expect(200)).body,
    );
    expect(after.filter((q) => q.company.code === factory.code)).toEqual([]);
  });

  it('refuses sockets without a valid session', async () => {
    await expect(connect(url)).rejects.toThrow(/unauthorized/);
    await expect(connect(url, 'gg_at=not-a-token')).rejects.toThrow(/unauthorized/);
  });
});

export type { ChatMessage };
