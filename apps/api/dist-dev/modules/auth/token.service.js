var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createHash, randomBytes } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTH_COOKIES, AccessTokenClaimsSchema, LOCALE_COOKIE, } from '@garmentgate/shared';
export function generateOpaqueToken() {
    return randomBytes(32).toString('base64url');
}
export function hashOpaqueToken(token) {
    return createHash('sha256').update(token).digest('hex');
}
let TokenService = class TokenService {
    jwt;
    config;
    constructor(jwt, config) {
        this.jwt = jwt;
        this.config = config;
    }
    get accessTtlSeconds() {
        return this.config.get('JWT_ACCESS_TTL_SECONDS', { infer: true });
    }
    get refreshTtlMs() {
        return this.config.get('REFRESH_TOKEN_TTL_DAYS', { infer: true }) * 86_400_000;
    }
    signAccessToken(claims) {
        return this.jwt.signAsync(claims, { expiresIn: this.accessTtlSeconds });
    }
    async verifyAccessToken(token) {
        try {
            const payload = await this.jwt.verifyAsync(token);
            const claims = AccessTokenClaimsSchema.parse(payload);
            return { id: claims.sub, role: claims.role, emailVerified: claims.ev, kycStatus: claims.kyc };
        }
        catch {
            return null;
        }
    }
    extractAccessToken(req) {
        const cookies = req.cookies;
        const fromCookie = cookies?.[AUTH_COOKIES.accessToken];
        if (fromCookie)
            return fromCookie;
        const header = req.headers.authorization;
        return header?.startsWith('Bearer ') ? header.slice(7) : null;
    }
    extractRefreshToken(req) {
        const cookies = req.cookies;
        return cookies?.[AUTH_COOKIES.refreshToken] ?? null;
    }
    setAuthCookies(res, tokens) {
        res.cookie(AUTH_COOKIES.accessToken, tokens.accessToken, {
            ...this.cookieBase(),
            maxAge: this.accessTtlSeconds * 1000,
        });
        res.cookie(AUTH_COOKIES.refreshToken, tokens.refreshToken, {
            ...this.cookieBase(),
            expires: tokens.refreshExpiresAt,
        });
    }
    setAccessCookie(res, accessToken) {
        res.cookie(AUTH_COOKIES.accessToken, accessToken, {
            ...this.cookieBase(),
            maxAge: this.accessTtlSeconds * 1000,
        });
    }
    setLocaleCookie(res, locale) {
        res.cookie(LOCALE_COOKIE, locale, { ...this.cookieBase(), maxAge: 365 * 86_400_000 });
    }
    clearAuthCookies(res) {
        res.clearCookie(AUTH_COOKIES.accessToken, this.cookieBase());
        res.clearCookie(AUTH_COOKIES.refreshToken, this.cookieBase());
    }
    cookieBase() {
        return {
            httpOnly: true,
            secure: this.config.get('COOKIE_SECURE', { infer: true }),
            sameSite: 'lax',
            path: '/',
        };
    }
};
TokenService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService,
        ConfigService])
], TokenService);
export { TokenService };
//# sourceMappingURL=token.service.js.map