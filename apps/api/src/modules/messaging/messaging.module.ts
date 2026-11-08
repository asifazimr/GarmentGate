import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEXTS_QUEUE } from '../notifications/texts.js';
import {
  AdminMessagingController,
  MyMessagingController,
  TwilioWebhookController,
} from './messaging.controller.js';
import { MessagingService } from './messaging.service.js';
import { TEXT_PROVIDER, textProviderFactory } from './text-provider.js';
import { TextsProcessor } from './texts.processor.js';

/** Texts (SMS / WhatsApp) through Twilio, or the console without credentials. */
@Module({
  imports: [BullModule.registerQueue({ name: TEXTS_QUEUE })],
  controllers: [MyMessagingController, TwilioWebhookController, AdminMessagingController],
  providers: [
    { provide: TEXT_PROVIDER, inject: [ConfigService], useFactory: textProviderFactory },
    MessagingService,
    TextsProcessor,
  ],
})
export class MessagingModule {}
