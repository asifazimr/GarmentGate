import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  type AdminClaim,
  AdminClaimSchema,
  AdminClaimsQuerySchema,
  type RejectClaimDto,
  RejectClaimSchema,
  ReviewClaimSchema,
  type SupplierClaimStatus,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { IdSchema } from '../orders/order-params.js';
import { ClaimsService } from './claims.service.js';

/** Staff review of supplier claims: the brand names and evidence are only ever shown here. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/claims')
export class AdminClaimsController {
  constructor(private readonly claims: ClaimsService) {}

  @Get()
  @ApiOkResponse({ standardSchema: z.array(AdminClaimSchema) })
  list(
    @Query(new ZodValidationPipe(AdminClaimsQuerySchema)) query: { status?: SupplierClaimStatus },
  ): Promise<AdminClaim[]> {
    return this.claims.adminList(query.status);
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  verify(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(ReviewClaimSchema)) dto: { note?: string },
  ): Promise<void> {
    return this.claims.verify(admin.id, id, dto.note);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  reject(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(RejectClaimSchema)) dto: RejectClaimDto,
  ): Promise<void> {
    return this.claims.reject(admin.id, id, dto);
  }
}
