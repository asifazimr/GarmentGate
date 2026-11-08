import { Module } from '@nestjs/common';
import { PlansModule } from '../plans/plans.module.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { AdminMarginsController } from './admin-margins.controller.js';
import { AdminMarginsService } from './admin-margins.service.js';
import { BuyerRfqsController } from './buyer-rfqs.controller.js';
import { BuyerRfqsService } from './buyer-rfqs.service.js';
import { ManufacturerRfqsController } from './manufacturer-rfqs.controller.js';
import { ManufacturerRfqsService } from './manufacturer-rfqs.service.js';
import { RfqFilesService } from './rfq-files.service.js';
import { RfqNotifier } from './rfq-notifier.service.js';

/** RFQs → quotes → accepted quote (draft order), with GarmentGate's margin in between. */
@Module({
  imports: [PlansModule],
  controllers: [BuyerRfqsController, ManufacturerRfqsController, AdminMarginsController],
  providers: [
    BuyerContextService,
    ManufacturerContextService,
    PublicCodeService,
    RfqFilesService,
    RfqNotifier,
    BuyerRfqsService,
    ManufacturerRfqsService,
    AdminMarginsService,
  ],
  exports: [RfqFilesService],
})
export class RfqModule {}
