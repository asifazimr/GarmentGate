import { Controller, Get, type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { type App } from 'supertest/types.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { HealthResponseSchema } from '@garmentgate/shared';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';

/** A plain route that inherits the global throttler guard. */
@Controller('throttle-probe')
class ThrottleProbeController {
  @Get()
  probe(): { ok: true } {
    return { ok: true };
  }
}

describe('Health (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ThrottleProbeController],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health returns a valid liveness payload', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);
    expect(HealthResponseSchema.parse(res.body).status).toBe('ok');
  });

  it('sets security headers via helmet', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('allows CORS for configured origins only', async () => {
    const allowed = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'http://localhost:3000');
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:3000');

    const denied = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'https://evil.example');
    expect(denied.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('does not throttle /health', async () => {
    for (let i = 0; i < 8; i++) {
      await request(app.getHttpServer()).get('/health').expect(200);
    }
  });

  it('throttles other routes past THROTTLE_LIMIT', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await request(app.getHttpServer()).get('/throttle-probe');
      statuses.push(res.status);
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  });

  it('serves the OpenAPI document at /docs/json', async () => {
    const res = await request(app.getHttpServer()).get('/docs/json').expect(200);
    const body = res.body as { info: { title: string }; paths: Record<string, unknown> };
    expect(body.info.title).toBe('GarmentGate API');
    expect(body.paths).toHaveProperty('/health');
  });
});
