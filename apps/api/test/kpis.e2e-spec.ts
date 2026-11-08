import { hash } from '@node-rs/argon2';
import { DEFAULT_UNIT_ECONOMICS, KpiReportSchema } from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
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
const at = (d: string) => new Date(`${d}Z`);
// A period no other suite writes to, so the numbers are this spec's alone.
const PERIOD = '?from=2031-03-01&to=2031-03-31';

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER') {
  const email = uniqueEmail(`kpi${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Kay',
      lastName: 'Pee',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `KPI ${type} ${run}`,
          country: 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-BD-8${run}` } } }
            : {
                manufacturerProfile: {
                  create: { publicCode: `MFR-BD-8${run.slice(-3)}`, isListed: true },
                },
              }),
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  return {
    agent: await login(ctx, email),
    userId: user.id,
    companyId: user.companyId ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

describe('Phase 1 KPIs and unit economics (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let adminId = '';
  let buyer: Awaited<ReturnType<typeof company>>;

  const report = async () =>
    KpiReportSchema.parse((await admin.get(`/admin/kpis${PERIOD}`).expect(200)).body);

  beforeAll(async () => {
    ctx = await createTestApp();
    const adminEmail = await createAdmin(ctx.prisma);
    admin = await login(ctx, adminEmail);
    adminId = (await ctx.prisma.user.findUniqueOrThrow({ where: { email: adminEmail } })).id;
    await admin.put('/admin/kpis/settings').send(DEFAULT_UNIT_ECONOMICS).expect(200);
    buyer = await company(ctx, 'BUYER');
    const factory = await company(ctx, 'MANUFACTURER');
    const hub = await ctx.prisma.hub.create({
      data: {
        code: `HUB-BD-6${run.slice(-1)}`,
        name: 'KPI hub',
        country: 'BD',
        city: 'Savar',
        addressLine1: 'Shed 3',
      },
    });

    const order = async (
      n: number,
      o: {
        buyer: number;
        factory: number;
        commission: number;
        confirmed: string;
        requested: string;
        atHub: string;
      },
    ) => {
      const row = await ctx.prisma.order.create({
        data: {
          code: `ORD-2031-${run}${String(n)}`,
          buyerCompanyId: buyer.companyId,
          manufacturerProfileId: factory.profileId,
          title: 'KPI tee',
          quantity: 1000,
          buyerUnitPriceMinor: o.buyer / 1000,
          manufacturerUnitPriceMinor: o.factory / 1000,
          buyerTotalMinor: BigInt(o.buyer),
          manufacturerTotalMinor: BigInt(o.factory),
          commissionMinor: BigInt(o.commission),
          currency: 'USD',
          incoterm: 'FOB',
          destinationCountry: 'BD',
          status: 'DELIVERED',
          confirmedAt: at(o.confirmed),
          requestedShipDate: at(o.requested),
          hubReceipts: {
            create: {
              hubId: hub.id,
              receivedById: adminId,
              cartonsExpected: 10,
              cartonsReceived: 10,
              condition: 'GOOD',
              receivedAt: at(o.atHub),
            },
          },
          events: { create: { toStatus: 'DELIVERED', createdAt: at('2031-03-25T00:00:00') } },
        },
      });
      await recordPaidPayment(ctx, {
        orderId: row.id,
        buyerCompanyId: buyer.companyId,
        purpose: 'DEPOSIT',
        amountMinor: BigInt(o.buyer) / 3n,
      });
      return row;
    };

    // The business model's example without the QC fee: USD 5,000 at the factory, 12% margin,
    // 3% commission, shipping 1,050 against 900 freight. On time, passed first time.
    const o1 = await order(1, {
      buyer: 560_000,
      factory: 500_000,
      commission: 15_000,
      confirmed: '2031-03-02T00:00:00',
      requested: '2031-03-10T00:00:00',
      atHub: '2031-03-10T09:00:00',
    });
    await recordPaidPayment(ctx, {
      orderId: o1.id,
      buyerCompanyId: buyer.companyId,
      purpose: 'LOGISTICS',
      amountMinor: 105_000n,
    });
    await ctx.prisma.logisticsQuote.create({
      data: {
        orderId: o1.id,
        status: 'ACCEPTED',
        mode: 'SEA_LCL',
        incoterm: 'CPT',
        originCountry: 'BD',
        destinationCountry: 'US',
        insured: false,
        weightGrams: 1,
        volumeLitres: 1,
        cargoEstimated: false,
        provider: 'MANUAL',
        currency: 'USD',
        partnerCostMinor: 90_000n,
        freightMinor: 105_000n,
        insuranceMinor: 0n,
        totalMinor: 105_000n,
        transitDaysMin: 1,
        transitDaysMax: 2,
        validUntil: at('2031-04-01T00:00:00'),
        acceptedAt: at('2031-03-02T00:00:00'),
      },
    });
    await ctx.prisma.inspection.create({
      data: {
        orderId: o1.id,
        type: 'PRE_SHIPMENT',
        result: 'PASS',
        inspectedAt: at('2031-03-09T00:00:00'),
        createdAt: at('2031-03-01T00:00:00'),
        assignedAt: at('2031-03-01T06:00:00'),
      },
    });

    // A thin repeat order: 5% margin, late at the hub, failed its first final, disputed.
    const o2 = await order(2, {
      buyer: 105_000,
      factory: 100_000,
      commission: 0,
      confirmed: '2031-03-20T00:00:00',
      requested: '2031-03-05T00:00:00',
      atHub: '2031-03-15T00:00:00',
    });
    for (const [result, day] of [
      ['FAIL', '14'],
      ['PASS', '20'],
    ] as const)
      await ctx.prisma.inspection.create({
        data: {
          orderId: o2.id,
          type: 'PRE_SHIPMENT',
          result,
          inspectedAt: at(`2031-03-${day}T00:00:00`),
          createdAt: at('2031-03-12T00:00:00'),
        },
      });
    await ctx.prisma.dispute.create({
      data: {
        orderId: o2.id,
        openedById: buyer.userId,
        reason: 'QUALITY',
        description: 'Stitching defects on a carton',
        descriptionFiltered: 'Stitching defects on a carton',
      },
    });
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('works out each order’s contribution like the business model', async () => {
    const r = await report();
    expect(r.orders).toBe(2);
    const [thin, polo] = r.economics; // newest first
    // 6,650 paid; 900 gross; 2.5% fees 166.25; merchandising 100; 1% reserve 66.50.
    expect(polo).toMatchObject({
      buyerPaysMinor: 665_000,
      grossRevenueMinor: 90_000,
      paymentFeesMinor: 16_625,
      merchandisingMinor: 10_000,
      claimsReserveMinor: 6_650,
      contributionMinor: 56_725,
      buyerCode: `BYR-BD-8${run}`,
    });
    expect(thin?.contributionMinor).toBe(5_000 - 2_625 - 10_000 - 1_050);
    expect(r).toMatchObject({
      gmvUsdMinor: 665_000,
      grossRevenueUsdMinor: 95_000,
      takeRateBps: Math.floor((95_000 * 10_000) / 665_000),
      positiveContributionBps: 5_000,
    });
  });

  it('measures on-time, first pass, repeat buyers, claims and inspector assignment', async () => {
    expect(await report()).toMatchObject({
      shipped: 2,
      onTimeBps: 5_000,
      finalInspections: 2,
      firstPassBps: 5_000,
      repeatBuyerBps: 10_000,
      delivered: 2,
      claimRateBps: 5_000,
      inspectorAssignHours: 6,
    });
  });

  it('tracks the gates and lets staff change the assumptions', async () => {
    const r = await report();
    expect(r.paidOrders).toBeGreaterThanOrEqual(2);
    const g1 = r.gates.find((g) => g.gate === 1);
    expect(g1?.checks.find((c) => c.key === 'ON_TIME')).toMatchObject({
      actual: 5_000,
      target: 8_500,
      met: false,
    });
    expect(g1?.met).toBe(false);

    await admin
      .put('/admin/kpis/settings')
      .send({ ...DEFAULT_UNIT_ECONOMICS, merchandisingUsdMinor: 0 })
      .expect(200);
    const after = await report();
    expect(after.contributionUsdMinor).toBe(r.contributionUsdMinor + 20_000);
    expect(after.positiveContributionBps).toBe(10_000);
    await admin.put('/admin/kpis/settings').send(DEFAULT_UNIT_ECONOMICS).expect(200);
    await admin
      .put('/admin/kpis/settings')
      .send({ ...DEFAULT_UNIT_ECONOMICS, paymentFeeBps: -1 })
      .expect(400);
  });

  it('is for staff only', async () => {
    await buyer.agent.get(`/admin/kpis${PERIOD}`).expect(403);
    await client(ctx.app).get(`/admin/kpis${PERIOD}`).expect(401);
    await admin.get('/admin/kpis?from=2031-03-31&to=2031-03-01').expect(400);
  });
});
