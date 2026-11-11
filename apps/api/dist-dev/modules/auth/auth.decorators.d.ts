import type { KycStatus, Role } from '@garmentgate/shared';
import type { Request } from 'express';
export interface AuthenticatedUser {
    id: string;
    role: Role;
    emailVerified: boolean;
    kycStatus: KycStatus | null;
}
export type AuthenticatedRequest = Request & {
    user?: AuthenticatedUser;
};
export declare const IS_PUBLIC_KEY = "auth:isPublic";
export declare const ROLES_KEY = "auth:roles";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const AnyRole: () => import("@nestjs/common").CustomDecorator<string>;
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
