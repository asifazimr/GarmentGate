import {
  type PublicDirectory,
  PublicDirectorySchema,
  type PublicPricing,
  PublicPricingSchema,
  type PublicStats,
  PublicStatsSchema,
} from '@garmentgate/shared';
import { cacheLife } from 'next/cache';
import { z } from 'zod';

/**
 * Live figures refresh every few minutes. A failed fetch (API down, e.g. during a build) is
 * retried after a minute: the shortest profile that still lets pages prerender (expire ≥ 5 min).
 */
const LIVE = { stale: 300, revalidate: 600, expire: 86_400 };
const RETRY = { stale: 30, revalidate: 60, expire: 300 };

/** Server-side only: the API's internal address (the browser goes through /api). */
const API_URL = process.env.API_URL ?? 'http://localhost:4000';

async function get<S extends z.ZodType>(path: string, schema: S): Promise<z.infer<S> | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(4_000) });
    if (!res.ok) return null;
    return schema.parse(await res.json());
  } catch {
    // The API is down or unreachable (e.g. during a build): pages render without live figures.
    return null;
  }
}

/** Live network counts for the marketing pages, refreshed every few minutes. */
export async function publicStats(): Promise<PublicStats | null> {
  'use cache';
  const stats = await get('/public/stats', PublicStatsSchema);
  cacheLife(stats ? LIVE : RETRY);
  return stats;
}

/** The live price list (staff settings), so the website never shows stale prices. */
export async function publicPricing(): Promise<PublicPricing | null> {
  'use cache';
  const pricing = await get('/public/pricing', PublicPricingSchema);
  cacheLife(pricing ? LIVE : RETRY);
  return pricing;
}

/** Categories and sourcing countries with live totals (no identities). */
export async function publicDirectory(): Promise<PublicDirectory | null> {
  'use cache';
  const directory = await get('/public/directory', PublicDirectorySchema);
  cacheLife(directory ? LIVE : RETRY);
  return directory;
}

/** Message arrays (steps, points, legal sections) read with `t.raw`, checked at the edge. */
export const stringList = z.array(z.string());
export const sectionList = z.array(z.tuple([z.string(), z.string()]));

/** The copyright year, cached so prerendered pages stay valid. */
// eslint-disable-next-line @typescript-eslint/require-await -- 'use cache' functions must be async
export async function currentYear(): Promise<number> {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}
