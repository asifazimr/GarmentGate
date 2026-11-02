import { Throttle } from '@nestjs/throttler';

/**
 * Per-route limits on top of the global one (THROTTLE_LIMIT per THROTTLE_TTL_MS). Signed-in
 * requests count per user, others per IP (see HttpThrottlerGuard).
 */
const perMinute = (limit: number) => Throttle({ default: { limit, ttl: 60_000 } });

/** Presigned uploads: each reserves a file and a storage URL. */
export const UploadThrottle = () => perMinute(20);
/** Chat messages: generous for people, tight for scripts. */
export const MessageThrottle = () => perMinute(30);
/** Opening (creating) threads. */
export const ThreadThrottle = () => perMinute(20);
