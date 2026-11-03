import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AuthResponseSchema, OnboardingStateSchema } from '@garmentgate/shared';
import {
  client,
  companyInfo,
  cookiesFrom,
  createAdmin,
  createTestApp,
  PASSWORD,
  registerAgent,
  type TestContext,
  uploadDocument,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';

const capabilities = {
  categoryIds: [TSHIRTS],
  about: 'Knit composite. Call +880 1711-234567 or visit testknit.com for our catalog.',
  monthlyCapacityPcs: '100000',
  moqPcs: 500,
  sampleLeadTimeDays: 10,
  productionLeadTimeMinDays: 40,
  productionLeadTimeMaxDays: 55,
  workforceSize: 800,
  machinery: [{ type: 'Overlock', count: 100 }],
  exportMarkets: ['us', 'DE'],
};

describe('Onboarding, KYC and roles (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('runs a manufacturer from sign-up to verified, with admin approval', async () => {
    const { agent, email } = await registerAgent(ctx.app, 'MANUFACTURER');

    // Fresh account: nothing saved yet.
    let state = OnboardingStateSchema.parse((await agent.get('/onboarding').expect(200)).body);
    expect(state).toMatchObject({
      step: 'COMPANY_INFO',
      kycStatus: 'NOT_SUBMITTED',
      company: null,
      canSubmit: false,
    });

    // Step 1 creates the company and an anonymised public code.
    state = OnboardingStateSchema.parse(
      (await agent.put('/onboarding/company').send(companyInfo('bd')).expect(200)).body,
    );
    expect(state.step).toBe('PROFILE');
    expect(state.publicCode).toMatch(/^MFR-BD-\d{4}$/);

    // Step 2: free text is contact-filtered; the original is kept for admins only.
    state = OnboardingStateSchema.parse(
      (await agent.put('/onboarding/profile').send(capabilities).expect(200)).body,
    );
    expect(state.step).toBe('DOCUMENTS');
    expect(state.missingDocuments).toEqual(['BUSINESS_LICENSE', 'EXPORT_REGISTRATION']);
    const profile = await ctx.prisma.manufacturerProfile.findFirstOrThrow({
      where: { publicCode: state.publicCode ?? '' },
    });
    expect(profile.aboutFiltered).not.toMatch(/1711|testknit\.com/);
    expect(profile.about).toContain('testknit.com');
    expect(profile.exportMarkets).toEqual(['US', 'DE']);

    // Re-saving step 1 never moves the wizard backwards.
    state = OnboardingStateSchema.parse(
      (await agent.put('/onboarding/company').send(companyInfo('BD')).expect(200)).body,
    );
    expect(state.step).toBe('DOCUMENTS');

    // Step 3: real uploads to MinIO via presigned POST.
    await uploadDocument(agent, 'BUSINESS_LICENSE');
    await uploadDocument(agent, 'EXPORT_REGISTRATION');
    state = OnboardingStateSchema.parse((await agent.get('/onboarding').expect(200)).body);
    expect(state.missingDocuments).toEqual([]);
    expect(state.canSubmit).toBe(true);

    // Submitting needs a verified email.
    await agent.post('/onboarding/submit').expect(403);
    await client(ctx.app)
      .post('/auth/verify-email')
      .send({ token: ctx.mail.tokenFor('verify-email', email) })
      .expect(204);
    const submit = await agent.post('/onboarding/submit').expect(200);
    expect(OnboardingStateSchema.parse(submit.body).kycStatus).toBe('PENDING_REVIEW');
    expect(cookiesFrom(submit).gg_at).toBeTruthy(); // claims re-issued for routing

    // Locked while under review.
    await agent.put('/onboarding/company').send(companyInfo('BD')).expect(409);

    // Admin sees it in the queue, with the real identity and documents.
    const adminEmail = await createAdmin(ctx.prisma);
    const admin = client(ctx.app);
    await admin.post('/auth/login').send({ email: adminEmail, password: PASSWORD }).expect(200);
    const queue = (await admin.get('/admin/kyc/companies').expect(200)).body as {
      id: string;
      publicCode: string;
    }[];
    const entry = queue.find((c) => c.publicCode === state.publicCode);
    expect(entry).toBeDefined();
    const detail = (await admin.get(`/admin/kyc/companies/${entry?.id ?? ''}`).expect(200))
      .body as {
      company: { legalName: string };
      documents: { fileId: string }[];
    };
    expect(detail.company.legalName).toBe('Test Knit Ltd.');
    const firstDoc = detail.documents[0];
    if (!firstDoc) throw new Error('expected a document');
    const link = (await admin.get(`/kyc/files/${firstDoc.fileId}/url`).expect(200)).body as {
      url: string;
    };
    expect((await fetch(link.url)).status).toBe(200);

    await admin.post(`/admin/kyc/companies/${entry?.id ?? ''}/approve`).expect(204);
    expect(ctx.mail.sent.some((m) => m.template === 'kyc-decision' && m.to === email)).toBe(true);

    // After a refresh the token says VERIFIED and the profile is listed.
    const refreshed = await agent.post('/auth/refresh').expect(200);
    expect(AuthResponseSchema.parse(refreshed.body).user.company?.kycStatus).toBe('VERIFIED');
    const listed = await ctx.prisma.manufacturerProfile.findUniqueOrThrow({
      where: { id: profile.id },
    });
    expect(listed.isListed).toBe(true);
  });

  it('lets an admin send a buyer back with a reason, and the buyer can fix and resubmit', async () => {
    const { agent, email } = await registerAgent(ctx.app, 'BUYER');
    await client(ctx.app)
      .post('/auth/verify-email')
      .send({ token: ctx.mail.tokenFor('verify-email', email) })
      .expect(204);
    await agent.put('/onboarding/company').send(companyInfo('US')).expect(200);
    await agent
      .put('/onboarding/profile')
      .send({
        businessType: 'BRAND',
        categoryIds: [TSHIRTS],
        targetMarkets: ['US'],
        sourcingNeeds: 'Heavyweight tees.',
      })
      .expect(200);
    await uploadDocument(agent, 'BUSINESS_LICENSE');
    await agent.post('/onboarding/submit').expect(200);

    const adminEmail = await createAdmin(ctx.prisma);
    const admin = client(ctx.app);
    await admin.post('/auth/login').send({ email: adminEmail, password: PASSWORD }).expect(200);
    const company = await ctx.prisma.company.findFirstOrThrow({
      where: { users: { some: { email } } },
    });

    await admin
      .post(`/admin/kyc/companies/${company.id}/reject`)
      .send({ reason: 'short' })
      .expect(400);
    await admin
      .post(`/admin/kyc/companies/${company.id}/reject`)
      .send({ reason: 'Business license is cropped; upload all pages.' })
      .expect(204);

    const state = OnboardingStateSchema.parse((await agent.get('/onboarding').expect(200)).body);
    expect(state).toMatchObject({
      kycStatus: 'REJECTED',
      step: 'DOCUMENTS',
      rejectionReason: 'Business license is cropped; upload all pages.',
    });
    await agent.post('/onboarding/submit').expect(200);
  });

  it('enforces roles', async () => {
    const { agent: buyer } = await registerAgent(ctx.app, 'BUYER');
    await buyer.get('/admin/kyc/companies').expect(403);
    await buyer.put('/onboarding/company').send(companyInfo('US')).expect(200);
    await buyer
      .post('/kyc/uploads')
      .send({
        purpose: 'CERTIFICATION',
        fileName: 'gots.pdf',
        contentType: 'application/pdf',
        sizeBytes: 100,
      })
      .expect(403);
    await buyer.post('/kyc/certifications').send({}).expect(403);
    await client(ctx.app).get('/onboarding').expect(401);
  });

  it('rejects uploads with a disallowed type or size', async () => {
    const { agent } = await registerAgent(ctx.app, 'BUYER');
    await agent.put('/onboarding/company').send(companyInfo('US')).expect(200);
    await agent
      .post('/kyc/uploads')
      .send({
        purpose: 'KYC_DOCUMENT',
        fileName: 'x.exe',
        contentType: 'application/x-msdownload',
        sizeBytes: 100,
      })
      .expect(400);
    await agent
      .post('/kyc/uploads')
      .send({
        purpose: 'KYC_DOCUMENT',
        fileName: 'big.pdf',
        contentType: 'application/pdf',
        sizeBytes: 50 * 1024 * 1024,
      })
      .expect(400);
  });

  it('does not let one company read another company’s files', async () => {
    const { agent: a } = await registerAgent(ctx.app, 'BUYER');
    await a.put('/onboarding/company').send(companyInfo('US')).expect(200);
    const fileId = await uploadDocument(a, 'BUSINESS_LICENSE');

    const { agent: b } = await registerAgent(ctx.app, 'MANUFACTURER');
    await b.get(`/kyc/files/${fileId}/url`).expect(404);
    await a.get(`/kyc/files/${fileId}/url`).expect(200);
  });
});
