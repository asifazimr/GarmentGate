import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BuyerSourcingNeedsSchema,
  type CompanyInfoDto,
  CompanyInfoSchema,
  ManufacturerCapabilitiesSchema,
  type OnboardingState,
  OnboardingStateSchema,
} from '@garmentgate/shared';
import type { Response } from 'express';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { AuthService } from '../auth/auth.service.js';
import { TokenService } from '../auth/token.service.js';
import { OnboardingService } from './onboarding.service.js';

@ApiTags('onboarding')
@ApiCookieAuth()
@Roles('BUYER', 'MANUFACTURER')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly onboarding: OnboardingService,
    private readonly auth: AuthService,
    private readonly tokens: TokenService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Current onboarding progress, so the wizard can resume' })
  @ApiOkResponse({ standardSchema: OnboardingStateSchema })
  state(@CurrentUser() user: AuthenticatedUser): Promise<OnboardingState> {
    return this.onboarding.getState(user.id);
  }

  @Put('company')
  @ApiOperation({ summary: 'Step 1: save company details' })
  @ApiOkResponse({ standardSchema: OnboardingStateSchema })
  saveCompany(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CompanyInfoSchema)) dto: CompanyInfoDto,
  ): Promise<OnboardingState> {
    return this.onboarding.saveCompany(user.id, dto);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Step 2: capabilities (manufacturers) or sourcing needs (buyers)' })
  @ApiOkResponse({ standardSchema: OnboardingStateSchema })
  saveProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: unknown,
  ): Promise<OnboardingState> {
    // The body shape depends on the caller's role, so validate here rather than in a param pipe.
    if (user.role === 'MANUFACTURER') {
      const dto = new ZodValidationPipe(ManufacturerCapabilitiesSchema).transform(body);
      return this.onboarding.saveManufacturerProfile(user.id, dto);
    }
    const dto = new ZodValidationPipe(BuyerSourcingNeedsSchema).transform(body);
    return this.onboarding.saveBuyerProfile(user.id, dto);
  }

  @Post('submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Step 3: submit documents for verification' })
  @ApiOkResponse({ standardSchema: OnboardingStateSchema })
  async submit(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<OnboardingState> {
    const state = await this.onboarding.submit(user.id);
    // KYC status is in the access token; refresh it so routing switches to the pending screen.
    this.tokens.setAccessCookie(res, await this.auth.reissueAccessToken(user.id));
    return state;
  }
}
