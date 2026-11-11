import { type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Job, Queue } from 'bullmq';
import type { Env } from '../../config/env.schema.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';
export declare const CAPACITY_QUEUE = "capacity-booking";
export declare class BookingSweepProcessor extends MonitoredWorker {
    private readonly bookings;
    private readonly partnerships;
    private readonly logger;
    constructor(bookings: BookingsService, partnerships: PartnershipsService);
    process(_job: Job): Promise<void>;
}
export declare class BookingSweepScheduler implements OnApplicationBootstrap {
    private readonly queue;
    private readonly config;
    constructor(queue: Queue, config: ConfigService<Env, true>);
    onApplicationBootstrap(): Promise<void>;
}
