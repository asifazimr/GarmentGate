import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../config/env.schema.js';
import { ChatModule } from '../chat/chat.module.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import {
  AdminMonitoringController,
  FactoryCamerasController,
  OrderMonitoringController,
} from './monitoring.controller.js';
import { MonitoringService } from './monitoring.service.js';
import { DevVideoProvider, VIDEO_PROVIDER, videoProviderFactory } from './video-provider.js';

/** Remote video monitoring: factory cameras, staff review, per-order live and recorded video. */
@Module({
  imports: [ChatModule, OrdersModule, PaymentsModule],
  controllers: [FactoryCamerasController, OrderMonitoringController, AdminMonitoringController],
  providers: [
    ManufacturerContextService,
    MonitoringService,
    {
      provide: VIDEO_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => {
        const provider = videoProviderFactory(config);
        if (provider instanceof DevVideoProvider)
          new Logger('Monitoring').warn(
            'CLOUDFLARE_STREAM_* not set: cameras use a fake ingest and a demo stream',
          );
        return provider;
      },
    },
  ],
  exports: [MonitoringService],
})
export class MonitoringModule {}
