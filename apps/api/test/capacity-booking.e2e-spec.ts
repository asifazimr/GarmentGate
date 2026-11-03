import { hash } from '@node-rs/argon2';
import {
  AdminClaimSchema,
  CapacitySlotSchema,
  isoDate,
  LineCalendarSchema,
  ManufacturerClaimSchema,
  ManufacturerLineSchema,
  PublicManufacturerSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  client,
  createAdmin,
  createTestApp,
  PASSWORD,
  registerAgent,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';
const BRANDS = ['Sentinelmark Apparel', 'Quorvane Retail'];

let seq = 0;
async function verifiedFactory(ctx: TestContext) {
  const email = uniqueEmail('lines');
  seq += 1;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'MANUFACTURER',
      firstName: 'Line',
      lastName: 'Owner',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'MANUFACTURER',
          legalName: 'Lineholt Garments Ltd.',
          country: 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          manufacturerProfile: {
            create: {
              publicCode: `MFR-BD-8${String(Date.now() + seq).slice(-3)}`,
              monthlyCapacityPcs: 50_000,
              moqPcs: 300,
              isListed: true,
              workforceSize: 3200,
              factorySizeSqm: 42_000,
              categories: { connect: [{ id: TSHIRTS }] },
            },
          },
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return { agent, publicCode: user.company?.manufacturerProfile?.publicCode ?? '' };
}

/** The Monday at least two weeks from today, so windows never start in the past. */
function nextMonday(weeksAhead = 2): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + weeksAhead * 7);
  while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}
const plus = (d: Date, days: number) => isoDate(new Date(d.getTime() + days * 86_400_000));

const lineBody = {
  code: 'l1',
  name: 'Knit line 1',
  categoryIds: [TSHIRTS],
  dailySamMinutes: 24_000,
  workingDays: [1, 2, 3, 4, 5],
  cmRateMinorPer100Min: 650,
};

