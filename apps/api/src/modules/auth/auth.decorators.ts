import {
  createParamDecorator,
  type ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import type { KycStatus, Role } from '@garmentgate/shared';
import type { Request } from 'express';

/** What every authenticated request carries, decoded from the access token. */
export interface AuthenticatedUser {
  id: string;
  role: Role;
  emailVerified: boolean;
  kycStatus: KycStatus | null;
}

export type AuthenticatedRequest = Request & { user?: AuthenticatedUser };

export const IS_PUBLIC_KEY = 'auth:isPublic';
export const ROLES_KEY = 'auth:roles';

/** Opt a route or controller out of the global JWT guard. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** Restrict a route or controller to the given roles. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

/** Injects the authenticated user. Throws if used on a public route without a user. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!req.user) throw new UnauthorizedException();
    return req.user;
  },
);
