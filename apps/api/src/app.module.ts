import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { HttpThrottlerGuard } from './common/throttle/http-throttler.guard.js';
import { LoggingModule } from './common/logging/logging.module.js';
import { QueueModule } from './common/queue/queue.module.js';
import { AppConfigModule, type AppConfigService } from './config/config.module.js';
import { AuditModule } from './modules/audit/audit.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { BuyerModule } from './modules/buyer/buyer.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { ChatModule } from './modules/chat/chat.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { QcModule } from './modules/qc/qc.module.js';
import { ShippingModule } from './modules/shipping/shipping.module.js';
import { KycModule } from './modules/kyc/kyc.module.js';
import { MailModule } from './modules/mail/mail.module.js';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module.js';
import { MediaModule } from './modules/media/media.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { OnboardingModule } from './modules/onboarding/onboarding.module.js';
import { RfqModule } from './modules/rfq/rfq.module.js';
import { SearchModule } from './modules/search/search.module.js';
import { StorageModule } from './modules/storage/storage.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    AppConfigModule,
    LoggingModule,
    PrismaModule,
    QueueModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: AppConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL_MS', { infer: true }),
          limit: config.get('THROTTLE_LIMIT', { infer: true }),
        },
      ],
    }),
    AuditModule,
    MailModule,
    MediaModule,
    SearchModule,
    StorageModule,
    HealthModule,
    AuthModule,
    OnboardingModule,
    KycModule,
    NotificationsModule,
    ManufacturerModule,
    CatalogModule,
    BuyerModule,
    RfqModule,
    ChatModule,
    OrdersModule,
    PaymentsModule,
    QcModule,
    ShippingModule,
  ],
  // Global rate limit; auth routes tighten it with @Throttle.
  providers: [{ provide: APP_GUARD, useClass: HttpThrottlerGuard }],
})
export class AppModule {}
