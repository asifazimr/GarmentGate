import { hash } from '@node-rs/argon2';
import {
  CapacityCalendarSchema,
  ManufacturerProductSchema,
  PublicManufacturerSchema,
  PublicProductSchema,
} from '@garmentgate/shared';
import sharp from 'sharp';
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

/** Values that must never reach a buyer, planted on a verified factory. */
const IDENTITY = {
  legalName: 'Zephyrine Knit Composite Ltd.',
  tradeName: 'Zephyrine Knit',
  addressLine1: '77 Quillfeather Road',
  city: 'Gazipur',
  website: 'https://zephyrine-knit.example',
  phone: '+880 2 5550 1234',
  registrationNumber: 'REG-QX-998877',
  taxId: 'TAX-QX-112233',
  ownerFirst: 'Orlandra',
  ownerLast: 'Vexley',
};

async function verifiedManufacturer(ctx: TestContext) {
  const email = uniqueEmail('factory');
  const suffix = String(Date.now()).slice(-4);
  const user = await ctx.prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'MANUFACTURER',
      firstName: IDENTITY.ownerFirst,
      lastName: IDENTITY.ownerLast,
      emailVerifiedAt: new Date(),
      companyRole: 'OWNER',
      company: {
        create: {
          type: 'MANUFACTURER',
          legalName: IDENTITY.legalName,
          tradeName: IDENTITY.tradeName,
          country: 'BD',
          city: IDENTITY.city,
          addressLine1: IDENTITY.addressLine1,
          website: IDENTITY.website,
          phone: IDENTITY.phone,
          registrationNumber: IDENTITY.registrationNumber,
          taxId: IDENTITY.taxId,
          kycStatus: 'VERIFIED',
          onboardingStep: 'SUBMITTED',
          manufacturerProfile: {
            create: {
              publicCode: `MFR-BD-9${suffix}`,
              monthlyCapacityPcs: 100_000,
              moqPcs: 500,
              isListed: true,
              headline: 'Zephyrine Knit makes heavyweight tees',
              aboutFiltered: `Run by ${IDENTITY.ownerFirst} ${IDENTITY.ownerLast} since 2009.`,
              performanceScore: 90,
              categories: { connect: [{ id: TSHIRTS }] },
              certifications: {
                create: [{ type: 'GOTS', status: 'VERIFIED', certificateNumber: 'CERT-QX-445566' }],
              },
            },
          },
        },
      },
    },
    include: { company: { include: { manufacturerProfile: true } } },
  });
  const agent = client(ctx.app);
  await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
  const publicCode = user.company?.manufacturerProfile?.publicCode ?? '';
  return { agent, publicCode };
}

async function jpegWithGps(): Promise<Buffer> {
  return sharp({ create: { width: 1800, height: 1200, channels: 3, background: '#2b6' } })
    .jpeg()
    .withExif({
      IFD0: { Make: 'QXCAM', Artist: IDENTITY.ownerFirst, Copyright: IDENTITY.legalName },
      IFD3: {
        GPSLatitudeRef: 'N',
        GPSLatitude: '23/1 59/1 0/1',
        GPSLongitudeRef: 'E',
        GPSLongitude: '90/1 25/1 0/1',
      },
    })
    .toBuffer();
}

async function upload(
  agent: ReturnType<typeof client>,
  purpose: string,
  bytes: Buffer,
  type = 'image/jpeg',
) {
  const presign = await agent
    .post('/manufacturer/uploads')
    .send({
      purpose,
      fileName: `${IDENTITY.legalName} photo.jpg`,
      contentType: type,
      sizeBytes: bytes.length,
    })
    .expect(201);
  const { fileId, url, fields } = presign.body as {
    fileId: string;
    url: string;
    fields: Record<string, string>;
  };
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  form.append('file', new Blob([new Uint8Array(bytes)], { type }));
  expect((await fetch(url, { method: 'POST', body: form })).status).toBeLessThan(300);
  return fileId;
}

async function waitFor<T>(fn: () => Promise<T | null>, timeoutMs = 20_000): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = await fn();
    if (value !== null) return value;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('Timed out waiting for condition');
}

