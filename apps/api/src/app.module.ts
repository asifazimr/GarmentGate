import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggingModule } from './common/logging/logging.module.js';
import { QueueModule } from './common/queue/queue.module.js';
import { AppConfigModule, type AppConfigService } from './config/config.module.js';
import { AuditModule } from './modules/audit/audit.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { BuyerModule } from './modules/buyer/buyer.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
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
  ],
  // Global rate limit; auth routes tighten it with @Throttle.
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