describe('Capacity booking foundations (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('manages lines with unique codes and known categories', async () => {
    const { agent } = await verifiedFactory(ctx);
    const line = ManufacturerLineSchema.parse(
      (await agent.post('/manufacturer/lines').send(lineBody).expect(201)).body,
    );
    expect(line).toMatchObject({ code: 'L1', status: 'ACTIVE', upcomingBookedMinutes: 0 });
    expect(line.categories.map((c) => c.id)).toEqual([TSHIRTS]);

    await agent.post('/manufacturer/lines').send(lineBody).expect(409);
    await agent
      .post('/manufacturer/lines')
      .send({ ...lineBody, code: 'L2', categoryIds: ['0198a000-0000-7000-8000-0000000fffff'] })
      .expect(400);
    await agent
      .post('/manufacturer/lines')
      .send({ ...lineBody, code: 'L3', cmRateMinorPer100Min: 0 })
      .expect(400);

    const updated = ManufacturerLineSchema.parse(
      (
        await agent
          .put(`/manufacturer/lines/${line.id}`)
          .send({ ...lineBody, name: 'Knit line one', status: 'PAUSED' })
          .expect(200)
      ).body,
    );
    expect(updated).toMatchObject({ name: 'Knit line one', status: 'PAUSED' });
    const lines = z
      .array(ManufacturerLineSchema)
      .parse((await agent.get('/manufacturer/lines').expect(200)).body);
    expect(lines).toHaveLength(1);
  });

  it('opens windows sized to the line, refuses overlaps even when opened at once', async () => {
    const { agent } = await verifiedFactory(ctx);
    const line = ManufacturerLineSchema.parse(
      (await agent.post('/manufacturer/lines').send(lineBody).expect(201)).body,
    );
    const monday = nextMonday();

    // Mon–Sun on a Mon–Fri line: five working days.
    const slot = CapacitySlotSchema.parse(
      (
        await agent
          .post('/manufacturer/slots')
          .send({ lineId: line.id, startDate: isoDate(monday), endDate: plus(monday, 6) })
          .expect(201)
      ).body,
    );
    expect(slot).toMatchObject({ totalMinutes: 5 * 24_000, bookedMinutes: 0, status: 'OPEN' });

    await agent
      .post('/manufacturer/slots')
      .send({ lineId: line.id, startDate: plus(monday, 6), endDate: plus(monday, 10) })
      .expect(409);
    await agent
      .post('/manufacturer/slots')
      .send({
        lineId: line.id,
        startDate: plus(monday, 7),
        endDate: plus(monday, 11),
        totalMinutes: 5 * 24_000 + 1,
      })
      .expect(400);
    await agent
      .post('/manufacturer/slots')
      .send({ lineId: line.id, startDate: plus(monday, 4), endDate: plus(monday, 8) })
      .expect(409); // shares a Friday with the first window
    await agent
      .post('/manufacturer/slots')
      .send({
        lineId: line.id,
        startDate: isoDate(new Date(Date.now() - 86_400_000 * 3)),
        endDate: isoDate(monday),
      })
      .expect(400);

    // Two overlapping windows opened at the same time: exactly one wins.
    const results = await Promise.all(
      [0, 1].map(() =>
        agent
          .post('/manufacturer/slots')
          .send({ lineId: line.id, startDate: plus(monday, 14), endDate: plus(monday, 18) }),
      ),
    );
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);

    const calendar = LineCalendarSchema.parse(
      (
        await agent
          .get('/manufacturer/capacity/lines-calendar')
          .query({ from: isoDate(monday), days: 7 })
          .expect(200)
      ).body,
    );
    const days = calendar.lines[0]?.days ?? [];
    expect(days.map((d) => d.openMinutes)).toEqual([24_000, 24_000, 24_000, 24_000, 24_000, 0, 0]);
    expect(days.filter((d) => d.working)).toHaveLength(5);
  });

  it('never shrinks, closes or deletes below what is booked', async () => {
    const { agent } = await verifiedFactory(ctx);
    const line = ManufacturerLineSchema.parse(
      (await agent.post('/manufacturer/lines').send(lineBody).expect(201)).body,
    );
    const monday = nextMonday(3);
    const slot = CapacitySlotSchema.parse(
      (
        await agent
          .post('/manufacturer/slots')
          .send({ lineId: line.id, startDate: isoDate(monday), endDate: plus(monday, 4) })
          .expect(201)
      ).body,
    );
    // A booking (step 2) takes 50,000 minutes.
    await ctx.prisma.capacitySlot.update({
      where: { id: slot.id },
      data: { bookedMinutes: 50_000 },
    });

    await agent.patch(`/manufacturer/slots/${slot.id}`).send({ totalMinutes: 40_000 }).expect(409);
    await agent.patch(`/manufacturer/slots/${slot.id}`).send({ status: 'CLOSED' }).expect(409);
    await agent.delete(`/manufacturer/slots/${slot.id}`).expect(409);
    await agent.delete(`/manufacturer/lines/${line.id}`).expect(409);
    const shrunk = CapacitySlotSchema.parse(
      (
        await agent
          .patch(`/manufacturer/slots/${slot.id}`)
          .send({ totalMinutes: 60_000 })
          .expect(200)
      ).body,
    );
    expect(shrunk).toMatchObject({ totalMinutes: 60_000, bookedMinutes: 50_000 });

    const listed = z
      .array(ManufacturerLineSchema)
      .parse((await agent.get('/manufacturer/lines').expect(200)).body);
    expect(listed[0]?.upcomingBookedMinutes).toBe(50_000);

    // Another factory can't see or touch it.
    const { agent: other } = await verifiedFactory(ctx);
    await other.patch(`/manufacturer/slots/${slot.id}`).send({ totalMinutes: 60_000 }).expect(404);
    await other.delete(`/manufacturer/slots/${slot.id}`).expect(404);
    await other.put(`/manufacturer/lines/${line.id}`).send(lineBody).expect(404);
    await other
      .post('/manufacturer/slots')
      .send({ lineId: line.id, startDate: plus(monday, 7), endDate: plus(monday, 8) })
      .expect(404);

    // Buyers have no access to factory tools.
    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER');
    await buyer.get('/manufacturer/lines').expect(403);
  });

  it('verifies supplier claims and shows buyers a badge, never the brands', async () => {
    const { agent, publicCode } = await verifiedFactory(ctx);
    const pdf = Buffer.from('%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n');
    const presign = await agent
      .post('/manufacturer/claims/uploads')
      .send({ fileName: 'po.pdf', contentType: 'application/pdf', sizeBytes: pdf.length })
      .expect(201);
    const { fileId, url, fields } = presign.body as {
      fileId: string;
      url: string;
      fields: Record<string, string>;
    };
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    form.append('file', new Blob([new Uint8Array(pdf)], { type: 'application/pdf' }));
    expect((await fetch(url, { method: 'POST', body: form })).status).toBeLessThan(300);

    await agent
      .post('/manufacturer/claims')
      .send({ region: 'EU', tier: 'MAJOR', brandNames: ['A', 'a'], evidenceFileId: fileId })
      .expect(400);
    const claim = ManufacturerClaimSchema.parse(
      (
        await agent
          .post('/manufacturer/claims')
          .send({ region: 'EU', tier: 'MAJOR', brandNames: BRANDS, evidenceFileId: fileId })
          .expect(201)
      ).body,
    );
    expect(claim).toMatchObject({ status: 'PENDING', brandNames: BRANDS });

    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER');
    await ctx.prisma.company.updateMany({
      where: { type: 'BUYER' },
      data: { kycStatus: 'VERIFIED' },
    });
    const before = PublicManufacturerSchema.parse(
      (await buyer.get(`/manufacturers/${publicCode}`).expect(200)).body,
    );
    expect(before.brandBadges).toEqual([]);
    expect(before.capabilities.workforceBand).toEqual({ min: 2500, max: 4999 });
    expect(before.capabilities.factorySizeBand).toEqual({ min: 25_000, max: null });

    const admin = client(ctx.app);
    await admin
      .post('/auth/login')
      .send({ email: await createAdmin(ctx.prisma), password: PASSWORD })
      .expect(200);
    const pending = z
      .array(AdminClaimSchema)
      .parse((await admin.get('/admin/claims').query({ status: 'PENDING' }).expect(200)).body);
    const row = pending.find((c) => c.id === claim.id);
    expect(row?.brandNames).toEqual(BRANDS);
    expect(row?.evidenceUrl).toBeTruthy();
    expect(row?.manufacturer.code).toBe(publicCode);

    await admin.post(`/admin/claims/${claim.id}/reject`).send({ note: '' }).expect(400);
    await admin.post(`/admin/claims/${claim.id}/verify`).send({}).expect(204);
    await admin.post(`/admin/claims/${claim.id}/verify`).send({}).expect(409);
    await agent.post(`/admin/claims/${claim.id}/verify`).send({}).expect(403);

    const res = await buyer.get(`/manufacturers/${publicCode}`).expect(200);
    const after = PublicManufacturerSchema.parse(res.body);
    expect(after.brandBadges).toEqual([{ region: 'EU', tier: 'MAJOR', brandCount: 2 }]);
    for (const brand of BRANDS) expect(res.text).not.toContain(brand);
    expect(res.text).not.toContain('3200');
    expect(res.text).not.toContain('42000');

    const mine = z
      .array(ManufacturerClaimSchema)
      .parse((await agent.get('/manufacturer/claims').expect(200)).body);
    expect(mine[0]?.status).toBe('VERIFIED');
  });
});
