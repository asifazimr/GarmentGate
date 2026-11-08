import { hash } from '@node-rs/argon2';
import {
  AdminPlansSchema,
  FactoryPlanSchema,
  LedgerBalancesSchema,
  ManufacturerProductSchema,
  ManufacturerRfqSummarySchema,
} from '@garmentgate/shared';
import Stripe from 'stripe';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { STRIPE_CLIENT } from '../src/modules/payments/providers/stripe.provider.js';
import { PlansService } from '../src/modules/plans/plans.service.js';
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

// Stripe without the network: the real SDK (for webhook signatures), API calls stubbed.
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
    Promise.resolve({ id: `cus_${run}` }) as unknown as ReturnType<typeof stripe.customers.create>,
);
const updates = vi
  .spyOn(stripe.subscriptions, 'update')
  .mockImplementation(
    (id) => Promise.resolve({ id }) as unknown as ReturnType<typeof stripe.subscriptions.update>,
  );
const cancels = vi
  .spyOn(stripe.subscriptions, 'cancel')
  .mockImplementation(
    (id) => Promise.resolve({ id }) as unknown as ReturnType<typeof stripe.subscriptions.cancel>,
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
  const email = uniqueEmail(`plan${type.toLowerCase()}`);
  const code = `${type === 'BUYER' ? 'BYR' : 'MFR'}-BD-${n}${run.slice(-3)}`;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Plan',
      lastName: 'Tester',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `Plan ${type} ${n} ${run}`,
          country: 'BD',
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
    profileId: user.company?.manufacturerProfile?.id ?? '',
    userId: user.id,
  };
}

const product = (status: 'DRAFT' | 'PUBLISHED', categoryId: string) => ({
  title: `Plan tee ${run}`,
  categoryId,
  moqPcs: 500,
  leadTimeDays: 30,
  currency: 'USD',
  priceTiers: [{ minQty: 500, unitPriceMinor: 1000 }],
  status,
});

