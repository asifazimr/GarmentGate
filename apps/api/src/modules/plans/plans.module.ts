import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import {
  AdminPlansController,
  BuyerPlusController,
  FactoryPlanController,
} from './plans.controller.js';
import { PLANS_QUEUE, PlansSweepProcessor, PlansSweepScheduler } from './plans-sweep.processor.js';
import { PlansService } from './plans.service.js';
import { SubscriptionsService } from './subscriptions.service.js';

/**
 * Paid plans: factories' Free / Pro / Premium and buyers' GarmentGate Plus, as Stripe
 * subscriptions or staff grants, and their perks.
 */
@Module({
  imports: [PaymentsModule, BullModule.registerQueue({ name: PLANS_QUEUE })],
  controllers: [FactoryPlanController, BuyerPlusController, AdminPlansController],
  providers: [
    ManufacturerContextService,
    BuyerContextService,
    SubscriptionsService,
    PlansService,
    BuyerPlusService,
    PlansSweepProcessor,
    PlansSweepScheduler,
  ],
  exports: [PlansService, BuyerPlusService],
})
export class PlansModule {}
