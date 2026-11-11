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
var BookingSweepProcessor_1;
import { InjectQueue, Processor } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';
export const CAPACITY_QUEUE = 'capacity-booking';
let BookingSweepProcessor = BookingSweepProcessor_1 = class BookingSweepProcessor extends MonitoredWorker {
    bookings;
    partnerships;
    logger = new Logger(BookingSweepProcessor_1.name);
    constructor(bookings, partnerships) {
        super();
        this.bookings = bookings;
        this.partnerships = partnerships;
    }
    async process(_job) {
        const result = await this.bookings.sweep();
        const ended = await this.partnerships.endFinished();
        if (result.expired + result.reminded + result.linked + ended > 0)
            this.logger.log(`Capacity sweep: ${String(result.reminded)} reminded, ${String(result.expired)} expired, ${String(result.linked)} linked, ${String(ended)} partnerships ended`);
    }
};
BookingSweepProcessor = BookingSweepProcessor_1 = __decorate([
    Processor(CAPACITY_QUEUE, { concurrency: 1 }),
    __metadata("design:paramtypes", [BookingsService,
        PartnershipsService])
], BookingSweepProcessor);
export { BookingSweepProcessor };
let BookingSweepScheduler = class BookingSweepScheduler {
    queue;
    config;
    constructor(queue, config) {
        this.queue = queue;
        this.config = config;
    }
    async onApplicationBootstrap() {
        if (this.config.get('NODE_ENV', { infer: true }) === 'test')
            return;
        await this.queue.upsertJobScheduler('capacity-sweep', { every: 60_000 }, { name: 'sweep', opts: { removeOnComplete: 100, removeOnFail: 500 } });
    }
};
BookingSweepScheduler = __decorate([
    Injectable(),
    __param(0, InjectQueue(CAPACITY_QUEUE)),
    __metadata("design:paramtypes", [Function, ConfigService])
], BookingSweepScheduler);
export { BookingSweepScheduler };
//# sourceMappingURL=booking-sweep.processor.js.map