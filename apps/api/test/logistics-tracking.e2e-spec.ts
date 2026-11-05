import { hash } from '@node-rs/argon2';
import {
  AdminDisputeSchema,
  AdminLogisticsClaimSchema,
  AdminShipmentSchema,
  BuyerPaymentsSchema,
  LogisticsReportSchema,
  BuyerShippingOptionSchema,
  BuyerTrackingSchema,
  isoDate,
  LedgerBalancesSchema,
  PartnerLegSchema,
} from '@garmentgate/shared';
import { PDFDocument } from 'pdf-lib';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { pdfText } from '../src/modules/chat/chat-scan.processor.js';
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
const BUYER_NAME = 'Lindqvist Apparel AB';
const FACTORY_NAME = 'Shonar Bangla Knitwear Ltd';
const FORWARDER = 'Oceanic Ferrymen Forwarding';
const TRUCKER = 'Roadrunner Haulage Co';

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', legalName: string) {
  const email = uniqueEmail(`trk${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Track',
      lastName: 'Tester',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName,
          country: type === 'BUYER' ? 'SE' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-SE-5${run}` } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: `MFR-BD-5${run.slice(-3)}`,
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

const binary = (req: ReturnType<Agent['get']>) =>
  req.buffer(true).parse((r, cb) => {
    const chunks: Buffer[] = [];
    r.on('data', (c: Buffer) => chunks.push(c));
    r.on('end', () => {
      cb(null, Buffer.concat(chunks));
    });
  });

