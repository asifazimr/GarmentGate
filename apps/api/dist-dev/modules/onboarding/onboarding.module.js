var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { CategoriesController } from './categories.controller.js';
import { OnboardingController } from './onboarding.controller.js';
import { OnboardingService } from './onboarding.service.js';
import { PublicCodeService } from './public-code.service.js';
let OnboardingModule = class OnboardingModule {
};
OnboardingModule = __decorate([
    Module({
        imports: [AuthModule],
        controllers: [OnboardingController, CategoriesController],
        providers: [OnboardingService, PublicCodeService],
    })
], OnboardingModule);
export { OnboardingModule };
//# sourceMappingURL=onboarding.module.js.map