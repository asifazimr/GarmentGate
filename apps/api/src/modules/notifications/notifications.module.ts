import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { TEXTS_QUEUE } from './texts.js';
import { NotificationsController } from './notifications.controller.js';
import { NotificationsService } from './notifications.service.js';
import { Notifier } from './notifier.service.js';
import { RealtimeService } from './realtime.service.js';

/** Notifications for every feature: in-app, real-time, email and texts (global: any module can notify). */
@Global()
@Module({
  imports: [BullModule.registerQueue({ name: TEXTS_QUEUE })],
  controllers: [NotificationsController],
  providers: [NotificationsService, Notifier, RealtimeService],
  exports: [Notifier, RealtimeService],
})
export class NotificationsModule {}
