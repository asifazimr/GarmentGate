import { Module } from '@nestjs/common';
import { PaymentsModule } from '../payments/payments.module.js';
import { KpisController } from './kpis.controller.js';
import { KpisService } from './kpis.service.js';

/** Phase 1 KPIs and unit economics for staff (business model: KPIs and roadmap gates). */
@Module({
  imports: [PaymentsModule],
  controllers: [KpisController],
  providers: [KpisService],
})
export class KpisModule {}
