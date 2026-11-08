import { hash } from '@node-rs/argon2';
import {
  AdminGigInspectorSchema,
  AdminInspectorApplicationSchema,
  DEFAULT_GIG_SETTINGS,
  InspectorMeSchema,
  LedgerBalancesSchema,
  TaskSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

type Agent = ReturnType<typeof client>;
const run = String(Date.now()).slice(-4);
// A factory in Gazipur; the inspector lives in Tongi, about 11 km away.
const FACTORY_AT = { latitude: 23.9999, longitude: 90.4203 };
const HOME = { latitude: 23.8985, longitude: 90.4058 };

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

describe('gig QC inspectors (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let inspector: Agent;
  let inspectorId = '';
  let factoryCode = '';
  const email = uniqueEmail('gig');
  const inspections: string[] = [];

  const report = (id: string) =>
    inspector.post(`/inspector/inspections/${id}/report`).send({
      lotSize: 1000,
      majorAql: '2.5',
      minorAql: '4.0',
      critical: 0,
      major: 1,
      minor: 2,
      result: 'PASS',
      summary: 'Inline check: seams and measurements within tolerance.',
    });
  const tasks = async () =>
    z.array(TaskSchema).parse((await inspector.get('/inspector/tasks').expect(200)).body);
  const usd = async () =>
    LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    ).currencies.find((c) => c.currency === 'USD');

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    await admin
      .put('/admin/gig/settings')
      .send({ ...DEFAULT_GIG_SETTINGS, rotationLimit: 1, auditSampleBps: 10_000 })
      .expect(200);
    // A verified factory with two orders in production, each with an inline inspection open.
    const owner = await ctx.prisma.user.create({
      data: {
        email: uniqueEmail('gigfactory'),
        passwordHash: await hash(PASSWORD),
        role: 'MANUFACTURER',
        firstName: 'Gig',
        lastName: 'Factory',
        emailVerifiedAt: new Date(),
        companyRole: 'OWNER',
        company: {
          create: {
            type: 'MANUFACTURER',
            legalName: `Gig Knit ${run}`,
            country: 'BD',
            city: 'Gazipur',
            kycStatus: 'VERIFIED',
            onboardingStep: 'SUBMITTED',
            manufacturerProfile: {
              create: { publicCode: `MFR-BD-2${run.slice(-3)}`, isListed: true },
            },
          },
        },
      },
      include: { company: { include: { manufacturerProfile: true } } },
    });
    factoryCode = owner.company?.manufacturerProfile?.publicCode ?? '';
    const buyer = await ctx.prisma.company.create({
      data: {
        type: 'BUYER',
        legalName: `Gig Buyer ${run}`,
        country: 'US',
        kycStatus: 'VERIFIED',
        onboardingStep: 'SUBMITTED',
        buyerProfile: { create: { publicCode: `BYR-US-2${run}` } },
      },
    });
    for (const n of [1, 2]) {
      const order = await ctx.prisma.order.create({
        data: {
          code: `ORD-2101-${run}${String(n)}`,
          buyerCompanyId: buyer.id,
          manufacturerProfileId: owner.company?.manufacturerProfile?.id ?? '',
          title: 'Gig test tee',
          quantity: 1000,
          buyerUnitPriceMinor: 500,
          manufacturerUnitPriceMinor: 400,
          buyerTotalMinor: 500_000n,
          manufacturerTotalMinor: 400_000n,
          currency: 'USD',
          incoterm: 'FOB',
          destinationCountry: 'US',
          status: 'IN_PRODUCTION',
          inspections: { create: { type: 'DURING_PRODUCTION', aqlLevel: 'II' } },
        },
        include: { inspections: true },
      });
      inspections.push(order.inspections[0]?.id ?? '');
    }
  });

  afterAll(async () => {
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'gig' } });
    await ctx.app.close();
  });

  it('takes applications publicly and approves only certified inspectors', async () => {
    const application = {
      firstName: 'Nasrin',
      lastName: 'Akter',
      email,
      phone: '+880 1711 000000',
      country: 'BD',
      city: 'Tongi',
      experienceYears: 6,
      inspectionTypes: ['DURING_PRODUCTION', 'PRE_SHIPMENT'],
      about: 'Six years as a QC inspector for knit exporters, AQL 2.5 final and inline audits.',
    };
    await client(ctx.app)
      .post('/inspectors/apply')
      .send({ ...application, about: 'Short' })
      .expect(400);
    await client(ctx.app).post('/inspectors/apply').send(application).expect(204);
    await client(ctx.app).post('/inspectors/apply').send(application).expect(204); // no duplicate
    const apps = z
      .array(AdminInspectorApplicationSchema)
      .parse((await admin.get('/admin/gig/applications').expect(200)).body)
      .filter((a) => a.email === email);
    expect(apps).toHaveLength(1);
    const review = (body: Record<string, unknown>) =>
      admin.post(`/admin/gig/applications/${apps[0]?.id ?? ''}/review`).send(body);
    expect((await review({ decision: 'APPROVE' })).status).toBe(400); // not certified
    await review({ decision: 'APPROVE', certified: true, serviceRadiusKm: 30, ...HOME }).expect(
      204,
    );
    const user = await ctx.prisma.user.findUniqueOrThrow({ where: { email } });
    expect(user.role).toBe('INSPECTOR');
    inspectorId = user.id;
    await ctx.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hash(PASSWORD) },
    });
    inspector = await login(ctx, email);
  });

  it('shows nearby work only once the factory is located, and rotates inspectors', async () => {
    // Different country fallback works without coordinates; then the factory gets located.
    expect((await tasks()).map((t) => t.inspectionId).sort()).toEqual([...inspections].sort());
    await admin.put(`/admin/manufacturers/${factoryCode}/location`).send(FACTORY_AT).expect(204);
    const [first] = await tasks();
    expect(first?.distanceKm).toBeGreaterThan(10);
    expect(first?.distanceKm).toBeLessThan(12);
    expect(first?.payUsdMinor).toBe(8_000);
    expect(JSON.stringify(first)).not.toContain(`Gig Knit ${run}`); // name only once claimed

    await inspector.post(`/inspector/tasks/${inspections[0] ?? ''}/claim`).expect(204);
    await inspector.post(`/inspector/tasks/${inspections[0] ?? ''}/claim`).expect(409);
    // Rotation (limit 1 in 90 days): the second inspection at the same factory is withheld.
    expect(await tasks()).toEqual([]);
  });

  it('needs a GPS check-in at the factory, then earns the day rate', async () => {
    const id = inspections[0] ?? '';
    expect((await report(id)).status).toBe(409); // not checked in
    const far = await inspector.post(`/inspector/inspections/${id}/check-in`).send(HOME);
    expect(far.status).toBe(409);
    expect(far.text).toContain('from the factory');
    await inspector
      .post(`/inspector/inspections/${id}/check-in`)
      .send({ latitude: FACTORY_AT.latitude + 0.001, longitude: FACTORY_AT.longitude })
      .expect(201);
    const before = await usd();
    await report(id).expect(204);
    const after = await usd();
    expect((before?.revenueMinor ?? 0) - (after?.revenueMinor ?? 0)).toBe(8_000);
    expect(after).toMatchObject({ balanced: true, reconciled: true });
    const done = await ctx.prisma.inspection.findUniqueOrThrow({ where: { id } });
    expect(done).toMatchObject({ payUsdMinor: 8_000, auditRequested: true });
    expect(done.earnedAt).not.toBeNull();
    const me = InspectorMeSchema.parse((await inspector.get('/inspector/me').expect(200)).body);
    expect(me).toMatchObject({ dueUsdMinor: 8_000, paidUsdMinor: 0 });
  });

  it('pays weekly, only to details staff verified', async () => {
    const pay = () =>
      admin.post(`/admin/gig/inspectors/${inspectorId}/pay`).send({ bankReference: `GIG-${run}` });
    expect((await pay()).status).toBe(409); // no verified details
    await inspector
      .put('/inspector/me/payout')
      .send({ method: 'BKASH', name: 'Nasrin Akter', account: '01711000000' })
      .expect(204);
    expect((await pay()).status).toBe(409);
    await admin.post(`/admin/gig/inspectors/${inspectorId}/verify-payout`).expect(204);
    expect((await pay().expect(201)).body).toEqual({ paidUsdMinor: 8_000 });
    expect((await pay()).status).toBe(409); // nothing left
    const row = z
      .array(AdminGigInspectorSchema)
      .parse((await admin.get('/admin/gig/inspectors').expect(200)).body)
      .find((i) => i.userId === inspectorId);
    expect(row).toMatchObject({ dueUsdMinor: 0, inspections: 1 });
    expect(await usd()).toMatchObject({ balanced: true, reconciled: true });
  });

  it('suspends after repeated low ratings', async () => {
    await admin
      .put('/admin/gig/settings')
      .send({ ...DEFAULT_GIG_SETTINGS, minRatingsForSuspension: 1 })
      .expect(200);
    await admin
      .post(`/admin/inspections/${inspections[0] ?? ''}/rate`)
      .send({ rating: 6 })
      .expect(400);
    await admin
      .post(`/admin/inspections/${inspections[0] ?? ''}/rate`)
      .send({ rating: 2 })
      .expect(204);
    await admin
      .post(`/admin/inspections/${inspections[0] ?? ''}/rate`)
      .send({ rating: 2 })
      .expect(409);
    await inspector.get('/inspector/tasks').expect(403); // paused
    await inspector.get('/admin/gig/settings').expect(403);
  });
});
