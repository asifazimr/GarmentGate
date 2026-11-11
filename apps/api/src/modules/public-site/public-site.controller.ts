import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import {
  type AdminLead,
  AdminLeadSchema,
  type LeadDto,
  LeadInputSchema,
  type PublicDirectory,
  PublicDirectorySchema,
  type PublicPricing,
  PublicPricingSchema,
  type PublicStats,
  PublicStatsSchema,
  type UpdateLeadDto,
  UpdateLeadSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Public, Roles } from '../auth/auth.decorators.js';
import { PublicSiteService } from './public-site.service.js';

/** The public website: live counts and prices (no identities), and its enquiry forms. */
@ApiTags('public')
@Controller()
export class PublicSiteController {
  constructor(private readonly site: PublicSiteService) {}

  @Get('public/stats')
  @Public()
  @ApiOkResponse({ standardSchema: PublicStatsSchema })
  stats(): Promise<PublicStats> {
    return this.site.publicStats();
  }

  @Get('public/pricing')
  @Public()
  @ApiOkResponse({ standardSchema: PublicPricingSchema })
  pricing(): Promise<PublicPricing> {
    return this.site.publicPricing();
  }

  @Get('public/directory')
  @Public()
  @ApiOkResponse({ standardSchema: PublicDirectorySchema })
  directory(): Promise<PublicDirectory> {
    return this.site.directory();
  }

  @Post('leads')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 10 * 60_000 } })
  @ApiOperation({ summary: 'Send an enquiry from the public website' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async lead(@Body(new ZodValidationPipe(LeadInputSchema)) dto: LeadDto): Promise<void> {
    await this.site.createLead(dto);
  }
}

/** Staff: the enquiries inbox. */
@ApiTags('admin')
@ApiCookieAuth()
@Controller('admin/leads')
@Roles('ADMIN')
export class AdminLeadsController {
  constructor(private readonly site: PublicSiteService) {}

  @Get()
  @ApiOkResponse({ standardSchema: AdminLeadSchema.array() })
  list(): Promise<AdminLead[]> {
    return this.site.leads();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(z.uuid())) id: string,
    @Body(new ZodValidationPipe(UpdateLeadSchema)) dto: UpdateLeadDto,
  ): Promise<void> {
    await this.site.updateLead(user.id, id, dto);
  }
}
