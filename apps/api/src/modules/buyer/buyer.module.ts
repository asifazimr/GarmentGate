import { Module } from '@nestjs/common';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { BuyerContextService } from './buyer-context.service.js';
import { BuyerController } from './buyer.controller.js';
import { BuyerDashboardService } from './dashboard.service.js';
import { ProductRequestsService } from './product-requests.service.js';
import { ShortlistsService } from './shortlists.service.js';

@Module({
  controllers: [BuyerController],
  providers: [
    BuyerContextService,
    ShortlistsService,
    ProductRequestsService,
    BuyerDashboardService,
    PublicCodeService,
  ],
})
export class BuyerModule {}
