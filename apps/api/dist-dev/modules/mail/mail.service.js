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
var MailService_1;
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
export const MAIL_QUEUE = 'mail';
let MailService = MailService_1 = class MailService {
    queue;
    logger = new Logger(MailService_1.name);
    constructor(queue) {
        this.queue = queue;
    }
    async send(template, to, props) {
        try {
            await this.queue.add(template, { template, to, props }, {
                attempts: 5,
                backoff: { type: 'exponential', delay: 5_000 },
                removeOnComplete: 1_000,
                removeOnFail: 5_000,
            });
        }
        catch (error) {
            this.logger.error({ err: error, template }, 'Failed to enqueue email');
        }
    }
};
MailService = MailService_1 = __decorate([
    Injectable(),
    __param(0, InjectQueue(MAIL_QUEUE)),
    __metadata("design:paramtypes", [Function])
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map