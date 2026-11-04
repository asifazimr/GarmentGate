import { hash } from '@node-rs/argon2';
import {
  BuyerBookingSchema,
  BuyerCapacityOverviewSchema,
  CapacitySearchResponseSchema,
  isoDate,
  LedgerBalancesSchema,
  ManufacturerBookingInboxSchema,
  ManufacturerLineSchema,
  PaymentStartSchema,
  CapacitySlotSchema,
  BookingTermsSchema,
  AdminBookingSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { BookingsService } from '../src/modules/capacity-booking/bookings.service.js';
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
const BUYER_NAME = 'Quillmarsh Apparel GmbH';
const FACTORY_NAME = 'Vantorell Knitting Mills Ltd.';
const LINE_NAME = 'Vantorell secret line';

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function buyer(ctx: TestContext, n: string) {
  const email = uniqueEmail('cbbuyer');
  const code = `BYR-DE-7${run}${n}`.slice(0, 16);
  await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'BUYER',
      firstName: 'Helga',
      lastName: 'Quillmarsh',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'BUYER',
          legalName: BUYER_NAME,
          country: 'DE',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          buyerProfile: { create: { publicCode: code } },
        },
      },
    },
  });
  return { agent: await login(ctx, email), code };
}

async function factory(ctx: TestContext, n: string) {
  const email = uniqueEmail('cbfactory');
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'MANUFACTURER',
      firstName: 'Ostin',
      lastName: 'Vantorell',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'MANUFACTURER',
          legalName: FACTORY_NAME,
          country: 'LK',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          manufacturerProfile: {
            create: {
              publicCode: `MFR-LK-7${run.slice(-2)}${n}`,
              isListed: true,
              performanceScore: 80,
              categories: { connect: [{ id: TSHIRTS }] },
            },
          },
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  const agent = await login(ctx, email);
  const line = ManufacturerLineSchema.parse(
    (
      await agent
        .post('/manufacturer/lines')
        .send({
          code: `VX${n}`,
          name: LINE_NAME,
          categoryIds: [TSHIRTS],
          dailySamMinutes: 10_000,
          workingDays: [1, 2, 3, 4, 5, 6, 7],
          cmRateMinorPer100Min: 650,
        })
        .expect(201)
    ).body,
  );
  return { agent, line, publicCode: user.company?.manufacturerProfile?.publicCode ?? '' };
}

/** A window of `days` days starting `ahead` days from today (every day is a working day). */
async function openWindow(agent: Agent, lineId: string, ahead: number, days: number) {
  const start = new Date(Date.now() + ahead * DAY);
  return CapacitySlotSchema.parse(
    (
      await agent
        .post('/manufacturer/slots')
        .send({
          lineId,
          startDate: isoDate(start),
          endDate: isoDate(new Date(start.getTime() + (days - 1) * DAY)),
        })
        .expect(201)
    ).body,
  );
}

async function uploadProof(admin: Agent, paymentId: string): Promise<string> {
  const bytes = Buffer.from('%PDF-1.4\n% bank statement\n');
  const presign = await admin
    .post(`/admin/finance/payments/${paymentId}/uploads`)
    .send({ fileName: 'statement.pdf', contentType: 'application/pdf', sizeBytes: bytes.length })
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
  return fileId;
}

