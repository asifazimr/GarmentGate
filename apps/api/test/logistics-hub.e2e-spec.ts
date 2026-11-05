import { hash } from '@node-rs/argon2';
import {
  AdminLogisticsOrderSchema,
  AdminShipmentSchema,
  BuyerOrderLogisticsSchema,
  BuyerShippingOptionSchema,
  ConsolidationCandidateSchema,
  ConsolidationOptionSchema,
  documentTypesFor,
  FactoryOrderLogisticsSchema,
  isoDate,
} from '@garmentgate/shared';
import sharp from 'sharp';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { pdfText } from '../src/modules/chat/chat-scan.processor.js';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

type Agent = ReturnType<typeof client>;
const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
const BUYER_NAME = 'Wyndemere Retail Group GmbH';
const FACTORY_NAME = 'Corvantis Knit Industries Ltd';
const OTHER_BUYER_NAME = 'Brisbury Outfitters Ltd';
const Options = z.array(BuyerShippingOptionSchema);

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(
  ctx: TestContext,
  type: 'BUYER' | 'MANUFACTURER',
  n: string,
  legalName: string,
) {
  const email = uniqueEmail(`hub${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Hub',
      lastName: 'Tester',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName,
          country: type === 'BUYER' ? 'DE' : 'BD',
          city: type === 'BUYER' ? 'Hamburg' : 'Gazipur',
          addressLine1: type === 'BUYER' ? '12 Speicherstadt' : '9 Tongi Road',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-DE-4${run}${n}` } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: `MFR-BD-4${run.slice(-2)}${n}`,
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

/** Collects a binary response, for PDFs. */
const binary = (req: ReturnType<Agent['get']>) =>
  req.buffer(true).parse((r, cb) => {
    const chunks: Buffer[] = [];
    r.on('data', (c: Buffer) => chunks.push(c));
    r.on('end', () => {
      cb(null, Buffer.concat(chunks));
    });
  });
const pdfOf = async (req: ReturnType<Agent['get']>) => {
  const res = await binary(req).expect(200);
  expect(res.headers['content-type']).toBe('application/pdf');
  return pdfText(new Uint8Array(res.body as Buffer));
};

describe('logistics: factory to hub to shipment (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let hubId = '';
  let seq = 0;

  const order = async (quantity: number, owner = buyer, status = 'IN_PRODUCTION' as const) => {
    seq += 1;
    const code = `ORD-2096-${run}${String(seq)}`;
    await ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: owner.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Heavyweight tee',
        quantity,
        buyerUnitPriceMinor: 450,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: BigInt(450 * quantity),
        manufacturerTotalMinor: BigInt(380 * quantity),
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'DE',
        hsCode: '610910',
        status,
      },
    });
    return code;
  };
  const choose = async (code: string, agent = buyer.agent, mode = 'SEA_LCL') => {
    const options = Options.parse(
      (
        await agent
          .post(`/orders/${code}/logistics/quotes`)
          .send({ destinationCountry: 'DE', incoterm: 'DAP' })
          .expect(200)
      ).body,
    );
    const pick = options.find((o) => o.mode === mode);
    await agent.post(`/orders/${code}/logistics/quotes/${pick?.quoteId ?? ''}/accept`).expect(204);
    return pick;
  };
  const factoryView = async (code: string) =>
    FactoryOrderLogisticsSchema.parse(
      (await factory.agent.get(`/orders/${code}/logistics/factory`).expect(200)).body,
    );
  const ready = (code: string) =>
    ctx.prisma.order.update({ where: { code }, data: { status: 'READY_TO_SHIP' } });
  const pack = (code: string, cartons = 40) =>
    factory.agent.put(`/orders/${code}/logistics/packing`).send({
      cartons,
      piecesPerCarton: 50,
      grossWeightGrams: 600_000,
      cartonLengthCm: 60,
      cartonWidthCm: 40,
      cartonHeightCm: 40,
    });
  const board = async () =>
    z
      .array(AdminLogisticsOrderSchema)
      .parse((await admin.get('/admin/logistics/orders').expect(200)).body);
  const receive = async (code: string, cartons: number, photoFileIds: string[] = []) => {
    await factory.agent
      .post(`/orders/${code}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + DAY)) })
      .expect(204);
    await admin
      .post('/admin/logistics/hub-receipts')
      .send({
        orderCode: code,
        hubId,
        cartonsReceived: cartons,
        condition: 'GOOD',
        relabelled: true,
        photoFileIds,
      })
      .expect(204);
  };

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyer = await company(ctx, 'BUYER', '1', BUYER_NAME);
    factory = await company(ctx, 'MANUFACTURER', '1', FACTORY_NAME);
    await ctx.prisma.rateCard.deleteMany();
    await ctx.prisma.logisticsMarginRule.deleteMany();
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'logistics' } });
    await admin
      .post('/admin/logistics/partners')
      .send({ name: 'Hubline Freight', kind: 'FORWARDER', country: 'BD' })
      .expect(204);
    const partner = await ctx.prisma.logisticsPartner.findFirstOrThrow({
      where: { name: 'Hubline Freight' },
    });
    await admin
      .post('/admin/logistics/rate-cards')
      .send({
        partnerId: partner.id,
        mode: 'SEA_LCL',
        unit: 'PER_CBM',
        costMinor: 4500,
        minChargeMinor: 10_000,
        originCountry: 'BD',
        destinationCountry: 'DE',
        transitDaysMin: 25,
        transitDaysMax: 32,
        validFrom: isoDate(new Date(Date.now() - DAY)),
        validTo: isoDate(new Date(Date.now() + 120 * DAY)),
      })
      .expect(204);
    await admin
      .post('/admin/logistics/margins')
      .send({ name: 'Default', markupBps: 1000 })
      .expect(204);
    await admin
      .post('/admin/logistics/hubs')
      .send({
        code: `HUB-BD-${run.slice(-2)}`,
        name: 'Gazipur consolidation hub',
        country: 'BD',
        city: 'Gazipur',
        addressLine1: 'Shed 3, BSCIC estate',
        port: 'BDCGP',
      })
      .expect(204);
    hubId = (await ctx.prisma.hub.findUniqueOrThrow({ where: { code: `HUB-BD-${run.slice(-2)}` } }))
      .id;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('takes the factory from packing to a hub pickup, with markings that name no buyer', async () => {
    const code = await order(2000);
    expect(await factoryView(code)).toMatchObject({ managed: false, canPack: false, hubs: [] });
    await pack(code).expect(409); // not GarmentGate's to ship yet

    await choose(code);
    const managed = await factoryView(code);
    expect(managed).toMatchObject({ managed: true, canPack: true, canBookPickup: false });
    expect(managed.hubs.map((h) => h.id)).toContain(hubId);
    await pack(code).expect(204);
    // 40 cartons of 60 × 40 × 40 cm = 3.84 CBM.
    expect((await factoryView(code)).packing).toMatchObject({ cartons: 40, volumeLitres: 3_840 });
    await factory.agent
      .post(`/orders/${code}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + DAY)) })
      .expect(409); // not ready to ship yet

    await ready(code);
    await factory.agent
      .post(`/orders/${code}/logistics/pickup`)
      .send({
        hubId: '0198a000-0000-7000-8000-00000000ffff',
        pickupDate: isoDate(new Date(Date.now() + DAY)),
      })
      .expect(400);
    await factory.agent
      .post(`/orders/${code}/logistics/pickup`)
      .send({
        hubId,
        pickupDate: isoDate(new Date(Date.now() + DAY)),
        note: 'Call me on +880 1711 555 666',
      })
      .expect(204);
    await factory.agent
      .post(`/orders/${code}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + 2 * DAY)) })
      .expect(409);

    const markings = await pdfOf(factory.agent.get(`/orders/${code}/logistics/carton-markings`));
    expect(markings).toContain(`HUB-BD-${run.slice(-2)}`);
    expect(markings).toContain(code);
    expect(markings).toContain('CARTON 40 OF 40');
    expect(markings).not.toContain(BUYER_NAME);
    expect(markings).not.toContain('Hamburg');
    await buyer.agent.get(`/orders/${code}/logistics/carton-markings`).expect(403);

    // The factory-booked shipment flow is gone altogether.
    await factory.agent.put(`/orders/${code}/shipment`).send({}).expect(404);
    // The buyer's price now uses the packed cargo, not the estimate.
    const repriced = Options.parse(
      (
        await buyer.agent
          .post(`/orders/${code}/logistics/quotes`)
          .send({ destinationCountry: 'DE', incoterm: 'DAP' })
          .expect(200)
      ).body,
    );
    expect(repriced.find((o) => o.mode === 'SEA_LCL')?.freightMinor).toBe(19_008); // 3.84 CBM × $45 + 10%
    expect(
      BuyerOrderLogisticsSchema.parse(
        (await buyer.agent.get(`/orders/${code}/logistics`).expect(200)).body,
      ).cargo,
    ).toMatchObject({
      volumeLitres: 3_840,
      estimated: false,
    });
  });

  it('lets staff schedule, collect and receive at the hub, with photos', async () => {
    const code = await order(2000);
    await choose(code);
    await pack(code).expect(204);
    await ready(code);
    await factory.agent
      .post(`/orders/${code}/logistics/pickup`)
      .send({ hubId, pickupDate: isoDate(new Date(Date.now() + DAY)) })
      .expect(204);
    const row = (await board()).find((r) => r.code === code);
    expect(row).toMatchObject({
      buyer: { name: BUYER_NAME },
      manufacturer: { name: FACTORY_NAME },
      cargo: { estimatedGrams: 600_000, packedLitres: 3_840, cartons: 40 },
      pickup: { status: 'REQUESTED' },
      quote: { mode: 'SEA_LCL', paid: false },
    });
    const pickupId = row?.pickup?.id ?? '';
    await admin
      .patch(`/admin/logistics/pickups/${pickupId}`)
      .send({ status: 'COLLECTED' })
      .expect(409);
    await admin
      .patch(`/admin/logistics/pickups/${pickupId}`)
      .send({ status: 'SCHEDULED' })
      .expect(204);
    await admin
      .patch(`/admin/logistics/pickups/${pickupId}`)
      .send({ status: 'COLLECTED' })
      .expect(204);

    const jpeg = await sharp({ create: { width: 64, height: 64, channels: 3, background: '#888' } })
      .jpeg()
      .toBuffer();
    const presign = await admin
      .post('/admin/logistics/hub-photos/uploads')
      .send({ fileName: 'pallet.jpg', contentType: 'image/jpeg', sizeBytes: jpeg.length })
      .expect(201);
    const { fileId, url, fields } = presign.body as {
      fileId: string;
      url: string;
      fields: Record<string, string>;
    };
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    form.append('file', new Blob([new Uint8Array(jpeg)], { type: 'image/jpeg' }));
    expect((await fetch(url, { method: 'POST', body: form })).status).toBeLessThan(300);

    await admin
      .post('/admin/logistics/hub-receipts')
      .send({
        orderCode: code,
        hubId,
        cartonsReceived: 39,
        condition: 'SHORT',
        notes: 'One carton missing',
        photoFileIds: [fileId],
      })
      .expect(204);
    const after = (await board()).find((r) => r.code === code);
    expect(after).toMatchObject({
      pickup: { status: 'RECEIVED' },
      receipt: { cartonsReceived: 39, condition: 'SHORT' },
    });
    expect((await factoryView(code)).received?.cartons).toBe(39);
    expect(await ctx.prisma.hubReceiptPhoto.count({ where: { fileId } })).toBe(1);
  });

  it('prices orders shipped together below shipping them one by one, shared by weight', async () => {
    const a = await order(200);
    const b = await order(200);
    const candidates = z
      .array(ConsolidationCandidateSchema)
      .parse(
        (await buyer.agent.get(`/orders/${a}/logistics/consolidation-candidates`).expect(200)).body,
      );
    expect(candidates.map((c) => c.code)).toContain(b);

    const res = await buyer.agent
      .post('/logistics/consolidations/quotes')
      .send({ orderCodes: [a, b], destinationCountry: 'DE', incoterm: 'DAP' })
      .expect(200);
    const [lcl] = z.array(ConsolidationOptionSchema).parse(res.body);
    // Each alone hits the $100 LCL minimum (+10%); together they share one.
    expect(lcl).toMatchObject({
      mode: 'SEA_LCL',
      combinedTotalMinor: 11_000,
      separateTotalMinor: 22_000,
      savingMinor: 11_000,
    });
    expect(lcl?.shares.map((s) => s.totalMinor)).toEqual([5_500, 5_500]);
    expect(res.text).not.toContain('Hubline');

    await buyer.agent
      .post('/logistics/consolidations/quotes')
      .send({ orderCodes: [a, b], destinationCountry: 'DE', incoterm: 'DDP' })
      .expect(400);
    await buyer.agent.post(`/logistics/consolidations/${lcl?.code ?? ''}/accept`).expect(204);
    for (const code of [a, b]) {
      const view = BuyerOrderLogisticsSchema.parse(
        (await buyer.agent.get(`/orders/${code}/logistics`).expect(200)).body,
      );
      expect(view.accepted?.totalMinor).toBe(5_500);
    }
    const other = await company(ctx, 'BUYER', '2', OTHER_BUYER_NAME);
    await other.agent.post(`/logistics/consolidations/${lcl?.code ?? ''}/accept`).expect(404);
  });

  it('builds a one-buyer shipment with legs and documents that keep both sides apart', async () => {
    const a = await order(200);
    const b = await order(200);
    const res = await buyer.agent
      .post('/logistics/consolidations/quotes')
      .send({
        orderCodes: [a, b],
        destinationCountry: 'DE',
        destinationPort: 'DEHAM',
        incoterm: 'DAP',
      })
      .expect(200);
    const [lcl] = z.array(ConsolidationOptionSchema).parse(res.body);
    await buyer.agent.post(`/logistics/consolidations/${lcl?.code ?? ''}/accept`).expect(204);
    for (const code of [a, b]) {
      await pack(code, 4).expect(204);
      await ready(code);
    }
    await admin
      .post('/admin/logistics/shipments')
      .send({ orderCodes: [a, b] })
      .expect(409); // not at the hub yet
    for (const code of [a, b]) await receive(code, 4);

    const otherBuyer = await company(ctx, 'BUYER', '3', OTHER_BUYER_NAME);
    const foreign = await order(200, otherBuyer);
    await choose(foreign, otherBuyer.agent);
    await pack(foreign, 4).expect(204);
    await ready(foreign);
    await receive(foreign, 4);
    await admin
      .post('/admin/logistics/shipments')
      .send({ orderCodes: [a, foreign] })
      .expect(409);

    const { code } = (
      await admin
        .post('/admin/logistics/shipments')
        .send({ orderCodes: [a, b] })
        .expect(201)
    ).body as { code: string };
    expect(code).toMatch(/^SHP-\d{4}-\d{5}$/);
    await admin
      .post('/admin/logistics/shipments')
      .send({ orderCodes: [b] })
      .expect(409); // already on one
    // The database refuses another buyer's order on this shipment, whatever the code does.
    const shipment = await ctx.prisma.logisticsShipment.findUniqueOrThrow({ where: { code } });
    const foreignOrder = await ctx.prisma.order.findUniqueOrThrow({ where: { code: foreign } });
    await expect(
      ctx.prisma.logisticsShipmentOrder.create({
        data: {
          shipmentId: shipment.id,
          orderId: foreignOrder.id,
          cartons: 1,
          grossWeightGrams: 1,
          volumeLitres: 1,
          buyerShareMinor: 0n,
          costShareMinor: 0n,
        },
      }),
    ).rejects.toThrow();

    let detail = AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${code}`).expect(200)).body,
    );
    expect(detail).toMatchObject({
      status: 'PLANNED',
      mode: 'SEA_LCL',
      incoterm: 'DAP',
      buyerPriceMinor: 11_000,
      partnerCostMinor: 10_000,
      marginMinor: 1_000,
      cartons: 8,
      consolidationCode: lcl?.code,
      originHub: { code: `HUB-BD-${run.slice(-2)}` },
    });
    expect(detail.legs.map((l) => [l.kind, l.status])).toEqual([
      ['FACTORY_TO_HUB', 'COMPLETED'],
      ['HUB_TO_PORT', 'PENDING'],
      ['PORT_TO_PORT', 'PENDING'],
      ['PORT_TO_BUYER', 'PENDING'],
    ]);
    expect(detail.legs[2]).toMatchObject({ fromLabel: 'BDCGP', toLabel: 'DEHAM' });

    // Leg costs replace the estimate once every leg has one.
    const [, toPort, ocean, delivery] = detail.legs;
    await admin
      .patch(`/admin/logistics/shipments/${code}/legs/${toPort?.id ?? ''}`)
      .send({ costMinor: 1_500 })
      .expect(204);
    await admin
      .patch(`/admin/logistics/shipments/${code}/legs/${ocean?.id ?? ''}`)
      .send({
        costMinor: 6_000,
        carrier: 'Meridian Lines',
        transportDocNo: 'MLBL-778812',
        containerNumber: 'MSKU1234567',
        status: 'BOOKED',
      })
      .expect(204);
    await admin
      .patch(`/admin/logistics/shipments/${code}/legs/${ocean?.id ?? ''}`)
      .send({ trackingNumber: 'bad#ref' })
      .expect(400);
    await admin
      .patch(`/admin/logistics/shipments/${code}/legs/${delivery?.id ?? ''}`)
      .send({ costMinor: 1_200 })
      .expect(204);
    await admin.patch(`/admin/logistics/shipments/${code}`).send({ status: 'BOOKED' }).expect(204);
    detail = AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${code}`).expect(200)).body,
    );
    expect(detail).toMatchObject({ status: 'BOOKED', partnerCostMinor: 8_700, marginMinor: 2_300 });

    // Documents: only the buyer's commercial papers name the buyer; none names the factory.
    const doc = (type: string) =>
      pdfOf(admin.get(`/admin/logistics/shipments/${code}/documents/${type}`));
    // Uninsured cargo gets no insurance certificate.
    expect(detail.documentTypes).toEqual(
      documentTypesFor('GARMENT_GATE_EXPORTER', { mode: detail.mode, insured: false }),
    );
    expect(detail.documentTypes).not.toContain('INSURANCE_CERTIFICATE');
    for (const type of detail.documentTypes) {
      const text = await doc(type);
      expect(text, type).not.toContain(FACTORY_NAME);
      expect(text, type).not.toContain('Tongi');
      const buyerFacing = [
        'COMMERCIAL_INVOICE',
        'CERTIFICATE_OF_ORIGIN',
        'INSURANCE_CERTIFICATE',
      ].includes(type);
      if (buyerFacing) expect(text, type).toContain(BUYER_NAME);
      else expect(text, type).not.toContain(BUYER_NAME);
    }
    expect(await doc('BILL_OF_LADING')).toContain('To order of');
    expect(await doc('BILL_OF_LADING')).toContain('MLBL-778812');
    await admin
      .get(`/admin/logistics/shipments/${code}/documents/ORIGINAL_BILL_OF_LADING`)
      .expect(400);
    detail = AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${code}`).expect(200)).body,
    );
    expect(detail.documents.map((d) => d.number)).toContain(`${code}-CI`);

    // A switch keeps the factory-shipper original with staff; the switched B/L names GarmentGate.
    await admin
      .put('/admin/logistics/settings')
      .send({
        shipperMode: 'SWITCH_BL',
        insuranceRateBps: 30,
        minInsurancePremiumMinor: 2500,
        quoteValidityDays: 7,
      })
      .expect(200);
    const { code: switched } = (
      await admin
        .post('/admin/logistics/shipments')
        .send({ orderCodes: [foreign] })
        .expect(201)
    ).body as { code: string };
    const original = await pdfOf(
      admin.get(`/admin/logistics/shipments/${switched}/documents/ORIGINAL_BILL_OF_LADING`),
    );
    expect(original).toContain(FACTORY_NAME);
    expect(original).not.toContain(OTHER_BUYER_NAME);
    expect(
      await pdfOf(admin.get(`/admin/logistics/shipments/${switched}/documents/BILL_OF_LADING`)),
    ).not.toContain(FACTORY_NAME);

    // Cancelling frees the orders for another shipment.
    await admin
      .patch(`/admin/logistics/shipments/${switched}`)
      .send({ status: 'CANCELLED' })
      .expect(204);
    await admin
      .post('/admin/logistics/shipments')
      .send({ orderCodes: [foreign] })
      .expect(201);

    // Nobody but staff reaches shipments.
    await buyer.agent.get(`/admin/logistics/shipments/${code}`).expect(403);
    await factory.agent.get('/admin/logistics/orders').expect(403);
    const otherFactory = await company(ctx, 'MANUFACTURER', '2', 'Elsewhere Mills');
    await otherFactory.agent.get(`/orders/${a}/logistics/factory`).expect(404);
  });
});
