import { hash } from '@node-rs/argon2';
import { LedgerBalancesSchema, OrderExceptionSchema } from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { ExceptionsService } from '../src/modules/exceptions/exceptions.service.js';
import { OrdersService } from '../src/modules/orders/orders.service.js';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  recordPaidPayment,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

type Agent = ReturnType<typeof client>;
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', n: string) {
  const email = uniqueEmail(`exc${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Ex',
      lastName: 'Ception',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `Exceptions ${type} ${n} ${run}`,
          country: type === 'BUYER' ? 'US' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-US-6${run}` } } }
            : {
                manufacturerProfile: {
                  create: { publicCode: `MFR-BD-${n}${run.slice(-3)}`, isListed: true },
                },
              }),
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  return {
    agent: await login(ctx, email),
    companyId: user.companyId ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
    code: user.company?.manufacturerProfile?.publicCode ?? '',
  };
}

describe('the exception flow: delay alerts and factory replacement (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let first: Awaited<ReturnType<typeof company>>;
  let second: Awaited<ReturnType<typeof company>>;
  const code = `ORD-2099-${run}1`;

  const exceptions = async () =>
    z
      .array(OrderExceptionSchema)
      .parse((await admin.get('/admin/exceptions').expect(200)).body)
      .filter((e) => e.orderCode === code);
  const usd = async () =>
    LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    ).currencies.find((c) => c.currency === 'USD');

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'release_schedule' } });
    buyer = await company(ctx, 'BUYER', '0');
    first = await company(ctx, 'MANUFACTURER', '5');
    second = await company(ctx, 'MANUFACTURER', '7');
    const order = await ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: first.profileId,
        title: 'Exception test chino',
        quantity: 1000,
        buyerUnitPriceMinor: 1_000,
        manufacturerUnitPriceMinor: 800,
        buyerTotalMinor: 1_000_000n,
        manufacturerTotalMinor: 800_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'US',
        depositBps: 3000,
        requestedShipDate: new Date(Date.now() + 30 * DAY),
        status: 'DRAFT',
      },
    });
    // Confirmed on the default schedule (25 / 70 / 5), deposit in, production started.
    await buyer.agent
      .post(`/orders/${code}/transition`)
      .send({ to: 'DEPOSIT_PENDING' })
      .expect(204);
    await recordPaidPayment(ctx, {
      orderId: order.id,
      buyerCompanyId: buyer.companyId,
      purpose: 'DEPOSIT',
      amountMinor: 300_000n,
    });
    await ctx.app.get(OrdersService).advance(order.id, 'IN_PRODUCTION', 'Deposit received');
    // The first factory got its 25% material advance.
    const advance = await ctx.prisma.orderRelease.findFirstOrThrow({
      where: { orderId: order.id, trigger: 'PRODUCTION_START' },
    });
    await admin.post(`/admin/finance/releases/${advance.id}/approve`).expect(204);
    // Sewing should have finished 10 days ago.
    await ctx.prisma.orderMilestone.update({
      where: { orderId_stage: { orderId: order.id, stage: 'SEWING' } },
      data: { plannedAt: new Date(Date.now() - 10 * DAY), status: 'IN_PROGRESS' },
    });
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('lists the late order and alerts staff, factory and buyer once a week', async () => {
    const [late] = await exceptions();
    expect(late).toMatchObject({
      kind: 'DELAY',
      stage: 'SEWING',
      manufacturer: { code: first.code },
    });
    expect(late?.daysLate).toBeGreaterThanOrEqual(10);

    const sweep = () => ctx.app.get(ExceptionsService).sweep();
    expect(await sweep()).toBeGreaterThanOrEqual(1);
    const told = (companyId: string, words: string) =>
      ctx.prisma.notification.count({
        where: {
          user: { companyId },
          title: { contains: `${code}: ` },
          AND: { title: { contains: words } },
        },
      });
    expect(await told(first.companyId, 'behind plan')).toBe(1);
    expect(await told(buyer.companyId, 'running late')).toBe(1);
    await sweep(); // a week hasn't passed
    expect(await told(first.companyId, 'behind plan')).toBe(1);
    await buyer.agent.get('/admin/exceptions').expect(403);
  });

  it('moves the order to another factory, keeping the books whole', async () => {
    const move = (body: Record<string, unknown>) =>
      admin.post(`/admin/orders/${code}/replace-factory`).send(body);
    const ok = {
      manufacturerCode: second.code,
      manufacturerUnitPriceMinor: 820,
      reason: 'Ten days late on sewing, no recovery plan.',
    };
    expect((await move({ ...ok, manufacturerCode: first.code })).status).toBe(400);
    expect((await move({ ...ok, manufacturerUnitPriceMinor: 1_100 })).status).toBe(400);
    await first.agent.post(`/admin/orders/${code}/replace-factory`).send(ok).expect(403);
    await admin.post(`/admin/orders/${code}/replace-factory`).send(ok).expect(204);

    const order = await ctx.prisma.order.findUniqueOrThrow({
      where: { code },
      include: { releases: true, milestones: true, factoryChanges: true },
    });
    expect(order).toMatchObject({
      manufacturerProfileId: second.profileId,
      manufacturerUnitPriceMinor: 820,
      manufacturerTotalMinor: 820_000n,
      status: 'IN_PRODUCTION',
    });
    // The first factory keeps its released advance; the rest is re-planned for the second.
    const by = (status: string) =>
      order.releases.filter((r) => r.status === status && r.supersededAt === null);
    const old = order.releases.filter((r) => r.supersededAt !== null);
    expect(old.map((r) => [r.trigger, r.status]).sort()).toEqual([
      ['CLAIM_WINDOW', 'CANCELLED'],
      ['PRODUCTION_START', 'RELEASED'],
      ['SHIPPED', 'CANCELLED'],
    ]);
    expect(by('DUE').map((r) => r.trigger)).toEqual(['PRODUCTION_START']);
    expect(
      by('SCHEDULED')
        .map((r) => r.trigger)
        .sort(),
    ).toEqual(['CLAIM_WINDOW', 'SHIPPED']);
    expect(order.factoryChanges[0]?.fundedMinor).toBe(250_000n);
    expect(order.milestones.every((m) => m.status === 'PENDING')).toBe(true);
    expect(await usd()).toMatchObject({ balanced: true, reconciled: true });

    // The old factory loses the order; the new one and the buyer see the change.
    expect((await first.agent.get(`/orders/${code}`)).status).toBeGreaterThanOrEqual(403);
    await second.agent.get(`/orders/${code}`).expect(200);
    const seen = JSON.stringify((await buyer.agent.get(`/orders/${code}`).expect(200)).body);
    expect(seen).toContain(second.code);
    expect(seen).not.toContain(`Exceptions MANUFACTURER`);
    expect((await exceptions()).map((e) => e.factoryChanges)).toEqual([]);
  });

  it('pays the replaced factory what it is owed, from its own balance', async () => {
    const owed = await ctx.prisma.orderRelease.findFirstOrThrow({
      where: { order: { code }, status: 'RELEASED', supersededAt: { not: null } },
    });
    expect(owed.manufacturerProfileId).toBe(first.profileId);
    const adminUser = await ctx.prisma.user.findFirstOrThrow({ where: { role: 'ADMIN' } });
    await ctx.prisma.factoryBankAccount.create({
      data: {
        companyId: first.companyId,
        holderName: `Exceptions MANUFACTURER 5 ${run}`,
        bankName: 'Old Factory Bank',
        bankCountry: 'BD',
        accountNumber: `99887766${run}`,
        currency: 'USD',
        status: 'VERIFIED',
        submittedById: adminUser.id,
      },
    });
    const payable = async (companyId: string) =>
      LedgerBalancesSchema.parse(
        (await admin.get('/admin/finance/balances').expect(200)).body,
      ).accounts.find(
        (a) =>
          a.type === 'MANUFACTURER_PAYABLE' &&
          a.party?.name.includes(
            companyId === first.companyId ? 'MANUFACTURER 5' : 'MANUFACTURER 7',
          ),
      )?.balanceMinor ?? 0;
    const firstBefore = await payable(first.companyId);
    const secondBefore = await payable(second.companyId);
    await admin
      .post(`/admin/finance/releases/${owed.id}/payout`)
      .send({ bankReference: `EXC-${run}` })
      .expect(204);
    expect(firstBefore - (await payable(first.companyId))).toBe(Number(owed.manufacturerMinor));
    expect(await payable(second.companyId)).toBe(secondBefore);
    expect(await usd()).toMatchObject({ balanced: true, reconciled: true });
  });

  it('sends an order that failed QC back into production at the new factory', async () => {
    const qcCode = `ORD-2099-${run}2`;
    await ctx.prisma.order.create({
      data: {
        code: qcCode,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: first.profileId,
        title: 'Exception test polo',
        quantity: 500,
        buyerUnitPriceMinor: 900,
        manufacturerUnitPriceMinor: 700,
        buyerTotalMinor: 450_000n,
        manufacturerTotalMinor: 350_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'US',
        status: 'QC',
      },
    });
    await admin
      .post(`/admin/orders/${qcCode}/replace-factory`)
      .send({
        manufacturerCode: second.code,
        manufacturerUnitPriceMinor: 720,
        reason: 'Failed final twice, the factory cannot rework in time.',
      })
      .expect(204);
    const order = await ctx.prisma.order.findUniqueOrThrow({
      where: { code: qcCode },
      include: { events: true, milestones: true },
    });
    expect(order.status).toBe('IN_PRODUCTION');
    const event = order.events.find((e) => e.fromStatus === 'QC' && e.toStatus === 'IN_PRODUCTION');
    expect(event?.actorUserId).not.toBeNull();
    expect(order.milestones.length).toBeGreaterThan(0);
  });

  it('refuses once the goods are at the hub', async () => {
    const order = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
    const hub = await ctx.prisma.hub.create({
      data: {
        code: `HUB-BD-5${run.slice(-1)}`,
        name: 'Ex hub',
        country: 'BD',
        city: 'Savar',
        addressLine1: 'Bay 2',
      },
    });
    const adminUser = await ctx.prisma.user.findFirstOrThrow({ where: { role: 'ADMIN' } });
    await ctx.prisma.hubReceipt.create({
      data: {
        orderId: order.id,
        hubId: hub.id,
        receivedById: adminUser.id,
        cartonsExpected: 1,
        cartonsReceived: 1,
        condition: 'GOOD',
      },
    });
    const res = await admin.post(`/admin/orders/${code}/replace-factory`).send({
      manufacturerCode: first.code,
      manufacturerUnitPriceMinor: 800,
      reason: 'Trying to move it back again.',
    });
    expect(res.status).toBe(409);
  });
});
