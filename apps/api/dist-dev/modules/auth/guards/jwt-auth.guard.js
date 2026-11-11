var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth.decorators.js';
import { TokenService } from '../token.service.js';
let JwtAuthGuard = class JwtAuthGuard {
    reflector;
    tokens;
    constructor(reflector, tokens) {
        this.reflector = reflector;
        this.tokens = tokens;
    }
    async canActivate(context) {
        if (context.getType() !== 'http')
            return true;
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const req = context.switchToHttp().getRequest();
        const token = this.tokens.extractAccessToken(req);
        if (!token) {
            if (isPublic)
                return true;
            throw new UnauthorizedException('Not signed in');
        }
        const user = await this.tokens.verifyAccessToken(token);
        if (user) {
            req.user = user;
            return true;
        }
        if (isPublic)
            return true;
        throw new UnauthorizedException('Session expired');
    }
};
JwtAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        TokenService])
], JwtAuthGuard);
export { JwtAuthGuard };
//# sourceMappingURL=jwt-auth.guard.js.map