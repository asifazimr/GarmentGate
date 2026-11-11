var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { ChatModule } from '../chat/chat.module.js';
import { MediaModule } from '../media/media.module.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { AdminLogisticsController } from './admin-logistics.controller.js';
import { BuyerLogisticsController } from './buyer-logistics.controller.js';
import { ConsolidationService } from './consolidation.service.js';
import { HubFlowService } from './hub-flow.service.js';
import { OrderShippingController } from './order-shipping.controller.js';
import { PartnerController } from './partner.controller.js';
import { PartnerPortalService } from './partner-portal.service.js';
import { TrackingService } from './tracking.service.js';
import { ShipmentsService } from './shipments.service.js';
import { ClaimsService } from './claims.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsAdminService } from './logistics-admin.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { OrderLogisticsService } from './order-logistics.service.js';
import { ManualRateProvider } from './providers/manual.provider.js';
import { RATE_PROVIDERS } from './rate-provider.js';
let LogisticsModule = class LogisticsModule {
};
LogisticsModule = __decorate([
    Module({
        imports: [AuthModule, ChatModule, MediaModule, OrdersModule, PaymentsModule],
        controllers: [
            AdminLogisticsController,
            BuyerLogisticsController,
            OrderShippingController,
            PartnerController,
        ],
        providers: [
            ClaimsService,
            LogisticsAdminService,
            LogisticsSettingsService,
            FreightQuotesService,
            OrderLogisticsService,
            HubFlowService,
            ConsolidationService,
            ShipmentsService,
            TrackingService,
            PartnerPortalService,
            PublicCodeService,
            ManualRateProvider,
            {
                provide: RATE_PROVIDERS,
                inject: [ManualRateProvider],
                useFactory: (manual) => [manual],
            },
        ],
        exports: [FreightQuotesService, LogisticsSettingsService],
    })
], LogisticsModule);
export { LogisticsModule };
//# sourceMappingURL=logistics.module.js.map