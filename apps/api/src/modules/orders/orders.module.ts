import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

/** Order lifecycle: state machine, samples, production milestones, purchase orders, reorders. */
@Module({
  imports: [ChatModule],
  controllers: [OrdersController],
  providers: [OrdersService, PublicCodeService],
})
export class OrdersModule {}
