var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { BuyerContextService } from './buyer-context.service.js';
import { BuyerController } from './buyer.controller.js';
import { BuyerDashboardService } from './dashboard.service.js';
import { ProductRequestsService } from './product-requests.service.js';
import { ShortlistsService } from './shortlists.service.js';
let BuyerModule = class BuyerModule {
};
BuyerModule = __decorate([
    Module({
        controllers: [BuyerController],
        providers: [
            BuyerContextService,
            ShortlistsService,
            ProductRequestsService,
            BuyerDashboardService,
            PublicCodeService,
        ],
    })
], BuyerModule);
export { BuyerModule };
//# sourceMappingURL=buyer.module.js.map