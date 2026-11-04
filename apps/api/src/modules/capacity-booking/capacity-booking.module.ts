import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { ManufacturerModule } from '../manufacturer/manufacturer.module.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrdersModule } from '../orders/orders.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { AdminBookingsController } from './admin-bookings.controller.js';
import { AdminClaimsController } from './admin-claims.controller.js';
import { BookingSearchService } from './booking-search.service.js';
import { BookingSettingsService } from './booking-settings.service.js';
import {
  BookingSweepProcessor,
  BookingSweepScheduler,
  CAPACITY_QUEUE,
} from './booking-sweep.processor.js';
import { BookingsService } from './bookings.service.js';
import { BuyerCapacityController } from './buyer-capacity.controller.js';
import { ClaimsService } from './claims.service.js';
import { LinesService } from './lines.service.js';
import { ManufacturerBookingsController } from './manufacturer-bookings.controller.js';
import { ManufacturerCapacityController } from './manufacturer-capacity.controller.js';
import { PartnershipsService } from './partnerships.service.js';

/**
 * Capacity booking: production lines and windows, supplier claims, and bookings (search,
 * holds, deposits in escrow, cancellation, expiry, conversion, partnerships).
 */
@Module({
  imports: [
    ManufacturerModule,
    OrdersModule,
    PaymentsModule,
    BullModule.registerQueue({ name: CAPACITY_QUEUE }),
  ],
  controllers: [
    ManufacturerCapacityController,
    ManufacturerBookingsController,
    BuyerCapacityController,
    AdminClaimsController,
    AdminBookingsController,
  ],
  providers: [
    LinesService,
    ClaimsService,
    BookingSettingsService,
    BookingSearchService,
    BookingsService,
    PartnershipsService,
    BuyerContextService,
    PublicCodeService,
    BookingSweepProcessor,
    BookingSweepScheduler,
  ],
  exports: [BookingsService],
})
export class CapacityBookingModule {}
