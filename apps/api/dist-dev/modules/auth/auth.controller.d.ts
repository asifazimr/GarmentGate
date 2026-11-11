import { type AuthResponse, type ForgotPasswordDto, type LoginDto, type RegisterDto, type ResetPasswordDto, type UpdatePreferencesDto, type VerifyEmailDto } from '@garmentgate/shared';
import type { Request, Response } from 'express';
import { type AuthenticatedUser } from './auth.decorators.js';
import { AuthService } from './auth.service.js';
import { TokenService } from './token.service.js';
export declare class AuthController {
    private readonly auth;
    private readonly tokens;
    constructor(auth: AuthService, tokens: TokenService);
    register(dto: RegisterDto, req: Request, res: Response): Promise<AuthResponse>;
    login(dto: LoginDto, req: Request, res: Response): Promise<AuthResponse>;
    refresh(req: Request, res: Response): Promise<AuthResponse>;
    logout(req: Request, res: Response): Promise<void>;
    me(current: AuthenticatedUser): Promise<AuthResponse>;
    verifyEmail(dto: VerifyEmailDto): Promise<void>;
    updatePreferences(current: AuthenticatedUser, dto: UpdatePreferencesDto, res: Response): Promise<AuthResponse>;
    resendVerification(user: AuthenticatedUser): Promise<void>;
    forgotPassword(dto: ForgotPasswordDto, req: Request): Promise<void>;
    resetPassword(dto: ResetPasswordDto, req: Request, res: Response): Promise<void>;
}
