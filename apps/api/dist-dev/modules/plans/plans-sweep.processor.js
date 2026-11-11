var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlansSweepProcessor_1;
import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { PlansService } from './plans.service.js';
export const PLANS_QUEUE = 'factory-plans';
let PlansSweepProcessor = PlansSweepProcessor_1 = class PlansSweepProcessor extends MonitoredWorker {
    plans;
    logger = new Logger(PlansSweepProcessor_1.name);
    constructor(plans) {
        super();
        this.plans = plans;
    }
    async process(_job) {
        const { changed, announced } = await this.plans.sweep();
        if (changed + announced > 0)
            this.logger.log(`Plans changed: ${String(changed)}, RFQs announced: ${String(announced)}`);
    }
};
PlansSweepProcessor = PlansSweepProcessor_1 = __decorate([
    Processor(PLANS_QUEUE, { concurrency: 1 }),
    __metadata("design:paramtypes", [PlansService])
], PlansSweepProcessor);
export { PlansSweepProcessor };
let PlansSweepScheduler = class PlansSweepScheduler {
    queue;
    config;
    constructor(queue, config) {
        this.queue = queue;
        this.config = config;
    }
    async onApplicationBootstrap() {
        if (this.config.get('NODE_ENV', { infer: true }) === 'test')
            return;
        await this.queue.upsertJobScheduler('plans-sweep', { every: 5 * 60_000 }, { name: 'sweep', opts: { removeOnComplete: 100, removeOnFail: 500 } });
    }
};
PlansSweepScheduler = __decorate([
    Injectable(),
    __param(0, InjectQueue(PLANS_QUEUE)),
    __metadata("design:paramtypes", [Function, ConfigService])
], PlansSweepScheduler);
export { PlansSweepScheduler };
//# sourceMappingURL=plans-sweep.processor.js.map