import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { AdminContractsController, ContractsController } from './contracts.controller.js';
import { ContractsService } from './contracts.service.js';

/** Supply contracts with call-offs, and the merchandiser who looks after each buyer. */
@Module({
  imports: [ChatModule, OrdersModule],
  controllers: [ContractsController, AdminContractsController],
  providers: [ContractsService, PublicCodeService],
  exports: [ContractsService],
})
export class ContractsModule {}
