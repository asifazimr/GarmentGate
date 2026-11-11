import type { Event } from '@sentry/nestjs';
export declare function scrubEvent<T extends Event>(event: T): T;
