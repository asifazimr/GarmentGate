import { hash } from '@node-rs/argon2';
import {
  AdminPlansSchema,
  BuyerPaymentsSchema,
  BuyerPlusSchema,
  DEFAULT_BUYER_PLUS_SETTINGS,
  ManufacturerRfqSummarySchema,
} from '@garmentgate/shared';
import Stripe from 'stripe';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { chargeInspection } from '../src/modules/payments/charges.js';
import { STRIPE_CLIENT } from '../src/modules/payments/providers/stripe.provider.js';
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
const DAY = 86_400_000;

const stripe = new Stripe('sk_test_offline');
const sessions = vi.spyOn(stripe.checkout.sessions, 'create').mockImplementation(
  (params) =>
    Promise.resolve({
      id: `cs_${String(params?.client_reference_id)}`,
      url: `https://checkout.stripe.test/${String(params?.client_reference_id)}`,
    }) as unknown as ReturnType<typeof stripe.checkout.sessions.create>,
);
vi.spyOn(stripe.customers, 'create').mockImplementation(
  () =>
    Promise.resolve({ id: `cus_plus_${run}` }) as unknown as ReturnType<
      typeof stripe.customers.create
    >,
);

function signed(type: string, object: object) {
  const payload = JSON.stringify({
    id: `evt_${type}_${String(Math.random()).slice(2)}`,
    object: 'event',
    type,
    data: { object },
  });
  return {
    payload,
    signature: stripe.webhooks.generateTestHeaderString({ payload, secret: 'whsec_test_offline' }),
  };
}

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(
  ctx: TestContext,
  type: 'BUYER' | 'MANUFACTURER',
  n: string,
  categoryId: string,
) {
  const email = uniqueEmail(`plus${type.toLowerCase()}`);
  const code = `${type === 'BUYER' ? 'BYR' : 'MFR'}-GB-${n}${run.slice(-3)}`;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Plus',
      lastName: 'Tester',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `Plus ${type} ${n} ${run}`,
          country: 'GB',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: code } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: code,
                    isListed: true,
                    categories: { connect: [{ id: categoryId }] },
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
    code,
    companyId: user.companyId ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

