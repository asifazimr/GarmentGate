import { hash } from '@node-rs/argon2';
import {
  AdminLogisticsOrderSchema,
  AdminShipmentSchema,
  BuyerOrderLogisticsSchema,
  BuyerTrackingSchema,
  FactoryOrderLogisticsSchema,
  isoDate,
  LedgerBalancesSchema,
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
const BUYER_NAME = 'Halvorsen Workwear AS';
const FACTORY_NAME = 'Padma Garments Ltd';
const FORWARDER = 'Fjordline Freight Services';
const FORWARDER_CONTACT = 'bookings@fjordline.example, +47 22 33 44 55';

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', legalName: string) {
  const email = uniqueEmail(`hov${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Hand',
      lastName: 'Over',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName,
          country: type === 'BUYER' ? 'NO' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-NO-6${run}` } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: `MFR-BD-6${run.slice(-3)}`,
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

describe('logistics: hand-over to the buyer’s own forwarder (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let hubId = '';
  let orderId = '';
  let shipmentCode = '';
  const orderCode = `ORD-2096-${run}1`;
  const otherCode = `ORD-2096-${run}2`;

  const newOrder = (code: string) =>
    ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Hi-vis work jacket',
        quantity: 400,
        buyerUnitPriceMinor: 1_850,
        manufacturerUnitPriceMinor: 1_500,
        buyerTotalMinor: 740_000n,
        manufacturerTotalMinor: 600_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'NO',
        status: 'IN_PRODUCTION',
      },
    });
  const handover = (agent: Agent, code: string, body: Record<string, unknown>) =>
    agent.put(`/orders/${code}/logistics/handover`).send(body);

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyer = await company(ctx, 'BUYER', BUYER_NAME);
    factory = await company(ctx, 'MANUFACTURER', FACTORY_NAME);
    await admin
      .post('/admin/logistics/hubs')
      .send({
        code: `HUB-BD-7${run.slice(-1)}`,
        name: 'Gazipur hub',
        country: 'BD',
        city: 'Gazipur',
        addressLine1: 'Shed 2, Tongi Road',
        port: 'BDDAC',
      })
      .expect(204);
    hubId = (
      await ctx.prisma.hub.findUniqueOrThrow({ where: { code: `HUB-BD-7${run.slice(-1)}` } })
    ).id;
    orderId = (await newOrder(orderCode)).id;
    await newOrder(otherCode);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('lets the buyer name its own forwarder instead of buying freight', async () => {
    expect((await handover(buyer.agent, orderCode, { destinationCountry: 'NO' })).status).toBe(400);
    await handover(factory.agent, orderCode, {
      destinationCountry: 'NO',
      forwarderName: FORWARDER,
      forwarderContact: FORWARDER_CONTACT,
    }).expect(403);
    await handover(buyer.agent, orderCode, {
      destinationCountry: 'NO',
      forwarderName: FORWARDER,
      forwarderContact: FORWARDER_CONTACT,
      forwarderReference: 'FJL-88412',
    }).expect(204);

    const view = BuyerOrderLogisticsSchema.parse(
      (await buyer.agent.get(`/orders/${orderCode}/logistics`).expect(200)).body,
    );
    expect(view.accepted).toMatchObject({ mode: 'HANDOVER', incoterm: 'FCA', totalMinor: 0 });
    expect(view.forwarder).toEqual({
      name: FORWARDER,
      contact: FORWARDER_CONTACT,
      reference: 'FJL-88412',
    });
    expect(view.outstandingMinor).toBe(0);
    const order = await ctx.prisma.order.findUniqueOrThrow({ where: { id: orderId } });
    expect(order.incoterm).toBe('FCA');
  });

  it('keeps the forwarder from the factory, which still delivers to the hub', async () => {
    const res = await factory.agent.get(`/orders/${orderCode}/logistics/factory`).expect(200);
    expect(FactoryOrderLogisticsSchema.parse(res.body).managed).toBe(true);
    const order = await factory.agent.get(`/orders/${orderCode}`).expect(200);
    for (const text of [res.text, order.text])
      for (const secret of [FORWARDER, 'fjordline', 'FJL-88412', BUYER_NAME])
        expect(text).not.toContain(secret);

    await factory.agent
      .put(`/orders/${orderCode}/logistics/packing`)
      .send({ cartons: 20, grossWeightGrams: 240_000, volumeLitres: 1_600 })
      .expect(204);
    await ctx.prisma.order.update({ where: { id: orderId }, data: { status: 'READY_TO_SHIP' } });
    await factory.agent
      .post(`/orders/${orderCode}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + DAY)) })
      .expect(204);
    await admin
      .post('/admin/logistics/hub-receipts')
      .send({ orderCode, hubId, cartonsReceived: 20, condition: 'GOOD' })
      .expect(204);

    const board = z
      .array(AdminLogisticsOrderSchema)
      .parse((await admin.get('/admin/logistics/orders').expect(200)).body);
    expect(board.find((o) => o.code === orderCode)?.quote.forwarder).toMatchObject({
      name: FORWARDER,
      contact: FORWARDER_CONTACT,
    });
  });

  it('builds a hand-over shipment for one forwarder, with no partner and no freight', async () => {
    // Another order going to a different forwarder can't share the hand-over.
    await ctx.prisma.order.update({
      where: { code: otherCode },
      data: { status: 'READY_TO_SHIP' },
    });
    await handover(buyer.agent, otherCode, {
      destinationCountry: 'NO',
      forwarderName: 'Nordkapp Logistics',
      forwarderContact: 'ops@nordkapp.example',
    }).expect(204);
    await factory.agent
      .put(`/orders/${otherCode}/logistics/packing`)
      .send({ cartons: 5, grossWeightGrams: 60_000, volumeLitres: 400 })
      .expect(204);
    await factory.agent
      .post(`/orders/${otherCode}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + DAY)) })
      .expect(204);
    await admin
      .post('/admin/logistics/hub-receipts')
      .send({ orderCode: otherCode, hubId, cartonsReceived: 5, condition: 'GOOD' })
      .expect(204);
    const mixed = await admin
      .post('/admin/logistics/shipments')
      .send({ orderCodes: [orderCode, otherCode] });
    expect(mixed.status).toBe(409);
    expect(mixed.text).toContain('forwarder');

    shipmentCode = (
      (
        await admin
          .post('/admin/logistics/shipments')
          .send({ orderCodes: [orderCode] })
          .expect(201)
      ).body as { code: string }
    ).code;
    const s = AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${shipmentCode}`).expect(200)).body,
    );
    expect(s).toMatchObject({ mode: 'HANDOVER', incoterm: 'FCA', buyerPriceMinor: 0 });
    expect(s.legs.map((l) => l.kind)).toEqual(['FACTORY_TO_HUB', 'HUB_HANDOVER']);
    expect(s.orders[0]?.forwarder?.name).toBe(FORWARDER);
    expect(s.documentTypes).not.toContain('BILL_OF_LADING');
    expect(s.documentTypes).not.toContain('INSURANCE_CERTIFICATE');
  });

  it('hands over once the order is paid: the order ships and no shipping money moves', async () => {
    const event = { status: 'IN_TRANSIT', location: 'Gazipur hub', note: 'Collected by forwarder' };
    const blocked = await admin
      .post(`/admin/logistics/shipments/${shipmentCode}/events`)
      .send(event);
    expect(blocked.status).toBe(409);
    expect(blocked.text).toContain('balance');

    for (const [purpose, amountMinor] of [
      ['DEPOSIT', 222_000n],
      ['BALANCE', 518_000n],
    ] as const)
      await recordPaidPayment(ctx, {
        orderId,
        buyerCompanyId: buyer.companyId,
        purpose,
        amountMinor,
      });
    const before = LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    ).currencies.find((c) => c.currency === 'USD');
    await admin.post(`/admin/logistics/shipments/${shipmentCode}/events`).send(event).expect(204);

    expect((await ctx.prisma.order.findUniqueOrThrow({ where: { id: orderId } })).status).toBe(
      'SHIPPED',
    );
    const after = LedgerBalancesSchema.parse(
      (await admin.get('/admin/finance/balances').expect(200)).body,
    ).currencies.find((c) => c.currency === 'USD');
    expect(after?.revenueMinor).toBe(before?.revenueMinor);
    expect(after).toMatchObject({ balanced: true, reconciled: true });

    const res = await buyer.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(200);
    const tracking = BuyerTrackingSchema.parse(res.body);
    expect(tracking.legs.at(-1)).toMatchObject({
      kind: 'HUB_HANDOVER',
      from: 'GarmentGate hub',
      to: 'Your forwarder',
    });
    expect(tracking.documents).toEqual([
      'COMMERCIAL_INVOICE',
      'PACKING_LIST',
      'CERTIFICATE_OF_ORIGIN',
    ]);
    expect(res.text).not.toContain(FACTORY_NAME);
    await buyer.agent.get(`/orders/${orderCode}/logistics/documents/BILL_OF_LADING`).expect(400);
    await buyer.agent
      .get(`/orders/${orderCode}/logistics/documents/COMMERCIAL_INVOICE`)
      .expect(200);

    // Nothing the factory receives names the forwarder.
    const notes = JSON.stringify((await factory.agent.get('/notifications').expect(200)).body);
    expect(notes).not.toContain(FORWARDER);
  });
});
