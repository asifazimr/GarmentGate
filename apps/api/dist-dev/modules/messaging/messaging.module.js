var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEXTS_QUEUE } from '../notifications/texts.js';
import { AdminMessagingController, MyMessagingController, TwilioWebhookController, } from './messaging.controller.js';
import { MessagingService } from './messaging.service.js';
import { TEXT_PROVIDER, textProviderFactory } from './text-provider.js';
import { TextsProcessor } from './texts.processor.js';
let MessagingModule = class MessagingModule {
};
MessagingModule = __decorate([
    Module({
        imports: [BullModule.registerQueue({ name: TEXTS_QUEUE })],
        controllers: [MyMessagingController, TwilioWebhookController, AdminMessagingController],
        providers: [
            { provide: TEXT_PROVIDER, inject: [ConfigService], useFactory: textProviderFactory },
            MessagingService,
            TextsProcessor,
        ],
    })
], MessagingModule);
export { MessagingModule };
//# sourceMappingURL=messaging.module.js.map