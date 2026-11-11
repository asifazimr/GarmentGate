var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let RfqModule = class RfqModule {
};
RfqModule = __decorate([
    Module({
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
], RfqModule);
export { RfqModule };
//# sourceMappingURL=rfq.module.js.map