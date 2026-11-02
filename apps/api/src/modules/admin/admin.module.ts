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

/** The admin panel's own API: overview, users, audit log, certificates and order overrides. */
@Module({
  imports: [ChatModule, OrdersModule, PaymentsModule, SearchModule],
  controllers: [AdminController],
  providers: [
    AdminOverviewService,
    AdminUsersService,
    AdminAuditService,
    AdminCertificationsService,
  ],
})
export class AdminModule {}
