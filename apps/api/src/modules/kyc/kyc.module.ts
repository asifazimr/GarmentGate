import { Module } from '@nestjs/common';
import { AdminKycController } from './admin-kyc.controller.js';
import { AdminKycService } from './admin-kyc.service.js';
import { KycController } from './kyc.controller.js';
import { KycService } from './kyc.service.js';

@Module({
  controllers: [KycController, AdminKycController],
  providers: [KycService, AdminKycService],
})
export class KycModule {}
