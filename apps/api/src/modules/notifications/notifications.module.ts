import { Global, Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller.js';
import { NotificationsService } from './notifications.service.js';
import { Notifier } from './notifier.service.js';
import { RealtimeService } from './realtime.service.js';

/** Notifications for every feature: in-app, real-time and email (global: any module can notify). */
@Global()
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, Notifier, RealtimeService],
  exports: [Notifier, RealtimeService],
})
export class NotificationsModule {}
