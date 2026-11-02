import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { DisputesService } from './disputes.service.js';
import { PerformanceService } from './performance.service.js';
import { ReviewsService } from './reviews.service.js';
import {
  AdminDisputesController,
  OrderTrustController,
  PublicReviewsController,
} from './trust.controller.js';

/** Trust: two-way reviews, the factory performance score, and disputes. */
@Module({
  imports: [ChatModule, OrdersModule, PaymentsModule],
  controllers: [OrderTrustController, PublicReviewsController, AdminDisputesController],
  providers: [ReviewsService, PerformanceService, DisputesService],
  exports: [PerformanceService],
})
export class TrustModule {}
