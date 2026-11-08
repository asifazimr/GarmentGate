import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiCookieAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import {
  type AdminMessaging,
  AdminMessagingSchema,
  type ConfirmPhoneDto,
  ConfirmPhoneSchema,
  type MessagingSettings,
  MessagingSettingsSchema,
  type MyMessaging,
  MyMessagingSchema,
  type SetTextChannelDto,
  SetTextChannelSchema,
  type StartPhoneVerificationDto,
  StartPhoneVerificationSchema,
  type TestTextDto,
  TestTextSchema,
} from '@garmentgate/shared';
import { PhoneCodeThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import type { Env } from '../../config/env.schema.js';
import {
  AnyRole,
  type AuthenticatedUser,
  CurrentUser,
  Public,
  Roles,
} from '../auth/auth.decorators.js';
import { MessagingService } from './messaging.service.js';
import { twilioSignatureValid } from './text-provider.js';

/** Everyone's own texting setup: verify a mobile number, pick SMS or WhatsApp. */
@ApiTags('notifications')
@ApiCookieAuth()
@Controller('me/messaging')
@AnyRole()
export class MyMessagingController {
  constructor(private readonly messaging: MessagingService) {}

  @Get()
  @ApiOkResponse({ standardSchema: MyMessagingSchema })
  mine(@CurrentUser() user: AuthenticatedUser): Promise<MyMessaging> {
    return this.messaging.mine(user.id);
  }

  @Post('phone')
  @PhoneCodeThrottle()
  @ApiOperation({ summary: 'Text a verification code to a mobile number' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async start(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(StartPhoneVerificationSchema)) dto: StartPhoneVerificationDto,
  ): Promise<void> {
    await this.messaging.startVerification(user.id, dto);
  }

  @Post('phone/verify')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOkResponse({ standardSchema: MyMessagingSchema })
  @HttpCode(HttpStatus.OK)
  confirm(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ConfirmPhoneSchema)) dto: ConfirmPhoneDto,
  ): Promise<MyMessaging> {
    return this.messaging.confirm(user.id, dto);
  }

  @Delete('phone')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    await this.messaging.removePhone(user.id);
  }

  @Put('channel')
  @ApiOkResponse({ standardSchema: MyMessagingSchema })
  setChannel(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(SetTextChannelSchema)) dto: SetTextChannelDto,
  ): Promise<MyMessaging> {
    return this.messaging.setChannel(user.id, dto);
  }
}

/** Twilio → us: delivery receipts, authenticated by Twilio's signature. */
@Controller('messaging/twilio')
export class TwilioWebhookController {
  constructor(
    private readonly messaging: MessagingService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  @Post('status')
  @Public()
  @SkipThrottle()
  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.NO_CONTENT)
  async status(
    @Body() body: Record<string, unknown>,
    @Headers('x-twilio-signature') signature: string | undefined,
  ): Promise<void> {
    const token = this.config.get('TWILIO_AUTH_TOKEN', { infer: true });
    const url = this.config.get('TWILIO_STATUS_CALLBACK_URL', { infer: true });
    const params = Object.fromEntries(
      Object.entries(body).filter((e): e is [string, string] => typeof e[1] === 'string'),
    );
    if (!token || !url || !signature || !twilioSignatureValid(token, url, params, signature))
      throw new ForbiddenException('Invalid signature');
    await this.messaging.receipt(params);
  }
}

/** Staff: text settings, the message log and a test send. */
@ApiTags('admin')
@ApiCookieAuth()
@Controller('admin/messaging')
@Roles('ADMIN')
export class AdminMessagingController {
  constructor(private readonly messaging: MessagingService) {}

  @Get()
  @ApiOkResponse({ standardSchema: AdminMessagingSchema })
  overview(): Promise<AdminMessaging> {
    return this.messaging.admin();
  }

  @Put('settings')
  @ApiOkResponse({ standardSchema: MessagingSettingsSchema })
  setSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(MessagingSettingsSchema)) dto: MessagingSettings,
  ): Promise<MessagingSettings> {
    return this.messaging.setSettings(user.id, dto);
  }

  @Post('test')
  @PhoneCodeThrottle()
  @ApiOperation({ summary: 'Send a test text' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async test(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(TestTextSchema)) dto: TestTextDto,
  ): Promise<void> {
    await this.messaging.test(user.id, dto);
  }
}