describe('GarmentGate Plus (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let adminId = '';
  let categoryId = '';
  let member: Awaited<ReturnType<typeof company>>;
  let regular: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  const plus = async (agent: Agent) =>
    BuyerPlusSchema.parse((await agent.get('/buyer/plus').expect(200)).body);
  const hook = (type: string, object: object) => {
    const { payload, signature } = signed(type, object);
    return client(ctx.app)
      .post('/payments/stripe/webhook')
      .set('stripe-signature', signature)
      .set('content-type', 'application/json')
      .send(payload)
      .expect(200);
  };
  const order = (code: string, buyerCompanyId: string) =>
    ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId,
        manufacturerProfileId: factory.profileId,
        title: 'Plus test polo',
        quantity: 1000,
        buyerUnitPriceMinor: 1_000,
        manufacturerUnitPriceMinor: 800,
        buyerTotalMinor: 1_000_000n,
        manufacturerTotalMinor: 800_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'GB',
        depositBps: 3000,
        status: 'DRAFT',
      },
    });

  beforeAll(async () => {
    ctx = await createTestApp((b) => b.overrideProvider(STRIPE_CLIENT).useValue(stripe));
    const adminEmail = await createAdmin(ctx.prisma);
    admin = await login(ctx, adminEmail);
    adminId = (await ctx.prisma.user.findUniqueOrThrow({ where: { email: adminEmail } })).id;
    await ctx.prisma.platformSetting.deleteMany({
      where: { key: { in: ['service_fees', 'buyer_plus'] } },
    });
    categoryId = (
      await ctx.prisma.category.create({
        data: { slug: `plus-polos-${run}`, name: `Plus polos ${run}` },
      })
    ).id;
    member = await company(ctx, 'BUYER', '1', categoryId);
    regular = await company(ctx, 'BUYER', '2', categoryId);
    factory = await company(ctx, 'MANUFACTURER', '3', categoryId);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('has staff-editable terms', async () => {
    expect((await admin.get('/admin/plus/settings').expect(200)).body).toEqual(
      DEFAULT_BUYER_PLUS_SETTINGS,
    );
    await admin
      .put('/admin/plus/settings')
      .send({ ...DEFAULT_BUYER_PLUS_SETTINGS, sampleDiscountBps: 20_000 })
      .expect(400);
    await member.agent.get('/admin/plus/settings').expect(403);
    await factory.agent.get('/buyer/plus').expect(403);
  });

  it('joins by card through Stripe and asks staff for a merchandiser', async () => {
    expect(await plus(member.agent)).toMatchObject({ active: false, subscription: null });
    await member.agent.post('/buyer/plus/checkout').send({ interval: 'YEAR' }).expect(200);
    const params = sessions.mock.calls.at(-1)?.[0];
    expect(params?.line_items?.[0]?.price_data).toMatchObject({
      unit_amount: 49_000,
      recurring: { interval: 'year' },
    });
    expect(params?.success_url).toMatch(/\/buyer\/plus\?checkout=success$/);
    const rowId = String(params?.client_reference_id);
    await hook('customer.subscription.updated', {
      id: `sub_plus_${run}`,
      object: 'subscription',
      status: 'active',
      cancel_at_period_end: false,
      metadata: { subscriptionId: rowId },
      items: { data: [{ current_period_end: Math.floor((Date.now() + 365 * DAY) / 1000) }] },
    });
    expect(await plus(member.agent)).toMatchObject({
      active: true,
      subscription: { source: 'STRIPE', status: 'ACTIVE', interval: 'YEAR' },
      merchandiser: null,
    });
    expect(
      await ctx.prisma.notification.count({
        where: { userId: adminId, title: `Assign a merchandiser to ${member.code}` },
      }),
    ).toBe(1);
    const staff = AdminPlansSchema.parse((await admin.get('/admin/plans').expect(200)).body);
    expect(staff.counts.PLUS).toBeGreaterThanOrEqual(1);
    expect(staff.subscriptions.find((s) => s.id === rowId)).toMatchObject({
      tier: 'PLUS',
      account: { kind: 'BUYER', code: member.code },
    });
  });

  it('halves sample fees and waives inspections for members only', async () => {
    const memberOrder = `ORD-2097-${run}1`;
    const regularOrder = `ORD-2097-${run}2`;
    await order(memberOrder, member.companyId);
    await order(regularOrder, regular.companyId);
    await member.agent.post(`/orders/${memberOrder}/samples`).send({ quantity: 1 }).expect(204);
    await regular.agent.post(`/orders/${regularOrder}/samples`).send({ quantity: 1 }).expect(204);
    const fees = async (agent: Agent, code: string) =>
      BuyerPaymentsSchema.parse((await agent.get(`/orders/${code}/payments`).expect(200)).body)
        .fees;
    expect(await fees(member.agent, memberOrder)).toEqual([
      expect.objectContaining({ purpose: 'SAMPLE_FEE', chargedMinor: 3_750 }),
    ]);
    expect(await fees(regular.agent, regularOrder)).toEqual([
      expect.objectContaining({ purpose: 'SAMPLE_FEE', chargedMinor: 7_500 }),
    ]);

    // Second inspections (the first is free for everyone by default).
    const inspect = async (code: string, buyerCompanyId: string) => {
      const o = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
      for (const type of ['DURING_PRODUCTION', 'PRE_SHIPMENT'] as const) {
        const i = await ctx.prisma.inspection.create({ data: { orderId: o.id, type } });
        await ctx.prisma.$transaction((tx) =>
          chargeInspection(tx, { id: o.id, currency: 'USD', buyerCompanyId }, i.id),
        );
      }
      return ctx.prisma.orderCharge.findMany({
        where: { orderId: o.id, kind: 'INSPECTION_FEE' },
        orderBy: { createdAt: 'asc' },
        select: { waived: true },
      });
    };
    expect(await inspect(memberOrder, member.companyId)).toEqual([
      { waived: true },
      { waived: true },
    ]);
    expect(await inspect(regularOrder, regular.companyId)).toEqual([
      { waived: true },
      { waived: false },
    ]);
  });

  it('flags members’ RFQs as priority for factories, without naming them', async () => {
    const publish = async (agent: Agent, title: string) =>
      (
        (
          await agent
            .post('/rfqs')
            .send({
              categoryId,
              title,
              description: 'Pique polo shirts, 200 GSM, embroidered chest logo, five colours.',
              quantity: 3000,
              currency: 'USD',
              deadline: new Date(Date.now() + 10 * DAY).toISOString(),
              destinationCountry: 'GB',
              incoterm: 'FOB',
            })
            .expect(201)
        ).body as { code: string }
      ).code;
    // The regular buyer's RFQ closes sooner, so it would come first by deadline alone.
    const regularCode = await publish(regular.agent, `Regular polos ${run}`);
    const memberCode = await publish(member.agent, `Member polos ${run}`);
    await ctx.prisma.rfq.update({
      where: { code: regularCode },
      data: { deadline: new Date(Date.now() + 5 * DAY) },
    });
    const inbox = ManufacturerRfqSummarySchema.array()
      .parse((await factory.agent.get('/manufacturer/rfqs').expect(200)).body)
      .filter((r) => [regularCode, memberCode].includes(r.code));
    expect(inbox.map((r) => [r.code, r.priority])).toEqual([
      [memberCode, true],
      [regularCode, false],
    ]);
    expect(JSON.stringify(inbox)).not.toMatch(/Plus BUYER/);

    // Staff can switch the perk off.
    await admin
      .put('/admin/plus/settings')
      .send({ ...DEFAULT_BUYER_PLUS_SETTINGS, priorityRfqs: false })
      .expect(200);
    const off = ManufacturerRfqSummarySchema.array().parse(
      (await factory.agent.get('/manufacturer/rfqs').expect(200)).body,
    );
    expect(off.find((r) => r.code === memberCode)?.priority).toBe(false);
  });

  it('lets staff grant and end memberships, but not on top of a card plan', async () => {
    expect(
      (await admin.put(`/admin/buyers/${member.code}/plus`).send({ plus: true, note: 'Promotion' }))
        .status,
    ).toBe(409);
    await admin
      .put(`/admin/buyers/${regular.code}/plus`)
      .send({
        plus: true,
        note: 'Trade show offer',
        endsOn: new Date(Date.now() + 30 * DAY).toISOString().slice(0, 10),
      })
      .expect(204);
    expect((await plus(regular.agent)).active).toBe(true);
    await admin
      .put(`/admin/buyers/${regular.code}/plus`)
      .send({ plus: false, note: 'Offer withdrawn' })
      .expect(204);
    expect((await plus(regular.agent)).active).toBe(false);
  });
});
