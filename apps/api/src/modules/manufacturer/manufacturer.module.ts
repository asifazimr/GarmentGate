import { Module } from '@nestjs/common';
import { PlansModule } from '../plans/plans.module.js';
import { CapacityService } from './capacity.service.js';
import { ManufacturerContextService } from './manufacturer-context.service.js';
import { ManufacturerController } from './manufacturer.controller.js';
import { ManufacturerProductsService } from './products.service.js';
import { ManufacturerProfileService } from './profile.service.js';

@Module({
  imports: [PlansModule],
  controllers: [ManufacturerController],
  providers: [
    ManufacturerContextService,
    ManufacturerProfileService,
    ManufacturerProductsService,
    CapacityService,
  ],
  exports: [ManufacturerContextService],
})
export class ManufacturerModule {}
