import { Throttle } from '@nestjs/throttler';
const perMinute = (limit) => Throttle({ default: { limit, ttl: 60_000 } });
export const UploadThrottle = () => perMinute(20);
export const MessageThrottle = () => perMinute(30);
export const ThreadThrottle = () => perMinute(20);
export const PhoneCodeThrottle = () => Throttle({ default: { limit: 3, ttl: 10 * 60_000 } });
//# sourceMappingURL=limits.js.map