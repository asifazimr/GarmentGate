import { createHash, randomBytes } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTH_COOKIES, type AccessTokenClaims, AccessTokenClaimsSchema } from '@garmentgate/shared';
import type { CookieOptions, Request, Response } from 'express';
import type { Env } from '../../config/env.schema.js';
import type { AuthenticatedUser } from './auth.decorators.js';

export interface IssuedTokens {
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: Date;
}

/** Opaque random token (refresh, email verification, password reset). Only its hash is stored. */
export function generateOpaqueToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashOpaqueToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  get accessTtlSeconds(): number {
    return this.config.get('JWT_ACCESS_TTL_SECONDS', { infer: true });
  }

  get refreshTtlMs(): number {
    return this.config.get('REFRESH_TOKEN_TTL_DAYS', { infer: true }) * 86_400_000;
  }

  signAccessToken(claims: AccessTokenClaims): Promise<string> {
    return this.jwt.signAsync(claims, { expiresIn: this.accessTtlSeconds });
  }

  async verifyAccessToken(token: string): Promise<AuthenticatedUser | null> {
    try {
      const payload: unknown = await this.jwt.verifyAsync(token);
      const claims = AccessTokenClaimsSchema.parse(payload);
      return { id: claims.sub, role: claims.role, emailVerified: claims.ev, kycStatus: claims.kyc };
    } catch {
      return null;
    }
  }

  extractAccessToken(req: Request): string | null {
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    const fromCookie = cookies?.[AUTH_COOKIES.accessToken];
    if (fromCookie) return fromCookie;
    const header = req.headers.authorization;
    return header?.startsWith('Bearer ') ? header.slice(7) : null;
  }

  extractRefreshToken(req: Request): string | null {
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    return cookies?.[AUTH_COOKIES.refreshToken] ?? null;
  }

  setAuthCookies(res: Response, tokens: IssuedTokens): void {
    res.cookie(AUTH_COOKIES.accessToken, tokens.accessToken, {
      ...this.cookieBase(),
      maxAge: this.accessTtlSeconds * 1000,
    });
    res.cookie(AUTH_COOKIES.refreshToken, tokens.refreshToken, {
      ...this.cookieBase(),
      expires: tokens.refreshExpiresAt,
    });
  }

  setAccessCookie(res: Response, accessToken: string): void {
    res.cookie(AUTH_COOKIES.accessToken, accessToken, {
      ...this.cookieBase(),
      maxAge: this.accessTtlSeconds * 1000,
    });
  }

  clearAuthCookies(res: Response): void {
    res.clearCookie(AUTH_COOKIES.accessToken, this.cookieBase());
    res.clearCookie(AUTH_COOKIES.refreshToken, this.cookieBase());
  }

  private cookieBase(): CookieOptions {
    // Lax (not Strict) so the session survives arriving from an email link.
    return {
      httpOnly: true,
      secure: this.config.get('COOKIE_SECURE', { infer: true }),
      sameSite: 'lax',
      path: '/',
    };
  }
}
