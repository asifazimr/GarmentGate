import type { AddressInfo } from 'node:net';
import { hash } from '@node-rs/argon2';
import {
  ActivityPageSchema,
  BuyerDisputeSchema,
  ConversationSummarySchema,
  ManufacturerDisputeSchema,
  MediaReviewItemSchema,
  NOTIFICATION_EVENT,
  NotificationPreferencesSchema,
  NotificationSchema,
  OrderFinanceSchema,
  OrderReviewsSchema,
  PaymentStartSchema,
  PublicManufacturerSchema,
  PublicReviewSchema,
} from '@garmentgate/shared';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
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
const BUYER = { legalName: 'Larkmoor Goods Ltd', first: 'Wren', last: 'Ashdown' };
const FACTORY = { legalName: 'Corvane Knitwear Ltd', first: 'Tarek', last: 'Bellamy' };
type Agent = ReturnType<typeof client>;

async function login(ctx: TestContext, email: string) {
  const agent = client(ctx.app);
  const res = await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  const cookie = Object.entries(cookiesFrom(res))
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
  return { agent, cookie };
}

async function party(ctx: TestContext, kind: 'BUYER' | 'MANUFACTURER') {
  const email = uniqueEmail(`trust${kind.toLowerCase()}`);
  const who = kind === 'BUYER' ? BUYER : FACTORY;
  const code = kind === 'BUYER' ? `BYR-GB-6${run}` : `MFR-BD-6${run}`;
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
          country: kind === 'BUYER' ? 'GB' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(kind === 'BUYER'
            ? { buyerProfile: { create: { publicCode: code } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: code,
                    isListed: true,
                    categories: { connect: [{ id: TSHIRTS }] },
                  },
                },
              }),
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  return {
    ...(await login(ctx, email)),
    email,
    code,
    userId: user.id,
    companyId: user.company?.id ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

async function upload(
  agent: Agent,
  path: string,
  bytes: Buffer,
  contentType: string,
  name: string,
) {
  const presign = (
    await agent
      .post(path)
      .send({ fileName: name, contentType, sizeBytes: bytes.length })
      .expect(201)
  ).body as { fileId: string; url: string; fields: Record<string, string> };
  const form = new FormData();
  for (const [k, v] of Object.entries(presign.fields)) form.append(k, v);
  form.append('file', new Blob([new Uint8Array(bytes)], { type: contentType }));
  expect((await fetch(presign.url, { method: 'POST', body: form })).status).toBeLessThan(300);
  return presign.fileId;
}

async function waitFor<T>(fn: () => Promise<T | null>, timeoutMs = 20_000): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const v = await fn();
    if (v !== null) return v;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Timed out');
}

