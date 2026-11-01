import { getQueueToken } from '@nestjs/bullmq';
import { hash } from '@node-rs/argon2';
import {
  BuyerDashboardSchema,
  ProductSearchResultSchema,
  SavedIndexSchema,
  ShortlistSchema,
} from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { SEARCH_QUEUE } from '../src/modules/search/search.constants.js';
import { SearchService } from '../src/modules/search/search.service.js';
import {
  client,
  createTestApp,
  PASSWORD,
  registerAgent,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-5);

/** Identity planted on the factory; none of it may reach a buyer. */
const SECRET = {
  legalName: 'Quorvane Textiles Ltd.',
  tradeName: 'Quorvane',
  website: 'https://quorvane.example',
  phone: '+880 2 5550 9876',
  owner: 'Thessaly Brandquist',
};

async function verifiedFactory(ctx: TestContext) {
  const [first = '', last = ''] = SECRET.owner.split(' ');
  const user = await ctx.prisma.user.create({
    data: {
      email: uniqueEmail('factory'),
      passwordHash: await hash(PASSWORD),
      role: 'MANUFACTURER',
      firstName: first,
      lastName: last,
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'MANUFACTURER',
          legalName: SECRET.legalName,
          tradeName: SECRET.tradeName,
          country: 'BD',
          website: SECRET.website,
          phone: SECRET.phone,
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          manufacturerProfile: {
            create: {
              publicCode: `MFR-BD-8${run}`,
              moqPcs: 300,
              isListed: true,
              performanceScore: 100, // top of the recommendations, whatever other specs created
              categories: { connect: [{ id: TSHIRTS }] },
              certifications: { create: [{ type: 'OEKO_TEX_100', status: 'VERIFIED' }] },
            },
          },
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  const profile = user.company?.manufacturerProfile;
  if (!profile) throw new Error('profile missing');
  const product = (title: string, status: 'PUBLISHED' | 'DRAFT') =>
    ctx.prisma.product.create({
      data: {
        manufacturerProfileId: profile.id,
        categoryId: TSHIRTS,
        title,
        description: `Made by ${SECRET.tradeName}, call ${SECRET.phone}`,
        descriptionFiltered: 'Combed cotton jersey.',
        fabric: 'Single jersey',
        gsm: 220,
        moqPcs: 500,
        leadTimeDays: 45,
        status,
        priceTiers: {
          create: [
            { minQty: 500, manufacturerUnitPriceMinor: 300, buyerUnitPriceMinor: 390 },
            { minQty: 2000, manufacturerUnitPriceMinor: 250, buyerUnitPriceMinor: 330 },
          ],
        },
      },
    });
  const published = await product(`Zirconweave heavyweight tee ${run}`, 'PUBLISHED');
  const draft = await product(`Zirconweave draft tee ${run}`, 'DRAFT');
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email: user.email, password: PASSWORD }).expect(200);
  return { agent, profile, published, draft, userId: user.id };
}

async function verifiedBuyer(ctx: TestContext, suffix: string) {
  const email = uniqueEmail('buyer');
  await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'BUYER',
      firstName: 'Bea',
      lastName: 'Buyer',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'BUYER',
          legalName: `Buyer ${suffix} Inc.`,
          country: 'US',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          buyerProfile: {
            create: {
              publicCode: `BYR-US-7${run}${suffix}`,
              categories: { connect: [{ id: TSHIRTS }] },
            },
          },
        },
      },
    },
  });
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

const leaks = (body: unknown) => {
  const json = JSON.stringify(body);
  return [
    SECRET.legalName,
    SECRET.tradeName,
    'quorvane',
    '5550 9876',
    'Thessaly',
    'Brandquist',
    'manufacturerUnitPrice',
  ].filter((s) => json.toLowerCase().includes(s.toLowerCase()));
};

