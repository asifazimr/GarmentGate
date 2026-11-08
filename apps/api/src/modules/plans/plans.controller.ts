import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type BuyerPlus,
  BuyerPlusSchema,
  type BuyerPlusSettings,
  BuyerPlusSettingsSchema,
  type GrantPlusDto,
  GrantPlusSchema,
  type PlusCheckoutDto,
  PlusCheckoutSchema,
  type AdminPlans,
  AdminPlansSchema,
  type FactoryPlan,
  FactoryPlanSchema,
  type GrantPlanDto,
  GrantPlanSchema,
  type PlanCheckoutDto,
  PlanCheckoutSchema,
  type PlanSettings,
  PlanSettingsSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import { PlansService } from './plans.service.js';

const FactoryCode = new ZodValidationPipe(z.string().regex(/^MFR-[A-Z]{2}-\d{4}$/));
const BuyerCode = new ZodValidationPipe(z.string().regex(/^BYR-[A-Z]{2}-\d{4}$/));

/** A factory's own plan: compare, pay by card (Stripe Checkout), cancel. */
@ApiTags('plans')
@ApiCookieAuth()
@Controller('manufacturer/plan')
@Roles('MANUFACTURER')
export class FactoryPlanController {
  constructor(
    private readonly plans: PlansService,
    private readonly context: ManufacturerContextService,
  ) {}

  @Get()
  @ApiOkResponse({ standardSchema: FactoryPlanSchema })
  async mine(@CurrentUser() user: AuthenticatedUser): Promise<FactoryPlan> {
    return this.plans.mine(await this.context.verified(user.id));
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Start a Stripe Checkout for a paid plan' })
  @ApiOkResponse({ standardSchema: z.object({ url: z.url() }) })
  @HttpCode(HttpStatus.OK)
  async checkout(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PlanCheckoutSchema)) dto: PlanCheckoutDto,
  ): Promise<{ url: string }> {
    return this.plans.checkout(await this.context.verified(user.id), dto);
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel the card plan at the end of the paid period' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    await this.plans.cancel(await this.context.verified(user.id));
  }
}

/** Staff: subscriptions, revenue, grants and the plan terms. */
@ApiTags('admin')
@ApiCookieAuth()
@Controller('admin')
@Roles('ADMIN')
export class AdminPlansController {
  constructor(
    private readonly plans: PlansService,
    private readonly plus: BuyerPlusService,
  ) {}

  @Get('plus/settings')
  @ApiOkResponse({ standardSchema: BuyerPlusSettingsSchema })
  plusSettings(): Promise<BuyerPlusSettings> {
    return this.plus.settings();
  }

  @Put('plus/settings')
  @ApiOkResponse({ standardSchema: BuyerPlusSettingsSchema })
  setPlusSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(BuyerPlusSettingsSchema)) dto: BuyerPlusSettings,
  ): Promise<BuyerPlusSettings> {
    return this.plus.setSettings(user.id, dto);
  }

  @Put('buyers/:code/plus')
  @ApiOperation({ summary: 'Give a buyer GarmentGate Plus by hand, or end a staff-set membership' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async grantPlus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', BuyerCode) code: string,
    @Body(new ZodValidationPipe(GrantPlusSchema)) dto: GrantPlusDto,
  ): Promise<void> {
    await this.plus.grant(user.id, code, dto);
  }

  @Get('plans')
  @ApiOkResponse({ standardSchema: AdminPlansSchema })
  list(): Promise<AdminPlans> {
    return this.plans.adminList();
  }

  @Get('plans/settings')
  @ApiOkResponse({ standardSchema: PlanSettingsSchema })
  settings(): Promise<PlanSettings> {
    return this.plans.settings();
  }

  @Put('plans/settings')
  @ApiOkResponse({ standardSchema: PlanSettingsSchema })
  setSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PlanSettingsSchema)) dto: PlanSettings,
  ): Promise<PlanSettings> {
    return this.plans.setSettings(user.id, dto);
  }

  @Put('manufacturers/:code/plan')
  @ApiOperation({
    summary: 'Put a factory on a plan by hand (bank transfer, promotion) or on Free',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async grant(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', FactoryCode) code: string,
    @Body(new ZodValidationPipe(GrantPlanSchema)) dto: GrantPlanDto,
  ): Promise<void> {
    await this.plans.grant(user.id, code, dto);
  }
}

/** A buyer's GarmentGate Plus: benefits, pay by card (Stripe Checkout), cancel. */
@ApiTags('plans')
@ApiCookieAuth()
@Controller('buyer/plus')
@Roles('BUYER')
export class BuyerPlusController {
  constructor(
    private readonly plus: BuyerPlusService,
    private readonly context: BuyerContextService,
  ) {}

  @Get()
  @ApiOkResponse({ standardSchema: BuyerPlusSchema })
  async mine(@CurrentUser() user: AuthenticatedUser): Promise<BuyerPlus> {
    return this.plus.mine(await this.context.verified(user.id));
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Start a Stripe Checkout for GarmentGate Plus' })
  @ApiOkResponse({ standardSchema: z.object({ url: z.url() }) })
  @HttpCode(HttpStatus.OK)
  async checkout(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PlusCheckoutSchema)) dto: PlusCheckoutDto,
  ): Promise<{ url: string }> {
    return this.plus.checkout(await this.context.verified(user.id), dto);
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel GarmentGate Plus at the end of the paid period' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    await this.plus.cancel(await this.context.verified(user.id));
  }
}
