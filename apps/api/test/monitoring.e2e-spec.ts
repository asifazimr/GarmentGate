import { hash } from '@node-rs/argon2';
import {
  AdminCameraSchema,
  BuyerMonitoringSchema,
  BuyerPaymentsSchema,
  DEFAULT_MONITORING_SETTINGS,
  FactoryCameraSchema,
  FactoryOrderMonitoringSchema,
  PaymentStartSchema,
  PublicManufacturerSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  type VideoRecording as Recording,
  VIDEO_PROVIDER,
  type VideoProvider,
} from '../src/modules/monitoring/video-provider.js';
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
const HOUR = 3_600_000;

/** A provider whose streams are live once "started", with recordings we control. */
class FakeVideo implements VideoProvider {
  readonly live = true;
  inputs = 0;
  streaming = new Set<string>();
  deleted: string[] = [];
  names: string[] = [];
  recorded = new Map<string, Recording[]>();
  createInput(name: string) {
    this.names.push(name);
    this.inputs += 1;
    const id = `input${String(this.inputs)}`;
    return Promise.resolve({
      inputId: id,
      rtmpsUrl: 'rtmps://ingest.test:443/live/',
      streamKey: `key-${id}`,
    });
  }
  deleteInput(id: string) {
    this.deleted.push(id);
    return Promise.resolve();
  }
  isLive(id: string) {
    return Promise.resolve(this.streaming.has(id));
  }
  recordings(id: string) {
    return Promise.resolve(this.recorded.get(id) ?? []);
  }
  playbackUrl(id: string, ttlSeconds: number) {
    return `https://play.test/${id}?ttl=${String(ttlSeconds)}`;
  }
}

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', n: string) {
  const email = uniqueEmail(`cctv${type.toLowerCase()}`);
  const code = `${type === 'BUYER' ? 'BYR' : 'MFR'}-GB-${n}${run.slice(-3)}`;
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Cam',
      lastName: 'Tester',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: `Camera ${type} ${n} ${run} Ltd`,
          country: 'GB',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: code } } }
            : { manufacturerProfile: { create: { publicCode: code, isListed: true } } }),
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  return {
    agent: await login(ctx, email),
    code,
    name: user.company?.legalName ?? '',
    companyId: user.companyId ?? '',
    profileId: user.company?.manufacturerProfile?.id ?? '',
  };
}

