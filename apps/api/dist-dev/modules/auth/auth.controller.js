var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UnauthorizedException, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthResponseSchema, ForgotPasswordSchema, LoginSchema, RegisterSchema, ResetPasswordSchema, UpdatePreferencesSchema, VerifyEmailSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { AnyRole, CurrentUser, Public } from './auth.decorators.js';
import { AuthService } from './auth.service.js';
import { TokenService } from './token.service.js';
const meta = (req) => ({ ip: req.ip, userAgent: req.headers['user-agent'] });
let AuthController = class AuthController {
    auth;
    tokens;
    constructor(auth, tokens) {
        this.auth = auth;
        this.tokens = tokens;
    }
    async register(dto, req, res) {
        const { user, tokens } = await this.auth.register(dto, meta(req));
        this.tokens.setAuthCookies(res, tokens);
        this.tokens.setLocaleCookie(res, user.locale);
        return { user };
    }
    async login(dto, req, res) {
        const { user, tokens } = await this.auth.login(dto, meta(req));
        this.tokens.setAuthCookies(res, tokens);
        this.tokens.setLocaleCookie(res, user.locale);
        return { user };
    }
    async refresh(req, res) {
        const refreshToken = this.tokens.extractRefreshToken(req);
        if (!refreshToken) {
            this.tokens.clearAuthCookies(res);
            throw new UnauthorizedException('Not signed in');
        }
        try {
            const { user, tokens } = await this.auth.refresh(refreshToken, meta(req));
            this.tokens.setAuthCookies(res, tokens);
            return { user };
        }
        catch (error) {
            this.tokens.clearAuthCookies(res);
            throw error;
        }
    }
    async logout(req, res) {
        await this.auth.logout(this.tokens.extractRefreshToken(req));
        this.tokens.clearAuthCookies(res);
    }
    async me(current) {
        return { user: await this.auth.me(current.id) };
    }
    async verifyEmail(dto) {
        await this.auth.verifyEmail(dto.token);
    }
    async updatePreferences(current, dto, res) {
        const user = await this.auth.updatePreferences(current.id, dto);
        this.tokens.setLocaleCookie(res, user.locale);
        return { user };
    }
    async resendVerification(user) {
        await this.auth.resendVerification(user.id);
    }
    async forgotPassword(dto, req) {
        await this.auth.forgotPassword(dto.email, meta(req));
    }
    async resetPassword(dto, req, res) {
        await this.auth.resetPassword(dto, meta(req));
        this.tokens.clearAuthCookies(res);
    }
};
__decorate([
    Public(),
    Post('register'),
    Throttle({ default: { limit: 5, ttl: 60_000 } }),
    ApiOperation({ summary: 'Create an account; signs in and emails a verification link' }),
    ApiOkResponse({ standardSchema: AuthResponseSchema }),
    __param(0, Body(new ZodValidationPipe(RegisterSchema))),
    __param(1, Req()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Public(),
    Post('login'),
    HttpCode(HttpStatus.OK),
    Throttle({ default: { limit: 10, ttl: 60_000 } }),
    ApiOperation({ summary: 'Sign in with email and password' }),
    ApiOkResponse({ standardSchema: AuthResponseSchema }),
    __param(0, Body(new ZodValidationPipe(LoginSchema))),
    __param(1, Req()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Public(),
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    Throttle({ default: { limit: 30, ttl: 60_000 } }),
    ApiOperation({ summary: 'Rotate the refresh-token cookie and issue a new access token' }),
    ApiOkResponse({ standardSchema: AuthResponseSchema }),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Public(),
    Post('logout'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Revoke the current session and clear cookies' }),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    AnyRole(),
    Get('me'),
    ApiCookieAuth(),
    ApiOperation({ summary: 'The signed-in user, read fresh from the database' }),
    ApiOkResponse({ standardSchema: AuthResponseSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    Public(),
    Post('verify-email'),
    HttpCode(HttpStatus.NO_CONTENT),
    Throttle({ default: { limit: 10, ttl: 60_000 } }),
    ApiOperation({ summary: 'Confirm an email address with the emailed token' }),
    __param(0, Body(new ZodValidationPipe(VerifyEmailSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    AnyRole(),
    Patch('me/preferences'),
    ApiCookieAuth(),
    ApiOperation({ summary: 'Language and display currency for the signed-in user' }),
    ApiOkResponse({ standardSchema: AuthResponseSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(UpdatePreferencesSchema))),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePreferences", null);
__decorate([
    AnyRole(),
    Post('verify-email/resend'),
    HttpCode(HttpStatus.NO_CONTENT),
    Throttle({ default: { limit: 3, ttl: 60_000 } }),
    ApiOperation({ summary: 'Send a new verification email' }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerification", null);
__decorate([
    Public(),
    Post('password/forgot'),
    HttpCode(HttpStatus.NO_CONTENT),
    Throttle({ default: { limit: 5, ttl: 60_000 } }),
    ApiOperation({ summary: 'Email a password-reset link (always 204)' }),
    __param(0, Body(new ZodValidationPipe(ForgotPasswordSchema))),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    Public(),
    Post('password/reset'),
    HttpCode(HttpStatus.NO_CONTENT),
    Throttle({ default: { limit: 10, ttl: 60_000 } }),
    ApiOperation({ summary: 'Set a new password with the emailed token; signs out everywhere' }),
    __param(0, Body(new ZodValidationPipe(ResetPasswordSchema))),
    __param(1, Req()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = __decorate([
    ApiTags('auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService,
        TokenService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map