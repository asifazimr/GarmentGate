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
var ExceptionsSweepProcessor_1;
import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { ExceptionsService } from './exceptions.service.js';
export const EXCEPTIONS_QUEUE = 'order-exceptions';
let ExceptionsSweepProcessor = ExceptionsSweepProcessor_1 = class ExceptionsSweepProcessor extends MonitoredWorker {
    exceptions;
    logger = new Logger(ExceptionsSweepProcessor_1.name);
    constructor(exceptions) {
        super();
        this.exceptions = exceptions;
    }
    async process(_job) {
        const alerted = await this.exceptions.sweep();
        if (alerted > 0)
            this.logger.log(`Delay alerts sent for ${String(alerted)} orders`);
    }
};
ExceptionsSweepProcessor = ExceptionsSweepProcessor_1 = __decorate([
    Processor(EXCEPTIONS_QUEUE, { concurrency: 1 }),
    __metadata("design:paramtypes", [ExceptionsService])
], ExceptionsSweepProcessor);
export { ExceptionsSweepProcessor };
let ExceptionsSweepScheduler = class ExceptionsSweepScheduler {
    queue;
    config;
    constructor(queue, config) {
        this.queue = queue;
        this.config = config;
    }
    async onApplicationBootstrap() {
        if (this.config.get('NODE_ENV', { infer: true }) === 'test')
            return;
        await this.queue.upsertJobScheduler('exceptions-sweep', { every: 60 * 60_000 }, { name: 'sweep', opts: { removeOnComplete: 100, removeOnFail: 500 } });
    }
};
ExceptionsSweepScheduler = __decorate([
    Injectable(),
    __param(0, InjectQueue(EXCEPTIONS_QUEUE)),
    __metadata("design:paramtypes", [Function, ConfigService])
], ExceptionsSweepScheduler);
export { ExceptionsSweepScheduler };
//# sourceMappingURL=exceptions-sweep.processor.js.map