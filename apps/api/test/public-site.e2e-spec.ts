import {
  AdminLeadSchema,
  DEFAULT_PLAN_SETTINGS,
  PublicDirectorySchema,
  PublicPricingSchema,
  PublicStatsSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  registerAgent,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

type Agent = ReturnType<typeof client>;
const run = String(Date.now()).slice(-5);

describe('public website data and enquiries (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let adminId = '';

  beforeAll(async () => {
    ctx = await createTestApp();
    const email = await createAdmin(ctx.prisma);
    admin = client(ctx.app);
    await admin.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
    adminId = (await ctx.prisma.user.findUniqueOrThrow({ where: { email } })).id;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('publishes aggregate counts only, to anyone', async () => {
    const res = await client(ctx.app).get('/public/stats').expect(200);
    const stats = PublicStatsSchema.parse(res.body); // strict: nothing but counts
    for (const v of Object.values(stats)) expect(Number.isInteger(v) && v >= 0).toBe(true);
  });

  it('publishes the category and country directory as totals only', async () => {
    const res = await client(ctx.app).get('/public/directory').expect(200);
    const dir = PublicDirectorySchema.parse(res.body); // strict: no names, ids or codes
    expect(JSON.stringify(res.body)).not.toMatch(/MFR-|BYR-|legalName|@/);
    for (const c of dir.categories) expect(c.factories).toBeGreaterThanOrEqual(0);
    for (const c of dir.countries) expect(c.code).toMatch(/^[A-Z]{2}$/);
  });

  it('publishes the live price list from the staff settings', async () => {
    await admin
      .put('/admin/plans/settings')
      .send({
        ...DEFAULT_PLAN_SETTINGS,
        tiers: {
          ...DEFAULT_PLAN_SETTINGS.tiers,
          PRO: { ...DEFAULT_PLAN_SETTINGS.tiers.PRO, monthlyUsdMinor: 12_300 },
        },
      })
      .expect(200);
    const pricing = PublicPricingSchema.parse(
      (await client(ctx.app).get('/public/pricing').expect(200)).body,
    );
    expect(pricing.factoryPlans.tiers.PRO.monthlyUsdMinor).toBe(12_300);
    expect(pricing.releaseSchedule.reduce((s, r) => s + r.bps, 0)).toBe(10_000);
    expect(pricing.inspectorDayRateUsdMinor).toBeGreaterThan(0);
    await admin.put('/admin/plans/settings').send(DEFAULT_PLAN_SETTINGS).expect(200);
  });

  it('takes enquiries for staff, drops bots and refuses junk', async () => {
    const lead = {
      kind: 'ENTERPRISE',
      name: 'Ana Ruiz',
      email: `ana.${run}@hospitality.example`,
      company: `Ruiz Hospitality ${run}`,
      country: 'ES',
      message: 'Yearly uniform contract, about 40,000 pieces across 12 hotels.',
      source: '/buyers',
    };
    await client(ctx.app).post('/leads').send(lead).expect(204);
    await client(ctx.app)
      .post('/leads')
      .send({ ...lead, email: `bot.${run}@spam.example`, website: 'http://spam.example' })
      .expect(204);
    await client(ctx.app)
      .post('/leads')
      .send({ ...lead, message: 'hi' })
      .expect(400);

    const leads = AdminLeadSchema.array().parse((await admin.get('/admin/leads').expect(200)).body);
    const mine = leads.find((l) => l.email === lead.email);
    expect(mine).toMatchObject({ kind: 'ENTERPRISE', status: 'NEW', source: '/buyers' });
    expect(leads.some((l) => l.email.startsWith(`bot.${run}`))).toBe(false);
    expect(
      await ctx.prisma.notification.count({
        where: { userId: adminId, title: `Enterprise enquiry: ${lead.company}` },
      }),
    ).toBe(1);

    await admin
      .patch(`/admin/leads/${mine?.id ?? ''}`)
      .send({ status: 'CONTACTED' })
      .expect(204);
    const after = AdminLeadSchema.array().parse((await admin.get('/admin/leads').expect(200)).body);
    expect(after.find((l) => l.id === mine?.id)).toMatchObject({ status: 'CONTACTED' });
    expect(after.find((l) => l.id === mine?.id)?.handledBy).toBeTruthy();

    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER', uniqueEmail('leadbuyer'));
    await buyer.get('/admin/leads').expect(403);
  });
});
