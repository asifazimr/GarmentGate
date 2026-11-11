var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { TrustModule } from '../trust/trust.module.js';
import { AdminInspectionsController, InspectorController, OrderInspectionsController, } from './inspections.controller.js';
import { GigAdminController, GigApplyController, GigInspectorController, } from './gig.controller.js';
import { GigService } from './gig.service.js';
import { InspectionsService } from './inspections.service.js';
let QcModule = class QcModule {
};
QcModule = __decorate([
    Module({
        imports: [AuthModule, ChatModule, OrdersModule, PaymentsModule, TrustModule],
        controllers: [
            OrderInspectionsController,
            InspectorController,
            AdminInspectionsController,
            GigApplyController,
            GigInspectorController,
            GigAdminController,
        ],
        providers: [InspectionsService, GigService],
    })
], QcModule);
export { QcModule };
//# sourceMappingURL=qc.module.js.map