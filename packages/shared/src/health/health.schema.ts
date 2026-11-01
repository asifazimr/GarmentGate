import { z } from 'zod';

export const HealthStatusSchema = z.enum(['ok', 'error']);
export type HealthStatus = z.infer<typeof HealthStatusSchema>;

/** Liveness response from `GET /health`. */
export const HealthResponseSchema = z.object({
  status: HealthStatusSchema,
  service: z.string(),
  version: z.string(),
  uptimeSeconds: z.number().nonnegative(),
  timestamp: z.iso.datetime(),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
