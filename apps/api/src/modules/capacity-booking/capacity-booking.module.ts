import { Module } from '@nestjs/common';
import { ManufacturerModule } from '../manufacturer/manufacturer.module.js';
import { AdminClaimsController } from './admin-claims.controller.js';
import { ClaimsService } from './claims.service.js';
import { LinesService } from './lines.service.js';
import { ManufacturerCapacityController } from './manufacturer-capacity.controller.js';

/** Capacity booking: production lines, booking windows and supplier claims. */
@Module({
  imports: [ManufacturerModule],
  controllers: [ManufacturerCapacityController, AdminClaimsController],
  providers: [LinesService, ClaimsService],
})
export class CapacityBookingModule {}
