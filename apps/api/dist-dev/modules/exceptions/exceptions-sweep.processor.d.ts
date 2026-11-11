import { type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Job, Queue } from 'bullmq';
import type { Env } from '../../config/env.schema.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { ExceptionsService } from './exceptions.service.js';
export declare const EXCEPTIONS_QUEUE = "order-exceptions";
export declare class ExceptionsSweepProcessor extends MonitoredWorker {
    private readonly exceptions;
    private readonly logger;
    constructor(exceptions: ExceptionsService);
    process(_job: Job): Promise<void>;
}
export declare class ExceptionsSweepScheduler implements OnApplicationBootstrap {
    private readonly queue;
    private readonly config;
    constructor(queue: Queue, config: ConfigService<Env, true>);
    onApplicationBootstrap(): Promise<void>;
}
