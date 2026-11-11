import { type OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Job, Queue } from 'bullmq';
import type { Env } from '../../config/env.schema.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { PlansService } from './plans.service.js';
export declare const PLANS_QUEUE = "factory-plans";
export declare class PlansSweepProcessor extends MonitoredWorker {
    private readonly plans;
    private readonly logger;
    constructor(plans: PlansService);
    process(_job: Job): Promise<void>;
}
export declare class PlansSweepScheduler implements OnApplicationBootstrap {
    private readonly queue;
    private readonly config;
    constructor(queue: Queue, config: ConfigService<Env, true>);
    onApplicationBootstrap(): Promise<void>;
}
