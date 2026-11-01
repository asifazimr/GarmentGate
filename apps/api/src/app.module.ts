import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggingModule } from './common/logging/logging.module.js';
import { AppConfigModule, type AppConfigService } from './config/config.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    AppConfigModule,
    LoggingModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: AppConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL_MS', { infer: true }),
          limit: config.get('THROTTLE_LIMIT', { infer: true }),
        },
      ],
    }),
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
