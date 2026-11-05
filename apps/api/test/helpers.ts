import { type INestApplication } from '@nestjs/common';
import { LedgerService } from '../src/modules/payments/ledger.service.js';
import { Test, type TestingModuleBuilder } from '@nestjs/testing';
import { hash } from '@node-rs/argon2';
import type { EmailTemplateName, EmailTemplates } from '@garmentgate/emails';
import request from 'supertest';
import { expect } from 'vitest';
import type { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { MailService } from '../src/modules/mail/mail.service.js';
import { OrdersService } from '../src/modules/orders/orders.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

export interface SentEmail {
  template: EmailTemplateName;
  to: string;
  props: EmailTemplates[EmailTemplateName];
}

/** Captures emails instead of queueing them, so tests can follow the links. */
export class FakeMailService {
  readonly sent: SentEmail[] = [];

  send<K extends EmailTemplateName>(
    template: K,
    to: string,
    props: EmailTemplates[K],
  ): Promise<void> {
    this.sent.push({ template, to, props });
    return Promise.resolve();
  }

  /** Token from the most recent email of this template to this address. */
  tokenFor(template: 'verify-email' | 'reset-password', to: string): string {
    const email = this.sent.filter((e) => e.template === template && e.to === to).at(-1);
    if (!email) throw new Error(`No ${template} email sent to ${to}`);
    const props = email.props as { verifyUrl?: string; resetUrl?: string };
    const url = new URL(props.verifyUrl ?? props.resetUrl ?? '');
    const token = url.searchParams.get('token');
    if (!token) throw new Error('No token in email link');
    return token;
  }
}

export interface TestContext {
  app: INestApplication<App>;
  mail: FakeMailService;
  prisma: PrismaService;
}

export async function createTestApp(
  override: (builder: TestingModuleBuilder) => TestingModuleBuilder = (b) => b,
): Promise<TestContext> {
  const mail = new FakeMailService();
  const moduleRef = await override(
    Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(MailService)
      .useValue(mail),
  ).compile();
  const app = moduleRef.createNestApplication<INestApplication<App>>({ rawBody: true });
  configureApp(app);
  await app.init();
  return { app, mail, prisma: app.get(PrismaService) };
}

let ipCounter = 0;
/**
 * A cookie-keeping client with its own client IP. The API trusts X-Forwarded-For from
 * loopback (as behind the web proxy), so per-IP rate limits apply per test client.
 */
export function client(app: INestApplication<App>) {
  ipCounter += 1;
  return request
    .agent(app.getHttpServer())
    .set(
      'X-Forwarded-For',
      `10.${(ipCounter >> 16) & 255}.${(ipCounter >> 8) & 255}.${ipCounter & 255}`,
    );
}

let counter = 0;
export function uniqueEmail(prefix = 'user'): string {
  counter += 1;
  return `${prefix}.${Date.now()}.${counter}@e2e.example`;
}

export const PASSWORD = 'CorrectHorse42';

/** Registers through the API and returns an agent that keeps the auth cookies. */
export async function registerAgent(
  app: INestApplication<App>,
  role: 'BUYER' | 'MANUFACTURER',
  email = uniqueEmail(role.toLowerCase()),
) {
  const agent = client(app);
  await agent
    .post('/auth/register')
    .send({
      role,
      firstName: 'Test',
      lastName: 'User',
      email,
      password: PASSWORD,
      acceptTerms: true,
    })
    .expect(201);
  return { agent, email };
}

export async function createAdmin(prisma: PrismaService) {
  const email = uniqueEmail('admin');
  await prisma.user.create({
    data: {
      email,
      passwordHash: await hash(PASSWORD),
      role: 'ADMIN',
      firstName: 'Ada',
      lastName: 'Admin',
      emailVerifiedAt: new Date(),
    },
  });
  return email;
}

/** Splits Set-Cookie headers into a name → value map. */
export function cookiesFrom(res: { headers: Record<string, unknown> }): Record<string, string> {
  const raw = res.headers['set-cookie'];
  const list = Array.isArray(raw) ? (raw as string[]) : typeof raw === 'string' ? [raw] : [];
  return Object.fromEntries(
    list.map((c) => {
      const [pair = ''] = c.split(';');
      const index = pair.indexOf('=');
      return [pair.slice(0, index), pair.slice(index + 1)];
    }),
  );
}

/** Step 1 of onboarding: valid company details. */
export const companyInfo = (country: string) => ({
  legalName: 'Test Knit Ltd.',
  country,
  city: 'Gazipur',
  addressLine1: 'Plot 1',
  registrationNumber: 'REG-1',
  website: '',
  yearEstablished: '2010',
});

/** Presign → POST the bytes to MinIO → attach, exactly as the browser does. */
export async function uploadDocument(agent: ReturnType<typeof client>, type: string) {
  const pdf = Buffer.from('%PDF-1.4\n% test document\n');
  const presign = await agent
    .post('/kyc/uploads')
    .send({
      purpose: 'KYC_DOCUMENT',
      fileName: `${type}.pdf`,
      contentType: 'application/pdf',
      sizeBytes: pdf.length,
    })
    .expect(201);
  const { fileId, url, fields } = presign.body as {
    fileId: string;
    url: string;
    fields: Record<string, string>;
  };

  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  form.append('file', new Blob([pdf], { type: 'application/pdf' }), `${type}.pdf`);
  const upload = await fetch(url, { method: 'POST', body: form });
  expect(upload.status).toBeLessThan(300);

  await agent.post('/kyc/documents').send({ fileId, type }).expect(204);
  return fileId;
}

/**
 * A succeeded buyer payment with its escrow posting, as if staff had confirmed a transfer. Keeps
 * the ledger's "cash matches payments" check true for suites that need a paid order quickly.
 */
export async function recordPaidPayment(
  ctx: TestContext,
  input: {
    orderId: string;
    buyerCompanyId: string;
    purpose: 'DEPOSIT' | 'BALANCE';
    amountMinor: bigint;
  },
): Promise<void> {
  const ledger = ctx.app.get(LedgerService);
  await ctx.prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        orderId: input.orderId,
        direction: 'INBOUND',
        purpose: input.purpose,
        amountMinor: input.amountMinor,
        currency: 'USD',
        method: 'BANK_TRANSFER',
        provider: 'manual',
        status: 'SUCCEEDED',
        paidAt: new Date(),
      },
    });
    await ledger.post(tx, {
      kind: 'DEPOSIT',
      key: `test-payment:${payment.id}`,
      orderId: input.orderId,
      paymentId: payment.id,
      currency: 'USD',
      rates: { USD: '1' },
      description: `Test ${input.purpose.toLowerCase()}`,
      lines: [
        {
          account: 'PLATFORM_CASH',
          companyId: null,
          direction: 'DEBIT',
          amountMinor: input.amountMinor,
        },
        {
          account: 'BUYER_ESCROW',
          companyId: input.buyerCompanyId,
          direction: 'CREDIT',
          amountMinor: input.amountMinor,
        },
      ],
    });
  });
}

/**
 * Ships an order the way a GarmentGate departure does (TrackingService → OrdersService.advance),
 * for tests about what happens after shipping. Manual SHIPPED transitions are refused.
 */
export async function shipThroughGarmentGate(ctx: TestContext, code: string): Promise<void> {
  const order = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
  await ctx.app.get(OrdersService).advance(order.id, 'SHIPPED', 'Left the hub (test)');
  const after = await ctx.prisma.order.findUniqueOrThrow({ where: { code } });
  expect(after.status).toBe('SHIPPED');
}
