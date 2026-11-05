import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
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
import { TrustModule } from './modules/trust/trust.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { KycModule } from './modules/kyc/kyc.module.js';
import { MailModule } from './modules/mail/mail.module.js';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module.js';
import { CapacityBookingModule } from './modules/capacity-booking/capacity-booking.module.js';
import { LogisticsModule } from './modules/logistics/logistics.module.js';
import { MediaModule } from './modules/media/media.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { OnboardingModule } from './modules/onboarding/onboarding.module.js';
import { RfqModule } from './modules/rfq/rfq.module.js';
import { SearchModule } from './modules/search/search.module.js';
import { StorageModule } from './modules/storage/storage.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    // Error monitoring (no-op without SENTRY_DSN); initialised in instrument.ts.
    SentryModule.forRoot(),
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
    CapacityBookingModule,
    LogisticsModule,
    CatalogModule,
    BuyerModule,
    RfqModule,
    ChatModule,
    OrdersModule,
    PaymentsModule,
    QcModule,
    TrustModule,
    AdminModule,
  ],
  // Unexpected errors go to Sentry; HTTP errors the API throws on purpose (4xx) don't.
  providers: [{ provide: APP_FILTER, useClass: SentryGlobalFilter }],
})
export class AppModule {}
