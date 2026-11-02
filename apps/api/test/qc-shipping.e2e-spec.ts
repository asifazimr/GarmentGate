import { hash } from '@node-rs/argon2';
import {
  BuyerOrderSchema,
  InspectorJobDetailSchema,
  InspectorJobSchema,
  InspectorSchema,
  ManufacturerOrderSchema,
  MediaReviewItemSchema,
  OrderFinanceSchema,
  PaymentStartSchema,
} from '@garmentgate/shared';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pdfText } from '../src/modules/chat/chat-scan.processor.js';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
const BUYER = 'Quillmere Apparel Co.';
const FACTORY = 'Ostrava Stitchworks Ltd.';
type Agent = ReturnType<typeof client>;

async function login(ctx: TestContext, email: string, password = PASSWORD): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password }).expect(200);
  return agent;
}

async function party(ctx: TestContext, kind: 'BUYER' | 'MANUFACTURER', n: string) {
  const email = uniqueEmail(`qc${kind.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: kind,
      firstName: 'Quinn',
      lastName: 'Checker',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: kind,
          legalName: kind === 'BUYER' ? BUYER : FACTORY,
          country: kind === 'BUYER' ? 'US' : 'BD',
          city: kind === 'BUYER' ? 'Portland' : 'Gazipur',
          addressLine1: kind === 'BUYER' ? '12 Harbor St' : 'Plot 9, BSCIC',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(kind === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-US-4${run}${n}` } } }
            : {
                manufacturerProfile: {
                  create: {
                    publicCode: `MFR-BD-4${run}${n}`,
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
    companyId: user.company?.id ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

async function upload(
  url: string,
  fields: Record<string, string>,
  bytes: Buffer,
  contentType: string,
): Promise<void> {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  form.append('file', new Blob([new Uint8Array(bytes)], { type: contentType }));
  expect((await fetch(url, { method: 'POST', body: form })).status).toBeLessThan(300);
}

async function waitFor<T>(fn: () => Promise<T | null>, timeoutMs = 20_000): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const v = await fn();
    if (v !== null) return v;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Timed out');
}

const pdfOf = async (req: ReturnType<Agent['get']>) => {
  const res = await req
    .buffer(true)
    .parse((r, cb) => {
      const chunks: Buffer[] = [];
      r.on('data', (c: Buffer) => chunks.push(c));
      r.on('end', () => {
        cb(null, Buffer.concat(chunks));
      });
    })
    .expect(200);
  expect(res.headers['content-type']).toBe('application/pdf');
  return pdfText(new Uint8Array(res.body as Buffer));
};

describe('QC and shipping (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let inspector: Agent;
  let inspectorId = '';
  let otherInspector: Agent;
  let buyer: Awaited<ReturnType<typeof party>>;
  let factory: Awaited<ReturnType<typeof party>>;
  let code = '';
  const tomorrow = new Date(Date.now() + DAY).toISOString();

  const asBuyer = async () =>
    BuyerOrderSchema.parse((await buyer.agent.get(`/orders/${code}`).expect(200)).body);
  const asFactory = async () =>
    ManufacturerOrderSchema.parse((await factory.agent.get(`/orders/${code}`).expect(200)).body);
  const finance = async () =>
    OrderFinanceSchema.parse((await admin.get(`/admin/finance/orders/${code}`).expect(200)).body);
  const move = (agent: Agent, to: string, status = 204, body: object = {}) =>
    agent
      .post(`/orders/${code}/transition`)
      .send({ to, ...body })
      .expect(status);
  const job = async (id: string, agent = inspector) =>
    InspectorJobDetailSchema.parse(
      (await agent.get(`/inspector/inspections/${id}`).expect(200)).body,
    );

  /** An inspector account the way staff make one: created, then a password from the email. */
  const newInspector = async (first: string) => {
    const email = uniqueEmail('inspector');
    const { id } = (
      await admin
        .post('/admin/inspectors')
        .send({ email, firstName: first, lastName: 'Inspector' })
        .expect(201)
    ).body as { id: string };
    const token = ctx.mail.tokenFor('reset-password', email);
    const password = 'Inspect0rPassword';
    await client(ctx.app).post('/auth/password/reset').send({ token, password }).expect(204);
    return { id, agent: await login(ctx, email, password) };
  };

  /** The buyer pays by bank transfer and staff confirm it with proof. */
  const pay = async (purpose: 'DEPOSIT' | 'BALANCE') => {
    const start = PaymentStartSchema.parse(
      (
        await buyer.agent
          .post(`/orders/${code}/payments`)
          .send({ purpose, method: 'BANK_TRANSFER' })
          .expect(201)
      ).body,
    );
    const bytes = Buffer.from('%PDF-1.4\n% bank statement\n');
    const presign = (
      await admin
        .post(`/admin/finance/payments/${start.paymentId}/uploads`)
        .send({
          fileName: 'statement.pdf',
          contentType: 'application/pdf',
          sizeBytes: bytes.length,
        })
        .expect(201)
    ).body as { fileId: string; url: string; fields: Record<string, string> };
    await upload(presign.url, presign.fields, bytes, 'application/pdf');
    await admin
      .post(`/admin/finance/payments/${start.paymentId}/confirm`)
      .send({ proofFileId: presign.fileId, bankReference: `BANK-${run}-${purpose}` })
      .expect(204);
  };

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyer = await party(ctx, 'BUYER', '1');
    factory = await party(ctx, 'MANUFACTURER', '2');
    ({ id: inspectorId, agent: inspector } = await newInspector('Ines'));
    ({ agent: otherInspector } = await newInspector('Otto'));

    code = `ORD-2097-${run}1`;
    await ctx.prisma.order.create({
      data: {
        code,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'QC test tee',
        quantity: 1000,
        buyerUnitPriceMinor: 455,
        manufacturerUnitPriceMinor: 380,
        buyerTotalMinor: 455_000n,
        manufacturerTotalMinor: 380_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'US',
        destinationPort: 'Los Angeles',
        requestedShipDate: new Date(Date.now() + 70 * DAY),
        status: 'DRAFT',
        items: { create: [{ color: 'Navy', size: 'M', quantity: 1000 }] },
      },
    });
    await move(buyer.agent, 'DEPOSIT_PENDING');
    await pay('DEPOSIT'); // → IN_PRODUCTION
  }, 60_000);

  afterAll(async () => {
    await ctx.app.close();
  });

  it('keeps inspectors to QC routes, and others out of them', async () => {
    const list = InspectorSchema.array().parse(
      (await admin.get('/admin/inspectors').expect(200)).body,
    );
    expect(list.find((i) => i.id === inspectorId)).toMatchObject({
      active: true,
      openInspections: 0,
    });

    await inspector.get('/auth/me').expect(200);
    await inspector.get('/notifications').expect(200);
    await inspector.get('/inspector/inspections').expect(200);
    await inspector.get(`/orders/${code}`).expect(403);
    await inspector.get('/orders').expect(403);
    await inspector.get('/rfqs').expect(403);
    await inspector.get('/admin/inspectors').expect(403);
    await buyer.agent.get('/inspector/inspections').expect(403);
    await factory.agent.get('/inspector/inspections').expect(403);
    await buyer.agent
      .post('/admin/inspectors')
      .send({ email: 'x@y.example', firstName: 'X', lastName: 'Y' })
      .expect(403);
  });

  it('lets the buyer book an inline inspection, once, for a real date', async () => {
    expect((await asBuyer()).status).toBe('IN_PRODUCTION');
    const yesterday = new Date(Date.now() - 2 * DAY).toISOString();
    await buyer.agent
      .post(`/orders/${code}/inspections`)
      .send({ type: 'DURING_PRODUCTION', scheduledAt: yesterday })
      .expect(400);
    await factory.agent
      .post(`/orders/${code}/inspections`)
      .send({ type: 'DURING_PRODUCTION', scheduledAt: tomorrow })
      .expect(403);
    const { id } = (
      await buyer.agent
        .post(`/orders/${code}/inspections`)
        .send({ type: 'DURING_PRODUCTION', scheduledAt: tomorrow })
        .expect(201)
    ).body as { id: string };
    await buyer.agent
      .post(`/orders/${code}/inspections`)
      .send({ type: 'DURING_PRODUCTION', scheduledAt: tomorrow })
      .expect(409);

    const [inline] = (await asBuyer()).inspections;
    expect(inline).toMatchObject({
      id,
      type: 'DURING_PRODUCTION',
      result: 'PENDING',
      bookedBy: 'BUYER',
      inspector: null,
    });
  });

  it('has staff assign an inspector, who sees the factory and files an inline report with photos', async () => {
    const [inline] = (await asBuyer()).inspections;
    const id = inline?.id ?? '';
    await inspector.get(`/inspector/inspections/${id}`).expect(404); // not assigned yet
    await admin
      .patch(`/admin/inspections/${id}`)
      .send({ inspectorId: buyer.companyId })
      .expect(400);
    await admin.patch(`/admin/inspections/${id}`).send({ inspectorId }).expect(204);

    const jobs = InspectorJobSchema.array().parse(
      (await inspector.get('/inspector/inspections').expect(200)).body,
    );
    expect(jobs.map((j) => j.id)).toEqual([id]);
    const detail = await job(id);
    expect(detail.factory).toMatchObject({ name: FACTORY, country: 'BD' });
    expect(detail.factory.address).toContain('Gazipur');
    expect(detail.items).toEqual([{ color: 'Navy', size: 'M', quantity: 1000 }]);
    expect(detail.canReport).toBe(true);
    expect(JSON.stringify(detail)).not.toContain(BUYER);
    await otherInspector.get(`/inspector/inspections/${id}`).expect(404);

    // A photo: sanitized by the media worker, approved before the buyer sees it.
    const jpeg = await sharp({ create: { width: 64, height: 48, channels: 3, background: '#335' } })
      .jpeg()
      .toBuffer();
    const presign = (
      await inspector
        .post(`/inspector/inspections/${id}/uploads`)
        .send({ fileName: 'IMG_0042.jpg', contentType: 'image/jpeg', sizeBytes: jpeg.length })
        .expect(201)
    ).body as { fileId: string; url: string; fields: Record<string, string> };
    await upload(presign.url, presign.fields, jpeg, 'image/jpeg');
    await inspector
      .post(`/inspector/inspections/${id}/photos`)
      .send({ fileId: presign.fileId, caption: 'Seam check, WhatsApp +880 1711-234567' })
      .expect(204);

    await inspector
      .post(`/inspector/inspections/${id}/report`)
      .send({
        lotSize: 1000,
        majorAql: '2.5',
        minorAql: '4.0',
        critical: 0,
        major: 2,
        minor: 3,
        result: 'PASS',
        summary: `Inline check at ${FACTORY}: sewing within tolerance.`,
      })
      .expect(204);
    await inspector
      .post(`/inspector/inspections/${id}/report`)
      .send({
        lotSize: 1000,
        majorAql: '2.5',
        minorAql: '4.0',
        critical: 0,
        major: 0,
        minor: 0,
        result: 'PASS',
        summary: 'Second report',
      })
      .expect(409);

    await waitFor(async () => {
      const queue = MediaReviewItemSchema.array().parse(
        (await admin.get('/admin/media/pending').expect(200)).body,
      );
      return (
        queue.find((q) => q.kind === 'inspection-photos' && q.context?.startsWith(code)) ?? null
      );
    });
    let b = (await asBuyer()).inspections[0];
    expect(b).toMatchObject({ result: 'PASS', defects: { critical: 0, major: 2, minor: 3 } });
    expect(b?.aql).toMatchObject({ sampleSize: 80, acceptMajor: 5, acceptMinor: 7 });
    expect(b?.photos).toHaveLength(0); // not approved yet
    expect(b?.summary).not.toContain(FACTORY);
    expect(b?.reportUrl).toBeNull();
    expect((await asFactory()).inspections[0]?.photos).toHaveLength(1);

    const queue = MediaReviewItemSchema.array().parse(
      (await admin.get('/admin/media/pending').expect(200)).body,
    );
    const item = queue.find((q) => q.kind === 'inspection-photos' && q.context?.startsWith(code));
    await admin.post(`/admin/media/inspection-photos/${item?.id ?? ''}/approve`).expect(204);
    b = (await asBuyer()).inspections[0];
    expect(b?.photos).toHaveLength(1);
    expect(b?.photos[0]?.caption).toContain('[contact info hidden]');
    expect(b?.photos[0]?.caption).not.toMatch(/1711|whatsapp/i);
  });

  it('opens the final inspection when production ends; a fail goes to the buyer for rework', async () => {
    await ctx.prisma.orderMilestone.updateMany({
      where: { order: { code } },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });
    await move(factory.agent, 'QC');
    let final = (await asBuyer()).inspections.find((i) => i.type === 'PRE_SHIPMENT');
    expect(final).toMatchObject({ result: 'PENDING', bookedBy: 'PLATFORM', scheduledAt: null });

    // The buyer picks the date of the one QC opened; it isn't booked twice.
    const booked = (
      await buyer.agent
        .post(`/orders/${code}/inspections`)
        .send({ type: 'PRE_SHIPMENT', scheduledAt: tomorrow })
        .expect(201)
    ).body as { id: string };
    expect(booked.id).toBe(final?.id);
    final = (await asBuyer()).inspections.find((i) => i.type === 'PRE_SHIPMENT');
    expect(final).toMatchObject({ bookedBy: 'BUYER', scheduledAt: tomorrow });
    expect((await asBuyer()).inspections.filter((i) => i.type === 'PRE_SHIPMENT')).toHaveLength(1);

    await admin
      .patch(`/admin/inspections/${final?.id ?? ''}`)
      .send({ inspectorId })
      .expect(204);
    const report = {
      lotSize: 1000,
      majorAql: '2.5',
      minorAql: '4.0',
      critical: 0,
      major: 6, // sample 80 accepts 5
      minor: 1,
      summary: `Open seams on 6 pieces. Call me on +880 1711 234567. ${FACTORY} agreed to rework.`,
    };
    await inspector
      .post(`/inspector/inspections/${final?.id ?? ''}/report`)
      .send({ ...report, result: 'PASS' })
      .expect(400); // the counts fail
    await inspector
      .post(`/inspector/inspections/${final?.id ?? ''}/report`)
      .send({ ...report, result: 'FAIL' })
      .expect(204);

    const b = await asBuyer();
    expect(b.status).toBe('QC');
    final = b.inspections.find((i) => i.type === 'PRE_SHIPMENT');
    expect(final?.result).toBe('FAIL');
    expect(final?.summary).toContain('[contact info hidden]');
    expect(final?.summary).not.toMatch(/1711|Ostrava/);
    expect(b.allowedTransitions).toEqual(expect.arrayContaining(['IN_PRODUCTION', 'DISPUTED']));

    await buyer.agent
      .post(`/orders/${code}/inspections`)
      .send({ type: 'PRE_SHIPMENT', scheduledAt: tomorrow })
      .expect(409); // rework comes first
    await move(factory.agent, 'IN_PRODUCTION', 403); // the factory can't skip a failed inspection
    await move(buyer.agent, 'IN_PRODUCTION'); // rework
    expect((await asBuyer()).status).toBe('IN_PRODUCTION');
  });

  it('re-inspects after rework; a pass makes the balance due', async () => {
    await move(factory.agent, 'QC');
    const finals = (await asBuyer()).inspections.filter((i) => i.type === 'PRE_SHIPMENT');
    expect(finals.map((i) => i.result)).toEqual(['FAIL', 'PENDING']);
    const id = finals[1]?.id ?? '';
    await admin
      .patch(`/admin/inspections/${id}`)
      .send({ inspectorId, scheduledAt: tomorrow })
      .expect(204);
    expect((await job(id)).canReport).toBe(true);

    // Staff can file it too, as can the inspector, but only once between them.
    const report = {
      lotSize: 1000,
      majorAql: '2.5',
      minorAql: '4.0',
      critical: 0,
      major: 1,
      minor: 2,
      result: 'PASS',
      summary: 'Rework done, all seams closed.',
    };
    const results = await Promise.all([
      inspector.post(`/inspector/inspections/${id}/report`).send(report),
      admin.post(`/inspector/inspections/${id}/report`).send(report),
    ]);
    expect(results.map((r) => r.status).sort()).toEqual([204, 409]);

    const b = await asBuyer();
    expect(b.status).toBe('READY_TO_SHIP');
    expect(b.balancePaid).toBe(false);
    const f = await finance();
    expect(f.releases.find((r) => r.trigger === 'QC_PASSED')?.status).toBe('DUE');
    const notes = await ctx.prisma.notification.findMany({
      where: { user: { companyId: buyer.companyId }, title: { contains: code } },
      orderBy: { createdAt: 'desc' },
    });
    expect(notes[0]?.body).toContain('pay the balance');
    expect((await job(id)).canReport).toBe(false);
  });

  it('lets the factory book the shipment with clean references and filtered text', async () => {
    const shipment = {
      mode: 'SEA',
      forwarder: `${FACTORY} logistics, call +880 1711 234567`,
      carrier: 'Maersk',
      trackingNumber: 'MAEU123456',
      containerNumber: 'MSKU1234565',
      transportDocNo: 'MAEU-BL-778812',
      originPort: 'Chattogram',
      cartons: 120,
      grossWeightKg: 1450,
      etd: new Date(Date.now() + 3 * DAY).toISOString(),
      eta: new Date(Date.now() + 35 * DAY).toISOString(),
    };
    await buyer.agent.put(`/orders/${code}/shipment`).send(shipment).expect(403);
    await factory.agent
      .put(`/orders/${code}/shipment`)
      .send({ ...shipment, trackingNumber: 'ring me: +8801711234567!' })
      .expect(400);
    await factory.agent
      .put(`/orders/${code}/shipment`)
      .send({ ...shipment, eta: new Date(Date.now()).toISOString() })
      .expect(400); // arrives before it leaves
    await factory.agent.put(`/orders/${code}/shipment`).send(shipment).expect(204);

    const b = await asBuyer();
    expect(b.shipment).toMatchObject({
      status: 'BOOKED',
      mode: 'SEA',
      incoterm: 'FOB',
      carrier: 'Maersk',
      trackingNumber: 'MAEU123456',
      destinationPort: 'Los Angeles',
      generatedDocuments: [
        'COMMERCIAL_INVOICE',
        'PACKING_LIST',
        'BILL_OF_LADING',
        'CERTIFICATE_OF_ORIGIN',
      ],
    });
    expect(b.shipment?.forwarder).not.toMatch(/Ostrava|1711/);
    expect((await asFactory()).shipment?.generatedDocuments).toEqual([]);
  });

  it('keeps uploaded papers from the buyer until staff publish the sanitized copy', async () => {
    const pdf = await PDFDocument.create();
    pdf.addPage();
    pdf.setAuthor(FACTORY); // metadata the sanitizer must drop
    const bytes = Buffer.from(await pdf.save());
    await buyer.agent
      .post(`/orders/${code}/shipment/uploads`)
      .send({ fileName: 'pl.pdf', contentType: 'application/pdf', sizeBytes: bytes.length })
      .expect(403);
    const presign = (
      await factory.agent
        .post(`/orders/${code}/shipment/uploads`)
        .send({
          fileName: `${FACTORY} packing list.pdf`,
          contentType: 'application/pdf',
          sizeBytes: bytes.length,
        })
        .expect(201)
    ).body as { fileId: string; url: string; fields: Record<string, string> };
    await upload(presign.url, presign.fields, bytes, 'application/pdf');
    await factory.agent
      .post(`/orders/${code}/shipment/documents`)
      .send({ fileId: presign.fileId, type: 'PACKING_LIST' })
      .expect(204);

    expect((await asBuyer()).shipment?.documents).toEqual([]);
    const [doc] = (await asFactory()).shipment?.documents ?? [];
    expect(doc).toMatchObject({
      type: 'PACKING_LIST',
      name: `${code}-packing-list.pdf`,
      buyerVisible: false,
    });

    await factory.agent
      .patch(`/orders/${code}/shipment/documents/${doc?.id ?? ''}`)
      .send({ buyerVisible: true })
      .expect(403);
    const processed = await waitFor(async () => {
      const d = (await asFactory()).shipment?.documents[0];
      return d?.processing === 'READY' || d?.processing === 'FAILED' ? d : null;
    });
    expect(processed.processing).toBe('READY');
    await admin
      .patch(`/orders/${code}/shipment/documents/${doc?.id ?? ''}`)
      .send({ buyerVisible: true })
      .expect(204);
    const [visible] = (await asBuyer()).shipment?.documents ?? [];
    expect(visible).toMatchObject({ type: 'PACKING_LIST', name: `${code}-packing-list.pdf` });
    expect(visible?.url).toContain('sanitized/');
    expect(JSON.stringify(visible)).not.toContain('Ostrava');
  });

  it('issues the buyer’s papers under GarmentGate’s name, never the factory’s', async () => {
    const invoice = await pdfOf(
      buyer.agent.get(`/orders/${code}/shipment/documents/generated/COMMERCIAL_INVOICE`),
    );
    for (const s of [
      'COMMERCIAL INVOICE',
      BUYER,
      'USD 4.55',
      'USD 4,550.00',
      'Bangladesh',
      'MAEU-BL-778812',
    ]) {
      expect(invoice).toContain(s);
    }
    expect(invoice).not.toMatch(/Ostrava|USD 3\.80|1711/);
    for (const type of ['PACKING_LIST', 'BILL_OF_LADING', 'CERTIFICATE_OF_ORIGIN']) {
      const text = await pdfOf(
        buyer.agent.get(`/orders/${code}/shipment/documents/generated/${type}`),
      );
      expect(text).not.toMatch(/Ostrava|Gazipur/);
    }
    await factory.agent
      .get(`/orders/${code}/shipment/documents/generated/COMMERCIAL_INVOICE`)
      .expect(403);
    await buyer.agent.get(`/orders/${code}/shipment/documents/generated/AIRWAY_BILL`).expect(400);
  });

  it('ships once the balance is in, and releases the last tranche when the buyer confirms delivery', async () => {
    await move(factory.agent, 'SHIPPED', 409); // balance not in yet
    await pay('BALANCE');
    expect((await asBuyer()).balancePaid).toBe(true);
    await move(factory.agent, 'SHIPPED'); // uses the booked shipment
    expect((await asBuyer()).shipment).toMatchObject({
      status: 'IN_TRANSIT',
      trackingNumber: 'MAEU123456',
    });

    for (const r of (await finance()).releases.filter((x) => x.status === 'DUE')) {
      await admin.post(`/admin/finance/releases/${r.id}/approve`).expect(204);
    }
    await move(factory.agent, 'DELIVERED', 403);
    await move(buyer.agent, 'DELIVERED');
    const f = await finance();
    expect(f.releases.map((r) => [r.trigger, r.status])).toEqual([
      ['PRODUCTION_START', 'RELEASED'],
      ['QC_PASSED', 'RELEASED'],
      ['DELIVERED', 'RELEASED'],
    ]);
    expect(f).toMatchObject({ escrowMinor: 0, releasedMinor: 380_000, commissionMinor: 75_000 });
    expect((await asBuyer()).shipment?.status).toBe('DELIVERED');
  });
});
