var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AdminKycController } from './admin-kyc.controller.js';
import { AdminKycService } from './admin-kyc.service.js';
import { KycController } from './kyc.controller.js';
import { KycService } from './kyc.service.js';
let KycModule = class KycModule {
};
KycModule = __decorate([
    Module({
        controllers: [KycController, AdminKycController],
        providers: [KycService, AdminKycService],
    })
], KycModule);
export { KycModule };
//# sourceMappingURL=kyc.module.js.map