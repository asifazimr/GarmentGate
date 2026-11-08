import { hash } from '@node-rs/argon2';
import {
  BuyerPaymentsSchema,
  DEFAULT_SERVICE_FEES,
  LedgerBalancesSchema,
  PaymentStartSchema,
  ServiceFeesSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
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

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER') {
  const email = uniqueEmail(`fee${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Fee',
      lastName: 'Tester',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `Fees ${type} ${run}`,
          country: type === 'BUYER' ? 'US' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-US-9${run}` } } }
            : {
                manufacturerProfile: {
                  create: { publicCode: `MFR-BD-9${run.slice(-3)}`, isListed: true },
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
  };
}

describe('service fees, the sample credit, the holdback and the claim window (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  const code = `ORD-2098-${run}1`;
  let transfers = 0;

  const payments = async () =>
    BuyerPaymentsSchema.parse((await buyer.agent.get(`/orders/${code}/payments`).expect(200)).body);
  const revenue = async () =>
    LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    ).currencies.find((c) => c.currency === 'USD');
  /** Pays by bank transfer, confirmed by staff with a proof: the real settle path. */
  const payAndConfirm = async (start: () => Promise<{ body: unknown }>) => {
    const { paymentId } = PaymentStartSchema.parse((await start()).body);
    const bytes = Buffer.from('%PDF-1.4\n% statement\n');
    const presign = await admin
      .post(`/admin/finance/payments/${paymentId}/uploads`)
      .send({ fileName: 's.pdf', contentType: 'application/pdf', sizeBytes: bytes.length })
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
    const confirmed = await admin
      .post(`/admin/finance/payments/${paymentId}/confirm`)
      .send({ proofFileId: fileId, bankReference: `FEE-${run}-${String((transfers += 1))}` });
    expect(confirmed.status, confirmed.text).toBe(204);
  };

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    await ctx.prisma.platformSetting.deleteMany({
      where: { key: { in: ['service_fees', 'release_schedule'] } },
    });
    buyer = await company(ctx, 'BUYER');
    factory = await company(ctx, 'MANUFACTURER');
    await ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Fee test hoodie',
        quantity: 1000,
        buyerUnitPriceMinor: 1_000,
        manufacturerUnitPriceMinor: 800,
        buyerTotalMinor: 1_000_000n,
        manufacturerTotalMinor: 800_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'US',
        depositBps: 3000,
        status: 'DRAFT',
      },
    });
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('has staff-editable fees with the business model’s defaults', async () => {
    expect(
      ServiceFeesSchema.parse((await admin.get('/admin/finance/fees').expect(200)).body),
    ).toEqual(DEFAULT_SERVICE_FEES);
    await admin
      .put('/admin/finance/fees')
      .send({ ...DEFAULT_SERVICE_FEES, claimWindowDays: 0 })
      .expect(400);
    await buyer.agent.get('/admin/finance/fees').expect(403);
  });

  it('charges a sample fee, which becomes revenue once paid', async () => {
    await buyer.agent.post(`/orders/${code}/samples`).send({ quantity: 2 }).expect(204);
    const before = await payments();
    expect(before.fees).toEqual([
      expect.objectContaining({ purpose: 'SAMPLE_FEE', chargedMinor: 7_500, dueMinor: 7_500 }),
    ]);
    await factory.agent
      .post(`/orders/${code}/fees/payments`)
      .send({ purpose: 'SAMPLE_FEE', method: 'BANK_TRANSFER' })
      .expect(403);
    const revenueBefore = (await revenue())?.revenueMinor ?? 0;
    await payAndConfirm(() =>
      buyer.agent
        .post(`/orders/${code}/fees/payments`)
        .send({ purpose: 'SAMPLE_FEE', method: 'BANK_TRANSFER' })
        .expect(201),
    );
    expect((await payments()).fees[0]).toMatchObject({ paidMinor: 7_500, dueMinor: 0 });
    const after = await revenue();
    expect((after?.revenueMinor ?? 0) - revenueBefore).toBe(7_500);
    expect(after).toMatchObject({ balanced: true, reconciled: true });
    await buyer.agent
      .post(`/orders/${code}/fees/payments`)
      .send({ purpose: 'SAMPLE_FEE', method: 'BANK_TRANSFER' })
      .expect(409); // nothing left to pay
  });

  it('credits the sample fee against the balance when the bulk deposit arrives', async () => {
    // The sample was approved; the buyer confirms the bulk order on the default schedule.
    await ctx.prisma.order.update({ where: { code }, data: { status: 'SAMPLE_APPROVED' } });
    await buyer.agent
      .post(`/orders/${code}/transition`)
      .send({ to: 'DEPOSIT_PENDING' })
      .expect(204);
    const releases = await ctx.prisma.orderRelease.findMany({
      where: { order: { code } },
      orderBy: { buyerMinor: 'asc' },
    });
    expect(releases.map((r) => [r.trigger, r.bps])).toEqual([
      ['CLAIM_WINDOW', 500],
      ['PRODUCTION_START', 2500],
      ['SHIPPED', 7000],
    ]);

    await payAndConfirm(() =>
      buyer.agent
        .post(`/orders/${code}/payments`)
        .send({ purpose: 'DEPOSIT', method: 'BANK_TRANSFER' })
        .expect(201),
    );
    const p = await payments();
    expect(p.sampleCreditMinor).toBe(7_500);
    // 70% balance less the credited sample fee.
    expect(p.plan.find((x) => x.purpose === 'BALANCE')?.amountMinor).toBe(700_000 - 7_500);
    expect((await ctx.prisma.order.findUniqueOrThrow({ where: { code } })).status).toBe(
      'IN_PRODUCTION',
    );
    expect(await revenue()).toMatchObject({ balanced: true, reconciled: true });
  });

  it('gives the buyer its first inspection free and charges the next day', async () => {
    await buyer.agent
      .post(`/orders/${code}/inspections`)
      .send({ type: 'DURING_PRODUCTION', scheduledAt: new Date(Date.now() + 3 * DAY) })
      .expect(201);
    await admin.post(`/orders/${code}/transition`).send({ to: 'QC' }).expect(204);
    const inspection = (await payments()).fees.find((f) => f.purpose === 'INSPECTION_FEE');
    expect(inspection?.items.map((i) => i.waived)).toEqual([true, false]);
    expect(inspection).toMatchObject({ chargedMinor: 20_000, dueMinor: 20_000 });
  });

  it('holds 5% back until the claim window after delivery closes', async () => {
    const order = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
    await ctx.prisma.order.update({ where: { id: order.id }, data: { status: 'DELIVERED' } });
    const delivered = await ctx.prisma.orderEvent.create({
      data: { orderId: order.id, toStatus: 'DELIVERED', createdAt: new Date(Date.now() - DAY) },
    });
    const holdback = () =>
      ctx.prisma.orderRelease.findFirstOrThrow({
        where: { orderId: order.id, trigger: 'CLAIM_WINDOW' },
      });

    // Inside the window: still held back, and the buyer can still claim.
    await admin.get('/admin/finance/inbox').expect(200);
    expect((await holdback()).status).toBe('SCHEDULED');

    // 15 days on: the window has closed, the holdback is due and claims are refused.
    await ctx.prisma.orderEvent.update({
      where: { id: delivered.id },
      data: { createdAt: new Date(Date.now() - 15 * DAY) },
    });
    const late = await buyer.agent
      .post(`/orders/${code}/dispute`)
      .send({ reason: 'QUALITY', description: 'Seams opened after a week of wear and washing.' });
    expect(late.status).toBe(409);
    expect(late.text).toContain('claim window');
    await admin.get('/admin/finance/inbox').expect(200);
    expect((await holdback()).status).toBe('DUE');
  });
});
