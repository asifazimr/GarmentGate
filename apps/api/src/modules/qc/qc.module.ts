import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { TrustModule } from '../trust/trust.module.js';
import {
  AdminInspectionsController,
  InspectorController,
  OrderInspectionsController,
} from './inspections.controller.js';
import { InspectionsService } from './inspections.service.js';

/** Quality control: inspection booking, inspectors, AQL reports. */
@Module({
  imports: [AuthModule, ChatModule, OrdersModule, TrustModule],
  controllers: [OrderInspectionsController, InspectorController, AdminInspectionsController],
  providers: [InspectionsService],
})
export class QcModule {}
