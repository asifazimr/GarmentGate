import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AuthResponseSchema } from '@garmentgate/shared';
import {
  client,
  cookiesFrom,
  createTestApp,
  PASSWORD,
  registerAgent,
  type TestContext,
  uniqueEmail,
} from './helpers.js';

describe('Auth (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  const http = () => client(ctx.app);

  describe('register', () => {
    it('creates the user, sets httpOnly cookies and sends a verification email', async () => {
      const email = uniqueEmail('Buyer');
      const res = await http()
        .post('/auth/register')
        .send({
          role: 'BUYER',
          firstName: 'Lena',
          lastName: 'H',
          email: `  ${email.toUpperCase()} `,
          password: PASSWORD,
          acceptTerms: true,
        })
        .expect(201);

      const { user } = AuthResponseSchema.parse(res.body);
      expect(user).toMatchObject({
        email: email.toLowerCase(),
        role: 'BUYER',
        emailVerified: false,
        company: null,
      });
      expect(res.body).not.toHaveProperty('user.passwordHash');

      const setCookie = (res.headers['set-cookie'] as unknown as string[]).join('\n');
      expect(setCookie).toMatch(/gg_at=.*HttpOnly/);
      expect(setCookie).toMatch(/gg_rt=.*HttpOnly/);
      expect(setCookie).toMatch(/SameSite=Lax/);
      expect(
        ctx.mail.sent.some((m) => m.template === 'verify-email' && m.to === email.toLowerCase()),
      ).toBe(true);
    });

    it('rejects a duplicate email with 409', async () => {
      const { email } = await registerAgent(ctx.app, 'BUYER');
      await http()
        .post('/auth/register')
        .send({
          role: 'BUYER',
          firstName: 'A',
          lastName: 'B',
          email,
          password: PASSWORD,
          acceptTerms: true,
        })
        .expect(409);
    });

    it('validates input with the shared schema', async () => {
      const res = await http()
        .post('/auth/register')
        .send({
          role: 'ADMIN',
          firstName: '',
          lastName: 'B',
          email: 'nope',
          password: 'short',
          acceptTerms: false,
        })
        .expect(400);
      const paths = (res.body as { errors: { path: string }[] }).errors.map((e) => e.path);
      expect(paths).toEqual(
        expect.arrayContaining(['role', 'firstName', 'email', 'password', 'acceptTerms']),
      );
    });
  });

  describe('login and session', () => {
    it('logs in, reads /auth/me, and rejects a wrong password with the same message as an unknown email', async () => {
      const { email } = await registerAgent(ctx.app, 'MANUFACTURER');
      const agent = client(ctx.app);
      await agent.post('/auth/login').send({ email, password: PASSWORD }).expect(200);
      const me = await agent.get('/auth/me').expect(200);
      expect(AuthResponseSchema.parse(me.body).user.role).toBe('MANUFACTURER');

      const wrong = await http()
        .post('/auth/login')
        .send({ email, password: 'WrongPassword1' })
        .expect(401);
      const unknown = await http()
        .post('/auth/login')
        .send({ email: uniqueEmail(), password: 'WrongPassword1' })
        .expect(401);
      expect((wrong.body as { message: string }).message).toBe(
        (unknown.body as { message: string }).message,
      );
    });

    it('requires a token for protected routes and accepts a Bearer header', async () => {
      await http().get('/auth/me').expect(401);
      const { agent } = await registerAgent(ctx.app, 'BUYER');
      const login = await agent.get('/auth/me').expect(200);
      expect(login.status).toBe(200);

      const fresh = await http()
        .post('/auth/login')
        .send({ email: AuthResponseSchema.parse(login.body).user.email, password: PASSWORD })
        .expect(200);
      const accessToken = cookiesFrom(fresh).gg_at;
      await http().get('/auth/me').set('Authorization', `Bearer ${accessToken}`).expect(200);
    });

    it('rotates the refresh token and detects reuse of an old one', async () => {
      const { agent } = await registerAgent(ctx.app, 'BUYER');
      const first = await agent.post('/auth/refresh').expect(200);
      const oldRefresh = cookiesFrom(first).gg_rt;
      expect(oldRefresh).toBeTruthy();

      const second = await agent.post('/auth/refresh').expect(200);
      expect(cookiesFrom(second).gg_rt).not.toBe(oldRefresh);

      // Simulate the grace window having passed, then replay the stolen old token.
      await ctx.prisma.session.updateMany({
        where: { revokedAt: { not: null } },
        data: { revokedAt: new Date(Date.now() - 60_000) },
      });
      await http().post('/auth/refresh').set('Cookie', `gg_rt=${oldRefresh}`).expect(401);

      // The whole family is now revoked: the legitimate client is signed out too.
      await agent.post('/auth/refresh').expect(401);
    });

    it('logs out by revoking the session and clearing cookies', async () => {
      const { agent } = await registerAgent(ctx.app, 'BUYER');
      const res = await agent.post('/auth/logout').expect(204);
      expect((res.headers['set-cookie'] as unknown as string[]).join('\n')).toMatch(/gg_rt=;/);
      await agent.post('/auth/refresh').expect(401);
    });
  });

  describe('email verification', () => {
    it('verifies with the emailed token, once', async () => {
      const { agent, email } = await registerAgent(ctx.app, 'BUYER');
      const token = ctx.mail.tokenFor('verify-email', email);
      await http().post('/auth/verify-email').send({ token }).expect(204);
      await http().post('/auth/verify-email').send({ token }).expect(401);
      const me = await agent.get('/auth/me').expect(200);
      expect(AuthResponseSchema.parse(me.body).user.emailVerified).toBe(true);
    });

    it('invalidates the previous link when a new one is requested', async () => {
      const { agent, email } = await registerAgent(ctx.app, 'BUYER');
      const first = ctx.mail.tokenFor('verify-email', email);
      await agent.post('/auth/verify-email/resend').expect(204);
      const second = ctx.mail.tokenFor('verify-email', email);
      expect(second).not.toBe(first);
      await http().post('/auth/verify-email').send({ token: first }).expect(401);
      await http().post('/auth/verify-email').send({ token: second }).expect(204);
    });
  });

  describe('password reset', () => {
    it('always answers 204, emails only real accounts, and signs out everywhere on reset', async () => {
      const { agent, email } = await registerAgent(ctx.app, 'MANUFACTURER');
      const before = ctx.mail.sent.length;
      await http()
        .post('/auth/password/forgot')
        .send({ email: uniqueEmail('ghost') })
        .expect(204);
      expect(ctx.mail.sent.length).toBe(before);

      await http().post('/auth/password/forgot').send({ email }).expect(204);
      const token = ctx.mail.tokenFor('reset-password', email);
      await http()
        .post('/auth/password/reset')
        .send({ token, password: 'BrandNewPass99' })
        .expect(204);

      await agent.post('/auth/refresh').expect(401);
      await http().post('/auth/login').send({ email, password: PASSWORD }).expect(401);
      await http().post('/auth/login').send({ email, password: 'BrandNewPass99' }).expect(200);
      await http()
        .post('/auth/password/reset')
        .send({ token, password: 'AnotherPass77' })
        .expect(401);
    });
  });
});
