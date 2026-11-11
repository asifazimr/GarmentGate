import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type AccessTokenClaims } from '@garmentgate/shared';
import type { Request, Response } from 'express';
import type { Env } from '../../config/env.schema.js';
import type { AuthenticatedUser } from './auth.decorators.js';
export interface IssuedTokens {
    accessToken: string;
    refreshToken: string;
    refreshExpiresAt: Date;
}
export declare function generateOpaqueToken(): string;
export declare function hashOpaqueToken(token: string): string;
export declare class TokenService {
    private readonly jwt;
    private readonly config;
    constructor(jwt: JwtService, config: ConfigService<Env, true>);
    get accessTtlSeconds(): number;
    get refreshTtlMs(): number;
    signAccessToken(claims: AccessTokenClaims): Promise<string>;
    verifyAccessToken(token: string): Promise<AuthenticatedUser | null>;
    extractAccessToken(req: Request): string | null;
    extractRefreshToken(req: Request): string | null;
    setAuthCookies(res: Response, tokens: IssuedTokens): void;
    setAccessCookie(res: Response, accessToken: string): void;
    setLocaleCookie(res: Response, locale: string): void;
    clearAuthCookies(res: Response): void;
    private cookieBase;
}
