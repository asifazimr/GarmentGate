import { describe, expect, it } from 'vitest';
import { HealthResponseSchema } from './health.schema.js';

describe('HealthResponseSchema', () => {
  it('accepts a valid liveness payload', () => {
    const payload = {
      status: 'ok',
      service: 'api',
      version: '0.0.1',
      uptimeSeconds: 12.5,
      timestamp: new Date().toISOString(),
    };
    expect(HealthResponseSchema.parse(payload)).toEqual(payload);
  });

  it('rejects an unknown status', () => {
    const result = HealthResponseSchema.safeParse({
      status: 'degraded',
      service: 'api',
      version: '0.0.1',
      uptimeSeconds: 1,
      timestamp: new Date().toISOString(),
    });
    expect(result.success).toBe(false);
  });
});
