import { hash } from '@node-rs/argon2';
import {
  BuyerRfqDetailSchema,
  BuyerRfqSummarySchema,
  ManufacturerQuoteSchema,
  ManufacturerRfqDetailSchema,
  ManufacturerRfqSummarySchema,
  MarginRuleSchema,
  MediaReviewItemSchema,
} from '@garmentgate/shared';
import { PDFDocument } from 'pdf-lib';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const HOODIES = '0198a000-0000-7000-8000-000000000002';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;

/** Identity planted on the buyer; none of it may reach a factory. */
const BUYER = {
  legalName: 'Halvorsen Outfitters GmbH',
  tradeName: 'Halvorsen',
  website: 'https://halvorsen-outfitters.example',
  first: 'Ingrid',
  last: 'Vasquell',
};
/** And on the winning factory; none of it may reach the buyer. */
const FACTORY = {
  legalName: 'Tamarind Loom Industries Ltd.',
  tradeName: 'Tamarind Loom',
  first: 'Oskar',
  last: 'Brightwater',
};

type Agent = ReturnType<typeof client>;

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function buyer(ctx: TestContext, n: string) {
  const email = uniqueEmail('rfqbuyer');
  await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'BUYER',
      firstName: BUYER.first,
      lastName: BUYER.last,
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'BUYER',
          legalName: BUYER.legalName,
          tradeName: BUYER.tradeName,
          website: BUYER.website,
          country: 'DE',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          buyerProfile: { create: { publicCode: `BYR-DE-6${run}${n}` } },
        },
      },
    },
  });
  return login(ctx, email);
}

async function factory(
  ctx: TestContext,
  n: string,
  profile: { categoryId: string; moqPcs: number; monthlyCapacityPcs: number; score?: number },
) {
  const email = uniqueEmail('rfqfactory');
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'MANUFACTURER',
      firstName: FACTORY.first,
      lastName: FACTORY.last,
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'MANUFACTURER',
          legalName: FACTORY.legalName,
          tradeName: FACTORY.tradeName,
          country: 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          manufacturerProfile: {
            create: {
              publicCode: `MFR-BD-7${run}${n}`,
              isListed: true,
              moqPcs: profile.moqPcs,
              monthlyCapacityPcs: profile.monthlyCapacityPcs,
              performanceScore: profile.score ?? 85,
              categories: { connect: [{ id: profile.categoryId }] },
              certifications: { create: [{ type: 'GOTS', status: 'VERIFIED' }] },
            },
          },
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  return {
    agent: await login(ctx, email),
    code: user.company?.manufacturerProfile?.publicCode ?? '',
  };
}

async function techPack(): Promise<Buffer> {
  const doc = await PDFDocument.create();
  doc.setAuthor(`${BUYER.first} ${BUYER.last}`);
  doc.setCreator(BUYER.legalName);
  doc.addPage();
  return Buffer.from(await doc.save());
}

