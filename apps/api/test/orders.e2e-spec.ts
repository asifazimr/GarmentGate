import { hash } from '@node-rs/argon2';
import {
  AdminOrderSchema,
  type BuyerOrder,
  BuyerOrderSchema,
  BuyerOrderSummarySchema,
  ManufacturerOrderSchema,
  MediaReviewItemSchema,
} from '@garmentgate/shared';
import sharp from 'sharp';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pdfText } from '../src/modules/chat/chat-scan.processor.js';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  type TestContext,
  shipThroughGarmentGate,
  uniqueEmail,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const run = String(Date.now()).slice(-4);
const DAY = 86_400_000;
const BUYER = { legalName: 'Larkspur Outfitters Inc.', first: 'Delphine', last: 'Ashcombe' };
const FACTORY = { legalName: 'Vantorian Garments Ltd.', first: 'Ishaan', last: 'Morrow' };
type Agent = ReturnType<typeof client>;

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function party(ctx: TestContext, kind: 'BUYER' | 'MANUFACTURER', n: string) {
  const email = uniqueEmail(`ord${kind.toLowerCase()}`);
  const who = kind === 'BUYER' ? BUYER : FACTORY;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: kind,
      firstName: who.first,
      lastName: who.last,
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: kind,
          legalName: who.legalName,
          country: kind === 'BUYER' ? 'US' : 'BD',
          addressLine1: kind === 'BUYER' ? '12 Larkspur Lane' : '7 Vantorian Road',
          city: kind === 'BUYER' ? 'Portland' : 'Gazipur',
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

let orderCounter = 0;
async function draftOrder(
  ctx: TestContext,
  buyer: { companyId: string },
  factory: { profileId: string },
) {
  orderCounter += 1;
  const code = `ORD-2099-${run}${String(orderCounter)}`;
  await ctx.prisma.order.create({
    data: {
      code,
      buyerCompanyId: buyer.companyId,
      manufacturerProfileId: factory.profileId,
      title: `Larkspur heavyweight tee ${run}`,
      specification: 'Made for Larkspur Outfitters. 240 GSM, garment dyed.',
      quantity: 2000,
      buyerUnitPriceMinor: 455,
      manufacturerUnitPriceMinor: 380,
      buyerTotalMinor: 910_000n,
      manufacturerTotalMinor: 760_000n,
      currency: 'USD',
      incoterm: 'FOB',
      destinationCountry: 'US',
      requestedShipDate: new Date(Date.now() + 70 * DAY),
      status: 'DRAFT',
    },
  });
  return code;
}

async function upload(
  agent: Agent,
  code: string,
  bytes: Buffer,
  contentType: string,
  fileName: string,
): Promise<string> {
  const presign = await agent
    .post(`/orders/${code}/uploads`)
    .send({ fileName, contentType, sizeBytes: bytes.length })
    .expect(201);
  const { fileId, url, fields } = presign.body as {
    fileId: string;
    url: string;
    fields: Record<string, string>;
  };
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  form.append('file', new Blob([new Uint8Array(bytes)], { type: contentType }));
  expect((await fetch(url, { method: 'POST', body: form })).status).toBeLessThan(300);
  return fileId;
}

/** Tiny but valid-looking MP4 with a GPS location box (see video-processor.spec.ts). */
function mp4WithGps(): Buffer {
  const box = (type: string, ...children: Buffer[]) => {
    const body = Buffer.concat(children);
    const header = Buffer.alloc(8);
    header.writeUInt32BE(8 + body.length, 0);
    header.write(type, 4, 'latin1');
    return Buffer.concat([header, body]);
  };
  return Buffer.concat([
    box('ftyp', Buffer.from('isom\0\0\0\0isommp41')),
    box('mdat', Buffer.from('FRAMES')),
    box(
      'moov',
      box('mvhd', Buffer.alloc(100)),
      box('udta', box('©xyz', Buffer.from('+23.9999+090.4125/'))),
    ),
  ]);
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

const leaks = (body: unknown, who: { legalName: string; first: string; last: string }) =>
  [who.legalName, who.first, who.last, 'Larkspur', 'Vantorian'].filter(
    (s) =>
      JSON.stringify(body).includes(s) && (who === BUYER ? s !== 'Vantorian' : s !== 'Larkspur'),
  );

describe('order lifecycle (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof party>>;
  let factory: Awaited<ReturnType<typeof party>>;
  let stranger: Awaited<ReturnType<typeof party>>;
  let code = '';

  const asBuyer = async () =>
    BuyerOrderSchema.parse((await buyer.agent.get(`/orders/${code}`).expect(200)).body);
  const asFactory = async () =>
    ManufacturerOrderSchema.parse((await factory.agent.get(`/orders/${code}`).expect(200)).body);
  const move = (agent: Agent, to: string, body: object = {}, status = 204) =>
    agent
      .post(`/orders/${code}/transition`)
      .send({ to, ...body })
      .expect(status);
  const approveAll = async (kind: string) => {
    const queue = MediaReviewItemSchema.array().parse(
      (await admin.get('/admin/media/pending').expect(200)).body,
    );
    for (const item of queue.filter((q) => q.kind === kind && q.context?.startsWith(code))) {
      await admin.post(`/admin/media/${kind}/${item.id}/approve`).expect(204);
    }
  };

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    buyer = await party(ctx, 'BUYER', '1');
    factory = await party(ctx, 'MANUFACTURER', '2');
    stranger = await party(ctx, 'BUYER', '3');
    code = await draftOrder(ctx, buyer, factory);
  }, 60_000);

  afterAll(async () => {
    await ctx.app.close();
  });

  it('shows each side its own price and only the other side’s code', async () => {
    const b = await asBuyer();
    expect(b).toMatchObject({
      unitPriceMinor: 455,
      totalMinor: 910_000,
      depositMinor: 273_000,
      status: 'DRAFT',
    });
    expect(b.allowedTransitions).toEqual(['SAMPLING', 'DEPOSIT_PENDING', 'CANCELLED']);
    const f = await asFactory();
    expect(f).toMatchObject({ unitPriceMinor: 380, totalMinor: 760_000 });
    expect(f.allowedTransitions).toEqual([]);
    expect(f.title).not.toContain('Larkspur');
    expect(f.specification).not.toContain('Larkspur');
    expect(JSON.stringify(f)).not.toMatch(/:455[,}]/);
    expect(leaks(f, BUYER)).toEqual([]);
    expect(leaks(b, FACTORY)).toEqual([]);
    await stranger.agent.get(`/orders/${code}`).expect(404);
    const list = BuyerOrderSummarySchema.array().parse(
      (await buyer.agent.get('/orders').expect(200)).body,
    );
    expect(list.map((o) => o.code)).toContain(code);
  });

  it('refuses transitions the state machine doesn’t allow', async () => {
    await move(buyer.agent, 'IN_PRODUCTION', {}, 403);
    await move(factory.agent, 'DEPOSIT_PENDING', {}, 403);
    await move(buyer.agent, 'SAMPLING', {}, 400); // only via a sample request
    await move(buyer.agent, 'SAMPLE_APPROVED', {}, 400);
  });

  it('runs sampling: request, ship, changes with photos, revised sample, approval', async () => {
    await buyer.agent
      .post(`/orders/${code}/samples`)
      .send({ quantity: 2, notes: 'Two pieces in Black, size M' })
      .expect(204);
    let f = await asFactory();
    expect(f.status).toBe('SAMPLING');
    const first = f.samples[0];
    expect(first).toMatchObject({ round: 1, status: 'REQUESTED' });
    await buyer.agent
      .post(`/orders/${code}/samples/${first?.id ?? ''}/ship`)
      .send({ courier: 'DHL', trackingNumber: '123456' })
      .expect(403);
    await factory.agent
      .post(`/orders/${code}/samples/${first?.id ?? ''}/ship`)
      .send({ courier: 'DHL', trackingNumber: '4920018833' })
      .expect(204);
    await factory.agent
      .post(`/orders/${code}/samples/${first?.id ?? ''}/decision`)
      .send({ decision: 'APPROVE' })
      .expect(403);

    const photo = await sharp({
      create: { width: 800, height: 600, channels: 3, background: '#334' },
    })
      .jpeg()
      .toBuffer();
    const fileId = await upload(buyer.agent, code, photo, 'image/jpeg', 'neck-label.jpg');
    await buyer.agent
      .post(`/orders/${code}/samples/${first?.id ?? ''}/decision`)
      .send({
        decision: 'CHANGES',
        comments: 'Neck rib too tight, call me on +1 503 555 0101',
        photoFileIds: [fileId],
      })
      .expect(204);

    f = await asFactory();
    expect(f.samples.map((s) => [s.round, s.status])).toEqual([
      [1, 'REJECTED'],
      [2, 'REQUESTED'],
    ]);
    expect(f.samples[0]?.feedback).not.toContain('555 0101');
    expect(f.samples[0]?.photos).toEqual([]); // waits for review
    await waitFor(async () => {
      const queue = MediaReviewItemSchema.array().parse(
        (await admin.get('/admin/media/pending').expect(200)).body,
      );
      return queue.some((q) => q.kind === 'sample-photos' && q.context?.startsWith(code))
        ? true
        : null;
    });
    await approveAll('sample-photos');
    f = await asFactory();
    expect(f.samples[0]?.photos[0]?.urls?.medium).toBeTruthy();

    const second = f.samples[1];
    await factory.agent
      .post(`/orders/${code}/samples/${second?.id ?? ''}/ship`)
      .send({ courier: 'DHL', trackingNumber: '4920021904' })
      .expect(204);
    await buyer.agent
      .post(`/orders/${code}/samples/${second?.id ?? ''}/decision`)
      .send({ decision: 'APPROVE', comments: 'Perfect' })
      .expect(204);
    expect((await asBuyer()).status).toBe('SAMPLE_APPROVED');
  });

  it('issues two purchase orders, each with its own parties and price', async () => {
    await move(buyer.agent, 'DEPOSIT_PENDING');
    const b = await asBuyer();
    expect(b.confirmedAt).not.toBeNull();

    const pdf = async (agent: Agent, query = '') => {
      const res = await agent
        .get(`/orders/${code}/purchase-order${query}`)
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
    const buyerPo = await pdf(buyer.agent);
    expect(buyerPo).toContain(BUYER.legalName);
    expect(buyerPo).toContain('USD 4.55');
    expect(buyerPo).toContain('GarmentGate');
    expect(buyerPo).not.toContain(FACTORY.legalName);
    expect(buyerPo).not.toContain('USD 3.80');

    const factoryPo = await pdf(factory.agent);
    expect(factoryPo).toContain(FACTORY.legalName);
    expect(factoryPo).toContain('USD 3.80');
    expect(factoryPo).not.toMatch(/Larkspur|Delphine|Portland|USD 4\.55/);

    await factory.agent.get(`/orders/${code}/purchase-order?side=buyer`).expect(403);
    expect(await pdf(admin, '?side=manufacturer')).toContain(FACTORY.legalName);
  });

  it('tracks production stage by stage, with media buyers see after review', async () => {
    await move(buyer.agent, 'IN_PRODUCTION', {}, 403);
    await move(admin, 'IN_PRODUCTION'); // deposit received
    let f = await asFactory();
    expect(f.milestones.map((m) => m.stage)).toEqual([
      'FABRIC_SOURCING',
      'CUTTING',
      'SEWING',
      'FINISHING',
      'PACKING',
    ]);
    expect(f.milestones.every((m) => m.plannedAt !== null)).toBe(true);

    await factory.agent
      .post(`/orders/${code}/milestones/CUTTING`)
      .send({ status: 'COMPLETED' })
      .expect(409);
    await buyer.agent
      .post(`/orders/${code}/milestones/FABRIC_SOURCING`)
      .send({ status: 'COMPLETED' })
      .expect(403);
    await factory.agent
      .post(`/orders/${code}/milestones/FABRIC_SOURCING`)
      .send({ status: 'COMPLETED', note: 'Fabric in. Questions? ishaan@vantorian.example' })
      .expect(204);

    const image = await sharp({
      create: { width: 1200, height: 900, channels: 3, background: '#2a6' },
    })
      .jpeg()
      .toBuffer();
    const imageId = await upload(factory.agent, code, image, 'image/jpeg', 'fabric.jpg');
    await factory.agent
      .post(`/orders/${code}/milestones/FABRIC_SOURCING/media`)
      .send({ fileId: imageId, caption: 'Dyed fabric rolls' })
      .expect(204);
    const videoId = await upload(factory.agent, code, mp4WithGps(), 'video/mp4', 'cutting.mp4');
    await factory.agent
      .post(`/orders/${code}/milestones/FABRIC_SOURCING/media`)
      .send({ fileId: videoId })
      .expect(204);

    expect((await asBuyer()).milestones[0]?.media).toEqual([]);
    expect((await asBuyer()).milestones[0]?.note).not.toContain('vantorian');
    await waitFor(async () => {
      const queue = MediaReviewItemSchema.array().parse(
        (await admin.get('/admin/media/pending').expect(200)).body,
      );
      return queue.filter((q) => q.kind === 'milestone-media' && q.context?.startsWith(code))
        .length === 2
        ? true
        : null;
    });
    await approveAll('milestone-media');
    const media = (await asBuyer()).milestones[0]?.media ?? [];
    expect(media.map((m) => m.kind).sort()).toEqual(['IMAGE', 'VIDEO']);
    const video = media.find((m) => m.kind === 'VIDEO');
    const bytes = Buffer.from(await (await fetch(video?.videoUrl ?? '')).arrayBuffer());
    expect(bytes.toString('latin1')).not.toContain('+23.9999');
    expect(bytes.toString('latin1')).toContain('FRAMES');

    await move(factory.agent, 'QC', {}, 409); // stages still open
    for (const stage of ['CUTTING', 'SEWING', 'FINISHING', 'PACKING']) {
      await factory.agent
        .post(`/orders/${code}/milestones/${stage}`)
        .send({ status: 'COMPLETED' })
        .expect(204);
    }
    f = await asFactory();
    expect(f.allowedTransitions).toEqual(['QC']);
    expect(f.progressPercent).toBeGreaterThan((await asBuyer()).progressPercent - 1);
    await move(factory.agent, 'QC');
  });

  it('ships, delivers once, and completes', async () => {
    await move(factory.agent, 'READY_TO_SHIP', {}, 403);
    await move(admin, 'READY_TO_SHIP'); // inspection passed
    await move(factory.agent, 'SHIPPED', {}, 403); // never the factory's move
    // Payments are tested in payments.e2e-spec.ts; here the balance simply arrives, posted to
    // the ledger like a real one so the books still reconcile.
    const order = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
    const account = async (type: 'PLATFORM_CASH' | 'BUYER_ESCROW', companyId: string | null) =>
      (await ctx.prisma.ledgerAccount.findFirst({ where: { type, companyId, currency: 'USD' } })) ??
      (await ctx.prisma.ledgerAccount.create({ data: { type, companyId, currency: 'USD' } }));
    const cash = await account('PLATFORM_CASH', null);
    const escrow = await account('BUYER_ESCROW', order.buyerCompanyId);
    const balance = await ctx.prisma.payment.create({
      data: {
        orderId: order.id,
        direction: 'INBOUND',
        purpose: 'BALANCE',
        amountMinor: 637_000n,
        currency: 'USD',
        method: 'BANK_TRANSFER',
        provider: 'manual',
        status: 'SUCCEEDED',
        paidAt: new Date(),
      },
    });
    await ctx.prisma.ledgerTransaction.create({
      data: {
        kind: 'DEPOSIT',
        idempotencyKey: `payment:${balance.id}`,
        orderId: order.id,
        paymentId: balance.id,
        currency: 'USD',
        description: 'Balance (test)',
        amountUsdMinor: 637_000n,
        entries: {
          create: [
            { accountId: cash.id, direction: 'DEBIT', amountMinor: 637_000n },
            { accountId: escrow.id, direction: 'CREDIT', amountMinor: 637_000n },
          ],
        },
      },
    });
    // Nobody ships by hand: orders ship when their GarmentGate shipment leaves the hub.
    await move(factory.agent, 'SHIPPED', {}, 403); // not the factory's move any more
    await move(admin, 'SHIPPED', {}, 409); // nor staff's: the departure does it
    await shipThroughGarmentGate(ctx, code);

    // Two "delivered" clicks at once: exactly one wins.
    const results = await Promise.all([
      buyer.agent.post(`/orders/${code}/transition`).send({ to: 'DELIVERED' }),
      buyer.agent.post(`/orders/${code}/transition`).send({ to: 'DELIVERED' }),
    ]);
    expect(results.map((r) => r.status).sort()).toEqual([204, expect.any(Number)].sort());
    expect(results.filter((r) => r.status === 204)).toHaveLength(1);
    await move(buyer.agent, 'COMPLETED');

    const b: BuyerOrder = await asBuyer();
    expect(b).toMatchObject({ status: 'COMPLETED', progressPercent: 100 });
    expect(b.completedAt).not.toBeNull();
    expect(b.events.map((e) => e.to)).toEqual([
      'SAMPLING',
      'SAMPLE_APPROVED',
      'DEPOSIT_PENDING',
      'IN_PRODUCTION',
      'QC',
      'READY_TO_SHIP',
      'SHIPPED',
      'DELIVERED',
      'COMPLETED',
    ]);
    expect(b.events.every((e) => e.actor === null)).toBe(true);
    const a = AdminOrderSchema.parse((await admin.get(`/orders/${code}`).expect(200)).body);
    expect(a.events[0]?.actor).toContain(BUYER.first);
    expect(a.manufacturer.name).toBe(FACTORY.legalName);
  });

  it('reorders a completed order as a new draft', async () => {
    const date = new Date(Date.now() + 60 * DAY).toISOString();
    await factory.agent
      .post(`/orders/${code}/reorder`)
      .send({ quantity: 3000, requestedShipDate: date })
      .expect(403);
    const res = await buyer.agent
      .post(`/orders/${code}/reorder`)
      .send({ quantity: 3000, requestedShipDate: date })
      .expect(201);
    const next = BuyerOrderSchema.parse(
      (await buyer.agent.get(`/orders/${(res.body as { code: string }).code}`).expect(200)).body,
    );
    expect(next).toMatchObject({
      status: 'DRAFT',
      quantity: 3000,
      unitPriceMinor: 455,
      totalMinor: 1_365_000,
      reorderOfCode: code,
    });
    await buyer.agent
      .post(`/orders/${next.code}/reorder`)
      .send({ quantity: 3000, requestedShipDate: date })
      .expect(409);
  });

  it('opens disputes with a reason, and resolves them through staff only', async () => {
    const other = await draftOrder(ctx, buyer, factory);
    await ctx.prisma.order.update({ where: { code: other }, data: { status: 'IN_PRODUCTION' } });
    const send = (agent: Agent, body: object) =>
      agent.post(`/orders/${other}/transition`).send(body);
    // Disputes have their own endpoint (reason, description, evidence).
    await send(buyer.agent, { to: 'DISPUTED', note: 'Colour is off' }).expect(400);
    await buyer.agent
      .post(`/orders/${other}/dispute`)
      .send({ reason: 'QUALITY', description: 'Colour does not match the approved sample' })
      .expect(201);
    await send(buyer.agent, { to: 'IN_PRODUCTION' }).expect(403);
    await send(admin, { to: 'IN_PRODUCTION' }).expect(409); // resolve the dispute first
    const { dispute } = (await admin.get(`/orders/${other}/dispute`).expect(200)).body as {
      dispute: { id: string };
    };
    const resolve = (resumeTo: string) =>
      admin
        .post(`/admin/disputes/${dispute.id}/resolve`)
        .send({ outcome: 'SETTLED', resolution: 'Re-dye agreed with both sides', resumeTo });
    await resolve('QC').expect(400); // only back where it was, or closed
    await resolve('IN_PRODUCTION').expect(204);
    await send(buyer.agent, { to: 'CANCELLED' }).expect(403); // too late for the buyer
  });
});
