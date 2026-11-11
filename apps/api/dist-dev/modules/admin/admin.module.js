var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { SearchModule } from '../search/search.module.js';
import { AdminAuditService } from './admin-audit.service.js';
import { AdminCertificationsService } from './admin-certifications.service.js';
import { AdminOverviewService } from './admin-overview.service.js';
import { AdminUsersService } from './admin-users.service.js';
import { AdminController } from './admin.controller.js';
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    Module({
        imports: [ChatModule, OrdersModule, PaymentsModule, SearchModule],
        controllers: [AdminController],
        providers: [
            AdminOverviewService,
            AdminUsersService,
            AdminAuditService,
            AdminCertificationsService,
        ],
    })
], AdminModule);
export { AdminModule };
//# sourceMappingURL=admin.module.js.map