describe('trust: notifications, disputes and reviews (e2e)', () => {
  let ctx: TestContext;
  let url = '';
  let admin: Agent;
  let adminEmail = '';
  let buyer: Awaited<ReturnType<typeof party>>;
  let factory: Awaited<ReturnType<typeof party>>;
  let socket: Socket;
  const pushed: unknown[] = [];
  let code = '';
  let counter = 0;

  const newOrder = async (data: object = {}) => {
    counter += 1;
    const c = `ORD-2096-${run}${String(counter)}`;
    await ctx.prisma.order.create({
      data: {
        code: c,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Trust test tee',
        quantity: 1000,
        buyerUnitPriceMinor: 455,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: 455_000n,
        manufacturerTotalMinor: 380_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'GB',
        requestedShipDate: new Date(Date.now() + 60 * DAY),
        status: 'DRAFT',
        ...data,
      },
    });
    return c;
  };
  const move = (agent: Agent, to: string, c = code) =>
    agent.post(`/orders/${c}/transition`).send({ to });
  const buyerDispute = async () =>
    BuyerDisputeSchema.parse(
      ((await buyer.agent.get(`/orders/${code}/dispute`).expect(200)).body as { dispute: unknown })
        .dispute,
    );
  const factoryDispute = async () => {
    const body = (await factory.agent.get(`/orders/${code}/dispute`).expect(200)).body as {
      dispute: unknown;
    };
    return { raw: body.dispute, view: ManufacturerDisputeSchema.parse(body.dispute) };
  };
  const pay = async (purpose: 'DEPOSIT' | 'BALANCE') => {
    const start = PaymentStartSchema.parse(
      (
        await buyer.agent
          .post(`/orders/${code}/payments`)
          .send({ purpose, method: 'BANK_TRANSFER' })
          .expect(201)
      ).body,
    );
    const pdf = Buffer.from(await (await PDFDocument.create()).save());
    const proof = await upload(
      admin,
      `/admin/finance/payments/${start.paymentId}/uploads`,
      pdf,
      'application/pdf',
      'statement.pdf',
    );
    await admin
      .post(`/admin/finance/payments/${start.paymentId}/confirm`)
      .send({ proofFileId: proof, bankReference: `TRUST-${run}-${purpose}` })
      .expect(204);
  };

  beforeAll(async () => {
    ctx = await createTestApp();
    await ctx.app.listen(0);
    const server = ctx.app.getHttpServer() as unknown as { address(): AddressInfo };
    url = `http://127.0.0.1:${String(server.address().port)}`;
    adminEmail = await createAdmin(ctx.prisma);
    admin = (await login(ctx, adminEmail)).agent;
    buyer = await party(ctx, 'BUYER');
    factory = await party(ctx, 'MANUFACTURER');
    socket = io(url, {
      path: '/socket.io',
      transports: ['websocket'],
      extraHeaders: { cookie: buyer.cookie },
      reconnection: false,
    });
    socket.on(NOTIFICATION_EVENT, (n: unknown) => pushed.push(n));
    await new Promise<void>((resolve, reject) => {
      socket.once('connect', () => {
        resolve();
      });
      socket.once('connect_error', reject);
    });
    code = await newOrder();
  }, 60_000);

  afterAll(async () => {
    socket.disconnect();
    await ctx.app.close();
  });

  it('keeps per-category preferences: in-app, email, and account notices always in the app', async () => {
    const defaults = NotificationPreferencesSchema.parse(
      (await buyer.agent.get('/notifications/preferences').expect(200)).body,
    );
    expect(defaults.preferences).toHaveLength(8);
    expect(defaults.preferences.find((p) => p.category === 'REVIEWS')).toEqual({
      category: 'REVIEWS',
      inApp: true,
      email: false,
    });
    const saved = NotificationPreferencesSchema.parse(
      (
        await buyer.agent
          .put('/notifications/preferences')
          .send({
            preferences: [
              { category: 'ORDERS', inApp: true, email: false },
              { category: 'ACCOUNT', inApp: false, email: false },
            ],
          })
          .expect(200)
      ).body,
    );
    expect(saved.preferences.find((p) => p.category === 'ORDERS')).toMatchObject({ email: false });
    expect(saved.preferences.find((p) => p.category === 'ACCOUNT')).toMatchObject({
      inApp: true,
      email: false,
    });
    await buyer.agent
      .put('/notifications/preferences')
      .send({ preferences: [{ category: 'NOPE', inApp: true, email: true }] })
      .expect(400);
  });

  it('notifies in the app, pushes to open tabs, and emails per preference', async () => {
    const sentBefore = ctx.mail.sent.length;
    await move(buyer.agent, 'DEPOSIT_PENDING').expect(204);
    // The buyer: in the bell and pushed live, but no email (ORDERS email is off).
    const live = await waitFor(async () =>
      Promise.resolve(
        pushed
          .map((p) => NotificationSchema.parse(p))
          .find((n) => n.link.orderCode === code && n.category === 'ORDERS') ?? null,
      ),
    );
    expect(live.title).toContain(code);
    const sent = ctx.mail.sent.slice(sentBefore).filter((m) => m.template === 'notification');
    expect(sent.some((m) => m.to === buyer.email)).toBe(false);
    // The factory has the defaults: email with a link to its own order page.
    const factoryMail = sent.find((m) => m.to === factory.email);
    expect(factoryMail?.props).toMatchObject({
      actionUrl: expect.stringContaining(`/manufacturer/orders/${code}`) as unknown,
      preferencesUrl: expect.stringContaining('/manufacturer/settings') as unknown,
    });
    expect(JSON.stringify(factoryMail)).not.toContain(BUYER.legalName);
  });

  it('opens a dispute with a reason and evidence; the order goes to DISPUTED', async () => {
    await pay('DEPOSIT'); // → IN_PRODUCTION, 136,500 in escrow
    await factory.agent
      .post(`/orders/${code}/dispute`)
      .send({ reason: 'QUALITY', description: 'Shade is off compared to the lab dip we approved.' })
      .expect(403);
    await buyer.agent
      .post(`/orders/${code}/dispute`)
      .send({ reason: 'QUALITY', description: 'Too short' })
      .expect(400);
    const jpeg = await sharp({ create: { width: 64, height: 48, channels: 3, background: '#a33' } })
      .jpeg()
      .toBuffer();
    const photo = await upload(
      buyer.agent,
      `/orders/${code}/dispute/uploads`,
      jpeg,
      'image/jpeg',
      'shade.jpg',
    );
    const res = await buyer.agent
      .post(`/orders/${code}/dispute`)
      .send({
        reason: 'QUALITY',
        description: `Shade is off vs the lab dip ${BUYER.legalName} approved. Call ${BUYER.first} on +44 7700 900123.`,
        evidence: [photo],
      })
      .expect(201);
    const id = (res.body as { id: string }).id;
    await buyer.agent
      .post(`/orders/${code}/dispute`)
      .send({
        reason: 'OTHER',
        description: 'A second dispute on the same order, should be refused.',
      })
      .expect(409);
    expect((await buyerDispute()).id).toBe(id);
    expect((await admin.get(`/orders/${code}`).expect(200)).body).toMatchObject({
      status: 'DISPUTED',
    });
    expect(
      await ctx.prisma.notification.count({
        where: { userId: factory.userId, type: 'DISPUTE_UPDATE' },
      }),
    ).toBe(1);

    // The factory reads it scrubbed: no buyer names, no contact details, no money.
    const { raw, view } = await factoryDispute();
    expect(view.description).not.toMatch(/Larkmoor|Wren|7700/);
    expect(view.evidence).toEqual([]); // the buyer's photo isn't approved yet
    expect(raw).not.toHaveProperty('refundMinor');
  });

  it('relays evidence after review, and mediates in a thread per side', async () => {
    const pdf = await PDFDocument.create();
    pdf.addPage();
    pdf.setAuthor(FACTORY.legalName);
    const bytes = Buffer.from(await pdf.save());
    const fileId = await upload(
      factory.agent,
      `/orders/${code}/dispute/uploads`,
      bytes,
      'application/pdf',
      'lab-dip.pdf',
    );
    await factory.agent
      .post(`/orders/${code}/dispute/evidence`)
      .send({ fileId, note: 'Lab dip report from our dye house' })
      .expect(204);
    expect((await buyerDispute()).evidence.map((e) => e.from)).toEqual(['YOU']);

    const queue = await waitFor(async () => {
      const items = MediaReviewItemSchema.array()
        .parse((await admin.get('/admin/media/pending').expect(200)).body)
        .filter((q) => q.kind === 'dispute-evidence' && q.context?.startsWith(code));
      return items.length === 2 ? items : null;
    });
    for (const item of queue)
      await admin.post(`/admin/media/dispute-evidence/${item.id}/approve`).expect(204);
    const seen = await buyerDispute();
    expect(seen.evidence.map((e) => e.from)).toEqual(['YOU', 'OTHER_SIDE']);
    expect(seen.evidence[1]).toMatchObject({ kind: 'PDF', name: `${code}-evidence-2.pdf` });
    expect(seen.evidence[1]?.url).toContain('sanitized/');
    expect((await factoryDispute()).view.evidence.map((e) => e.from)).toEqual([
      'OTHER_SIDE',
      'YOU',
    ]);

    const thread = async (agent: Agent) =>
      ConversationSummarySchema.parse(
        (await agent.post('/conversations').send({ disputeId: seen.id }).expect(201)).body,
      );
    const buyerThread = await thread(buyer.agent);
    const factoryThread = await thread(factory.agent);
    expect(buyerThread.context).toMatchObject({ kind: 'DISPUTE', code });
    expect(factoryThread.id).not.toBe(buyerThread.id);
    expect((await thread(buyer.agent)).id).toBe(buyerThread.id);
    await factory.agent.get(`/conversations/${buyerThread.id}`).expect(404);
  });

  it('resolves through staff only, refunding from escrow exactly once', async () => {
    const { id } = await buyerDispute();
    await move(admin, 'IN_PRODUCTION').expect(409); // resolve the dispute first
    await admin.post(`/admin/disputes/${id}/assign`).expect(204);
    expect((await buyerDispute()).status).toBe('UNDER_REVIEW');
    await buyer.agent.post(`/admin/disputes/${id}/resolve`).send({}).expect(403);

    const resolve = (refundMinor: number) =>
      admin.post(`/admin/disputes/${id}/resolve`).send({
        outcome: 'RESOLVED_FOR_BUYER',
        resolution: `Shade confirmed off by our QC. ${BUYER.legalName} gets a partial refund.`,
        refundMinor,
        resumeTo: 'CANCELLED',
      });
    await resolve(200_000).expect(409); // more than the 136,500 in escrow
    expect((await buyerDispute()).status).toBe('UNDER_REVIEW');

    const results = await Promise.all([resolve(50_000), resolve(50_000)]);
    expect(results.map((r) => r.status).sort()).toEqual([204, 409]);

    expect(await buyerDispute()).toMatchObject({
      status: 'RESOLVED_FOR_BUYER',
      refundMinor: 50_000,
      currency: 'USD',
    });
    const { raw, view } = await factoryDispute();
    expect(view.resolution).not.toContain('Larkmoor');
    expect(JSON.stringify(raw)).not.toMatch(/:50000[,}]|refundMinor|:136500[,}]|:455[,}]/);
    const finance = OrderFinanceSchema.parse(
      (await admin.get(`/admin/finance/orders/${code}`).expect(200)).body,
    );
    expect(finance).toMatchObject({
      status: 'CANCELLED',
      refundedMinor: 50_000,
      escrowMinor: 86_500,
    });
  });

  it('collects two-way blind reviews and feeds the factory’s public score', async () => {
    await buyer.agent
      .post(`/orders/${code}/reviews`)
      .send({ quality: 5, communication: 5, onTime: 5 })
      .expect(409); // cancelled, not completed

    const done = await newOrder({
      status: 'COMPLETED',
      completedAt: new Date(),
      requestedShipDate: new Date(Date.now() - 10 * DAY),
      // At GarmentGate's hub two days before the requested ship date: on time.
      hubReceipts: {
        create: [
          {
            hub: {
              create: {
                code: `HUB-BD-9${String(Date.now()).slice(-1)}`,
                name: 'Trust test hub',
                country: 'BD',
                city: 'Gazipur',
                addressLine1: 'Shed 1',
              },
            },
            receivedById: (
              await ctx.prisma.user.findUniqueOrThrow({ where: { email: adminEmail } })
            ).id,
            cartonsExpected: 10,
            cartonsReceived: 10,
            condition: 'GOOD',
            receivedAt: new Date(Date.now() - 12 * DAY),
          },
        ],
      },
      inspections: { create: [{ type: 'PRE_SHIPMENT', result: 'PASS', inspectedAt: new Date() }] },
    });
    const reviewsOf = async (agent: Agent) =>
      OrderReviewsSchema.parse((await agent.get(`/orders/${done}/reviews`).expect(200)).body);
    expect(await reviewsOf(buyer.agent)).toMatchObject({ canReview: true, mine: null });

    await buyer.agent
      .post(`/orders/${done}/reviews`)
      .send({
        quality: 5,
        communication: 4,
        onTime: 5,
        comment: `Great job by ${FACTORY.legalName}! Email ${FACTORY.first.toLowerCase()}@corvane.example for more.`,
      })
      .expect(204);
    await buyer.agent
      .post(`/orders/${done}/reviews`)
      .send({ quality: 1, communication: 1, onTime: 1 })
      .expect(409);

    // Blind: the factory knows a review is waiting, not what it says.
    expect(await reviewsOf(factory.agent)).toMatchObject({
      theirs: null,
      theirsPending: true,
      canReview: true,
    });
    const publicReviews = async () =>
      PublicReviewSchema.array().parse(
        (await buyer.agent.get(`/manufacturers/${factory.code}/reviews`).expect(200)).body,
      );
    expect(await publicReviews()).toEqual([]);
    await factory.agent.get(`/manufacturers/${factory.code}/reviews`).expect(403);

    await factory.agent
      .post(`/orders/${done}/reviews`)
      .send({ quality: 4, communication: 5, onTime: 5, comment: 'Clear tech pack, paid on time.' })
      .expect(204);
    const buyerSide = await reviewsOf(buyer.agent);
    expect(buyerSide.theirs).toMatchObject({ direction: 'MANUFACTURER_TO_BUYER', quality: 4 });
    expect(buyerSide.canReview).toBe(false);

    const [review] = await publicReviews();
    expect(review).toMatchObject({ buyerCountry: 'GB', rating: 4.7, quality: 5, communication: 4 });
    expect(review?.comment).not.toMatch(/Corvane|Tarek|@/);

    const profile = PublicManufacturerSchema.parse(
      (await buyer.agent.get(`/manufacturers/${factory.code}`).expect(200)).body,
    );
    expect(profile.scores.rating).toMatchObject({ count: 1, average: 4.67, quality: 5 });
    expect(profile.scores.qcPassBps).toBe(10_000);
    expect(profile.scores.onTimeDeliveryBps).toBe(10_000);
    expect(profile.scores.performanceScore).toBeGreaterThan(73);
    expect(
      await ctx.prisma.notification.count({
        where: { userId: buyer.userId, type: 'REVIEW_RECEIVED' },
      }),
    ).toBe(1);
  });

  it('pages the activity feed back through everything', async () => {
    const first = ActivityPageSchema.parse(
      (await buyer.agent.get('/notifications/activity?limit=1').expect(200)).body,
    );
    expect(first.items).toHaveLength(1);
    expect(first.nextBefore).not.toBeNull();
    const all = ActivityPageSchema.parse(
      (await buyer.agent.get('/notifications/activity?limit=50').expect(200)).body,
    );
    const second = ActivityPageSchema.parse(
      (
        await buyer.agent
          .get(
            `/notifications/activity?limit=1&before=${encodeURIComponent(first.nextBefore ?? '')}`,
          )
          .expect(200)
      ).body,
    );
    expect(second.items[0]?.id).toBe(all.items[1]?.id);
  });
});
