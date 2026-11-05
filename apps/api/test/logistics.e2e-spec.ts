import {
  DutyRateSchema,
  FreightOptionSchema,
  HubSchema,
  isoDate,
  LogisticsPartnerSchema,
  RateCardSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  registerAgent,
  type TestContext,
} from './helpers.js';

type Agent = ReturnType<typeof client>;
const DAY = 86_400_000;
const today = isoDate(new Date());
const plus = (days: number) => isoDate(new Date(Date.now() + days * DAY));

describe('logistics foundations (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let partnerId = '';
  let slowPartnerId = '';

  const quote = (body: object) =>
    admin.post('/admin/logistics/quote-preview').send({
      originCountry: 'BD',
      destinationCountry: 'DE',
      weightGrams: 120_000,
      volumeLitres: 1_500,
      shipDate: plus(10),
      ...body,
    });
  const card = (body: object) =>
    admin.post('/admin/logistics/rate-cards').send({
      partnerId,
      originCountry: 'BD',
      destinationCountry: 'DE',
      currency: 'USD',
      transitDaysMin: 5,
      transitDaysMax: 7,
      validFrom: today,
      validTo: plus(90),
      ...body,
    });

  beforeAll(async () => {
    ctx = await createTestApp();
    // A clean price list: other suites' rate cards, margins and duty rates don't apply here.
    await ctx.prisma.rateCard.deleteMany();
    await ctx.prisma.logisticsMarginRule.deleteMany();
    await ctx.prisma.dutyRate.deleteMany();
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'logistics' } });
    admin = client(ctx.app);
    await admin
      .post('/auth/login')
      .send({ email: await createAdmin(ctx.prisma), password: PASSWORD })
      .expect(200);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('manages partners and hubs', async () => {
    await admin
      .post('/admin/logistics/partners')
      .send({
        name: 'Bayline Forwarding',
        kind: 'FORWARDER',
        country: 'BD',
        contactEmail: 'ops@bayline.example',
      })
      .expect(204);
    await admin
      .post('/admin/logistics/partners')
      .send({ name: 'Slowboat Cargo', kind: 'FORWARDER', country: 'BD' })
      .expect(204);
    await admin
      .post('/admin/logistics/partners')
      .send({ name: 'X', kind: 'FORWARDER', country: 'BD' })
      .expect(400);
    const partners = z
      .array(LogisticsPartnerSchema)
      .parse((await admin.get('/admin/logistics/partners').expect(200)).body);
    const bayline = partners.find((p) => p.name === 'Bayline Forwarding');
    const slow = partners.find((p) => p.name === 'Slowboat Cargo');
    expect(bayline?.code).toMatch(/^LP-\d{4}$/);
    partnerId = bayline?.id ?? '';
    slowPartnerId = slow?.id ?? '';

    const hub = {
      code: 'hub-bd-01',
      name: 'Chattogram consolidation hub',
      country: 'BD',
      city: 'Chattogram',
      addressLine1: 'Plot 12, CEPZ',
      port: 'BDCGP',
    };
    await admin.post('/admin/logistics/hubs').send(hub).expect(204);
    await admin.post('/admin/logistics/hubs').send(hub).expect(409);
    await admin
      .post('/admin/logistics/hubs')
      .send({ ...hub, code: 'HUB-VN-01' })
      .expect(400);
    await admin
      .post('/admin/logistics/hubs')
      .send({ ...hub, code: 'HUB-BD-02', operator: 'PARTNER' })
      .expect(400); // a partner hub needs its partner
    await admin
      .post('/admin/logistics/hubs')
      .send({ ...hub, code: 'HUB-BD-02', operator: 'PARTNER', partnerId })
      .expect(204);
    const hubs = z
      .array(HubSchema)
      .parse((await admin.get('/admin/logistics/hubs').expect(200)).body);
    expect(hubs.find((h) => h.code === 'HUB-BD-02')?.partner?.id).toBe(partnerId);
  });

  it('quotes from valid rate cards with the most specific margin, cheapest first', async () => {
    await card({ mode: 'AIR', unit: 'PER_KG', costMinor: 455, minChargeMinor: 10_000 }).expect(204);
    await card({
      partnerId: slowPartnerId,
      mode: 'AIR',
      unit: 'PER_KG',
      costMinor: 520,
      transitDaysMin: 3,
      transitDaysMax: 4,
    }).expect(204);
    // Expired, future and wrong-port cards never price.
    await card({
      mode: 'AIR',
      unit: 'PER_KG',
      costMinor: 100,
      validFrom: plus(-60),
      validTo: plus(-1),
    }).expect(204);
    await card({
      mode: 'AIR',
      unit: 'PER_KG',
      costMinor: 101,
      validFrom: plus(30),
      validTo: plus(60),
    }).expect(204);
    await card({ mode: 'AIR', unit: 'PER_KG', costMinor: 102, destinationPort: 'DEFRA' }).expect(
      204,
    );
    await card({ mode: 'SEA_FCL', unit: 'PER_CONTAINER', costMinor: 180_000 }).expect(400); // container type
    await card({
      mode: 'SEA_FCL',
      unit: 'PER_CONTAINER',
      containerType: 'GP40',
      costMinor: 180_000,
    }).expect(204);

    await admin
      .post('/admin/logistics/margins')
      .send({ name: 'Default', markupBps: 1000 })
      .expect(204);
    await admin
      .post('/admin/logistics/margins')
      .send({
        name: 'Air to Germany',
        mode: 'AIR',
        destinationCountry: 'DE',
        markupBps: 1500,
        minMarginMinor: 5_000,
      })
      .expect(204);
    await admin
      .post('/admin/logistics/margins')
      .send({ name: 'Copy', mode: 'AIR', destinationCountry: 'DE', markupBps: 1 })
      .expect(409);

    const air = z
      .array(FreightOptionSchema)
      .parse((await quote({ mode: 'AIR', goodsValueMinor: 1_000_000 }).expect(200)).body);
    expect(air).toHaveLength(2); // only the two valid cards for any port
    const [cheap, fast] = air;
    // 1.5 CBM × 167 = 250.5 kg chargeable × $4.55 = $1,139.78 cost; +15% = $1,310.75.
    expect(cheap).toMatchObject({
      partnerCostMinor: 113_978,
      freightPriceMinor: 131_075,
      marginRule: 'Air to Germany',
      chargeableMilliUnits: 250_500,
      transitDaysMin: 5,
    });
    expect(fast?.partner?.id).toBe(slowPartnerId);
    // Insurance: 0.30% of 110% × ($10,000 goods + freight), at least $25.
    expect(cheap?.insurancePremiumMinor).toBe(3_733);

    const withPort = z
      .array(FreightOptionSchema)
      .parse((await quote({ mode: 'AIR', destinationPort: 'DEFRA' }).expect(200)).body);
    expect(withPort.map((o) => o.partnerCostMinor).sort((a, b) => a - b)).toEqual([
      25_551, 113_978, 130_260,
    ]);

    const fcl = z
      .array(FreightOptionSchema)
      .parse(
        (await quote({ mode: 'SEA_FCL', volumeLitres: 60_000, weightGrams: 9_000_000 }).expect(200))
          .body,
      );
    expect(fcl[0]).toMatchObject({
      partnerCostMinor: 360_000,
      freightPriceMinor: 396_000,
      marginRule: 'Default',
    });

    // An inactive partner's cards stop pricing.
    const slow = z
      .array(LogisticsPartnerSchema)
      .parse((await admin.get('/admin/logistics/partners').expect(200)).body)
      .find((p) => p.id === slowPartnerId);
    await admin
      .put(`/admin/logistics/partners/${slowPartnerId}`)
      .send({ name: slow?.name, kind: 'FORWARDER', country: 'BD', active: false })
      .expect(204);
    expect((await quote({ mode: 'AIR' }).expect(200)).body).toHaveLength(1);

    const cards = z
      .array(RateCardSchema)
      .parse((await admin.get('/admin/logistics/rate-cards').expect(200)).body);
    const expired = cards.find((c) => c.costMinor === 100);
    await admin.delete(`/admin/logistics/rate-cards/${expired?.id ?? ''}`).expect(204);
  });

  it('keeps a duty table, one rate per HS prefix and country', async () => {
    await admin
      .post('/admin/logistics/duty-rates')
      .send({
        hsPrefix: '6109.10',
        destinationCountry: 'DE',
        rateBps: 1200,
        note: 'Cotton T-shirts',
      })
      .expect(204);
    await admin
      .post('/admin/logistics/duty-rates')
      .send({ hsPrefix: '610910', destinationCountry: 'DE', rateBps: 1000 })
      .expect(409);
    await admin
      .post('/admin/logistics/duty-rates')
      .send({ hsPrefix: '6', destinationCountry: 'DE', rateBps: 1 })
      .expect(400);
    const rates = z
      .array(DutyRateSchema)
      .parse((await admin.get('/admin/logistics/duty-rates').expect(200)).body);
    expect(rates.find((r) => r.destinationCountry === 'DE')?.hsPrefix).toBe('610910');
  });

  it('validates settings and keeps everyone else out', async () => {
    await admin
      .put('/admin/logistics/settings')
      .send({
        shipperMode: 'SWITCH_BL',
        insuranceRateBps: 900,
        minInsurancePremiumMinor: 2500,
        quoteValidityDays: 7,
      })
      .expect(400);
    const saved = await admin
      .put('/admin/logistics/settings')
      .send({
        shipperMode: 'SWITCH_BL',
        insuranceRateBps: 35,
        minInsurancePremiumMinor: 2500,
        quoteValidityDays: 10,
      })
      .expect(200);
    expect(saved.body).toMatchObject({ shipperMode: 'SWITCH_BL', insuranceRateBps: 35 });

    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER');
    const { agent: factory } = await registerAgent(ctx.app, 'MANUFACTURER');
    for (const agent of [buyer, factory]) {
      await agent.get('/admin/logistics/rate-cards').expect(403);
      await agent.post('/admin/logistics/quote-preview').send({}).expect(403);
    }
  });
});
