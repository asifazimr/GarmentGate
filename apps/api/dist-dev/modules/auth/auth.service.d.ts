import { ConfigService } from '@nestjs/config';
import type { AuthUser, LoginDto, RegisterDto, ResetPasswordDto, UpdatePreferencesDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { AuditService } from '../audit/audit.service.js';
import { MailService } from '../mail/mail.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { type IssuedTokens, TokenService } from './token.service.js';
export interface RequestMeta {
    ip?: string | undefined;
    userAgent?: string | undefined;
}
export interface AuthResult {
    user: AuthUser;
    tokens: IssuedTokens;
}
export declare class AuthService {
    private readonly prisma;
    private readonly tokens;
    private readonly mail;
    private readonly audit;
    private readonly config;
    private readonly logger;
    private readonly dummyHash;
    constructor(prisma: PrismaService, tokens: TokenService, mail: MailService, audit: AuditService, config: ConfigService<Env, true>);
    register(dto: RegisterDto, meta: RequestMeta): Promise<AuthResult>;
    createStaffUser(adminId: string, input: {
        email: string;
        firstName: string;
        lastName: string;
        role: 'INSPECTOR' | 'PARTNER';
        logisticsPartnerId?: string;
    }): Promise<{
        id: string;
    }>;
    login(dto: LoginDto, meta: RequestMeta): Promise<AuthResult>;
    refresh(refreshToken: string, meta: RequestMeta): Promise<AuthResult>;
    logout(refreshToken: string | null): Promise<void>;
    updatePreferences(userId: string, dto: UpdatePreferencesDto): Promise<AuthUser>;
    me(userId: string): Promise<AuthUser>;
    reissueAccessToken(userId: string): Promise<string>;
    verifyEmail(token: string): Promise<void>;
    resendVerification(userId: string): Promise<void>;
    forgotPassword(email: string, meta: RequestMeta): Promise<void>;
    resetPassword(dto: ResetPasswordDto, meta: RequestMeta): Promise<void>;
    private startSession;
    private newTokens;
    private sessionData;
    private assertActive;
    private sendVerificationEmail;
    private createUserToken;
    private consumeToken;
    private webUrl;
}
