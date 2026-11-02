import { hash } from '@node-rs/argon2';
import {
  AdminCertificationSchema,
  AdminOrderSchema,
  AdminOverviewSchema,
  AdminUserSchema,
  AuditEntrySchema,
  ManufacturerPayoutsSchema,
  OrderFinanceSchema,
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

const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
type Agent = ReturnType<typeof client>;

async function login(ctx: TestContext, email: string) {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function party(ctx: TestContext, kind: 'BUYER' | 'MANUFACTURER') {
  const email = uniqueEmail(`admin${kind.toLowerCase()}`);
  const code = kind === 'BUYER' ? `BYR-US-7${run}` : `MFR-VN-7${run}`;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: kind,
      firstName: kind === 'BUYER' ? 'Imogen' : 'Quang',
      lastName: kind === 'BUYER' ? 'Faraday' : 'Lindqvist',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: kind,
          legalName: kind === 'BUYER' ? 'Saltmarsh Outfitters Inc' : 'Hollowbrook Garments Co',
          country: kind === 'BUYER' ? 'US' : 'VN',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(kind === 'BUYER'
            ? { buyerProfile: { create: { publicCode: code } } }
            : { manufacturerProfile: { create: { publicCode: code, isListed: true } } }),
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

describe('admin panel (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let adminEmail = '';
  let buyer: Awaited<ReturnType<typeof party>>;
  let factory: Awaited<ReturnType<typeof party>>;
  let counter = 0;

  const newOrder = async (data: object = {}) => {
    counter += 1;
    const code = `ORD-2097-${run}${String(counter)}`;
    await ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Admin test polo',
        quantity: 1000,
        buyerUnitPriceMinor: 455,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: 455_000n,
        manufacturerTotalMinor: 380_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'US',
        requestedShipDate: new Date(Date.now() + 60 * DAY),
        status: 'DRAFT',
        ...data,
      },
    });
    return code;
  };
  const confirm = (code: string) =>
    buyer.agent.post(`/orders/${code}/transition`).send({ to: 'DEPOSIT_PENDING' }).expect(204);

  beforeAll(async () => {
    ctx = await createTestApp();
    adminEmail = await createAdmin(ctx.prisma);
    admin = await login(ctx, adminEmail);
    buyer = await party(ctx, 'BUYER');
    factory = await party(ctx, 'MANUFACTURER');
  }, 60_000);

  afterAll(async () => {
    await ctx.app.close();
  });

  it('keeps the admin API to staff', async () => {
    for (const path of ['/admin/overview', '/admin/users', '/admin/audit', '/admin/certifications'])
      await buyer.agent.get(path).expect(403);
    await factory.agent
      .post(`/admin/orders/ORD-2097-${run}1/override`)
      .send({ to: 'CANCELLED', reason: 'Not allowed to do this' })
      .expect(403);
  });

  it('withholds commission from the factory at confirmation, at a lower rate for repeat orders', async () => {
    await admin
      .post('/admin/margins')
      .send({
        name: `Saltmarsh ${run}`,
        markupBps: 1500,
        commissionBps: 300,
        repeatCommissionBps: 500,
        buyerCode: buyer.code,
      })
      .expect(400); // the repeat rate can't be above the normal one
    await admin
      .post('/admin/margins')
      .send({
        name: `Saltmarsh ${run}`,
        markupBps: 1500,
        commissionBps: 500,
        repeatCommissionBps: 200,
        buyerCode: buyer.code,
      })
      .expect(201);

    // First order with this factory: the full 5%.
    const first = await newOrder();
    await confirm(first);
    const firstAdmin = AdminOrderSchema.parse(
      (await admin.get(`/orders/${first}`).expect(200)).body,
    );
    expect(firstAdmin).toMatchObject({
      commissionBps: 500,
      commissionMinor: 19_000,
      repeatOrder: false,
    });

    // The factory sees its own commission and net, never buyer amounts (strict schema).
    const payouts = ManufacturerPayoutsSchema.parse(
      (await factory.agent.get(`/orders/${first}/payouts`).expect(200)).body,
    );
    expect(payouts).toMatchObject({
      totalMinor: 380_000,
      commissionBps: 500,
      commissionMinor: 19_000,
      netMinor: 361_000,
    });
    expect(payouts.schedule.reduce((a, r) => a + r.amountMinor, 0)).toBe(361_000);

    // Staff see the revenue split: markup + commission.
    const finance = OrderFinanceSchema.parse(
      (await admin.get(`/admin/finance/orders/${first}`).expect(200)).body,
    );
    expect(finance).toMatchObject({
      markupMinor: 75_000,
      factoryCommissionMinor: 19_000,
      marginMinor: 94_000,
      repeatOrder: false,
    });
    expect(finance.releases.reduce((a, r) => a + r.commissionMinor, 0)).toBe(94_000);

    // After a completed order with this factory, the repeat rate applies.
    await newOrder({ status: 'COMPLETED', completedAt: new Date() });
    const repeat = await newOrder();
    await confirm(repeat);
    expect(
      AdminOrderSchema.parse((await admin.get(`/orders/${repeat}`).expect(200)).body),
    ).toMatchObject({ commissionBps: 200, commissionMinor: 7_600, repeatOrder: true });
  });

  it('reports GMV, revenue, conversion and the staff queues', async () => {
    const overview = AdminOverviewSchema.parse(
      (await admin.get('/admin/overview?months=3').expect(200)).body,
    );
    expect(overview.series).toHaveLength(3);
    expect(overview.kpis.confirmedOrders).toBeGreaterThanOrEqual(2);
    expect(overview.kpis.gmvUsdMinor).toBeGreaterThanOrEqual(910_000);
    expect(overview.kpis.revenueUsdMinor).toBe(
      overview.kpis.markupUsdMinor + overview.kpis.commissionUsdMinor,
    );
    expect(overview.kpis.commissionUsdMinor).toBeGreaterThanOrEqual(26_600);
    await admin.get('/admin/overview?months=99').expect(400);
  });

  it('warns, suspends (ending every session) and reactivates accounts', async () => {
    const users = z
      .array(AdminUserSchema)
      .parse((await admin.get('/admin/users').expect(200)).body);
    const me = users.find((u) => u.email === buyer.email);
    expect(me).toMatchObject({ role: 'BUYER', status: 'ACTIVE', company: { code: buyer.code } });
    const adminId = users.find((u) => u.email === adminEmail)?.id ?? '';

    await admin
      .post(`/admin/users/${buyer.userId}/warn`)
      .send({ note: 'Please keep phone numbers out of messages.' })
      .expect(204);
    expect(
      await ctx.prisma.accountWarning.findFirst({
        where: { userId: buyer.userId, note: { not: null } },
      }),
    ).toMatchObject({ level: 'WARNING', note: 'Please keep phone numbers out of messages.' });

    await admin
      .post(`/admin/users/${adminId}/suspend`)
      .send({ reason: 'Testing myself' })
      .expect(400);
    await admin.post(`/admin/users/${buyer.userId}/suspend`).send({ reason: 'x' }).expect(400);
    await admin
      .post(`/admin/users/${buyer.userId}/suspend`)
      .send({ reason: 'Repeatedly shared contact details' })
      .expect(204);
    // The refresh token is revoked and signing in is refused.
    await buyer.agent.post('/auth/refresh').expect((r) => {
      expect(r.status).toBeGreaterThanOrEqual(400);
    });
    await client(ctx.app)
      .post('/auth/login')
      .send({ email: buyer.email, password: PASSWORD })
      .expect(403);
    const suspended = z
      .array(AdminUserSchema)
      .parse((await admin.get('/admin/users').expect(200)).body)
      .find((u) => u.id === buyer.userId);
    expect(suspended).toMatchObject({
      status: 'SUSPENDED',
      suspendedReason: 'Repeatedly shared contact details',
      warnings: 1,
    });

    await admin.post(`/admin/users/${buyer.userId}/reactivate`).expect(204);
    await admin.post(`/admin/users/${buyer.userId}/reactivate`).expect(409);
    buyer.agent = await login(ctx, buyer.email);
  });

  it('verifies and rejects certificates added after KYC', async () => {
    const [a, b] = await Promise.all(
      (['OEKO_TEX_100', 'WRAP'] as const).map((type) =>
        ctx.prisma.certification.create({
          data: { manufacturerProfileId: factory.profileId, type, certificateNumber: `C-${run}` },
        }),
      ),
    );
    const pending = z
      .array(AdminCertificationSchema)
      .parse((await admin.get('/admin/certifications?status=PENDING').expect(200)).body);
    expect(pending.find((c) => c.id === a?.id)).toMatchObject({
      status: 'PENDING',
      manufacturer: { code: factory.code, name: 'Hollowbrook Garments Co' },
    });
    await admin.post(`/admin/certifications/${a?.id ?? ''}/verify`).expect(204);
    await admin.post(`/admin/certifications/${a?.id ?? ''}/verify`).expect(409);
    await admin
      .post(`/admin/certifications/${b?.id ?? ''}/reject`)
      .send({ reason: 'The scan is unreadable' })
      .expect(204);
    expect(await ctx.prisma.certification.findUnique({ where: { id: b?.id ?? '' } })).toMatchObject(
      {
        status: 'REJECTED',
        rejectionReason: 'The scan is unreadable',
      },
    );
  });

  it('overrides an order status with a reason, recorded in the history and the audit log', async () => {
    const code = await newOrder();
    const override = (body: object) => admin.post(`/admin/orders/${code}/override`).send(body);
    await override({ to: 'DISPUTED', reason: 'Disputes have their own flow' }).expect(400);
    await override({ to: 'CANCELLED', reason: 'short' }).expect(400);
    // Skipping confirmation would leave the order without a payment schedule.
    await override({ to: 'IN_PRODUCTION', reason: 'Production started offline' }).expect(409);
    await override({
      to: 'CANCELLED',
      reason: 'Buyer cancelled by phone with the account manager',
    }).expect(204);
    await override({ to: 'CANCELLED', reason: 'Buyer cancelled by phone again' }).expect(400);

    const order = AdminOrderSchema.parse((await admin.get(`/orders/${code}`).expect(200)).body);
    expect(order.status).toBe('CANCELLED');
    expect(order.events.at(-1)?.note).toContain('Status override');

    const audit = z
      .array(AuditEntrySchema)
      .parse((await admin.get('/admin/audit?action=order.status_override').expect(200)).body);
    expect(audit[0]).toMatchObject({
      action: 'order.status_override',
      entityType: 'Order',
      actor: { email: adminEmail },
      metadata: { to: 'CANCELLED', from: 'DRAFT' },
    });
    const userActions = z
      .array(AuditEntrySchema)
      .parse((await admin.get('/admin/audit?action=user.').expect(200)).body)
      .map((e) => e.action);
    expect(userActions).toEqual(
      expect.arrayContaining(['user.warned', 'user.suspended', 'user.reactivated']),
    );
  });
});
