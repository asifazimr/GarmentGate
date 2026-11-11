var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PlansModule } from '../plans/plans.module.js';
import { CapacityService } from './capacity.service.js';
import { ManufacturerContextService } from './manufacturer-context.service.js';
import { ManufacturerController } from './manufacturer.controller.js';
import { ManufacturerProductsService } from './products.service.js';
import { ManufacturerProfileService } from './profile.service.js';
let ManufacturerModule = class ManufacturerModule {
};
ManufacturerModule = __decorate([
    Module({
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
], ManufacturerModule);
export { ManufacturerModule };
//# sourceMappingURL=manufacturer.module.js.map