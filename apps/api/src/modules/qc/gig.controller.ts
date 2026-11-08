import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import {
  type AdminGigInspector,
  AdminGigInspectorSchema,
  type AdminInspectorApplication,
  AdminInspectorApplicationSchema,
  type CheckInDto,
  CheckInSchema,
  type FactoryLocationDto,
  FactoryLocationSchema,
  type GigSettings,
  GigSettingsSchema,
  type InspectorApplicationDto,
  InspectorApplicationInputSchema,
  type InspectorMe,
  InspectorMeSchema,
  type InspectorPayoutDetailsDto,
  InspectorPayoutDetailsSchema,
  type PayInspectorDto,
  PayInspectorSchema,
  type RateInspectionDto,
  RateInspectionSchema,
  type ReviewApplicationDto,
  ReviewApplicationSchema,
  type Task,
  TaskSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Public, Roles } from '../auth/auth.decorators.js';
import { GigService } from './gig.service.js';

const id = new ZodValidationPipe(z.uuid());
const factoryCode = new ZodValidationPipe(z.string().regex(/^MFR-[A-Z]{2}-\d{4}$/));

/** Anyone can apply to inspect for GarmentGate. */
@ApiTags('gig')
@Controller('inspectors')
export class GigApplyController {
  constructor(private readonly gig: GigService) {}

  @Post('apply')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Apply to become a GarmentGate QC inspector (staff review it)' })
  apply(
    @Body(new ZodValidationPipe(InspectorApplicationInputSchema)) dto: InspectorApplicationDto,
  ): Promise<void> {
    return this.gig.apply(dto);
  }
}

/** Gig inspectors: the task feed, check-in, earnings and payout details. */
@ApiTags('gig')
@ApiCookieAuth()
@Roles('INSPECTOR')
@Controller('inspector')
export class GigInspectorController {
  constructor(private readonly gig: GigService) {}

  @Get('tasks')
  @ApiOkResponse({ standardSchema: z.array(TaskSchema) })
  tasks(@CurrentUser() user: AuthenticatedUser): Promise<Task[]> {
    return this.gig.tasks(user.id);
  }

  @Post('tasks/:id/claim')
  @HttpCode(HttpStatus.NO_CONTENT)
  claim(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) inspectionId: string,
  ): Promise<void> {
    return this.gig.claim(user.id, inspectionId);
  }

  @Post('inspections/:id/check-in')
  @ApiOperation({ summary: 'GPS check-in at the factory (required before the report)' })
  checkIn(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) inspectionId: string,
    @Body(new ZodValidationPipe(CheckInSchema)) dto: CheckInDto,
  ): Promise<{ distanceM: number }> {
    return this.gig.checkIn(user.id, inspectionId, dto);
  }

  @Get('me')
  @ApiOkResponse({ standardSchema: InspectorMeSchema })
  me(@CurrentUser() user: AuthenticatedUser): Promise<InspectorMe> {
    return this.gig.me(user.id);
  }

  @Put('me/payout')
  @HttpCode(HttpStatus.NO_CONTENT)
  setPayout(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(InspectorPayoutDetailsSchema)) dto: InspectorPayoutDetailsDto,
  ): Promise<void> {
    return this.gig.setPayout(user.id, dto);
  }
}

/** Staff: applications, gig inspectors, ratings, payouts, factory locations, settings. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class GigAdminController {
  constructor(private readonly gig: GigService) {}

  @Get('gig/settings')
  @ApiOkResponse({ standardSchema: GigSettingsSchema })
  settings(): Promise<GigSettings> {
    return this.gig.settings();
  }

  @Put('gig/settings')
  @ApiOkResponse({ standardSchema: GigSettingsSchema })
  setSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(GigSettingsSchema)) dto: GigSettings,
  ): Promise<GigSettings> {
    return this.gig.setSettings(user.id, dto);
  }

  @Get('gig/applications')
  @ApiOkResponse({ standardSchema: z.array(AdminInspectorApplicationSchema) })
  applications(): Promise<AdminInspectorApplication[]> {
    return this.gig.applications();
  }

  @Post('gig/applications/:id/review')
  @HttpCode(HttpStatus.NO_CONTENT)
  review(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) appId: string,
    @Body(new ZodValidationPipe(ReviewApplicationSchema)) dto: ReviewApplicationDto,
  ): Promise<void> {
    return this.gig.review(user.id, appId, dto);
  }

  @Get('gig/inspectors')
  @ApiOkResponse({ standardSchema: z.array(AdminGigInspectorSchema) })
  inspectors(): Promise<AdminGigInspector[]> {
    return this.gig.inspectors();
  }

  @Post('gig/inspectors/:id/verify-payout')
  @HttpCode(HttpStatus.NO_CONTENT)
  verifyPayout(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) userId: string,
  ): Promise<void> {
    return this.gig.verifyPayout(user.id, userId);
  }

  @Post('gig/inspectors/:id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  setStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) userId: string,
    @Body(new ZodValidationPipe(z.object({ status: z.enum(['ACTIVE', 'SUSPENDED']) })))
    dto: { status: 'ACTIVE' | 'SUSPENDED' },
  ): Promise<void> {
    return this.gig.setStatus(user.id, userId, dto.status);
  }

  @Post('gig/inspectors/:id/pay')
  @ApiOperation({ summary: 'Record the weekly payout: everything earned and not yet paid' })
  pay(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) userId: string,
    @Body(new ZodValidationPipe(PayInspectorSchema)) dto: PayInspectorDto,
  ): Promise<{ paidUsdMinor: number }> {
    return this.gig.pay(user.id, userId, dto);
  }

  @Post('inspections/:id/rate')
  @HttpCode(HttpStatus.NO_CONTENT)
  rate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) inspectionId: string,
    @Body(new ZodValidationPipe(RateInspectionSchema)) dto: RateInspectionDto,
  ): Promise<void> {
    return this.gig.rate(user.id, inspectionId, dto.rating);
  }

  @Put('manufacturers/:code/location')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Where the factory is (inspector task distance and GPS check-in)' })
  locate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', factoryCode) code: string,
    @Body(new ZodValidationPipe(FactoryLocationSchema)) dto: FactoryLocationDto,
  ): Promise<void> {
    return this.gig.setFactoryLocation(user.id, code, dto);
  }
}
