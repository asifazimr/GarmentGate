import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { ShippingController } from './shipping.controller.js';
import { ShippingService } from './shipping.service.js';

/** Shipment booking, uploaded papers and GarmentGate-issued shipping documents. */
@Module({
  imports: [ChatModule, OrdersModule],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
