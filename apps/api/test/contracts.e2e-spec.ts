import { hash } from '@node-rs/argon2';
import {
  BuyerContractSchema,
  isoDate,
  ManufacturerContractSchema,
  MerchandiserSchema,
} from '@garmentgate/shared';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
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
const BUYER_NAME = `Harbourline Security Services ${run}`;
const FACTORY_NAME = `Rupsha Uniform Works ${run}`;

async function login(ctx: TestContext, email: string): Promise<Agent> {
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  return agent;
}

async function company(ctx: TestContext, type: 'BUYER' | 'MANUFACTURER', name: string, n: string) {
  const email = uniqueEmail(`ctr${type.toLowerCase()}`);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: type,
      firstName: 'Con',
      lastName: 'Tract',
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type,
          legalName: name,
          country: 'BD',
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          ...(type === 'BUYER'
            ? { buyerProfile: { create: { publicCode: `BYR-BD-${n}${run.slice(-3)}` } } }
            : {
                manufacturerProfile: {
                  create: { publicCode: `MFR-BD-${n}${run.slice(-3)}`, isListed: true },
                },
              }),
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true, buyerProfile: true } } },
  });
  return {
    agent: await login(ctx, email),
    companyId: user.companyId ?? '',
    code:
      user.company?.buyerProfile?.publicCode ?? user.company?.manufacturerProfile?.publicCode ?? '',
  };
}

describe('supply contracts and merchandisers (e2e)', () => {
  let ctx: TestContext;
  let admin: Agent;
  let adminId = '';
  let buyer: Awaited<ReturnType<typeof company>>;
  let otherBuyer: Awaited<ReturnType<typeof company>>;
  let factory: Awaited<ReturnType<typeof company>>;
  let contractCode = '';

  const contract = () => ({
    buyerCode: buyer.code,
    manufacturerCode: factory.code,
    title: 'Guard shirt, poly-cotton',
    specification: `Two chest pockets, epaulettes. Made by ${FACTORY_NAME} for ${BUYER_NAME}.`,
    currency: 'USD',
    buyerUnitPriceMinor: 1_000,
    manufacturerUnitPriceMinor: 800,
    contractedQuantity: 10_000,
    minCallOffQuantity: 500,
    depositBps: 3000,
    incoterm: 'FOB',
    destinationCountry: 'BD',
    leadTimeDays: 45,
    startsOn: isoDate(new Date(Date.now() - DAY)),
    endsOn: isoDate(new Date(Date.now() + 300 * DAY)),
  });
  const callOff = (agent: Agent, quantity: number) =>
    agent.post(`/contracts/${contractCode}/call-offs`).send({ quantity });

  beforeAll(async () => {
    ctx = await createTestApp();
    const email = await createAdmin(ctx.prisma);
    admin = await login(ctx, email);
    adminId = (await ctx.prisma.user.findUniqueOrThrow({ where: { email } })).id;
    buyer = await company(ctx, 'BUYER', BUYER_NAME, '3');
    otherBuyer = await company(ctx, 'BUYER', `Other buyer ${run}`, '4');
    factory = await company(ctx, 'MANUFACTURER', FACTORY_NAME, '3');
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('lets staff agree a contract, never below the factory price', async () => {
    await admin
      .post('/admin/contracts')
      .send({ ...contract(), buyerUnitPriceMinor: 700 })
      .expect(400);
    await buyer.agent.post('/admin/contracts').send(contract()).expect(403);
    contractCode = (
      (await admin.post('/admin/contracts').send(contract()).expect(201)).body as { code: string }
    ).code;
    expect(contractCode).toMatch(/^CTR-\d{4}-\d{5}$/);
  });

  it('shows each side its own price and only the other side’s code', async () => {
    const b = await buyer.agent.get('/contracts').expect(200);
    expect(z.array(BuyerContractSchema).parse(b.body)[0]).toMatchObject({
      code: contractCode,
      unitPriceMinor: 1_000,
      manufacturerCode: factory.code,
      contractedQuantity: 10_000,
    });
    expect(b.text).not.toContain(FACTORY_NAME);
    expect(b.text).not.toContain('800');

    const f = await factory.agent.get('/manufacturer/contracts').expect(200);
    expect(z.array(ManufacturerContractSchema).parse(f.body)[0]).toMatchObject({
      unitPriceMinor: 800,
      buyerCode: buyer.code,
    });
    expect(f.text).not.toContain(BUYER_NAME);
    expect(f.text).not.toContain('"unitPriceMinor":1000');
    expect(
      z
        .array(BuyerContractSchema)
        .parse((await otherBuyer.agent.get('/contracts').expect(200)).body),
    ).toEqual([]);
  });

  it('turns a call-off into an order with its deposit due, at the contract price', async () => {
    await admin
      .put(`/admin/buyers/${buyer.code}/merchandiser`)
      .send({ userId: adminId })
      .expect(204);
    expect(
      MerchandiserSchema.parse((await buyer.agent.get('/buyer/merchandiser').expect(200)).body),
    ).toEqual({ name: 'Ada Admin' });

    expect((await callOff(buyer.agent, 400)).status).toBe(409); // below the minimum
    await callOff(otherBuyer.agent, 1_000).expect(404);
    await callOff(factory.agent, 1_000).expect(403);
    const { orderCode } = (await callOff(buyer.agent, 1_000).expect(201)).body as {
      orderCode: string;
    };
    const order = await ctx.prisma.order.findUniqueOrThrow({
      where: { code: orderCode },
      include: { releases: true, contract: true },
    });
    expect(order).toMatchObject({
      status: 'DEPOSIT_PENDING',
      quantity: 1_000,
      buyerUnitPriceMinor: 1_000,
      manufacturerUnitPriceMinor: 800,
      buyerTotalMinor: 1_000_000n,
    });
    expect(order.releases.length).toBeGreaterThan(0);
    expect(order.contract?.calledOffQuantity).toBe(1_000);
    expect(
      await ctx.prisma.notification.count({
        where: { userId: adminId, title: { contains: `${orderCode}: new call-off` } },
      }),
    ).toBe(1);
  });

  it('never overdraws the contracted volume, even with call-offs at the same moment', async () => {
    const results = await Promise.all([callOff(buyer.agent, 5_000), callOff(buyer.agent, 5_000)]);
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
    const c = await ctx.prisma.supplyContract.findUniqueOrThrow({ where: { code: contractCode } });
    expect(c.calledOffQuantity).toBe(6_000);
    await admin.post(`/admin/contracts/${contractCode}/end`).expect(204);
    expect((await callOff(buyer.agent, 1_000)).status).toBe(409);
  });
});
