import { hash } from '@node-rs/argon2';
import {
  BuyerOrderLogisticsSchema,
  BuyerShippingOptionSchema,
  isoDate,
  LedgerBalancesSchema,
  PaymentStartSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
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
const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
const PARTNER = 'Quayside Secret Forwarding';
const Options = z.array(BuyerShippingOptionSchema);

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', n: string) {
  const email = uniqueEmail(`lo${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Lo',
      lastName: 'Gistics',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `${type} ${n} Ltd`,
          country: type === 'BUYER' ? 'DE' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-DE-3${run}${n}` } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: `MFR-BD-3${run.slice(-2)}${n}`,
                    isListed: true,
                    categories: { connect: [{ id: TSHIRTS }] },
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
    companyId: user.companyId ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

describe('logistics on orders (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let seq = 0;

  const order = async (status: 'IN_PRODUCTION' | 'READY_TO_SHIP' = 'IN_PRODUCTION') => {
    seq += 1;
    const code = `ORD-2097-${run}${String(seq)}`;
    await ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Organic tee',
        quantity: 2000,
        buyerUnitPriceMinor: 450,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: 900_000n,
        manufacturerTotalMinor: 760_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'DE',
        requestedShipDate: new Date(Date.now() + 30 * DAY),
        status,
      },
    });
    return code;
  };
  const quote = (code: string, body: object) =>
    buyer.agent
      .post(`/orders/${code}/logistics/quotes`)
      .send({ destinationCountry: 'DE', ...body });
  const view = async (code: string) =>
    BuyerOrderLogisticsSchema.parse(
      (await buyer.agent.get(`/orders/${code}/logistics`).expect(200)).body,
    );

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyer = await company(ctx, 'BUYER', '1');
    factory = await company(ctx, 'MANUFACTURER', '1');
    // A fresh price list: only this suite's partner and rules apply.
    await ctx.prisma.rateCard.deleteMany();
    await ctx.prisma.logisticsMarginRule.deleteMany();
    await ctx.prisma.dutyRate.deleteMany();
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'logistics' } });
    await admin
      .post('/admin/logistics/partners')
      .send({ name: PARTNER, kind: 'FORWARDER', country: 'BD' })
      .expect(204);
    const partner = await ctx.prisma.logisticsPartner.findFirstOrThrow({
      where: { name: PARTNER },
    });
    const card = (body: object) =>
      admin
        .post('/admin/logistics/rate-cards')
        .send({
          partnerId: partner.id,
          originCountry: 'BD',
          destinationCountry: 'DE',
          transitDaysMin: 20,
          transitDaysMax: 30,
          validFrom: isoDate(new Date(Date.now() - DAY)),
          validTo: isoDate(new Date(Date.now() + 120 * DAY)),
          ...body,
        })
        .expect(204);
    await card({ mode: 'SEA_LCL', unit: 'PER_CBM', costMinor: 4500, minChargeMinor: 10_000 });
    await card({
      mode: 'SEA_FCL',
      unit: 'PER_CONTAINER',
      containerType: 'GP40',
      costMinor: 180_000,
    });
    await card({
      mode: 'AIR',
      unit: 'PER_KG',
      costMinor: 455,
      transitDaysMin: 4,
      transitDaysMax: 6,
    });
    await card({ mode: 'DDP', unit: 'PER_KG', costMinor: 600 });
    await admin
      .post('/admin/logistics/margins')
      .send({ name: 'Default', markupBps: 1000 })
      .expect(204);
    await admin
      .post('/admin/logistics/duty-rates')
      .send({ hsPrefix: '6109', destinationCountry: 'DE', rateBps: 1200 })
      .expect(204);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('prices each mode from the estimated cargo, without anything about the partner', async () => {
    const code = await order();
    const before = await view(code);
    // 2,000 pcs × 300 g and 1.5 L each.
    expect(before).toMatchObject({
      available: true,
      editable: true,
      accepted: null,
      cargo: { weightGrams: 600_000, volumeLitres: 3_000, estimated: true },
    });

    const res = await quote(code, { incoterm: 'DAP' }).expect(200);
    const options = Options.parse(res.body);
    const by = (mode: string) => options.find((o) => o.mode === mode);
    expect(options.map((o) => o.mode).sort()).toEqual(['AIR', 'SEA_FCL', 'SEA_LCL']);
    // LCL: 3 CBM × $45 = $135, +10% = $148.50. FCL: one 40′ ($1,800 + 10%). Air: 600 kg × $4.55 + 10%.
    expect(by('SEA_LCL')).toMatchObject({
      freightMinor: 14_850,
      insuranceMinor: 0,
      totalMinor: 14_850,
    });
    expect(by('SEA_FCL')?.freightMinor).toBe(198_000);
    expect(by('AIR')).toMatchObject({ freightMinor: 300_300, transitDaysMin: 4 });
    // No HS code yet: the landed cost has no duty in it.
    expect(by('SEA_LCL')?.landedCost).toMatchObject({
      dutyRateBps: null,
      dutyMinor: 0,
      totalMinor: 914_850,
    });
    for (const secret of [PARTNER, 'partnerCost', 'rateCard', 'margin', 'LP-'])
      expect(res.text).not.toContain(secret);

    // CIF is sea only and insured: 0.30% of 110% × (goods + freight).
    const cif = Options.parse((await quote(code, { incoterm: 'CIF' }).expect(200)).body);
    expect(cif.map((o) => o.mode).sort()).toEqual(['SEA_FCL', 'SEA_LCL']);
    expect(cif.find((o) => o.mode === 'SEA_LCL')).toMatchObject({
      insuranceMinor: 3_020,
      totalMinor: 17_870,
    });

    // DDP needs a duty estimate, so it's only offered once staff set the HS code.
    expect(Options.parse((await quote(code, { incoterm: 'DDP' }).expect(200)).body)).toEqual([]);
    await admin
      .patch(`/admin/logistics/orders/${code}/hs-code`)
      .send({ hsCode: '6109.10' })
      .expect(204);
    await admin.patch(`/admin/logistics/orders/${code}/hs-code`).send({ hsCode: '61' }).expect(400);
    const [ddp] = Options.parse((await quote(code, { incoterm: 'DDP' }).expect(200)).body);
    // 600 kg × $6.00 + 10% = $3,960; insurance $42.77; duty 12% of CIF ($13,002.77) = $1,560.34.
    expect(ddp).toMatchObject({
      mode: 'DDP',
      freightMinor: 396_000,
      insuranceMinor: 4_277,
      dutyEstimateMinor: 156_034,
      totalMinor: 556_311,
    });

    const dap = Options.parse((await quote(code, { incoterm: 'DAP' }).expect(200)).body);
    expect(dap.find((o) => o.mode === 'SEA_LCL')?.landedCost).toMatchObject({
      valuation: 'CIF',
      dutyRateBps: 1200,
      dutyMinor: 109_782,
      totalMinor: 1_024_632,
      perPieceMinor: 513,
    });
  });

  it('locks in one option, pays it into escrow, then holds the choice', async () => {
    const code = await order();
    const first = Options.parse(
      (await quote(code, { incoterm: 'DAP', destinationPort: 'DEHAM' }).expect(200)).body,
    );
    const second = Options.parse(
      (await quote(code, { incoterm: 'DAP', destinationPort: 'DEHAM' }).expect(200)).body,
    );
    const stale = first.find((o) => o.mode === 'SEA_LCL');
    const lcl = second.find((o) => o.mode === 'SEA_LCL');
    await buyer.agent
      .post(`/orders/${code}/logistics/quotes/${stale?.quoteId ?? ''}/accept`)
      .expect(404);

    const expiring = second.find((o) => o.mode === 'AIR');
    await ctx.prisma.logisticsQuote.update({
      where: { id: expiring?.quoteId ?? '' },
      data: { validUntil: new Date(Date.now() - 1000) },
    });
    await buyer.agent
      .post(`/orders/${code}/logistics/quotes/${expiring?.quoteId ?? ''}/accept`)
      .expect(409);

    await buyer.agent
      .post(`/orders/${code}/logistics/quotes/${lcl?.quoteId ?? ''}/accept`)
      .expect(204);
    const accepted = await view(code);
    expect(accepted.accepted).toMatchObject({ mode: 'SEA_LCL', totalMinor: 14_850 });
    expect(accepted.outstandingMinor).toBe(14_850);
    expect(accepted).toMatchObject({ destinationCountry: 'DE', destinationPort: 'DEHAM' });
    expect((await ctx.prisma.order.findUniqueOrThrow({ where: { code } })).incoterm).toBe('DAP');

    const start = PaymentStartSchema.parse(
      (
        await buyer.agent
          .post(`/orders/${code}/logistics/payments`)
          .send({ method: 'BANK_TRANSFER' })
          .expect(201)
      ).body,
    );
    expect(start.amountMinor).toBe(14_850);
    expect(start.reference).toMatch(/-L1$/);
    await buyer.agent.post(`/orders/${code}/payments/${start.paymentId}/sent`).send({}).expect(204);
    expect((await view(code)).pending).toBe(true);

    const bytes = Buffer.from('%PDF-1.4\n% statement\n');
    const presign = await admin
      .post(`/admin/finance/payments/${start.paymentId}/uploads`)
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
    await admin
      .post(`/admin/finance/payments/${start.paymentId}/confirm`)
      .send({ proofFileId: fileId, bankReference: `LOG-${run}-1` })
      .expect(204);

    const paid = await view(code);
    expect(paid).toMatchObject({
      paidMinor: 14_850,
      outstandingMinor: 0,
      editable: false,
      pending: false,
    });
    await quote(code, { incoterm: 'CIF' }).expect(409);
    await buyer.agent
      .post(`/orders/${code}/logistics/payments`)
      .send({ method: 'BANK_TRANSFER' })
      .expect(409);
    const balances = LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    );
    for (const c of balances.currencies)
      expect(c).toMatchObject({ balanced: true, reconciled: true, cashMatchesPayments: true });
  });

  it('keeps a paid order from shipping until its shipping charge is in', async () => {
    const code = await order('READY_TO_SHIP');
    const row = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
    // Deposit and balance paid; shipping chosen but not paid.
    for (const [purpose, amountMinor] of [
      ['DEPOSIT', 270_000n],
      ['BALANCE', 630_000n],
    ] as const)
      await recordPaidPayment(ctx, {
        orderId: row.id,
        buyerCompanyId: buyer.companyId,
        purpose,
        amountMinor,
      });
    const [lcl] = Options.parse((await quote(code, { incoterm: 'DAP' }).expect(200)).body).filter(
      (o) => o.mode === 'SEA_LCL',
    );
    await buyer.agent
      .post(`/orders/${code}/logistics/quotes/${lcl?.quoteId ?? ''}/accept`)
      .expect(204);
    // Nobody ships by hand, not even with a paid shipping option.
    const refused = await factory.agent.post(`/orders/${code}/transition`).send({ to: 'SHIPPED' });
    expect(refused.status).toBeGreaterThanOrEqual(400);
    expect(refused.status).toBeLessThan(500);
  });

  it('is the buyer’s alone', async () => {
    const code = await order();
    await factory.agent.get(`/orders/${code}/logistics`).expect(403);
    await factory.agent
      .post(`/orders/${code}/logistics/quotes`)
      .send({ destinationCountry: 'DE', incoterm: 'DAP' })
      .expect(403);
    const other = await company(ctx, 'BUYER', '2');
    await other.agent.get(`/orders/${code}/logistics`).expect(404);
    await other.agent
      .post(`/orders/${code}/logistics/quotes`)
      .send({ destinationCountry: 'DE', incoterm: 'DAP' })
      .expect(404);
    await buyer.agent
      .patch(`/admin/logistics/orders/${code}/hs-code`)
      .send({ hsCode: '610910' })
      .expect(403);
  });
});