describe('factory plans (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let categoryId = '';
  let free: Awaited<ReturnType<typeof company>>;
  let carded: Awaited<ReturnType<typeof company>>;
  let buyer: Awaited<ReturnType<typeof company>>;
  const plan = async (agent: Agent) =>
    FactoryPlanSchema.parse((await agent.get('/manufacturer/plan').expect(200)).body);
  const hook = (type: string, object: object) => {
    const { payload, signature } = signed(type, object);
    return client(ctx.app)
      .post('/payments/stripe/webhook')
      .set('stripe-signature', signature)
      .set('content-type', 'application/json')
      .send(payload)
      .expect(200);
  };

  beforeAll(async () => {
    ctx = await createTestApp((b) => b.overrideProvider(STRIPE_CLIENT).useValue(stripe));
    admin = await login(ctx, await createAdmin(ctx.prisma));
    const category = await ctx.prisma.category.create({
      data: { slug: `plan-tees-${run}`, name: `Plan tees ${run}` },
    });
    categoryId = category.id;
    await ctx.prisma.marginRule.create({
      data: { name: `Plan tees ${run}`, markupBps: 1000, categoryId },
    });
    free = await company(ctx, 'MANUFACTURER', '1', categoryId);
    carded = await company(ctx, 'MANUFACTURER', '2', categoryId);
    buyer = await company(ctx, 'BUYER', '3', categoryId);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('limits listed products on Free, and staff grants lift the limit and the markup', async () => {
    const start = await plan(free.agent);
    expect(start).toMatchObject({ tier: 'FREE', subscription: null, cardEnabled: true });
    expect(start.terms.PRO.monthlyUsdMinor).toBe(9_900);

    const first = ManufacturerProductSchema.parse(
      (
        await free.agent
          .post('/manufacturer/products')
          .send(product('PUBLISHED', categoryId))
          .expect(201)
      ).body,
    );
    const buyerPrice = async () =>
      (await ctx.prisma.productPriceTier.findFirstOrThrow({ where: { productId: first.id } }))
        .buyerUnitPriceMinor;
    expect(await buyerPrice()).toBe(1100); // 10% markup on Free

    // Fill the Free allowance (10 listed); drafts never count.
    await ctx.prisma.product.createMany({
      data: Array.from({ length: 9 }, (_, i) => ({
        manufacturerProfileId: free.profileId,
        categoryId,
        title: `Filler ${String(i)}`,
        moqPcs: 100,
        leadTimeDays: 30,
        currency: 'USD' as const,
        status: 'PUBLISHED' as const,
      })),
    });
    const refused = await free.agent
      .post('/manufacturer/products')
      .send(product('PUBLISHED', categoryId));
    expect(refused.status).toBe(409);
    expect((refused.body as { message: string }).message).toMatch(/Free plan lists up to 10/);
    const draft = ManufacturerProductSchema.parse(
      (
        await free.agent
          .post('/manufacturer/products')
          .send(product('DRAFT', categoryId))
          .expect(201)
      ).body,
    );
    expect(
      (
        await free.agent
          .put(`/manufacturer/products/${draft.id}`)
          .send(product('PUBLISHED', categoryId))
      ).status,
    ).toBe(409);

    // Staff put the factory on Pro (paid by bank transfer): booked as revenue once.
    await admin
      .put(`/admin/manufacturers/${free.code}/plan`)
      .send({ tier: 'PRO', note: 'Paid by transfer', paidUsdMinor: 99_000 })
      .expect(400); // needs the reference
    await admin
      .put(`/admin/manufacturers/${free.code}/plan`)
      .send({
        tier: 'PRO',
        note: 'Paid by transfer',
        paidUsdMinor: 99_000,
        bankReference: `TT-${run}`,
        endsOn: new Date(Date.now() + 365 * DAY).toISOString().slice(0, 10),
      })
      .expect(204);
    const pro = await plan(free.agent);
    expect(pro.tier).toBe('PRO');
    expect(pro.subscription).toMatchObject({ tier: 'PRO', source: 'MANUAL', status: 'ACTIVE' });
    expect(pro.invoices).toHaveLength(1);
    expect(await buyerPrice()).toBe(1090); // repriced: 1 point off the markup
    await free.agent
      .put(`/manufacturer/products/${draft.id}`)
      .send(product('PUBLISHED', categoryId))
      .expect(200);
    const profile = await ctx.prisma.manufacturerProfile.findUniqueOrThrow({
      where: { id: free.profileId },
    });
    expect(profile).toMatchObject({ planTier: 'PRO', searchBoost: 1 });

    // Staff grants are ended by staff; the sweep ends lapsed ones.
    expect((await free.agent.post('/manufacturer/plan/cancel')).status).toBe(409);
    await ctx.prisma.planSubscription.updateMany({
      where: { manufacturerProfileId: free.profileId, status: 'ACTIVE' },
      data: { currentPeriodEnd: new Date(Date.now() - DAY) },
    });
    await ctx.app.get(PlansService).sweep();
    expect((await plan(free.agent)).tier).toBe('FREE');
    expect(await buyerPrice()).toBe(1100);
  });

  it('runs card plans through Stripe Checkout and webhooks, booking each invoice once', async () => {
    const res = await carded.agent
      .post('/manufacturer/plan/checkout')
      .send({ tier: 'PREMIUM', interval: 'MONTH' })
      .expect(200);
    const url = (res.body as { url: string }).url;
    expect(url).toMatch(/^https:\/\/checkout\.stripe\.test\//);
    const params = sessions.mock.calls.at(-1)?.[0];
    expect(params?.mode).toBe('subscription');
    expect(params?.line_items?.[0]?.price_data).toMatchObject({
      currency: 'usd',
      unit_amount: 24_900,
      recurring: { interval: 'month' },
    });
    const rowId = String(params?.client_reference_id);
    expect((await plan(carded.agent)).tier).toBe('FREE'); // nothing until Stripe says so

    const sub = (status: string, extra: object = {}) => ({
      id: `sub_${run}`,
      object: 'subscription',
      status,
      cancel_at_period_end: false,
      metadata: { subscriptionId: rowId },
      items: {
        data: [{ current_period_end: Math.floor((Date.now() + 30 * DAY) / 1000) }],
      },
      ...extra,
    });
    await hook('checkout.session.completed', {
      id: `cs_${rowId}`,
      object: 'checkout.session',
      mode: 'subscription',
      client_reference_id: rowId,
      metadata: { subscriptionId: rowId },
      subscription: `sub_${run}`,
    });
    await hook('customer.subscription.updated', sub('active'));
    const premium = await plan(carded.agent);
    expect(premium).toMatchObject({
      tier: 'PREMIUM',
      subscription: { tier: 'PREMIUM', source: 'STRIPE', status: 'ACTIVE', interval: 'MONTH' },
    });

    // Staff can't stack a grant on a card plan.
    expect(
      (
        await admin
          .put(`/admin/manufacturers/${carded.code}/plan`)
          .send({ tier: 'PRO', note: 'Promotion' })
      ).status,
    ).toBe(409);

    const invoice = {
      id: `in_${run}`,
      object: 'invoice',
      amount_paid: 24_900,
      currency: 'usd',
      parent: {
        type: 'subscription_details',
        subscription_details: { subscription: `sub_${run}`, metadata: { subscriptionId: rowId } },
      },
      lines: { data: [{ period: { start: 0, end: Math.floor((Date.now() + 30 * DAY) / 1000) } }] },
    };
    await hook('invoice.paid', invoice);
    await hook('invoice.paid', invoice); // replayed
    expect(
      await ctx.prisma.ledgerTransaction.count({
        where: { idempotencyKey: `sub-invoice:in_${run}` },
      }),
    ).toBe(1);
    expect((await plan(carded.agent)).invoices).toEqual([
      expect.objectContaining({ amountMinor: 24_900, currency: 'USD' }),
    ]);

    const staff = AdminPlansSchema.parse((await admin.get('/admin/plans').expect(200)).body);
    expect(staff.mrrUsdMinor).toBeGreaterThanOrEqual(24_900);
    expect(staff.subscriptions.find((s) => s.id === rowId)).toMatchObject({
      paidUsdMinor: 24_900,
      account: { kind: 'FACTORY', code: carded.code },
    });

    // Cancel at period end, then Stripe ends it.
    await carded.agent.post('/manufacturer/plan/cancel').expect(204);
    expect(updates).toHaveBeenLastCalledWith(`sub_${run}`, { cancel_at_period_end: true });
    expect((await plan(carded.agent)).subscription?.cancelAtPeriodEnd).toBe(true);
    await hook('customer.subscription.deleted', sub('canceled', { cancel_at_period_end: true }));
    expect((await plan(carded.agent)).tier).toBe('FREE');
    // A late "updated" never revives a cancelled plan.
    await hook('customer.subscription.updated', sub('active'));
    expect((await plan(carded.agent)).tier).toBe('FREE');
    expect(cancels).not.toHaveBeenCalled();
  });

  it('gives Premium factories a head start on new open RFQs', async () => {
    await admin
      .put(`/admin/manufacturers/${carded.code}/plan`)
      .send({ tier: 'PREMIUM', note: 'Launch promotion' })
      .expect(204);
    const created = await buyer.agent
      .post('/rfqs')
      .send({
        categoryId,
        title: `Plan tee RFQ ${run}`,
        description: 'Heavyweight cotton tee, 220 GSM, boxy fit, four colours.',
        quantity: 2000,
        currency: 'USD',
        deadline: new Date(Date.now() + 10 * DAY).toISOString(),
        destinationCountry: 'DE',
        incoterm: 'FOB',
      })
      .expect(201);
    const code = (created.body as { code: string }).code;
    const rfqRow = (c: string) => ctx.prisma.rfq.findUniqueOrThrow({ where: { code: c } });
    const inbox = async (agent: Agent) =>
      ManufacturerRfqSummarySchema.array()
        .parse((await agent.get('/manufacturer/rfqs').expect(200)).body)
        .map((r) => r.code);
    expect(await inbox(carded.agent)).toContain(code);
    expect(await inbox(free.agent)).not.toContain(code);
    await free.agent.get(`/manufacturer/rfqs/${code}`).expect(404);
    const notified = (userId: string) =>
      ctx.prisma.notification.count({
        where: { userId, type: 'RFQ_INVITATION', title: `New RFQ ${code}` },
      });
    expect(await notified(carded.userId)).toBe(1);
    expect(await notified(free.userId)).toBe(0);
    await expect(rfqRow(code)).resolves.toMatchObject({ headStartEndsAt: expect.any(Date) });

    // A day later the wait is over: the Free factory sees it and is told, once.
    const rfq = await ctx.prisma.rfq.findUniqueOrThrow({ where: { code } });
    await ctx.prisma.rfq.update({
      where: { id: rfq.id },
      data: { headStartEndsAt: new Date(Date.now() - DAY) },
    });
    await ctx.prisma.rfqInvitation.updateMany({
      where: { rfqId: rfq.id, manufacturerProfileId: free.profileId },
      data: { invitedAt: new Date(Date.now() - 2 * DAY), visibleAt: new Date(Date.now() - DAY) },
    });
    expect(await inbox(free.agent)).toContain(code);
    const plans = ctx.app.get(PlansService);
    expect((await plans.sweep()).announced).toBe(1);
    expect((await plans.sweep()).announced).toBe(0);
    expect(await notified(free.userId)).toBe(1);

    // Premium's quote carries 2 points off the markup.
    await carded.agent
      .put(`/manufacturer/rfqs/${code}/quote`)
      .send({ unitPriceMinor: 1000, leadTimeDays: 40 })
      .expect((r) => {
        expect(r.status).toBeLessThan(300);
      });
    const quote = await ctx.prisma.quote.findFirstOrThrow({
      where: { rfqId: rfq.id, manufacturerProfileId: carded.profileId },
    });
    expect(quote.buyerUnitPriceMinor).toBe(1080);
  });

  it('keeps the books whole: plan payments are cash in', async () => {
    const balances = LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    );
    for (const c of balances.currencies)
      expect(c).toMatchObject({ balanced: true, reconciled: true, cashMatchesPayments: true });
  });

  it('keeps plan routes to their roles', async () => {
    await buyer.agent.get('/manufacturer/plan').expect(403);
    await free.agent.get('/admin/plans').expect(403);
    await free.agent.put('/admin/plans/settings').send({}).expect(403);
  });
});
