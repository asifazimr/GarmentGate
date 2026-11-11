var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { MailProcessor } from './mail.processor.js';
import { MAIL_QUEUE, MailService } from './mail.service.js';
import { MailTransport } from './mail.transport.js';
let MailModule = class MailModule {
};
MailModule = __decorate([
    Global(),
    Module({
        imports: [BullModule.registerQueue({ name: MAIL_QUEUE })],
        providers: [MailService, MailTransport, MailProcessor],
        exports: [MailService],
    })
], MailModule);
export { MailModule };
//# sourceMappingURL=mail.module.js.map