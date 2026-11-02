import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrderHooks } from './order-hooks.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

/** Order lifecycle: state machine, samples, production milestones, purchase orders, reorders. */
@Module({
  imports: [ChatModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderHooks, PublicCodeService],
  exports: [OrdersService, OrderHooks],
})
export class OrdersModule {}
