import { hash } from '@node-rs/argon2';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { client, createTestApp, PASSWORD, type TestContext, uniqueEmail } from './helpers.js';

/**
 * The platform's security rules, end to end:
 * - every non-public route refuses anonymous callers (from the OpenAPI document, so new
 *   routes are covered automatically) and inspectors stay on their own routes;
 * - one company can never reach another's orders, RFQs, threads, disputes or files;
 * - buyer-facing responses never carry the factory's identity, and the other way round;
 * - cross-site writes are refused, rate limits count per user, and uploads must really be
 *   the type they claim.
 */

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
type Agent = ReturnType<typeof client>;

/** Routes that are meant to work without a session. */
const PUBLIC = new Set([
  'POST /auth/register',
  'POST /auth/login',
  'POST /auth/refresh',
  'POST /auth/logout',
  'POST /auth/verify-email',
  'POST /auth/password/forgot',
  'POST /auth/password/reset',
  'GET /health',
  'GET /health/ready',
  'GET /categories',
  'POST /payments/stripe/webhook',
]);

/** Identities that must never reach the other side. */
const FACTORY = {
  legalName: 'Quillmere Apparel Manufacturing Ltd',
  first: 'Oskar',
  last: 'Vantongeren',
  website: 'quillmere-apparel.example',
};
const BUYER = { legalName: 'Brackwater Outdoor Goods Inc', first: 'Saoirse', last: 'Lindqvist' };

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(
  ctx: TestContext,
  kind: 'BUYER' | 'MANUFACTURER',
  n: number,
  who: { legalName: string; first: string; last: string; website?: string },
  categories = true,
) {
  const email = uniqueEmail(`sec${kind.toLowerCase()}${String(n)}`);
  const code = kind === 'BUYER' ? `BYR-CA-8${run}${String(n)}` : `MFR-PK-8${run}${String(n)}`;
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
          website: who.website ?? null,
          phone: '+92 300 1234567',
          country: kind === 'BUYER' ? 'CA' : 'PK',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(kind === 'BUYER'
            ? { buyerProfile: { create: { publicCode: code } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: code,
                    isListed: true,
                    ...(categories && { categories: { connect: [{ id: TSHIRTS }] } }),
                  },
                },
              }),
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  return {
    agent: await login(ctx, email),
    email,
    code,
    userId: user.id,
    companyId: user.company?.id ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

describe('security (e2e)', () => {
  let ctx: TestContext;
  let buyerA: Awaited<ReturnType<typeof company>>;
  let buyerB: Awaited<ReturnType<typeof company>>;
  let factory1: Awaited<ReturnType<typeof company>>;
  let factory2: Awaited<ReturnType<typeof company>>;
  let inspector: Agent;
  let orderCode = '';
  let rfqCode = '';
  let threadA = '';
  let kycFileA = '';
  let bookingCode = '';

  beforeAll(async () => {
    ctx = await createTestApp();
    buyerA = await company(ctx, 'BUYER', 1, BUYER);
    buyerB = await company(ctx, 'BUYER', 2, {
      legalName: 'Other Buyer Co',
      first: 'B',
      last: 'Two',
    });
    factory1 = await company(ctx, 'MANUFACTURER', 1, FACTORY);
    // Makes a different category: open RFQs for T-shirts must not reach it.
    factory2 = await company(
      ctx,
      'MANUFACTURER',
      2,
      { legalName: 'Other Factory Co', first: 'F', last: 'Two' },
      false,
    );
    const inspectorEmail = uniqueEmail('secinspector');
    await ctx.prisma.user.create({
      data: {
        email: inspectorEmail,
        passwordHash: await hash(PASSWORD),
        role: 'INSPECTOR',
        firstName: 'Ines',
        lastName: 'Pector',
        emailVerifiedAt: new Date(),
      },
    });
    inspector = await login(ctx, inspectorEmail);

    // An RFQ from buyer A, quoted by factory 1, and an order between them.
    rfqCode = `RFQ-2098-${run}1`;
    const rfq = await ctx.prisma.rfq.create({
      data: {
        code: rfqCode,
        buyerCompanyId: buyerA.companyId,
        createdById: buyerA.userId,
        categoryId: TSHIRTS,
        title: 'Security test tee',
        description: 'Plain tee for the security suite.',
        descriptionFiltered: 'Plain tee for the security suite.',
        quantity: 1000,
        currency: 'USD',
        deadline: new Date(Date.now() + 10 * DAY),
        status: 'OPEN',
        publishedAt: new Date(),
        invitations: { create: [{ manufacturerProfileId: factory1.profileId }] },
      },
    });
    orderCode = `ORD-2098-${run}1`;
    await ctx.prisma.order.create({
      data: {
        code: orderCode,
        buyerCompanyId: buyerA.companyId,
        manufacturerProfileId: factory1.profileId,
        rfqId: rfq.id,
        // The buyer's brand in the title: factories must only ever see it scrubbed.
        title: `${BUYER.legalName} security test tee`,
        quantity: 1000,
        buyerUnitPriceMinor: 455,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: 455_000n,
        manufacturerTotalMinor: 380_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'CA',
        requestedShipDate: new Date(Date.now() + 60 * DAY),
        status: 'IN_PRODUCTION',
        confirmedAt: new Date(),
        milestones: { create: [{ stage: 'FABRIC_SOURCING', status: 'IN_PROGRESS' }] },
      },
    });
    threadA = (
      (await buyerA.agent.post('/conversations').send({ orderCode }).expect(201)).body as {
        id: string;
      }
    ).id;
    const file = await ctx.prisma.fileAsset.create({
      data: {
        bucket: 'garmentgate',
        storageKey: `kyc/${buyerA.companyId}/sec-${run}.pdf`,
        originalFilename: 'Brackwater registration.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 10,
        purpose: 'KYC_DOCUMENT',
        status: 'UPLOADED',
        ownerCompanyId: buyerA.companyId,
        uploadedById: buyerA.userId,
      },
    });
    kycFileA = file.id;

    // A capacity booking between buyer A and factory 1.
    const line = (
      await factory1.agent
        .post('/manufacturer/lines')
        .send({
          code: 'SEC1',
          name: 'Security line',
          categoryIds: [TSHIRTS],
          dailySamMinutes: 10_000,
          workingDays: [1, 2, 3, 4, 5, 6, 7],
          cmRateMinorPer100Min: 650,
        })
        .expect(201)
    ).body as { id: string };
    const start = new Date(Date.now() + 40 * DAY);
    const slot = (
      await factory1.agent
        .post('/manufacturer/slots')
        .send({
          lineId: line.id,
          startDate: start.toISOString().slice(0, 10),
          endDate: new Date(start.getTime() + 4 * DAY).toISOString().slice(0, 10),
        })
        .expect(201)
    ).body as { id: string };
    bookingCode = (
      (
        await buyerA.agent
          .post('/capacity/bookings')
          .send({ slotId: slot.id, minutes: 5_000, categoryId: TSHIRTS, acceptTerms: true })
          .expect(201)
      ).body as { code: string }
    ).code;
  }, 60_000);

  afterAll(async () => {
    await ctx.app.close();
  });

  it('refuses anonymous callers on every route that is not explicitly public', async () => {
    const doc = (await client(ctx.app).get('/docs/json').expect(200)).body as {
      paths: Record<string, Record<string, unknown>>;
    };
    const routes = Object.entries(doc.paths).flatMap(([path, ops]) =>
      Object.keys(ops).map((method) => ({ method: method.toUpperCase(), path })),
    );
    expect(routes.length).toBeGreaterThan(150);
    const leaks: string[] = [];
    for (const { method, path } of routes) {
      if (PUBLIC.has(`${method} ${path}`)) continue;
      const url = path
        .replace(/\{code\}/g, 'ORD-2026-00001')
        .replace(/\{[^}]+\}/g, '0198a000-0000-7000-8000-00000000ffff');
      const res = await client(ctx.app)[method.toLowerCase() as 'get'](url).send({});
      if (res.status !== 401) leaks.push(`${method} ${path} → ${String(res.status)}`);
    }
    expect(leaks).toEqual([]);
  });

  it('keeps inspectors off buyer, factory and admin routes', async () => {
    for (const [method, url] of [
      ['get', '/orders'],
      ['get', `/orders/${orderCode}`],
      ['get', '/conversations'],
      ['get', '/rfqs'],
      ['get', '/manufacturer/rfqs'],
      ['get', '/admin/overview'],
      ['get', '/catalog/products'],
    ] as const)
      expect((await inspector[method](url)).status, url).toBe(403);
  });

  it('never lets another buyer or factory reach this order, RFQ, thread or file', async () => {
    const outsiders = [buyerB.agent, factory2.agent];
    // Valid bodies where it matters, so the ownership check (not validation) is what refuses:
    // those must answer 403/404. Elsewhere any 4xx is fine (nothing leaks either way).
    const probes: [method: 'get' | 'post' | 'put', url: string, body?: object][] = [
      ['get', `/orders/${orderCode}`],
      ['get', `/orders/${orderCode}/purchase-order`],
      ['post', `/orders/${orderCode}/transition`, { to: 'CANCELLED' }],
      [
        'post',
        `/orders/${orderCode}/uploads`,
        { purpose: 'ORDER_MEDIA', fileName: 'a.png', contentType: 'image/png', sizeBytes: 10 },
      ],
      ['get', `/orders/${orderCode}/payments`],
      ['get', `/orders/${orderCode}/payouts`],
      ['get', `/orders/${orderCode}/dispute`],
      [
        'post',
        `/orders/${orderCode}/dispute`,
        { reason: 'QUALITY', description: 'The colour is wrong on every single piece.' },
      ],
      ['get', `/orders/${orderCode}/reviews`],
      ['post', `/orders/${orderCode}/reorder`],
      ['post', `/orders/${orderCode}/inspections`],
      ['put', `/orders/${orderCode}/shipment`],
      ['get', `/orders/${orderCode}/shipment/documents/generated/COMMERCIAL_INVOICE`],
      ['get', `/rfqs/${rfqCode}`],
      ['get', `/manufacturer/rfqs/${rfqCode}`],
      ['get', `/conversations/${threadA}`],
      ['get', `/conversations/${threadA}/messages`],
      ['post', `/conversations/${threadA}/messages`, { body: 'Hello there' }],
      ['get', `/kyc/files/${kycFileA}/url`],
      ['get', `/capacity/bookings/${bookingCode}`],
      ['post', `/capacity/bookings/${bookingCode}/deposit`, { method: 'BANK_TRANSFER' }],
      ['post', `/capacity/bookings/${bookingCode}/cancel`, { reason: 'Not my booking at all' }],
      [
        'post',
        `/capacity/bookings/${bookingCode}/convert`,
        {
          mode: 'CMT',
          title: 'Tee',
          quantity: 10,
          samPerPiece: 10,
          incoterm: 'FOB',
          destinationCountry: 'DE',
        },
      ],
      ['get', `/manufacturer/bookings/${bookingCode}`],
      ['post', `/manufacturer/bookings/${bookingCode}/accept`],
      ['post', `/manufacturer/bookings/${bookingCode}/decline`, { reason: 'Not my booking' }],
    ];
    const breaches: string[] = [];
    for (const agent of outsiders)
      for (const [method, url, body] of probes) {
        const res = await agent[method](url).send(body ?? {});
        const refused = method === 'get' || body ? [403, 404] : [400, 403, 404];
        if (!refused.includes(res.status))
          breaches.push(`${method.toUpperCase()} ${url} → ${String(res.status)}`);
      }
    expect(breaches).toEqual([]);
    // The other side of a thread is a different thread: factory 1 can't open buyer A's either.
    expect((await factory1.agent.get(`/conversations/${threadA}`)).status).toBe(404);
  });

  it('never sends the factory’s identity to the buyer, or the buyer’s to the factory', async () => {
    const factorySecrets = [
      FACTORY.legalName,
      FACTORY.first,
      FACTORY.last,
      FACTORY.website,
      factory1.email,
      '300 1234567',
    ];
    const buyerSecrets = [BUYER.legalName, BUYER.first, BUYER.last, buyerA.email, '300 1234567'];
    const scan = (body: unknown, secrets: string[]) => {
      const text = JSON.stringify(body);
      return secrets.filter((s) => text.includes(s));
    };
    for (const url of [
      `/orders/${orderCode}`,
      '/orders',
      `/rfqs/${rfqCode}`,
      `/manufacturers/${factory1.code}`,
      `/conversations/${threadA}`,
    ]) {
      const res = await buyerA.agent.get(url);
      expect(res.status, url).toBeLessThan(400);
      expect(scan(res.body, factorySecrets), url).toEqual([]);
    }
    for (const url of [`/orders/${orderCode}`, '/orders', `/manufacturer/rfqs/${rfqCode}`]) {
      const res = await factory1.agent.get(url);
      expect(res.status, url).toBeLessThan(400);
      expect(scan(res.body, buyerSecrets), url).toEqual([]);
    }
  });

  it('refuses cross-site writes, and accepts our own origin', async () => {
    await client(ctx.app)
      .post('/auth/login')
      .set('Origin', 'https://evil.example')
      .send({ email: buyerA.email, password: PASSWORD })
      .expect(403);
    await buyerA.agent
      .post(`/conversations/${threadA}/messages`)
      .set('Sec-Fetch-Site', 'cross-site')
      .send({ body: 'hi' })
      .expect(403);
    await client(ctx.app)
      .post('/auth/login')
      .set('Origin', 'http://localhost:3000')
      .send({ email: buyerA.email, password: PASSWORD })
      .expect(200);
  });

  it('rate-limits chat per user, not per network', async () => {
    // Both companies on the same IP (an office NAT): only the flooding user is stopped.
    const ip = '10.250.250.250';
    const flooder = await login(ctx, buyerB.email);
    const neighbour = await login(ctx, factory2.email);
    flooder.set('X-Forwarded-For', ip);
    neighbour.set('X-Forwarded-For', ip);
    // An order between buyer B and factory 2, so each has a thread to write in.
    const ownOrder = `ORD-2098-${run}2`;
    await ctx.prisma.order.create({
      data: {
        code: ownOrder,
        buyerCompanyId: buyerB.companyId,
        manufacturerProfileId: factory2.profileId,
        title: 'Throttle tee',
        quantity: 100,
        buyerUnitPriceMinor: 500,
        manufacturerUnitPriceMinor: 400,
        buyerTotalMinor: 50_000n,
        manufacturerTotalMinor: 40_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'CA',
        status: 'IN_PRODUCTION',
      },
    });
    const flooderThread = (
      (await flooder.post('/conversations').send({ orderCode: ownOrder }).expect(201)).body as {
        id: string;
      }
    ).id;
    const neighbourThread = (
      (await neighbour.post('/conversations').send({ orderCode: ownOrder }).expect(201)).body as {
        id: string;
      }
    ).id;
    let limited = 0;
    for (let i = 0; i < 32; i++) {
      const res = await flooder
        .post(`/conversations/${flooderThread}/messages`)
        .send({ body: `Update ${String(i)}` });
      if (res.status === 429) limited += 1;
    }
    expect(limited).toBeGreaterThan(0);
    await neighbour
      .post(`/conversations/${neighbourThread}/messages`)
      .send({ body: 'Still fine here' })
      .expect(201);
  });

  it('rejects uploads whose bytes are not the declared type', async () => {
    const presign = (
      await factory1.agent
        .post(`/orders/${orderCode}/uploads`)
        .send({
          purpose: 'ORDER_MEDIA',
          fileName: 'photo.png',
          contentType: 'image/png',
          sizeBytes: 64,
        })
        .expect(201)
    ).body as { fileId: string; url: string; fields: Record<string, string> };
    // A Windows executable header, uploaded as "image/png".
    const bytes = Buffer.concat([Buffer.from('MZ\x90\x00', 'latin1'), Buffer.alloc(60)]);
    const form = new FormData();
    for (const [k, v] of Object.entries(presign.fields)) form.append(k, v);
    form.append('file', new Blob([new Uint8Array(bytes)], { type: 'image/png' }));
    expect((await fetch(presign.url, { method: 'POST', body: form })).status).toBeLessThan(300);
    const res = await factory1.agent
      .post(`/orders/${orderCode}/milestones/FABRIC_SOURCING/media`)
      .send({ fileId: presign.fileId })
      .expect(400);
    expect(JSON.stringify(res.body)).toContain('does not match');
    expect(await ctx.prisma.fileAsset.findUnique({ where: { id: presign.fileId } })).toMatchObject({
      status: 'REJECTED',
    });
  });
});
