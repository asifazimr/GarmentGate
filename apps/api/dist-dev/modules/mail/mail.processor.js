var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailProcessor_1;
import { Processor } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { renderEmail } from '@garmentgate/emails';
import { MAIL_QUEUE } from './mail.service.js';
import { MailTransport } from './mail.transport.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
let MailProcessor = MailProcessor_1 = class MailProcessor extends MonitoredWorker {
    transport;
    logger = new Logger(MailProcessor_1.name);
    constructor(transport) {
        super();
        this.transport = transport;
    }
    async process(job) {
        const { template, to, props } = job.data;
        const email = await renderEmail(template, props);
        await this.transport.send(to, email);
        this.logger.log(`Sent ${template} email (job ${job.id ?? '?'})`);
    }
};
MailProcessor = MailProcessor_1 = __decorate([
    Processor(MAIL_QUEUE),
    __metadata("design:paramtypes", [MailTransport])
], MailProcessor);
export { MailProcessor };
//# sourceMappingURL=mail.processor.js.map