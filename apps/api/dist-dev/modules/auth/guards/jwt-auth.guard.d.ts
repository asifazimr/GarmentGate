import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../token.service.js';
export declare class JwtAuthGuard implements CanActivate {
    private readonly reflector;
    private readonly tokens;
    constructor(reflector: Reflector, tokens: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
