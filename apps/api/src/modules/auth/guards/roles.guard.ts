import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Role } from '@garmentgate/shared';
import { type AuthenticatedRequest, IS_PUBLIC_KEY, ROLES_KEY } from '../auth.decorators.js';

/** Who a route without @Roles serves. Inspectors are left out so they only see QC routes. */
const DEFAULT_ROLES: readonly Role[] = ['BUYER', 'MANUFACTURER', 'ADMIN'];

/** Global guard enforcing @Roles(...); routes without it allow DEFAULT_ROLES. */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== 'http') return true; // see JwtAuthGuard
    const targets = [context.getHandler(), context.getClass()];
    const roles = this.reflector.getAllAndOverride<Role[] | undefined>(ROLES_KEY, targets);
    if (this.reflector.getAllAndOverride<boolean | undefined>(IS_PUBLIC_KEY, targets)) return true;
    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!user) return true; // unreachable: the JWT guard runs first
    const allowed = roles && roles.length > 0 ? roles : DEFAULT_ROLES;
    if (allowed.includes(user.role)) return true;
    throw new ForbiddenException('You do not have access to this resource');
  }
}
