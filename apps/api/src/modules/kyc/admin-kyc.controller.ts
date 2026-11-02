import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AdminKycCompany,
  type AdminKycCompanyDetail,
  AdminKycCompanyDetailSchema,
  type KycStatus,
  KycStatusSchema,
  type ApproveKycDto,
  ApproveKycSchema,
  type RejectKycDto,
  RejectKycSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { AdminKycService } from './admin-kyc.service.js';

@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/kyc/companies')
export class AdminKycController {
  constructor(private readonly adminKyc: AdminKycService) {}

  @Get()
  @ApiOperation({ summary: 'Verification queue (defaults to companies pending review)' })
  list(
    @Query('status', new ZodValidationPipe(KycStatusSchema.default('PENDING_REVIEW')))
    status: KycStatus,
  ): Promise<AdminKycCompany[]> {
    return this.adminKyc.list(status);
  }

  @Get(':id')
  @ApiOkResponse({ standardSchema: AdminKycCompanyDetailSchema })
  detail(@Param('id', ParseUUIDPipe) id: string): Promise<AdminKycCompanyDetail> {
    return this.adminKyc.detail(id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Verify the company and its documents; lists manufacturers' })
  approve(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ApproveKycSchema)) dto: ApproveKycDto,
  ): Promise<void> {
    return this.adminKyc.approve(admin.id, id, dto.note);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Send the company back to onboarding with a reason' })
  reject(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(RejectKycSchema)) dto: RejectKycDto,
  ): Promise<void> {
    return this.adminKyc.reject(admin.id, id, dto.reason);
  }
}
