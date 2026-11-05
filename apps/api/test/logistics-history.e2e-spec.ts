import { hash } from '@node-rs/argon2';
import { AdminShipmentSchema, BuyerTrackingSchema } from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PerformanceService } from '../src/modules/trust/performance.service.js';
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
const DAY = 86_400_000;
const FACTORY_NAME = 'Karotoya Knit Composite Ltd';

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', legalName: string) {
  const email = uniqueEmail(`his${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'His',
      lastName: 'Tory',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName,
          country: type === 'BUYER' ? 'US' : 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-US-7${run}` } } }
            : {
                manufacturerProfile: {
                  create: { publicCode: `MFR-BD-7${run.slice(-3)}`, isListed: true },
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

/**
 * Shipments booked by factories before GarmentGate logistics are converted (migration
 * retire_factory_shipments) into historical logistics shipments: visible, never editable,
 * and still counted in the factory's on-time score.
 */
describe('logistics: historical shipments (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let buyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  const orderCode = `ORD-2097-${run}1`;
  const shipmentCode = `SHP-2097-${run}1`;

  beforeAll(async () => {
    ctx = await createTestApp();
    const adminEmail = await createAdmin(ctx.prisma);
    admin = await login(ctx, adminEmail);
    const adminId = (await ctx.prisma.user.findUniqueOrThrow({ where: { email: adminEmail } })).id;
    buyer = await company(ctx, 'BUYER', 'Ridgeway Supply Co');
    factory = await company(ctx, 'MANUFACTURER', FACTORY_NAME);
    const order = await ctx.prisma.order.create({
      data: {
        code: orderCode,
        buyerCompanyId: buyer.companyId,
        manufacturerProfileId: factory.profileId,
        title: 'Fleece hoodie',
        quantity: 800,
        buyerUnitPriceMinor: 1_200,
        manufacturerUnitPriceMinor: 1_000,
        buyerTotalMinor: 960_000n,
        manufacturerTotalMinor: 800_000n,
        currency: 'USD',
        incoterm: 'FOB',
        destinationCountry: 'US',
        requestedShipDate: new Date(Date.now() - 30 * DAY),
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });
    await ctx.prisma.logisticsShipment.create({
      data: {
        code: shipmentCode,
        historical: true,
        buyerCompanyId: buyer.companyId,
        mode: 'SEA_LCL',
        incoterm: 'FOB',
        status: 'DELIVERED',
        shipperMode: 'GARMENT_GATE_EXPORTER',
        originCountry: 'BD',
        destinationCountry: 'US',
        destinationPort: 'USLAX',
        currency: 'USD',
        buyerPriceMinor: 0n,
        partnerCostMinor: 0n,
        cartons: 0,
        grossWeightGrams: 0,
        volumeLitres: 0,
        // Left a day before the requested date: on time.
        departedAt: new Date(Date.now() - 31 * DAY),
        deliveredAt: new Date(Date.now() - 5 * DAY),
        createdById: adminId,
        orders: {
          create: {
            orderId: order.id,
            cartons: 0,
            grossWeightGrams: 0,
            volumeLitres: 0,
            buyerShareMinor: 0n,
            costShareMinor: 0n,
          },
        },
        legs: {
          create: {
            sequence: 1,
            kind: 'PORT_TO_PORT',
            status: 'COMPLETED',
            fromLabel: 'Origin',
            toLabel: 'USLAX',
            carrier: 'Maersk',
            trackingNumber: 'MAEU5550001',
          },
        },
        events: {
          create: {
            status: 'DELIVERED',
            source: 'SYSTEM',
            publicNote: "Shipped on the factory's booking, before GarmentGate logistics.",
            internalNote: `Converted; forwarder: ${FACTORY_NAME} logistics`,
            occurredAt: new Date(Date.now() - 31 * DAY),
            createdById: adminId,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('shows the history to staff and the buyer, without the factory', async () => {
    const s = AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${shipmentCode}`).expect(200)).body,
    );
    expect(s).toMatchObject({ historical: true, status: 'DELIVERED', buyerPriceMinor: 0 });

    const res = await buyer.agent.get(`/orders/${orderCode}/logistics/tracking`).expect(200);
    const tracking = BuyerTrackingSchema.parse(res.body);
    expect(tracking).toMatchObject({ shipmentCode, status: 'DELIVERED' });
    expect(tracking.events[0]?.note).toContain('factory');
    expect(res.text).not.toContain(FACTORY_NAME);
  });

  it('never changes', async () => {
    const leg = AdminShipmentSchema.parse(
      (await admin.get(`/admin/logistics/shipments/${shipmentCode}`).expect(200)).body,
    ).legs[0];
    for (const res of [
      await admin.patch(`/admin/logistics/shipments/${shipmentCode}`).send({ status: 'CANCELLED' }),
      await admin
        .patch(`/admin/logistics/shipments/${shipmentCode}/legs/${leg?.id ?? ''}`)
        .send({ carrier: 'Other Line' }),
      await admin
        .post(`/admin/logistics/shipments/${shipmentCode}/events`)
        .send({ note: 'Late update' }),
    ]) {
      expect(res.status).toBe(409);
      expect(res.text).toContain('historical');
    }
  });

  it('still counts for the factory’s on-time score', async () => {
    await ctx.app.get(PerformanceService).recompute(factory.profileId);
    const profile = await ctx.prisma.manufacturerProfile.findUniqueOrThrow({
      where: { id: factory.profileId },
    });
    expect(profile.onTimeDeliveryBps).toBe(10_000);
  });
});