describe('buyer discovery (e2e)', () => {
  let ctx: TestContext;
  let factory: Awaited<ReturnType<typeof verifiedFactory>>;
  let buyer: Awaited<ReturnType<typeof verifiedBuyer>>;
  let otherBuyer: Awaited<ReturnType<typeof verifiedBuyer>>;

  beforeAll(async () => {
    ctx = await createTestApp();
    factory = await verifiedFactory(ctx);
    buyer = await verifiedBuyer(ctx, 'a');
    otherBuyer = await verifiedBuyer(ctx, 'b');
    // Let the boot-time reindex finish, then index deterministically.
    const queue = ctx.app.get<Queue>(getQueueToken(SEARCH_QUEUE));
    for (let i = 0; i < 100; i += 1) {
      const counts = await queue.getJobCounts('active', 'waiting', 'delayed');
      if ((counts.active ?? 0) + (counts.waiting ?? 0) + (counts.delayed ?? 0) === 0) break;
      await new Promise((r) => setTimeout(r, 100));
    }
    await ctx.app.get(SearchService).indexer.reindexAll();
  }, 60_000);

  afterAll(async () => {
    await ctx.app.close();
  });

  it('searches only visible products, with typo tolerance and no identity', async () => {
    const res = await buyer
      .get('/catalog/search')
      .query({ q: `zirconweve ${run}` })
      .expect(200);
    const result = ProductSearchResultSchema.parse(res.body);
    const titles = result.hits.map((h) => h.title);
    expect(titles).toContain(factory.published.title);
    expect(titles).not.toContain(factory.draft.title);
    expect(result.hits[0]?.manufacturerCode).toBe(factory.profile.publicCode);
    expect(result.facets.category['t-shirts']).toBeGreaterThan(0);
    expect(leaks(res.body)).toEqual([]);

    const filtered = await buyer
      .get('/catalog/search')
      .query({
        q: run,
        cert: 'OEKO_TEX_100',
        gsmMin: 200,
        moqMax: 600,
        country: 'BD',
        sort: 'price_asc',
      })
      .expect(200);
    expect(ProductSearchResultSchema.parse(filtered.body).total).toBeGreaterThan(0);
    const none = await buyer.get('/catalog/search').query({ q: run, cert: 'GOTS' }).expect(200);
    expect(ProductSearchResultSchema.parse(none.body).hits.map((h) => h.id)).not.toContain(
      factory.published.id,
    );
  });

  it('finds anonymised factories', async () => {
    const res = await buyer
      .get('/catalog/manufacturers/search')
      .query({ country: 'BD' })
      .expect(200);
    expect(JSON.stringify(res.body)).toContain(factory.profile.publicCode);
    expect(leaks(res.body)).toEqual([]);
  });

  it('keeps shortlists per company', async () => {
    const saved = SavedIndexSchema.parse((await buyer.get('/shortlists/saved').expect(200)).body);
    const favorites = saved.lists.find((l) => l.isDefault);
    expect(favorites?.name).toBe('Favorites');
    if (!favorites) return;

    await buyer
      .post(`/shortlists/${favorites.id}/items`)
      .send({ productId: factory.published.id })
      .expect(204);
    await buyer
      .post(`/shortlists/${favorites.id}/items`)
      .send({ productId: factory.published.id })
      .expect(204);
    await buyer
      .post(`/shortlists/${favorites.id}/items`)
      .send({ manufacturerCode: factory.profile.publicCode })
      .expect(204);
    // Drafts can't be saved.
    await buyer
      .post(`/shortlists/${favorites.id}/items`)
      .send({ productId: factory.draft.id })
      .expect(404);

    const created = await buyer.post('/shortlists').send({ name: 'Summer tees' }).expect(201);
    await buyer.post('/shortlists').send({ name: 'Summer tees' }).expect(409);
    const listId = (created.body as { id: string }).id;
    await buyer
      .post(`/shortlists/${listId}/items`)
      .send({ productId: factory.published.id })
      .expect(204);

    const lists = ShortlistSchema.array().parse((await buyer.get('/shortlists').expect(200)).body);
    const fav = lists.find((l) => l.isDefault);
    expect(fav?.products).toHaveLength(1);
    expect(fav?.manufacturers[0]?.manufacturer.publicCode).toBe(factory.profile.publicCode);
    expect(leaks(lists)).toEqual([]);
    const index = SavedIndexSchema.parse((await buyer.get('/shortlists/saved').expect(200)).body);
    expect(index.products[factory.published.id]).toHaveLength(2);

    // Another company can't see, change or delete them.
    const theirs = ShortlistSchema.array().parse(
      (await otherBuyer.get('/shortlists').expect(200)).body,
    );
    expect(theirs.flatMap((l) => l.products)).toEqual([]);
    await otherBuyer
      .post(`/shortlists/${listId}/items`)
      .send({ productId: factory.published.id })
      .expect(404);
    await otherBuyer.delete(`/shortlists/${listId}`).expect(404);

    await buyer.delete(`/shortlists/${favorites.id}`).expect(400);
    await buyer
      .post(`/shortlists/${favorites.id}/items/remove`)
      .send({ productId: factory.published.id })
      .expect(204);
    await buyer.delete(`/shortlists/${listId}`).expect(204);
    const after = SavedIndexSchema.parse((await buyer.get('/shortlists/saved').expect(200)).body);
    expect(after.products[factory.published.id]).toBeUndefined();
  });

  it('turns "Request quote" and "Order sample" into RFQs for that factory', async () => {
    const neededBy = new Date(Date.now() + 60 * 86_400_000).toISOString();
    await buyer
      .post(`/catalog/products/${factory.published.id}/request`)
      .send({ kind: 'SAMPLE', quantity: 1000, neededBy, destinationCountry: 'US' })
      .expect(400);
    await buyer
      .post(`/catalog/products/${factory.draft.id}/request`)
      .send({ kind: 'QUOTE', quantity: 1000, neededBy, destinationCountry: 'US' })
      .expect(404);

    const quote = await buyer
      .post(`/catalog/products/${factory.published.id}/request`)
      .send({
        kind: 'QUOTE',
        quantity: 2500,
        neededBy,
        destinationCountry: 'US',
        targetUnitPriceMinor: 320,
        notes: 'Please reply to bea at buyer dot com or +1 415 555 0100',
      })
      .expect(201);
    const { rfqCode } = quote.body as { rfqCode: string };
    expect(rfqCode).toMatch(/^RFQ-\d{4}-\d{5}$/);

    const sample = await buyer
      .post(`/catalog/products/${factory.published.id}/request`)
      .send({
        kind: 'SAMPLE',
        quantity: 1000,
        sampleQuantity: 3,
        neededBy,
        destinationCountry: 'US',
      })
      .expect(201);

    const rfq = await ctx.prisma.rfq.findUniqueOrThrow({
      where: { code: rfqCode },
      include: { invitations: true },
    });
    expect(rfq.status).toBe('OPEN');
    expect(rfq.productId).toBe(factory.published.id);
    expect(rfq.invitations.map((i) => i.manufacturerProfileId)).toEqual([factory.profile.id]);
    expect(rfq.descriptionFiltered).not.toContain('555 0100');
    const sampleRfq = await ctx.prisma.rfq.findUniqueOrThrow({
      where: { code: (sample.body as { rfqCode: string }).rfqCode },
      include: { samples: true },
    });
    expect(sampleRfq.samples).toMatchObject([
      { type: 'CATALOG', quantity: 3, status: 'REQUESTED' },
    ]);

    // The factory hears about it by the buyer's code only.
    const notes = await ctx.prisma.notification.findMany({ where: { userId: factory.userId } });
    expect(notes.length).toBeGreaterThanOrEqual(2);
    expect(JSON.stringify(notes)).toContain(`BYR-US-7${run}a`);
    expect(JSON.stringify(notes)).not.toContain(`Buyer a Inc.`);
  });

  it('builds the dashboard from buyer-safe data', async () => {
    const res = await buyer.get('/buyer/dashboard').expect(200);
    const dashboard = BuyerDashboardSchema.parse(res.body);
    expect(dashboard.stats.openRfqs).toBeGreaterThanOrEqual(2);
    expect(dashboard.openRfqs.length).toBeGreaterThanOrEqual(2);
    expect(dashboard.recommended.map((m) => m.publicCode)).toContain(factory.profile.publicCode);
    expect(leaks(res.body)).toEqual([]);
  });

  it('is for verified buyers only', async () => {
    await factory.agent.get('/catalog/search').expect(403);
    await factory.agent.get('/shortlists').expect(403);
    await factory.agent.get('/buyer/dashboard').expect(403);
    const { agent: unverified } = await registerAgent(ctx.app, 'BUYER');
    await unverified.get('/shortlists').expect(403);
    await client(ctx.app).get('/catalog/search').expect(401);
  });
});
