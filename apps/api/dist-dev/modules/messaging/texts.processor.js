var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Processor } from '@nestjs/bullmq';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { TEXTS_QUEUE } from '../notifications/texts.js';
import { MessagingService } from './messaging.service.js';
let TextsProcessor = class TextsProcessor extends MonitoredWorker {
    messaging;
    constructor(messaging) {
        super();
        this.messaging = messaging;
    }
    async process(job) {
        await this.messaging.deliver(job.data);
    }
};
TextsProcessor = __decorate([
    Processor(TEXTS_QUEUE, { concurrency: 4 }),
    __metadata("design:paramtypes", [MessagingService])
], TextsProcessor);
export { TextsProcessor };
//# sourceMappingURL=texts.processor.js.map