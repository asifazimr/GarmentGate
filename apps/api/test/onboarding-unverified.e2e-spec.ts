// Must be first: configuration is read once when the app module is imported.
import './email-verification-off.env.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { OnboardingStateSchema } from '@garmentgate/shared';
import {
  companyInfo,
  createTestApp,
  registerAgent,
  type TestContext,
  uploadDocument,
} from './helpers.js';

const TSHIRTS = '0198a000-0000-7000-8000-000000000001';

/** REQUIRE_EMAIL_VERIFICATION=false (internal testing): onboarding can be submitted unverified. */
describe('Onboarding with email verification switched off (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('lets a company submit for review without verifying its email', async () => {
    const { agent } = await registerAgent(ctx.app, 'BUYER');
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
    const state = OnboardingStateSchema.parse((await agent.get('/onboarding').expect(200)).body);
    expect(state).toMatchObject({ emailVerified: false, emailVerificationRequired: false });
    const submit = await agent.post('/onboarding/submit').expect(200);
    expect(OnboardingStateSchema.parse(submit.body).kycStatus).toBe('PENDING_REVIEW');
  });
});
