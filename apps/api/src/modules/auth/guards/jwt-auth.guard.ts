import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type AuthenticatedRequest, IS_PUBLIC_KEY } from '../auth.decorators.js';
import { TokenService } from '../token.service.js';

/**
 * Global guard: every route needs a valid access token unless marked @Public().
 * Accepts the httpOnly cookie (browsers) or an Authorization: Bearer header (API clients, Swagger).
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokens: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.tokens.extractAccessToken(req);

    if (!token) {
      if (isPublic) return true;
      throw new UnauthorizedException('Not signed in');
    }

    const user = await this.tokens.verifyAccessToken(token);
    if (user) {
      req.user = user;
      return true;
    }
    // Public routes still work with a stale cookie; protected ones ask the client to refresh.
    if (isPublic) return true;
    throw new UnauthorizedException('Session expired');
  }
}