describe('capacity bookings (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let sweep: BookingsService['sweep'];
  let bank = 0;

  const hold = (agent: Agent, slotId: string, minutes: number, extra: object = {}) =>
    agent
      .post('/capacity/bookings')
      .send({ slotId, minutes, categoryId: TSHIRTS, acceptTerms: true, ...extra });
  const view = async (agent: Agent, code: string) =>
    BuyerBookingSchema.parse((await agent.get(`/capacity/bookings/${code}`).expect(200)).body);
  const slotBooked = async (id: string) =>
    (await ctx.prisma.capacitySlot.findUniqueOrThrow({ where: { id } })).bookedMinutes;
  /** Bank transfer: start, mark sent, staff confirm with proof. */
  const payDeposit = async (agent: Agent, code: string) => {
    const start = PaymentStartSchema.parse(
      (
        await agent
          .post(`/capacity/bookings/${code}/deposit`)
          .send({ method: 'BANK_TRANSFER' })
          .expect(201)
      ).body,
    );
    await agent
      .post(`/capacity/bookings/${code}/deposit/${start.paymentId}/sent`)
      .send({ payerReference: 'MT103' })
      .expect(204);
    const proof = await uploadProof(admin, start.paymentId);
    bank += 1;
    await admin
      .post(`/admin/finance/payments/${start.paymentId}/confirm`)
      .send({ proofFileId: proof, bankReference: `CB-BANK-${run}-${String(bank)}` })
      .expect(204);
    return start;
  };
  const balances = async () =>
    LedgerBalancesSchema.parse((await admin.get('/admin/finance/balances').expect(200)).body);
  const reconciled = async () => {
    for (const c of (await balances()).currencies) {
      expect(c.balanced).toBe(true);
      expect(c.reconciled).toBe(true);
      expect(c.cashMatchesPayments).toBe(true);
    }
  };

  beforeAll(async () => {
    ctx = await createTestApp();
    admin = await login(ctx, await createAdmin(ctx.prisma));
    const service = ctx.app.get(BookingsService);
    sweep = (now) => service.sweep(now);
    await admin
      .put('/admin/capacity-booking/settings')
      .send({
        bookingFeeBps: 800,
        depositBps: 3000,
        holdHours: 48,
        reminderHours: 12,
        convertLeadDays: 7,
        cancellationTiers: [
          { minDaysBefore: 30, refundBps: 10_000 },
          { minDaysBefore: 14, refundBps: 5_000 },
          { minDaysBefore: 0, refundBps: 0 },
        ],
        factoryShareBps: 5_000,
      })
      .expect(200);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('shows buyers anonymized windows at the marked-up rate', async () => {
    const f = await factory(ctx, '1');
    await openWindow(f.agent, f.line.id, 20, 10);
    const b = await buyer(ctx, '1');
    const from = isoDate(new Date(Date.now() + 10 * DAY));
    const to = isoDate(new Date(Date.now() + 60 * DAY));
    const res = await b.agent
      .get('/capacity/search')
      .query({ categoryId: TSHIRTS, pieces: 4000, samPerPiece: 12.5, from, to })
      .expect(200);
    const search = CapacitySearchResponseSchema.parse(res.body);
    expect(search.minutes).toBe(50_000);
    const mine = search.results.find((r) => r.manufacturer.publicCode === f.publicCode);
    expect(mine?.windows[0]).toMatchObject({
      lineNumber: 1,
      freeMinutes: 100_000,
      fits: true,
      estimatedPieces: 4000,
      quote: { buyerRateMinorPer100Min: 702, buyerAmountMinor: 351_000, depositMinor: 105_300 },
    });
    for (const secret of [FACTORY_NAME, LINE_NAME, 'VX1', 'cmRate', 'Vantorell'])
      expect(res.text).not.toContain(secret);
    await f.agent
      .get('/capacity/search')
      .query({ categoryId: TSHIRTS, minutes: 600, from, to })
      .expect(403);
  });

  it('never double-books: two buyers racing for the same minutes, one wins', async () => {
    const f = await factory(ctx, '2');
    const w = await openWindow(f.agent, f.line.id, 25, 10); // 100,000 minutes
    const [a, b] = await Promise.all([buyer(ctx, '2'), buyer(ctx, '3')]);
    const results = await Promise.all([hold(a.agent, w.id, 60_000), hold(b.agent, w.id, 60_000)]);
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
    expect(await slotBooked(w.id)).toBe(60_000);
    // Whole-window bookings need an untouched window.
    await a.agent
      .post('/capacity/bookings')
      .send({ slotId: w.id, kind: 'LINE', categoryId: TSHIRTS, acceptTerms: true })
      .expect(409);
    // The rest is still bookable; more than the rest isn't.
    await hold(b.agent, w.id, 40_001).expect(409);
    await hold(b.agent, w.id, 40_000).expect(201);
    expect(await slotBooked(w.id)).toBe(100_000);
  });

  it('holds → factory accepts → deposit into escrow → confirmed, each side anonymous', async () => {
    const f = await factory(ctx, '3');
    const w = await openWindow(f.agent, f.line.id, 40, 10);
    const b = await buyer(ctx, '4');
    const terms = BookingTermsSchema.parse(
      (await b.agent.get(`/capacity/slots/${w.id}/terms`).query({ minutes: 20_000 }).expect(200))
        .body,
    );
    expect(terms.quote).toMatchObject({ buyerAmountMinor: 140_400, depositMinor: 42_120 });
    await hold(b.agent, w.id, 20_000, { acceptTerms: false }).expect(400);
    const { code } = (
      await hold(b.agent, w.id, 20_000, {
        samPerPiece: 10,
        note: `From ${BUYER_NAME}, call +49 30 1234 5678`,
        acceptTerms: true,
      }).expect(201)
    ).body as { code: string };
    let booking = await view(b.agent, code);
    expect(booking).toMatchObject({
      status: 'HELD',
      nextAction: 'PAY_DEPOSIT',
      estimatedPieces: 2000,
    });

    const res = await f.agent.get('/manufacturer/bookings').expect(200);
    const inbox = ManufacturerBookingInboxSchema.parse(res.body);
    const request = inbox.bookings.find((x) => x.code === code);
    expect(request?.buyer.code).toBe(b.code);
    expect(request?.factoryAmountMinor).toBe(130_000);
    expect(res.text).not.toContain('Quillmarsh');
    expect(res.text).not.toContain('1234 5678');
    expect(res.text).not.toContain('buyerAmount');

    await f.agent.post(`/manufacturer/bookings/${code}/accept`).expect(204);
    await f.agent.post(`/manufacturer/bookings/${code}/accept`).expect(409);
    booking = await view(b.agent, code);
    expect(booking.factoryAccepted).toBe(true);
    await payDeposit(b.agent, code);
    booking = await view(b.agent, code);
    expect(booking).toMatchObject({
      status: 'CONFIRMED',
      depositPaidMinor: 42_120,
      nextAction: 'CONVERT',
      refundIfCancelledMinor: 42_120, // 40 days ahead: full refund tier
    });
    await reconciled();

    // Other companies can't see it.
    const other = await buyer(ctx, '5');
    await other.agent.get(`/capacity/bookings/${code}`).expect(404);
    const otherFactory = await factory(ctx, '4');
    await otherFactory.agent.post(`/manufacturer/bookings/${code}/accept`).expect(404);
    await f.agent.get(`/capacity/bookings/${code}`).expect(403);
  });

  it('expires a hold that ran out: minutes back on the line, the deposit refunded in full', async () => {
    const f = await factory(ctx, '5');
    const w = await openWindow(f.agent, f.line.id, 30, 10);
    const b = await buyer(ctx, '6');
    const { code } = (await hold(b.agent, w.id, 30_000).expect(201)).body as { code: string };
    await payDeposit(b.agent, code); // paid, but the factory never answers
    expect((await view(b.agent, code)).nextAction).toBe('AWAIT_FACTORY');
    expect(await slotBooked(w.id)).toBe(30_000);

    // Nothing happens before the hold runs out (a reminder only).
    const early = await sweep(new Date(Date.now() + 40 * 3_600_000));
    expect(early.expired).toBe(0);
    await ctx.prisma.capacityBooking.update({
      where: { code },
      data: { holdExpiresAt: new Date(Date.now() - 1000) },
    });
    const result = await sweep(new Date());
    expect(result.expired).toBeGreaterThanOrEqual(1);
    expect(await sweep(new Date())).toMatchObject({ expired: 0 }); // idempotent

    const booking = await view(b.agent, code);
    expect(booking).toMatchObject({
      status: 'EXPIRED',
      cancelledBy: 'SYSTEM',
      refundMinor: booking.depositMinor,
    });
    expect(await slotBooked(w.id)).toBe(0);
    await reconciled();
    await b.agent
      .post(`/capacity/bookings/${code}/deposit`)
      .send({ method: 'BANK_TRANSFER' })
      .expect(409);
  });

  it('applies the cancellation tiers to a confirmed booking and pays the factory its share', async () => {
    const f = await factory(ctx, '6');
    const w = await openWindow(f.agent, f.line.id, 20, 10); // 20 days ahead: 50% tier
    const b = await buyer(ctx, '7');
    const { code } = (await hold(b.agent, w.id, 10_000).expect(201)).body as { code: string };
    await f.agent.post(`/manufacturer/bookings/${code}/accept`).expect(204);
    await payDeposit(b.agent, code);
    const before = await view(b.agent, code);
    expect(before.status).toBe('CONFIRMED');
    const deposit = before.depositMinor; // 21,060
    expect(before.refundIfCancelledMinor).toBe(deposit / 2);

    await b.agent
      .post(`/capacity/bookings/${code}/cancel`)
      .send({ reason: 'Style dropped' })
      .expect(204);
    const after = await view(b.agent, code);
    expect(after).toMatchObject({
      status: 'CANCELLED',
      cancelledBy: 'BUYER',
      refundMinor: deposit / 2,
    });
    expect(await slotBooked(w.id)).toBe(0);

    const inbox = ManufacturerBookingInboxSchema.parse(
      (await f.agent.get('/manufacturer/bookings').expect(200)).body,
    );
    expect(inbox.bookings.find((x) => x.code === code)?.compensationMinor).toBe(deposit / 4);

    const rows = z
      .array(AdminBookingSchema)
      .parse(
        (
          await admin
            .get('/admin/capacity-booking/bookings')
            .query({ status: 'CANCELLED' })
            .expect(200)
        ).body,
      );
    const row = rows.find((r) => r.code === code);
    expect(row).toMatchObject({ compensationMinor: deposit / 4, compensationPaid: false });
    expect(row?.manufacturer.name).toBe(FACTORY_NAME);
    await admin.post(`/admin/capacity-booking/bookings/${code}/compensation`).expect(204);
    await admin.post(`/admin/capacity-booking/bookings/${code}/compensation`).expect(409);
    await reconciled();
    await b.agent
      .post(`/capacity/bookings/${code}/cancel`)
      .send({ reason: 'Again please' })
      .expect(409);
  });

  it('converts to a CMT order: unused minutes go back and the deposit counts toward the order', async () => {
    const f = await factory(ctx, '7');
    const w = await openWindow(f.agent, f.line.id, 45, 10);
    const b = await buyer(ctx, '8');
    const { code } = (await hold(b.agent, w.id, 50_000).expect(201)).body as { code: string };
    await b.agent
      .post(`/capacity/bookings/${code}/convert`)
      .send({
        mode: 'CMT',
        title: 'Tee',
        quantity: 1000,
        samPerPiece: 12.5,
        incoterm: 'FOB',
        destinationCountry: 'DE',
      })
      .expect(409); // not confirmed yet
    await f.agent.post(`/manufacturer/bookings/${code}/accept`).expect(204);
    await payDeposit(b.agent, code);

    await b.agent
      .post(`/capacity/bookings/${code}/convert`)
      .send({
        mode: 'CMT',
        title: 'Tee',
        quantity: 5000,
        samPerPiece: 12.5,
        incoterm: 'FOB',
        destinationCountry: 'DE',
      })
      .expect(409); // 62,500 minutes > 50,000 booked
    const converted = (
      await b.agent
        .post(`/capacity/bookings/${code}/convert`)
        .send({
          mode: 'CMT',
          title: 'Heavy tee',
          quantity: 3000,
          samPerPiece: 12.5,
          incoterm: 'FOB',
          destinationCountry: 'DE',
        })
        .expect(201)
    ).body as { orderCode: string };
    expect(converted.orderCode).toMatch(/^ORD-/);
    expect(await slotBooked(w.id)).toBe(37_500); // 12,500 unused minutes returned

    const booking = await view(b.agent, code);
    expect(booking).toMatchObject({
      conversionMode: 'CMT',
      returnedMinutes: 12_500,
      nextAction: 'TRACK_ORDER',
      order: { code: converted.orderCode, status: 'DRAFT' },
    });
    const order = await ctx.prisma.order.findUniqueOrThrow({
      where: { code: converted.orderCode },
    });
    expect(order.buyerUnitPriceMinor).toBe(88); // 12.5 × 7.02 rounded up
    expect(order.manufacturerUnitPriceMinor).toBe(82); // 12.5 × 6.50 rounded up
    const depositPayment = await ctx.prisma.payment.findFirstOrThrow({
      where: { capacityBooking: { code }, direction: 'INBOUND', status: 'SUCCEEDED' },
    });
    expect(depositPayment.orderId).toBe(order.id);
    await reconciled();
    await b.agent
      .post(`/capacity/bookings/${code}/convert`)
      .send({
        mode: 'CMT',
        title: 'Again',
        quantity: 10,
        samPerPiece: 12.5,
        incoterm: 'FOB',
        destinationCountry: 'DE',
      })
      .expect(409);
  });

  it('converts full-package through an RFQ only the booked factory sees', async () => {
    const f = await factory(ctx, '8');
    const w = await openWindow(f.agent, f.line.id, 45, 5);
    const b = await buyer(ctx, '9');
    const { code } = (await hold(b.agent, w.id, 20_000).expect(201)).body as { code: string };
    await f.agent.post(`/manufacturer/bookings/${code}/accept`).expect(204);
    await payDeposit(b.agent, code);
    const { rfqCode } = (
      await b.agent
        .post(`/capacity/bookings/${code}/convert`)
        .send({
          mode: 'FULL_PACKAGE',
          title: 'Organic tee, full package',
          quantity: 1500,
          incoterm: 'FOB',
          destinationCountry: 'DE',
          description: 'GOTS jersey 180 gsm, woven label, polybag per piece',
        })
        .expect(201)
    ).body as { rfqCode: string };
    expect((await view(b.agent, code)).nextAction).toBe('AWAIT_QUOTE');
    const mine = (await f.agent.get('/manufacturer/rfqs').expect(200)).text;
    expect(mine).toContain(rfqCode);
    const stranger = await factory(ctx, '9');
    expect((await stranger.agent.get('/manufacturer/rfqs').expect(200)).text).not.toContain(
      rfqCode,
    );
  });

  it('reserves every partnership month at once, or none', async () => {
    const f = await factory(ctx, '0');
    // Next month's first day, for seven months.
    const now = new Date();
    const first = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 7, 0));
    const w = CapacitySlotSchema.parse(
      (
        await f.agent
          .post('/manufacturer/slots')
          .send({
            lineId: f.line.id,
            startDate: isoDate(first),
            endDate: isoDate(last),
            totalMinutes: 400_000,
          })
          .expect(201)
      ).body,
    );
    const b = await buyer(ctx, 'A');
    const ask = (monthlyMinutes: number) =>
      b.agent.post('/capacity/partnerships').send({
        lineId: f.line.id,
        categoryId: TSHIRTS,
        monthlyMinutes,
        months: 6,
        startMonth: isoDate(first).slice(0, 7),
        acceptTerms: true,
      });
    await ask(10_000).expect(201);
    const big = (await ask(100_000).expect(201)).body as { code: string };
    const small = (await ask(50_000).expect(201)).body as { code: string };
    const firstCode = (
      await ctx.prisma.capacityPartnership.findFirstOrThrow({
        where: { buyerCompany: { buyerProfile: { publicCode: b.code } }, monthlyMinutes: 10_000 },
      })
    ).code;

    await f.agent.post(`/manufacturer/partnerships/${big.code}/accept`).expect(409); // 600k > 400k
    expect(await slotBooked(w.id)).toBe(0); // nothing reserved
    await f.agent.post(`/manufacturer/partnerships/${small.code}/accept`).expect(204);
    expect(await slotBooked(w.id)).toBe(300_000);
    await f.agent
      .post(`/manufacturer/partnerships/${firstCode}/decline`)
      .send({ reason: 'Line is reserved for a partner' })
      .expect(204);

    const overview = BuyerCapacityOverviewSchema.parse(
      (await b.agent.get('/capacity/bookings').expect(200)).body,
    );
    const p = overview.partnerships.find((x) => x.code === small.code);
    expect(p?.status).toBe('ACTIVE');
    expect(p?.bookings).toHaveLength(6);
    const months = overview.bookings.filter((x) => x.partnershipCode === small.code);
    expect(
      months.every((x) => x.status === 'HELD' && x.factoryAccepted && x.kind === 'PARTNERSHIP'),
    ).toBe(true);
    expect(overview.partnerships.find((x) => x.code === firstCode)?.status).toBe('DECLINED');

    await b.agent
      .post(`/capacity/partnerships/${small.code}/cancel`)
      .send({ reason: 'Plans changed' })
      .expect(204);
    expect(await slotBooked(w.id)).toBe(0);
  });

  it('validates staff settings', async () => {
    await admin
      .put('/admin/capacity-booking/settings')
      .send({
        bookingFeeBps: 800,
        depositBps: 3000,
        holdHours: 48,
        reminderHours: 12,
        convertLeadDays: 7,
        cancellationTiers: [
          { minDaysBefore: 7, refundBps: 2_000 },
          { minDaysBefore: 30, refundBps: 10_000 },
        ],
        factoryShareBps: 5_000,
      })
      .expect(400);
    const { agent } = await buyer(ctx, 'B');
    await agent.get('/admin/capacity-booking/settings').expect(403);
  });
});