async function upload(agent: Agent, bytes: Buffer): Promise<string> {
  const presign = await agent
    .post('/rfqs/uploads')
    .send({
      fileName: `${BUYER.tradeName} hoodie techpack.pdf`,
      contentType: 'application/pdf',
      sizeBytes: bytes.length,
    })
    .expect(201);
  const { fileId, url, fields } = presign.body as {
    fileId: string;
    url: string;
    fields: Record<string, string>;
  };
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  form.append('file', new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
  expect((await fetch(url, { method: 'POST', body: form })).status).toBeLessThan(300);
  return fileId;
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

const buyerLeaks = (body: unknown) =>
  [
    BUYER.legalName,
    BUYER.tradeName,
    'halvorsen',
    BUYER.first,
    BUYER.last,
    '555 0199',
    'targetUnitPrice',
    'buyerUnitPrice',
    '1450',
  ].filter((s) => JSON.stringify(body).toLowerCase().includes(s.toLowerCase()));
const factoryLeaks = (body: unknown) =>
  [
    FACTORY.legalName,
    'Tamarind',
    FACTORY.first,
    FACTORY.last,
    'manufacturerUnitPrice',
    '"unitPriceMinor":1000,',
  ].filter((s) => JSON.stringify(body).toLowerCase().includes(s.toLowerCase()));

describe('RFQ → quotes → accepted order (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyerAgent: Agent;
  let otherBuyer: Agent;
  let matched: Awaited<ReturnType<typeof factory>>;
  let rival: Awaited<ReturnType<typeof factory>>;
  let highMoq: Awaited<ReturnType<typeof factory>>;
  let wrongCategory: Awaited<ReturnType<typeof factory>>;
  let rfqCode = '';

  beforeAll(async () => {
    ctx = await createTestApp();
    await ctx.prisma.marginRule.deleteMany();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyerAgent = await buyer(ctx, 'a');
    otherBuyer = await buyer(ctx, 'b');
    matched = await factory(ctx, '1', {
      categoryId: TSHIRTS,
      moqPcs: 500,
      monthlyCapacityPcs: 50_000,
      score: 80,
    });
    rival = await factory(ctx, '2', {
      categoryId: TSHIRTS,
      moqPcs: 1000,
      monthlyCapacityPcs: 50_000,
      score: 95,
    });
    highMoq = await factory(ctx, '3', {
      categoryId: TSHIRTS,
      moqPcs: 50_000,
      monthlyCapacityPcs: 500_000,
    });
    wrongCategory = await factory(ctx, '4', {
      categoryId: HOODIES,
      moqPcs: 100,
      monthlyCapacityPcs: 50_000,
    });
  }, 60_000);

  afterAll(async () => {
    await ctx.app.close();
  });

  it('lets admins configure margins per category', async () => {
    await admin.post('/admin/margins').send({ name: 'Default', markupBps: 1500 }).expect(201);
    await admin
      .post('/admin/margins')
      .send({ name: 'T-shirts', markupBps: 2000, categoryId: TSHIRTS })
      .expect(201);
    await admin
      .post('/admin/margins')
      .send({ name: 'Dup', markupBps: 900, categoryId: TSHIRTS })
      .expect(409);
    const rules = MarginRuleSchema.array().parse(
      (await admin.get('/admin/margins').expect(200)).body,
    );
    expect(rules.map((r) => r.markupBps).sort()).toEqual([1500, 2000]);
    const defaultRule = rules.find((r) => r.category === null);
    await admin.delete(`/admin/margins/${defaultRule?.id ?? ''}`).expect(400);
    await buyerAgent.get('/admin/margins').expect(403);
  });

  it('publishes an RFQ with a tech pack and reaches matching factories only', async () => {
    const fileId = await upload(buyerAgent, await techPack());
    const rfq = {
      categoryId: TSHIRTS,
      title: `Heavyweight tee ${run} for Halvorsen, call +49 30 555 0199`,
      description: `Boxy fit 240 GSM tee. Brand: ${BUYER.tradeName}. Mail ingrid at halvorsen dot com. Target €14.50.`,
      attachments: [{ fileId, kind: 'TECH_PACK' }],
      quantity: 6000,
      targetUnitPriceMinor: 1450,
      currency: 'EUR',
      deadline: new Date(Date.now() + 10 * DAY).toISOString(),
      requiredDeliveryDate: new Date(Date.now() + 100 * DAY).toISOString(),
      destinationCountry: 'DE',
      incoterm: 'DDP',
    };
    const res = await buyerAgent.post('/rfqs').send(rfq).expect(201);
    rfqCode = (res.body as { code: string }).code;
    expect(rfqCode).toMatch(/^RFQ-\d{4}-\d{5}$/);

    // The same upload can't be attached twice.
    await buyerAgent
      .post('/rfqs')
      .send({
        ...(res.request as unknown as { _data: object })._data,
        attachments: [{ fileId, kind: 'TECH_PACK' }],
      })
      .expect((r) => {
        expect([400, 409]).toContain(r.status);
      });

    const inbox = (agent: Agent) =>
      agent
        .get('/manufacturer/rfqs')
        .expect(200)
        .then((r) => ManufacturerRfqSummarySchema.array().parse(r.body));
    expect((await inbox(matched.agent)).map((r) => r.code)).toContain(rfqCode);
    expect((await inbox(rival.agent)).map((r) => r.code)).toContain(rfqCode);
    expect((await inbox(highMoq.agent)).map((r) => r.code)).not.toContain(rfqCode);
    expect((await inbox(wrongCategory.agent)).map((r) => r.code)).not.toContain(rfqCode);
    await highMoq.agent.get(`/manufacturer/rfqs/${rfqCode}`).expect(404);

    const summary = (await inbox(matched.agent)).find((r) => r.code === rfqCode);
    expect(summary?.reasons).toEqual(['CATEGORY', 'MOQ', 'CAPACITY']);
    expect(summary?.buyerCode).toBe(`BYR-DE-6${run}a`);
    expect(buyerLeaks(summary)).toEqual([]);
  });

  it('sanitizes the tech pack and only shares it after admin review', async () => {
    const fileName = await waitFor(async () => {
      const detail = BuyerRfqDetailSchema.parse(
        (await buyerAgent.get(`/rfqs/${rfqCode}`).expect(200)).body,
      );
      const file = detail.attachments[0];
      return file?.processing === 'READY' ? file.fileName : null;
    });
    expect(fileName).toContain(BUYER.tradeName); // the owner sees their own name

    let detail = ManufacturerRfqDetailSchema.parse(
      (await matched.agent.get(`/manufacturer/rfqs/${rfqCode}`).expect(200)).body,
    );
    expect(detail.attachments).toEqual([]); // awaiting review

    const pending = MediaReviewItemSchema.array().parse(
      (await admin.get('/admin/media/pending').expect(200)).body,
    );
    const item = pending.find(
      (p) => p.kind === 'rfq-attachments' && p.context?.startsWith(rfqCode),
    );
    expect(item?.documentUrl).toBeTruthy();
    await admin.post(`/admin/media/rfq-attachments/${item?.id ?? ''}/approve`).expect(204);

    detail = ManufacturerRfqDetailSchema.parse(
      (await matched.agent.get(`/manufacturer/rfqs/${rfqCode}`).expect(200)).body,
    );
    const shared = detail.attachments[0];
    expect(shared?.fileName).toBe(`${rfqCode}-tech-pack-1.pdf`);
    const pdf = await PDFDocument.load(
      new Uint8Array(await (await fetch(shared?.url ?? '')).arrayBuffer()),
      {
        updateMetadata: false,
      },
    );
    expect(pdf.getAuthor()).toBeUndefined();
    expect(pdf.getCreator()).toBeUndefined();

    // Factories see a filtered, scrubbed RFQ: no buyer identity, contact details or prices.
    expect(detail.description).not.toMatch(/halvorsen|ingrid/i);
    expect(detail.title).not.toContain('555 0199');
    expect(buyerLeaks(detail)).toEqual([]);
  });

  it("shows buyers GarmentGate's price and factories their own", async () => {
    const validUntil = new Date(Date.now() + 30 * DAY).toISOString();
    const mine = ManufacturerQuoteSchema.parse(
      (
        await matched.agent
          .put(`/manufacturer/rfqs/${rfqCode}/quote`)
          .send({
            unitPriceMinor: 1000,
            leadTimeDays: 60,
            moqPcs: 500,
            validUntil,
            notes: `From ${FACTORY.tradeName}: call +880 1711 555123`,
          })
          .expect(200)
      ).body,
    );
    expect(mine).toMatchObject({ unitPriceMinor: 1000, totalMinor: 6_000_000, status: 'OFFERED' });
    await rival.agent
      .put(`/manufacturer/rfqs/${rfqCode}/quote`)
      .send({ unitPriceMinor: 1100, leadTimeDays: 40 })
      .expect(200);

    const raw = (await buyerAgent.get(`/rfqs/${rfqCode}`).expect(200)).body;
    const detail = BuyerRfqDetailSchema.parse(raw);
    const fromMatched = detail.quotes.find((q) => q.manufacturer.code === matched.code);
    expect(fromMatched).toMatchObject({
      unitPriceMinor: 1200,
      totalMinor: 7_200_000,
      currency: 'EUR',
    }); // +20% t-shirts
    expect(fromMatched?.notes).not.toMatch(/tamarind|555123/i);
    expect(detail.quotes.find((q) => q.manufacturer.code === rival.code)?.unitPriceMinor).toBe(
      1320,
    );
    expect(fromMatched?.badges).toContain('LOWEST_PRICE');
    expect(detail.quotes.flatMap((q) => q.badges)).toEqual(
      expect.arrayContaining(['BEST_VALUE', 'FASTEST']),
    );
    expect(factoryLeaks(raw)).toEqual([]);

    // The factory's view of its quote never includes the buyer price.
    const theirs = (await matched.agent.get(`/manufacturer/rfqs/${rfqCode}`).expect(200)).body;
    expect(JSON.stringify(theirs)).not.toMatch(/:1200[,}]/); // as a value, not inside a signed URL
    expect(buyerLeaks(theirs)).toEqual([]);

    const list = BuyerRfqSummarySchema.array().parse(
      (await buyerAgent.get('/rfqs').expect(200)).body,
    );
    expect(list.find((r) => r.code === rfqCode)).toMatchObject({
      offers: 2,
      bestUnitPriceMinor: 1200,
    });
  });

  it('keeps offered prices when margins change, and lets admins re-price', async () => {
    const rules = MarginRuleSchema.array().parse(
      (await admin.get('/admin/margins').expect(200)).body,
    );
    const tees = rules.find((r) => r.category?.id === TSHIRTS);
    await admin
      .put(`/admin/margins/${tees?.id ?? ''}`)
      .send({ name: 'T-shirts', markupBps: 3000, categoryId: TSHIRTS })
      .expect(204);
    const before = BuyerRfqDetailSchema.parse(
      (await buyerAgent.get(`/rfqs/${rfqCode}`).expect(200)).body,
    );
    expect(before.quotes.find((q) => q.manufacturer.code === matched.code)?.unitPriceMinor).toBe(
      1200,
    );

    const quote = await ctx.prisma.quote.findFirstOrThrow({
      where: { rfq: { code: rfqCode }, manufacturerProfile: { publicCode: rival.code } },
    });
    await admin
      .patch(`/admin/quotes/${quote.id}/price`)
      .send({ buyerUnitPriceMinor: 1000 })
      .expect(400);
    await admin
      .patch(`/admin/quotes/${quote.id}/price`)
      .send({ buyerUnitPriceMinor: 1250 })
      .expect(204);
    const after = BuyerRfqDetailSchema.parse(
      (await buyerAgent.get(`/rfqs/${rfqCode}`).expect(200)).body,
    );
    expect(after.quotes.find((q) => q.manufacturer.code === rival.code)?.unitPriceMinor).toBe(1250);
  });

  it('accepts a quote into a draft order, exactly once', async () => {
    const detail = BuyerRfqDetailSchema.parse(
      (await buyerAgent.get(`/rfqs/${rfqCode}`).expect(200)).body,
    );
    const winner = detail.quotes.find((q) => q.manufacturer.code === matched.code);
    const loser = detail.quotes.find((q) => q.manufacturer.code === rival.code);

    await otherBuyer.post(`/rfqs/${rfqCode}/quotes/${winner?.id ?? ''}/accept`).expect(404);
    const accepted = await buyerAgent
      .post(`/rfqs/${rfqCode}/quotes/${winner?.id ?? ''}/accept`)
      .expect(201);
    const { orderCode } = accepted.body as { orderCode: string };
    expect(orderCode).toMatch(/^ORD-\d{4}-\d{5}$/);
    await buyerAgent.post(`/rfqs/${rfqCode}/quotes/${loser?.id ?? ''}/accept`).expect(409);

    const order = await ctx.prisma.order.findUniqueOrThrow({ where: { code: orderCode } });
    expect(order).toMatchObject({
      status: 'DRAFT',
      quantity: 6000,
      buyerUnitPriceMinor: 1200,
      manufacturerUnitPriceMinor: 1000,
      buyerTotalMinor: 7_200_000n,
      manufacturerTotalMinor: 6_000_000n,
      incoterm: 'DDP',
      destinationCountry: 'DE',
    });

    const after = BuyerRfqDetailSchema.parse(
      (await buyerAgent.get(`/rfqs/${rfqCode}`).expect(200)).body,
    );
    expect(after.status).toBe('AWARDED');
    expect(after.orderCode).toBe(orderCode);
    expect(after.quotes.find((q) => q.id === loser?.id)?.status).toBe('REJECTED');

    // Factories can't quote on an awarded RFQ; the winner hears about the order.
    await rival.agent
      .put(`/manufacturer/rfqs/${rfqCode}/quote`)
      .send({ unitPriceMinor: 900, leadTimeDays: 30 })
      .expect(409);
    const notes = await ctx.prisma.notification.findMany({
      where: { user: { company: { manufacturerProfile: { publicCode: matched.code } } } },
    });
    expect(notes.map((n) => n.title)).toContain(`Quote accepted: ${rfqCode}`);
    expect(buyerLeaks(notes)).toEqual([]);
  });

  it('validates input and keeps each side to its own routes', async () => {
    await buyerAgent
      .post('/rfqs')
      .send({
        categoryId: TSHIRTS,
        title: 'Tee',
        description: 'short',
        quantity: 10,
        currency: 'EUR',
        deadline: new Date().toISOString(),
        destinationCountry: 'DE',
        incoterm: 'FOB',
      })
      .expect(400);
    await matched.agent.get('/rfqs').expect(403);
    await buyerAgent.get('/manufacturer/rfqs').expect(403);
    await otherBuyer.get(`/rfqs/${rfqCode}`).expect(404);
  });
});
