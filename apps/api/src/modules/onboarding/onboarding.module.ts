import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { CategoriesController } from './categories.controller.js';
import { OnboardingController } from './onboarding.controller.js';
import { OnboardingService } from './onboarding.service.js';
import { PublicCodeService } from './public-code.service.js';

@Module({
  imports: [AuthModule],
  controllers: [OnboardingController, CategoriesController],
  providers: [OnboardingService, PublicCodeService],
})
export class OnboardingModule {}