describe('Video monitoring (e2e)', () => {
  const video = new FakeVideo();
  let ctx: TestContext;
  let admin: Agent;
  let transfers = 0;
  let buyer: Awaited<ReturnType<typeof company>>;
  let other: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let rival: Awaited<ReturnType<typeof company>>;
  const code = `ORD-2096-${run}1`;
  let orderId = '';
  let cameraId = '';
  let rivalCameraId = '';

  const panel = async (agent: Agent) =>
    BuyerMonitoringSchema.parse((await agent.get(`/orders/${code}/monitoring`).expect(200)).body);
  const approve = (id: string) =>
    admin
      .post(`/admin/monitoring/cameras/${id}/review`)
      .send({
        decision: 'APPROVE',
        checklist: { productionOnly: true, noSignage: true, noFaces: true, noOutsideView: true },
      })
      .expect(204);

  beforeAll(async () => {
    ctx = await createTestApp((b) => b.overrideProvider(VIDEO_PROVIDER).useValue(video));
    admin = await login(ctx, await createAdmin(ctx.prisma));
    await ctx.prisma.platformSetting.deleteMany({ where: { key: 'monitoring' } });
    buyer = await company(ctx, 'BUYER', '1');
    other = await company(ctx, 'BUYER', '2');
    factory = await company(ctx, 'MANUFACTURER', '3');
    rival = await company(ctx, 'MANUFACTURER', '4');
    orderId = (
      await ctx.prisma.order.create({
        data: {
          code,
          buyerCompanyId: buyer.companyId,
          manufacturerProfileId: factory.profileId,
          title: 'Monitored polo',
          quantity: 1000,
          buyerUnitPriceMinor: 1_000,
          manufacturerUnitPriceMinor: 800,
          buyerTotalMinor: 1_000_000n,
          manufacturerTotalMinor: 800_000n,
          currency: 'USD',
          incoterm: 'FOB',
          destinationCountry: 'GB',
          depositBps: 3000,
          status: 'DEPOSIT_PENDING',
        },
      })
    ).id;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('has staff-editable settings', async () => {
    expect((await admin.get('/admin/monitoring/settings').expect(200)).body).toEqual(
      DEFAULT_MONITORING_SETTINGS,
    );
    await admin
      .put('/admin/monitoring/settings')
      .send({ ...DEFAULT_MONITORING_SETTINGS, playbackMinutes: 0 })
      .expect(400);
    await buyer.agent.get('/admin/monitoring/settings').expect(403);
  });

  it('connects a factory camera and keeps it out of review until it streams', async () => {
    await buyer.agent.get('/manufacturer/cameras').expect(403);
    const created = FactoryCameraSchema.parse(
      (
        await factory.agent
          .post('/manufacturer/cameras')
          .send({ label: 'Line 3 sewing, call +44 7700 900123', area: 'SEWING' })
          .expect(201)
      ).body,
    );
    cameraId = created.id;
    expect(created).toMatchObject({
      status: 'SETUP',
      live: false,
      ingest: { rtmpsUrl: 'rtmps://ingest.test:443/live/', streamKey: 'key-input1' },
    });
    expect(created.label).not.toContain('7700');
    // The provider never learns who the factory is.
    expect(video.names.join(' ')).not.toMatch(/Camera|MFR-/);

    await factory.agent.post(`/manufacturer/cameras/${cameraId}/submit`).expect(409);
    video.streaming.add('input1');
    await factory.agent.post(`/manufacturer/cameras/${cameraId}/submit`).expect(204);
    await factory.agent.post(`/manufacturer/cameras/${cameraId}/submit`).expect(409);
    // Another factory can't touch it.
    await rival.agent.post(`/manufacturer/cameras/${cameraId}/submit`).expect(404);
    await rival.agent.delete(`/manufacturer/cameras/${cameraId}`).expect(404);
  });

  it('lets staff approve only with the full privacy checklist', async () => {
    const queue = z
      .array(AdminCameraSchema)
      .parse((await admin.get('/admin/monitoring/cameras').expect(200)).body);
    expect(queue.find((c) => c.id === cameraId)).toMatchObject({
      status: 'PENDING_REVIEW',
      live: true,
      manufacturer: { code: factory.code, name: factory.name },
      playbackUrl: expect.stringContaining('input1') as string,
    });
    await admin
      .post(`/admin/monitoring/cameras/${cameraId}/review`)
      .send({
        decision: 'APPROVE',
        checklist: { productionOnly: true, noSignage: false, noFaces: true, noOutsideView: true },
      })
      .expect(400);
    await approve(cameraId);
    await admin
      .post(`/admin/monitoring/cameras/${cameraId}/review`)
      .send({
        decision: 'REJECT',
        checklist: {
          productionOnly: false,
          noSignage: false,
          noFaces: false,
          noOutsideView: false,
        },
        note: 'Too late now',
      })
      .expect(409);
    expect((await ctx.prisma.camera.findUniqueOrThrow({ where: { id: cameraId } })).status).toBe(
      'APPROVED',
    );

    // A rival's approved camera, to prove it can't be put on someone else's order.
    // Buyers see only that the factory has live cameras (its badge), nothing more.
    const profile = PublicManufacturerSchema.parse(
      (await buyer.agent.get(`/manufacturers/${factory.code}`).expect(200)).body,
    );
    expect(profile.liveCameras).toBe(true);
    expect(JSON.stringify(profile)).not.toContain('Line 3');
    expect(
      PublicManufacturerSchema.parse(
        (await buyer.agent.get(`/manufacturers/${rival.code}`).expect(200)).body,
      ).liveCameras,
    ).toBe(false);

    rivalCameraId = FactoryCameraSchema.parse(
      (
        await rival.agent
          .post('/manufacturer/cameras')
          .send({ label: 'Cutting', area: 'CUTTING' })
          .expect(201)
      ).body,
    ).id;
    video.streaming.add('input2');
    await rival.agent.post(`/manufacturer/cameras/${rivalCameraId}/submit`).expect(204);
    await approve(rivalCameraId);
  });

  it('sells monitoring to the buyer as an order fee, and shows nothing until paid', async () => {
    expect(await panel(buyer.agent)).toMatchObject({
      available: true,
      added: false,
      paid: false,
      feeMinor: 4_900,
      watchable: false,
      cameras: [],
    });
    await factory.agent.post(`/orders/${code}/monitoring`).expect(403);
    await factory.agent.get(`/orders/${code}/monitoring`).expect(403);
    await other.agent.get(`/orders/${code}/monitoring`).expect(404);
    await other.agent.post(`/orders/${code}/monitoring`).expect(404);

    await buyer.agent.post(`/orders/${code}/monitoring`).expect(204);
    await buyer.agent.post(`/orders/${code}/monitoring`).expect(409);
    const fees = BuyerPaymentsSchema.parse(
      (await buyer.agent.get(`/orders/${code}/payments`).expect(200)).body,
    ).fees;
    expect(fees).toEqual([
      expect.objectContaining({ purpose: 'MONITORING_FEE', chargedMinor: 4_900, dueMinor: 4_900 }),
    ]);
    expect(await panel(buyer.agent)).toMatchObject({ added: true, paid: false, cameras: [] });
  });

  it('lets the factory show only its own approved cameras', async () => {
    expect(
      FactoryOrderMonitoringSchema.parse(
        (await factory.agent.get(`/manufacturer/orders/${code}/cameras`).expect(200)).body,
      ),
    ).toEqual({
      added: true,
      cameras: [
        { id: cameraId, label: expect.any(String) as string, area: 'SEWING', assigned: false },
      ],
    });
    await factory.agent
      .put(`/manufacturer/orders/${code}/cameras`)
      .send({ cameraIds: [rivalCameraId] })
      .expect(409);
    await rival.agent
      .put(`/manufacturer/orders/${code}/cameras`)
      .send({ cameraIds: [rivalCameraId] })
      .expect(404);
    await factory.agent
      .put(`/manufacturer/orders/${code}/cameras`)
      .send({ cameraIds: [cameraId] })
      .expect(204);
    const buyerUser = await ctx.prisma.user.findFirstOrThrow({
      where: { companyId: buyer.companyId },
    });
    expect(
      await ctx.prisma.notification.count({
        where: { userId: buyerUser.id, title: `${code}: your live factory view is ready` },
      }),
    ).toBe(1);
  });

  it('streams to the buyer once paid and in production, with only this order’s recordings', async () => {
    const { paymentId } = PaymentStartSchema.parse(
      (
        await buyer.agent
          .post(`/orders/${code}/fees/payments`)
          .send({ purpose: 'MONITORING_FEE', method: 'BANK_TRANSFER' })
          .expect(201)
      ).body,
    );
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
    await admin
      .post(`/admin/finance/payments/${paymentId}/confirm`)
      .send({ proofFileId: fileId, bankReference: `CCTV-${run}-${String((transfers += 1))}` })
      .expect(204);

    // Paid, but not being made yet: no stream.
    expect(await panel(buyer.agent)).toMatchObject({ paid: true, watchable: false });

    const started = new Date(Date.now() - 2 * HOUR);
    await ctx.prisma.order.update({ where: { id: orderId }, data: { status: 'IN_PRODUCTION' } });
    await ctx.prisma.orderEvent.create({
      data: {
        orderId,
        fromStatus: 'DEPOSIT_PENDING',
        toStatus: 'IN_PRODUCTION',
        createdAt: started,
      },
    });
    video.recorded.set('input1', [
      {
        videoId: 'rec-before',
        startedAt: new Date(started.getTime() - HOUR),
        durationSeconds: 600,
      },
      {
        videoId: 'rec-during',
        startedAt: new Date(started.getTime() + HOUR),
        durationSeconds: 900,
      },
    ]);

    const view = await panel(buyer.agent);
    expect(view).toMatchObject({ paid: true, watchable: true });
    expect(view.cameras).toEqual([
      {
        number: 1,
        area: 'SEWING',
        live: true,
        playbackUrl: `https://play.test/input1?ttl=${String(DEFAULT_MONITORING_SETTINGS.playbackMinutes * 60)}`,
        recordings: [expect.objectContaining({ durationSeconds: 900 })],
      },
    ]);
    // Nothing that names the factory or its camera label.
    const raw = JSON.stringify(view);
    for (const leak of [factory.code, factory.name, 'Line 3', cameraId, rival.code])
      expect(raw).not.toContain(leak);
    expect(raw).not.toContain('rec-before');
    expect(
      await ctx.prisma.auditLog.count({
        where: { action: 'monitoring.viewed', entityId: orderId },
      }),
    ).toBeGreaterThanOrEqual(1);
  });

  it('cuts the buyer off at once when staff disable a camera', async () => {
    await admin.post(`/admin/monitoring/cameras/${cameraId}/disable`).expect(204);
    await admin.post(`/admin/monitoring/cameras/${cameraId}/disable`).expect(404);
    expect((await panel(buyer.agent)).cameras).toEqual([]);
    const own = z
      .array(FactoryCameraSchema)
      .parse((await factory.agent.get('/manufacturer/cameras').expect(200)).body);
    expect(own.find((c) => c.id === cameraId)).toMatchObject({ status: 'DISABLED', ingest: null });
  });

  it('removes a camera and its live input', async () => {
    await factory.agent.delete(`/manufacturer/cameras/${cameraId}`).expect(204);
    expect(video.deleted).toContain('input1');
    expect(await ctx.prisma.orderCamera.count({ where: { cameraId } })).toBe(0);
  });
});
