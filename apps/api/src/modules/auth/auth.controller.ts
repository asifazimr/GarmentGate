import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import {
  type AuthResponse,
  AuthResponseSchema,
  type ForgotPasswordDto,
  ForgotPasswordSchema,
  type LoginDto,
  LoginSchema,
  type RegisterDto,
  RegisterSchema,
  type ResetPasswordDto,
  ResetPasswordSchema,
  type VerifyEmailDto,
  VerifyEmailSchema,
} from '@garmentgate/shared';
import type { Request, Response } from 'express';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Public } from './auth.decorators.js';
import { AuthService, type RequestMeta } from './auth.service.js';
import { TokenService } from './token.service.js';

const meta = (req: Request): RequestMeta => ({ ip: req.ip, userAgent: req.headers['user-agent'] });

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly tokens: TokenService,
  ) {}

  @Public()
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Create an account; signs in and emails a verification link' })
  @ApiOkResponse({ standardSchema: AuthResponseSchema })
  async register(
    @Body(new ZodValidationPipe(RegisterSchema)) dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { user, tokens } = await this.auth.register(dto, meta(req));
    this.tokens.setAuthCookies(res, tokens);
    return { user };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ standardSchema: AuthResponseSchema })
  async login(
    @Body(new ZodValidationPipe(LoginSchema)) dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const { user, tokens } = await this.auth.login(dto, meta(req));
    this.tokens.setAuthCookies(res, tokens);
    return { user };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @ApiOperation({ summary: 'Rotate the refresh-token cookie and issue a new access token' })
  @ApiOkResponse({ standardSchema: AuthResponseSchema })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const refreshToken = this.tokens.extractRefreshToken(req);
    if (!refreshToken) {
      this.tokens.clearAuthCookies(res);
      throw new UnauthorizedException('Not signed in');
    }
    try {
      const { user, tokens } = await this.auth.refresh(refreshToken, meta(req));
      this.tokens.setAuthCookies(res, tokens);
      return { user };
    } catch (error) {
      // A dead refresh token should not linger in the browser.
      this.tokens.clearAuthCookies(res);
      throw error;
    }
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke the current session and clear cookies' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    await this.auth.logout(this.tokens.extractRefreshToken(req));
    this.tokens.clearAuthCookies(res);
  }

  @Get('me')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'The signed-in user, read fresh from the database' })
  @ApiOkResponse({ standardSchema: AuthResponseSchema })
  async me(@CurrentUser() current: AuthenticatedUser): Promise<AuthResponse> {
    return { user: await this.auth.me(current.id) };
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Confirm an email address with the emailed token' })
  async verifyEmail(
    @Body(new ZodValidationPipe(VerifyEmailSchema)) dto: VerifyEmailDto,
  ): Promise<void> {
    await this.auth.verifyEmail(dto.token);
  }

  @Post('verify-email/resend')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @ApiOperation({ summary: 'Send a new verification email' })
  async resendVerification(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    await this.auth.resendVerification(user.id);
  }

  @Public()
  @Post('password/forgot')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Email a password-reset link (always 204)' })
  async forgotPassword(
    @Body(new ZodValidationPipe(ForgotPasswordSchema)) dto: ForgotPasswordDto,
    @Req() req: Request,
  ): Promise<void> {
    await this.auth.forgotPassword(dto.email, meta(req));
  }

  @Public()
  @Post('password/reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Set a new password with the emailed token; signs out everywhere' })
  async resetPassword(
    @Body(new ZodValidationPipe(ResetPasswordSchema)) dto: ResetPasswordDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.auth.resetPassword(dto, meta(req));
    this.tokens.clearAuthCookies(res);
  }
}
