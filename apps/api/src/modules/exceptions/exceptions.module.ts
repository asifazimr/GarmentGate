import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { ExceptionsController } from './exceptions.controller.js';
import {
  EXCEPTIONS_QUEUE,
  ExceptionsSweepProcessor,
  ExceptionsSweepScheduler,
} from './exceptions-sweep.processor.js';
import { ExceptionsService } from './exceptions.service.js';

/** The exception flow: late orders, failed finals, rejected samples, factory replacement. */
@Module({
  imports: [OrdersModule, PaymentsModule, BullModule.registerQueue({ name: EXCEPTIONS_QUEUE })],
  controllers: [ExceptionsController],
  providers: [ExceptionsService, ExceptionsSweepProcessor, ExceptionsSweepScheduler],
})
export class ExceptionsModule {}
