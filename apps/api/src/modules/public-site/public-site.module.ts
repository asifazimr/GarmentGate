import { Module } from '@nestjs/common';
import { PaymentsModule } from '../payments/payments.module.js';
import { PlansModule } from '../plans/plans.module.js';
import { AdminLeadsController, PublicSiteController } from './public-site.controller.js';
import { PublicSiteService } from './public-site.service.js';

/** Data and forms for the public website. */
@Module({
  imports: [PaymentsModule, PlansModule],
  controllers: [PublicSiteController, AdminLeadsController],
  providers: [PublicSiteService],
})
export class PublicSiteModule {}