describe('logistics: partners, tracking and the money (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let forwarder: Agent;
  let trucker: Agent;
  let forwarderId = '';
  let truckerId = '';
  let hubCode = '';
  let orderCode = '';
  let shipmentCode = '';

  /** Invites someone at a partner, then signs them in (the test sets the password directly). */
  const partnerUser = async (partnerId: string) => {
    const email = uniqueEmail('partner');
    await admin
      .post(`/admin/logistics/partners/${partnerId}/users`)
      .send({ email, firstName: 'Pat', lastName: 'Ner' })
      .expect(204);
    await ctx.prisma.user.update({
      where: { email },
      data: { passwordHash: await hash(PASSWORD) },
    });
    return login(ctx, email);
  };
  const legs = async (agent: Agent) =>
    z.array(PartnerLegSchema).parse((await agent.get('/partner/legs').expect(200)).body);
  const shipment = async () =>
    AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${shipmentCode}`).expect(200)).body,
    );
  const balances = async () =>
    LedgerBalancesSchema.parse((await admin.get('/admin/finance/balances').expect(200)).body);
  const payable = async (name: string) =>
    (await balances()).accounts.find((a) => a.type === 'PARTNER_PAYABLE' && a.party?.name === name)
      ?.balanceMinor ?? 0;

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyer = await company(ctx, 'BUYER', BUYER_NAME);
    factory = await company(ctx, 'MANUFACTURER', FACTORY_NAME);
    await ctx.prisma.rateCard.deleteMany();
    await ctx.prisma.logisticsMarginRule.deleteMany();
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'logistics' } });
    for (const [name, kind] of [
      [FORWARDER, 'FORWARDER'],
      [TRUCKER, 'TRUCKING'],
    ] as const)
      await admin.post('/admin/logistics/partners').send({ name, kind, country: 'BD' }).expect(204);
    forwarderId = (
      await ctx.prisma.logisticsPartner.findFirstOrThrow({ where: { name: FORWARDER } })
    ).id;
    truckerId = (await ctx.prisma.logisticsPartner.findFirstOrThrow({ where: { name: TRUCKER } }))
      .id;
    await admin
      .post('/admin/logistics/rate-cards')
      .send({
        partnerId: forwarderId,
        mode: 'SEA_LCL',
        unit: 'PER_CBM',
        costMinor: 4500,
        minChargeMinor: 10_000,
        originCountry: 'BD',
        destinationCountry: 'SE',
        transitDaysMin: 28,
        transitDaysMax: 35,
        validFrom: isoDate(new Date(Date.now() - DAY)),
        validTo: isoDate(new Date(Date.now() + 120 * DAY)),
      })
      .expect(204);
    await admin
      .post('/admin/logistics/margins')
      .send({ name: 'Default', markupBps: 1000 })
      .expect(204);
    hubCode = `HUB-BD-${run.slice(-2)}`;
    await admin
      .post('/admin/logistics/hubs')
      .send({
        code: hubCode,
        name: 'Ashulia hub',
        country: 'BD',
        city: 'Ashulia',
        addressLine1: 'Bay 7, Ashulia Road',
        port: 'BDCGP',
      })
      .expect(204);
    const hubId = (await ctx.prisma.hub.findUniqueOrThrow({ where: { code: hubCode } })).id;
    forwarder = await partnerUser(forwarderId);
    trucker = await partnerUser(truckerId);

    // An order: shipping chosen and paid, packed, collected and checked in at the hub.
    orderCode = `ORD-2095-${run}1`;
    const order = await ctx.prisma.order.create({
      data: {
        code: orderCode,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Rib tank top',
        quantity: 200,
        buyerUnitPriceMinor: 450,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: 90_000n,
        manufacturerTotalMinor: 76_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'SE',
        hsCode: '610910',
        status: 'IN_PRODUCTION',
      },
    });
    const options = z
      .array(BuyerShippingOptionSchema)
      .parse(
        (
          await buyer.agent
            .post(`/orders/${orderCode}/logistics/quotes`)
            .send({ destinationCountry: 'SE', destinationPort: 'SEGOT', incoterm: 'DAP' })
            .expect(200)
        ).body,
      );
    const lcl = options.find((o) => o.mode === 'SEA_LCL');
    expect(lcl?.totalMinor).toBe(11_000);
    await buyer.agent
      .post(`/orders/${orderCode}/logistics/quotes/${lcl?.quoteId ?? ''}/accept`)
      .expect(204);
    // The shipping charge, paid like any order payment (a succeeded transfer into escrow).
    const start = (
      await buyer.agent
        .post(`/orders/${orderCode}/logistics/payments`)
        .send({ method: 'BANK_TRANSFER' })
        .expect(201)
    ).body as { paymentId: string };
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
      .send({ proofFileId: fileId, bankReference: `TRK-${run}` })
      .expect(204);

    await factory.agent
      .put(`/orders/${orderCode}/logistics/packing`)
      .send({ cartons: 4, grossWeightGrams: 60_000, volumeLitres: 300 })
      .expect(204);
    await ctx.prisma.order.update({ where: { id: order.id }, data: { status: 'READY_TO_SHIP' } });
    await factory.agent
      .post(`/orders/${orderCode}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + DAY)) })
      .expect(204);
    await admin
      .post('/admin/logistics/hub-receipts')
      .send({ orderCode, hubId, cartonsReceived: 4, condition: 'GOOD' })
      .expect(204);
    shipmentCode = (
      (
        await admin
          .post('/admin/logistics/shipments')
          .send({ orderCodes: [orderCode] })
          .expect(201)
      ).body as { code: string }
    ).code;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('shows partners only GarmentGate’s bookings, without buyer or factory', async () => {
    expect(await legs(forwarder)).toEqual([]);
    const s = await shipment();
    const [, toPort, ocean, delivery] = s.legs;
    await admin
      .patch(`/admin/logistics/shipments/${shipmentCode}/legs/${toPort?.id ?? ''}`)
      .send({ partnerId: truckerId, costMinor: 1_000 })
      .expect(204);
    await admin
      .patch(`/admin/logistics/shipments/${shipmentCode}/legs/${ocean?.id ?? ''}`)
      .send({ partnerId: forwarderId, costMinor: 6_000 })
      .expect(204);
    await admin
      .patch(`/admin/logistics/shipments/${shipmentCode}/legs/${delivery?.id ?? ''}`)
      .send({ partnerId: forwarderId, costMinor: 1_500 })
      .expect(204);

    const res = await forwarder.get('/partner/legs').expect(200);
    const mine = z.array(PartnerLegSchema).parse(res.body);
    expect(mine.map((l) => l.kind).sort()).toEqual(['PORT_TO_BUYER', 'PORT_TO_PORT']);
    expect(mine.find((l) => l.kind === 'PORT_TO_PORT')).toMatchObject({
      costMinor: 6_000,
      accepted: false,
      cartons: 4,
      destinationPort: 'SEGOT',
    });
    for (const secret of [BUYER_NAME, FACTORY_NAME, 'BYR-', 'MFR-', TRUCKER, orderCode])
      expect(res.text).not.toContain(secret);
    const truck = await legs(trucker);
    expect(truck).toHaveLength(1);
    expect(truck[0]?.pickupHub).toMatchObject({
      code: hubCode,
      address: expect.stringContaining('Ashulia Road') as string,
    });

    // Partners stay inside their portal.
    await forwarder.get(`/partner/legs/${truck[0]?.id ?? ''}`).expect(404);
    await forwarder.get('/admin/logistics/shipments').expect(403);
    await forwarder.get(`/orders/${orderCode}`).expect(403);
    await forwarder.get('/orders').expect(403);
    await forwarder.get('/notifications').expect(200);
    await buyer.agent.get('/partner/legs').expect(403);
    await factory.agent.get('/partner/legs').expect(403);
    // The partner's own documents consign to GarmentGate and name nobody else.
    const bl = await binary(
      forwarder.get(`/partner/legs/${mine[0]?.id ?? ''}/documents/BILL_OF_LADING`),
    ).expect(200);
    const text = await pdfText(new Uint8Array(bl.body as Buffer));
    expect(text).toContain('To order of');
    expect(text).not.toContain(BUYER_NAME);
    expect(text).not.toContain(FACTORY_NAME);
    await forwarder
      .get(`/partner/legs/${mine[0]?.id ?? ''}/documents/COMMERCIAL_INVOICE`)
      .expect(400);
  });

  it('departs only when everything is paid, then moves the shipping money out of escrow', async () => {
    const [ocean] = (await legs(forwarder)).filter((l) => l.kind === 'PORT_TO_PORT');
    const oceanId = ocean?.id ?? '';
    await forwarder
      .post(`/partner/legs/${oceanId}/events`)
      .send({ status: 'IN_TRANSIT' })
      .expect(409); // not accepted
    await forwarder.post(`/partner/legs/${oceanId}/accept`).expect(204);
    await forwarder.post(`/partner/legs/${oceanId}/accept`).expect(409);
    await forwarder
      .patch(`/partner/legs/${oceanId}`)
      .send({
        carrier: 'MV Baltic Star',
        containerNumber: 'OOLU7654321',
        transportDocNo: 'OFF-BL-2211',
      })
      .expect(204);
    // The buyer's balance isn't in: the goods can't leave.
    const blocked = await forwarder
      .post(`/partner/legs/${oceanId}/events`)
      .send({ status: 'IN_TRANSIT', legStatus: 'IN_TRANSIT' });
    expect(blocked.status).toBe(409);
    expect(blocked.text).toContain('balance');

    const order = await ctx.prisma.order.findUniqueOrThrow({ where: { code: orderCode } });
    for (const [purpose, amountMinor] of [
      ['DEPOSIT', 27_000n],
      ['BALANCE', 63_000n],
    ] as const)
      await recordPaidPayment(ctx, {
        orderId: order.id,
        buyerCompanyId: buyer.companyId,
        purpose,
        amountMinor,
      });
    const revenueBefore =
      (await balances()).currencies.find((c) => c.currency === 'USD')?.revenueMinor ?? 0;
    await forwarder
      .post(`/partner/legs/${oceanId}/events`)
      .send({
        status: 'IN_TRANSIT',
        legStatus: 'IN_TRANSIT',
        location: 'Chattogram',
        note: `Loaded by ${FORWARDER} at berth 3, questions to +880 1711 555 666`,
      })
      .expect(204);

    expect((await ctx.prisma.order.findUniqueOrThrow({ where: { code: orderCode } })).status).toBe(
      'SHIPPED',
    );
    const s = await shipment();
    expect(s).toMatchObject({ status: 'IN_TRANSIT', partnerCostMinor: 8_500, marginMinor: 2_500 });
    expect(s.departedAt).not.toBeNull();
    // 11,000 left escrow: 1,000 to the trucker, 7,500 to the forwarder, 2,500 GarmentGate's margin.
    expect(await payable(TRUCKER)).toBe(1_000);
    expect(await payable(FORWARDER)).toBe(7_500);
    const usd = (await balances()).currencies.find((c) => c.currency === 'USD');
    expect((usd?.revenueMinor ?? 0) - revenueBefore).toBe(2_500);
    expect(usd).toMatchObject({ balanced: true, reconciled: true });
  });

  it('gives the buyer a GarmentGate timeline and documents, without partners or the factory', async () => {
    const res = await buyer.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(200);
    const tracking = BuyerTrackingSchema.parse(res.body);
    expect(tracking).toMatchObject({
      shipmentCode,
      status: 'IN_TRANSIT',
      containerNumber: 'OOLU7654321',
      transportDocNo: 'OFF-BL-2211',
    });
    expect(tracking.legs[1]).toMatchObject({ from: 'GarmentGate hub', to: 'BDCGP' });
    expect(tracking.events[0]?.location).toBe('Chattogram');
    expect(tracking.events[0]?.note).toContain('berth 3');
    for (const secret of [FORWARDER, TRUCKER, FACTORY_NAME, '1711', hubCode, 'Ashulia', 'MFR-'])
      expect(res.text).not.toContain(secret);

    const ci = await binary(
      buyer.agent.get(`/orders/${orderCode}/logistics/documents/COMMERCIAL_INVOICE`),
    ).expect(200);
    const text = await pdfText(new Uint8Array(ci.body as Buffer));
    expect(text).toContain(BUYER_NAME);
    expect(text).not.toContain(FACTORY_NAME);
    await buyer.agent
      .get(`/orders/${orderCode}/logistics/documents/ORIGINAL_BILL_OF_LADING`)
      .expect(400);
    await factory.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(403);
    await factory.agent
      .get(`/orders/${orderCode}/logistics/documents/COMMERCIAL_INVOICE`)
      .expect(403);
  });

  it('moves forward to delivery, then pays partners from their payables', async () => {
    const ours = await legs(forwarder);
    const ocean = ours.find((l) => l.kind === 'PORT_TO_PORT');
    const last = ours.find((l) => l.kind === 'PORT_TO_BUYER');
    await forwarder
      .post(`/partner/legs/${ocean?.id ?? ''}/events`)
      .send({ status: 'CUSTOMS', legStatus: 'COMPLETED', location: 'Gothenburg' })
      .expect(204);
    await forwarder
      .post(`/partner/legs/${ocean?.id ?? ''}/events`)
      .send({ status: 'AT_DESTINATION' })
      .expect(409); // backwards
    await forwarder.post(`/partner/legs/${last?.id ?? ''}/accept`).expect(204);
    // Payouts wait for the goods to leave; the trucker's leg is ready to pay now.
    const s = await shipment();
    const truckLeg = s.legs.find((l) => l.kind === 'HUB_TO_PORT');
    await admin
      .post(`/admin/logistics/shipments/${shipmentCode}/legs/${truckLeg?.id ?? ''}/payout`)
      .expect(204);
    await admin
      .post(`/admin/logistics/shipments/${shipmentCode}/legs/${truckLeg?.id ?? ''}/payout`)
      .expect(409);
    expect(await payable(TRUCKER)).toBe(0);

    await forwarder
      .post(`/partner/legs/${last?.id ?? ''}/events`)
      .send({ status: 'DELIVERED', note: 'Signed for at the warehouse' })
      .expect(204);
    const delivered = await shipment();
    expect(delivered.status).toBe('DELIVERED');
    expect(delivered.legs.every((l) => l.status === 'COMPLETED')).toBe(true);
    await forwarder
      .post(`/partner/legs/${last?.id ?? ''}/events`)
      .send({ status: 'EXCEPTION' })
      .expect(409); // closed
    const told = await ctx.prisma.notification.findFirst({
      where: { user: { companyId: buyer.companyId }, title: { contains: 'delivered' } },
    });
    expect(told?.body).toContain('confirm receipt');

    for (const leg of delivered.legs.filter((l) => l.partner?.id === forwarderId))
      await admin
        .post(`/admin/logistics/shipments/${shipmentCode}/legs/${leg.id}/payout`)
        .expect(204);
    expect(await payable(FORWARDER)).toBe(0);
    const payout = await ctx.prisma.payment.findFirst({
      where: { logisticsShipment: { code: shipmentCode }, purpose: 'PAYOUT' },
    });
    expect(payout?.direction).toBe('OUTBOUND');
    expect((await balances()).currencies.find((c) => c.currency === 'USD')).toMatchObject({
      balanced: true,
      reconciled: true,
    });
    expect(
      (await shipment()).legs.filter((l) => l.kind !== 'FACTORY_TO_HUB').every((l) => l.paid),
    ).toBe(true);
  });

  it('opens a claim from the buyer’s dispute and settles it through the ledger', async () => {
    // The buyer finds cartons missing and disputes the shipped order.
    await buyer.agent
      .post(`/orders/${orderCode}/dispute`)
      .send({
        reason: 'QUANTITY',
        description: 'One of the four cartons never arrived at our warehouse.',
      })
      .expect(201);
    const dispute = AdminDisputeSchema.parse(
      ((await admin.get(`/orders/${orderCode}/dispute`).expect(200)).body as { dispute: unknown })
        .dispute,
    );
    expect(dispute.logistics).toEqual({ shipmentCode, claim: null });

    const s = await shipment();
    const ocean = s.legs.find((l) => l.kind === 'PORT_TO_PORT');
    const body = {
      orderCode,
      type: 'SHORTAGE',
      claimedMinor: 20_000,
      description: `Carton 3 of 4 missing on arrival; ${FORWARDER} tally shows 4 loaded.`,
      publicNote: `${FORWARDER} confirmed one carton short; call +46 70 123 45 67`,
      legId: ocean?.id,
      disputeId: dispute.id,
    };
    await admin
      .post('/admin/logistics/claims')
      .send({ ...body, orderCode: 'ORD-2000-00001' })
      .expect(404);
    const { code } = (await admin.post('/admin/logistics/claims').send(body).expect(201)).body as {
      code: string;
    };
    expect(code).toMatch(/^CLM-\d{4}-\d{5}$/);
    await admin.post('/admin/logistics/claims').send(body).expect(409); // one live claim per order
    await buyer.agent.post('/admin/logistics/claims').send(body).expect(403);
    await forwarder.get('/admin/logistics/claims').expect(403);

    const linked = AdminDisputeSchema.parse(
      ((await admin.get(`/orders/${orderCode}/dispute`).expect(200)).body as { dispute: unknown })
        .dispute,
    );
    expect(linked.logistics?.claim).toEqual({ code, status: 'OPEN' });

    await admin
      .post(`/admin/logistics/claims/${code}/submit`)
      .send({ insurerReference: 'INS-2026-778' })
      .expect(204);
    await admin
      .post(`/admin/logistics/claims/${code}/submit`)
      .send({ insurerReference: 'INS-2026-778' })
      .expect(409);

    const settle = (over: Record<string, number>) =>
      admin.post(`/admin/logistics/claims/${code}/settle`).send({
        outcome: 'SETTLED',
        compensationMinor: 20_000,
        insurerRecoveryMinor: 0,
        partnerChargebackMinor: 3_000,
        resolution: 'Short-shipped by the forwarder; buyer compensated in full.',
        ...over,
      });
    // Uninsured order, chargeback above the leg's cost, compensation above the claim.
    expect((await settle({ insurerRecoveryMinor: 1 })).text).toContain('insured');
    expect((await settle({ partnerChargebackMinor: 6_001 })).status).toBe(400);
    expect((await settle({ compensationMinor: 20_001 })).status).toBe(400);

    const before = (await balances()).currencies.find((c) => c.currency === 'USD');
    const payableBefore = await payable(FORWARDER);
    await settle({}).expect(204);
    await settle({}).expect(409);

    // 20,000 paid to the buyer by GarmentGate, 3,000 taken off the forwarder's payable.
    const after = (await balances()).currencies.find((c) => c.currency === 'USD');
    expect((after?.revenueMinor ?? 0) - (before?.revenueMinor ?? 0)).toBe(-17_000);
    expect((after?.cashMinor ?? 0) - (before?.cashMinor ?? 0)).toBe(-20_000);
    expect(await payable(FORWARDER)).toBe(payableBefore - 3_000);
    expect(after).toMatchObject({ balanced: true, reconciled: true });

    const [claim] = z
      .array(AdminLogisticsClaimSchema)
      .parse((await admin.get('/admin/logistics/claims').expect(200)).body)
      .filter((c) => c.code === code);
    expect(claim).toMatchObject({
      status: 'SETTLED',
      insurerReference: 'INS-2026-778',
      insuredValueMinor: 0,
      netMinor: 17_000,
      leg: { partnerName: FORWARDER, costMinor: 6_000 },
    });

    // The buyer sees the claim and the refund, never the partner, insurer or chargeback.
    const res = await buyer.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(200);
    const tracking = BuyerTrackingSchema.parse(res.body);
    expect(tracking.claims).toEqual([
      expect.objectContaining({ code, status: 'SETTLED', compensationMinor: 20_000 }),
    ]);
    expect(tracking.claims[0]?.note).toContain('one carton short');
    for (const secret of [FORWARDER, '123 45 67', 'INS-2026-778', '3000'])
      expect(res.text).not.toContain(secret);
    const payments = BuyerPaymentsSchema.parse(
      (await buyer.agent.get(`/orders/${orderCode}/payments`).expect(200)).body,
    );
    expect(payments.refundedMinor).toBe(20_000);

    // The forwarder sees its chargeback, without the buyer or the compensation.
    const partnerRes = await forwarder.get(`/partner/legs/${ocean?.id ?? ''}`).expect(200);
    expect(PartnerLegSchema.parse(partnerRes.body).claims).toEqual([
      { code, type: 'SHORTAGE', status: 'SETTLED', chargebackMinor: 3_000 },
    ]);
    for (const secret of [BUYER_NAME, FACTORY_NAME, 'BYR-', '20000', orderCode])
      expect(partnerRes.text).not.toContain(secret);
    // The factory has no part in it.
    expect(
      JSON.stringify((await factory.agent.get(`/orders/${orderCode}`).expect(200)).body),
    ).not.toContain(code);
  });

  it('reports logistics revenue, partner costs and claims per currency', async () => {
    const today = isoDate(new Date());
    await admin.get('/admin/logistics/reports?from=2026-12-01&to=2026-01-01').expect(400);
    const report = LogisticsReportSchema.parse(
      (await admin.get(`/admin/logistics/reports?from=${today}&to=${today}`).expect(200)).body,
    );
    const usd = report.totals.find((t) => t.currency === 'USD');
    expect(usd?.shipments).toBeGreaterThanOrEqual(1);
    expect(usd?.claimsNetMinor).toBeGreaterThanOrEqual(17_000);
    expect(usd?.marginMinor).toBe(
      (usd?.revenueMinor ?? 0) -
        (usd?.partnerCostMinor ?? 0) -
        (usd?.insuranceMinor ?? 0) -
        (usd?.claimsNetMinor ?? 0),
    );
    expect(report.partners.find((p) => p.name === FORWARDER && p.currency === 'USD')).toMatchObject(
      {
        costMinor: 7_500,
        paidMinor: 7_500,
        chargebackMinor: 3_000,
        outstandingMinor: -3_000,
      },
    );
    expect(report.claims.settled).toBeGreaterThanOrEqual(1);
    await buyer.agent.get(`/admin/logistics/reports?from=${today}&to=${today}`).expect(403);
    await forwarder.get(`/admin/logistics/reports?from=${today}&to=${today}`).expect(403);
  });

  it('lets staff publish a partner’s paper to the buyer once it is cleaned', async () => {
    const [ocean] = (await legs(forwarder)).filter((l) => l.kind === 'PORT_TO_PORT');
    const legId = ocean?.id ?? '';
    const pdf = await PDFDocument.create();
    pdf.addPage();
    pdf.setAuthor(FORWARDER); // metadata the sanitizer must drop
    const bytes = Buffer.from(await pdf.save());
    const presign = (
      await forwarder
        .post(`/partner/legs/${legId}/uploads`)
        .send({
          fileName: `${FORWARDER} master BL.pdf`,
          contentType: 'application/pdf',
          sizeBytes: bytes.length,
        })
        .expect(201)
    ).body as { fileId: string; url: string; fields: Record<string, string> };
    const form = new FormData();
    for (const [k, v] of Object.entries(presign.fields)) form.append(k, v);
    form.append('file', new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
    expect((await fetch(presign.url, { method: 'POST', body: form })).status).toBeLessThan(300);
    await forwarder
      .post(`/partner/legs/${legId}/files`)
      .send({ fileId: presign.fileId, kind: 'BILL_OF_LADING' })
      .expect(204);

    // Hidden from the buyer until staff publish the cleaned copy.
    const papers = async () =>
      BuyerTrackingSchema.parse(
        (await buyer.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(200)).body,
      ).papers;
    expect(await papers()).toEqual([]);
    let upload = (await shipment()).uploads.find((u) => u.kind === 'BILL_OF_LADING');
    for (let i = 0; i < 80 && !upload?.ready; i += 1) {
      await new Promise((r) => setTimeout(r, 250));
      upload = (await shipment()).uploads.find((u) => u.kind === 'BILL_OF_LADING');
    }
    expect(upload?.ready).toBe(true);
    const publish = (agent: Agent, buyerVisible: boolean) =>
      agent
        .patch(`/admin/logistics/shipments/${shipmentCode}/uploads/${upload?.id ?? ''}`)
        .send({ buyerVisible });
    await publish(forwarder, true).expect(403);
    await publish(buyer.agent, true).expect(403);
    await publish(admin, true).expect(204);

    const [paper] = await papers();
    expect(paper).toMatchObject({
      kind: 'BILL_OF_LADING',
      name: `${shipmentCode}-bill-of-lading-1.pdf`,
    });
    expect(paper?.url).toContain('sanitized/');
    expect(JSON.stringify(paper)).not.toContain(FORWARDER);
    const told = await ctx.prisma.notification.findFirst({
      where: { user: { companyId: buyer.companyId }, title: { contains: 'shipping paper' } },
    });
    expect(told).not.toBeNull();

    await publish(admin, false).expect(204);
    expect(await papers()).toEqual([]);
    await publish(admin, true).expect(204);
  });

  /**
   * The anonymity sweep: everything each party can fetch about this shipment, JSON and PDFs,
   * checked for the other sides' names, codes and addresses.
   */
  it('never names one side to another, in any response or document', async () => {
    const pdf = async (agent: Agent, url: string) =>
      pdfText(new Uint8Array((await binary(agent.get(url)).expect(200)).body as Buffer));
    const notifications = async (agent: Agent) =>
      JSON.stringify((await agent.get('/notifications').expect(200)).body);

    const factoryProfile = await ctx.prisma.manufacturerProfile.findUniqueOrThrow({
      where: { id: factory.profileId },
    });
    const buyerCode = `BYR-SE-5${run}`;
    const forBuyer = [
      JSON.stringify((await buyer.agent.get(`/orders/${orderCode}`).expect(200)).body),
      JSON.stringify((await buyer.agent.get(`/orders/${orderCode}/logistics`).expect(200)).body),
      JSON.stringify(
        (await buyer.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(200)).body,
      ),
      JSON.stringify((await buyer.agent.get(`/orders/${orderCode}/payments`).expect(200)).body),
      await notifications(buyer.agent),
      ...(await Promise.all(
        ['COMMERCIAL_INVOICE', 'PACKING_LIST', 'CERTIFICATE_OF_ORIGIN'].map((t) =>
          pdf(buyer.agent, `/orders/${orderCode}/logistics/documents/${t}`),
        ),
      )),
    ];
    for (const text of forBuyer)
      for (const secret of [FACTORY_NAME, FORWARDER, TRUCKER, hubCode, 'Ashulia Road'])
        expect(text).not.toContain(secret);

    const forFactory = [
      JSON.stringify((await factory.agent.get(`/orders/${orderCode}`).expect(200)).body),
      JSON.stringify(
        (await factory.agent.get(`/orders/${orderCode}/logistics/factory`).expect(200)).body,
      ),
      await notifications(factory.agent),
      await pdf(factory.agent, `/orders/${orderCode}/logistics/carton-markings`),
    ];
    for (const text of forFactory)
      // Allowed: the buyer's BYR- code and the destination port (the factory's PO ships there).
      for (const secret of [BUYER_NAME, FORWARDER, TRUCKER, 'Lindqvist'])
        expect(text).not.toContain(secret);

    for (const agent of [forwarder, trucker]) {
      const mine = await legs(agent);
      const texts = [
        JSON.stringify(mine),
        await notifications(agent),
        ...(await Promise.all(
          mine.flatMap((l) =>
            l.documentTypes.map((t) => pdf(agent, `/partner/legs/${l.id}/documents/${t}`)),
          ),
        )),
      ];
      for (const text of texts)
        for (const secret of [
          BUYER_NAME,
          FACTORY_NAME,
          buyerCode,
          factoryProfile.publicCode,
          orderCode,
        ])
          expect(text).not.toContain(secret);
    }
  });
});