describe('Manufacturer catalog, image pipeline and anonymity (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
    await ctx.prisma.marginRule.deleteMany();
    await ctx.prisma.marginRule.create({ data: { name: 'Default', markupBps: 1500 } });
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('runs product → image pipeline → review → anonymous buyer view', async () => {
    const { agent, publicCode } = await verifiedManufacturer(ctx);

    // Create a product with tiers; the manufacturer sees only their own prices.
    const created = ManufacturerProductSchema.parse(
      (
        await agent
          .post('/manufacturer/products')
          .send({
            title: 'Zephyrine heavyweight tee',
            categoryId: TSHIRTS,
            description: 'Made by Zephyrine Knit. WhatsApp +880 1711-555555',
            fabric: 'Single jersey',
            gsm: 240,
            moqPcs: 500,
            leadTimeDays: 45,
            priceTiers: [
              { minQty: 500, unitPriceMinor: 400 },
              { minQty: 1000, unitPriceMinor: 360 },
              { minQty: 5000, unitPriceMinor: 300 },
            ],
            status: 'PUBLISHED',
          })
          .expect(201)
      ).body,
    );
    expect(created.priceTiers).toEqual([
      { minQty: 500, unitPriceMinor: 400 },
      { minQty: 1000, unitPriceMinor: 360 },
      { minQty: 5000, unitPriceMinor: 300 },
    ]);
    const mfrListRaw = JSON.stringify((await agent.get('/manufacturer/products').expect(200)).body);
    expect(mfrListRaw).not.toMatch(/:460[,}]/); // 400 + 15% buyer price must not leak to the factory
    expect(mfrListRaw).not.toContain('buyerUnitPrice');

    // Upload an image with GPS + owner EXIF; the worker strips it into WebP renditions.
    const fileId = await upload(agent, 'PRODUCT_IMAGE', await jpegWithGps());
    await agent
      .post(`/manufacturer/products/${created.id}/images`)
      .send({ fileId, caption: 'Front view' })
      .expect(201);
    const processed = await waitFor(async () => {
      const p = ManufacturerProductSchema.parse(
        (await agent.get(`/manufacturer/products/${created.id}`)).body,
      );
      const img = p.images[0];
      return img?.processing === 'READY' ? img : null;
    });
    expect(processed.review).toBe('PENDING');
    const rendition = Buffer.from(await (await fetch(processed.urls?.large ?? '')).arrayBuffer());
    const meta = await sharp(rendition).metadata();
    expect(meta.format).toBe('webp');
    expect(meta.exif).toBeUndefined();
    expect(rendition.toString('latin1')).not.toContain('QXCAM');

    // Buyers: the product is visible with marked-up prices, but the image waits for review.
    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER');
    await ctx.prisma.company.updateMany({
      where: { type: 'BUYER' },
      data: { kycStatus: 'VERIFIED' },
    });
    const beforeReview = PublicProductSchema.parse(
      (await buyer.get(`/catalog/products/${created.id}`).expect(200)).body,
    );
    expect(beforeReview.images).toHaveLength(0);
    expect(beforeReview.priceTiers).toEqual([
      { minQty: 500, unitPriceMinor: 460 },
      { minQty: 1000, unitPriceMinor: 414 },
      { minQty: 5000, unitPriceMinor: 345 },
    ]);

    const adminEmail = await createAdmin(ctx.prisma);
    const admin = client(ctx.app);
    await admin.post('/auth/login').send({ email: adminEmail, password: PASSWORD }).expect(200);
    const pending = (await admin.get('/admin/media/pending').expect(200)).body as {
      id: string;
      kind: string;
    }[];
    const item = pending.find((p) => p.id === processed.id);
    expect(item?.kind).toBe('product-images');
    await admin.post(`/admin/media/product-images/${processed.id}/approve`).expect(204);

    const productRes = await buyer.get(`/catalog/products/${created.id}`).expect(200);
    const product = PublicProductSchema.parse(productRes.body);
    expect(product.images).toHaveLength(1);
    expect(product.manufacturerCode).toBe(publicCode);

    // The raw buyer responses contain nothing that identifies or contacts the factory.
    const profileRes = await buyer.get(`/manufacturers/${publicCode}`).expect(200);
    PublicManufacturerSchema.parse(profileRes.body);
    const listRes = await buyer.get('/manufacturers?category=t-shirts').expect(200);
    for (const raw of [productRes.text, profileRes.text, listRes.text]) {
      for (const value of [
        IDENTITY.legalName,
        'Zephyrine',
        IDENTITY.addressLine1,
        'Quillfeather',
        IDENTITY.website,
        'zephyrine-knit',
        IDENTITY.phone,
        '1711',
        IDENTITY.registrationNumber,
        IDENTITY.taxId,
        IDENTITY.ownerFirst,
        IDENTITY.ownerLast,
        'CERT-QX-445566',
        'originals/', // private original storage keys
        '"400"',
      ]) {
        expect(raw, `buyer response leaked "${value}"`).not.toContain(value);
      }
      expect(raw).not.toMatch(/@[\w-]+\.\w/); // no email addresses
    }
  });

  it('enforces who can see what', async () => {
    const { agent: factory } = await verifiedManufacturer(ctx);
    await factory.get('/manufacturers').expect(403); // factories never browse other factories
    await factory.get('/catalog/products').expect(403);

    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER');
    await buyer.get('/manufacturer/products').expect(403);
    await buyer.get('/manufacturer/profile/preview').expect(403);

    // A manufacturer that isn't verified yet can't manage a catalog.
    const { agent: unverified } = await registerAgent(ctx.app, 'MANUFACTURER');
    await unverified
      .put('/onboarding/company')
      .send({
        legalName: 'X Ltd',
        country: 'BD',
        city: 'Dhaka',
        addressLine1: 'A',
        registrationNumber: 'R-1',
      })
      .expect(200);
    await unverified.get('/manufacturer/products').expect(403);
  });

  it('previews the profile through the same serializer buyers get', async () => {
    const { agent } = await verifiedManufacturer(ctx);
    const res = await agent.get('/manufacturer/profile/preview').expect(200);
    const preview = PublicManufacturerSchema.parse(res.body);
    expect(preview.headline).toBe('[name removed] makes heavyweight tees');
    expect(res.text).not.toContain(IDENTITY.ownerLast);
    expect(preview.certifications).toEqual([{ type: 'GOTS', name: null, validUntil: null }]);
  });

  it('validates products and rejects invalid price tiers', async () => {
    const { agent } = await verifiedManufacturer(ctx);
    const res = await agent
      .post('/manufacturer/products')
      .send({
        title: 'Tee',
        categoryId: TSHIRTS,
        moqPcs: 500,
        leadTimeDays: 30,
        priceTiers: [
          { minQty: 500, unitPriceMinor: 300 },
          { minQty: 1000, unitPriceMinor: 350 },
        ],
      })
      .expect(400);
    expect(JSON.stringify(res.body)).toContain('Larger quantities should not cost more');
  });

  it('keeps a capacity calendar of available vs booked pieces', async () => {
    const { agent } = await verifiedManufacturer(ctx);
    const now = new Date();
    const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
      .toISOString()
      .slice(0, 7);
    await agent
      .put(`/manufacturer/capacity/${next}`)
      .send({ availablePcs: 80_000, externalBookedPcs: 30_000, note: 'Holiday' })
      .expect(204);
    await agent
      .put('/manufacturer/capacity/2020-01')
      .send({ availablePcs: 1, externalBookedPcs: 0 })
      .expect(400);

    const calendar = CapacityCalendarSchema.parse(
      (await agent.get('/manufacturer/capacity?months=3').expect(200)).body,
    );
    expect(calendar.months).toHaveLength(3);
    expect(calendar.months[0]).toMatchObject({ availablePcs: 100_000, isOverride: false });
    expect(calendar.months[1]).toMatchObject({
      month: next,
      availablePcs: 80_000,
      isOverride: true,
      externalBookedPcs: 30_000,
      note: 'Holiday',
    });
  });
});
