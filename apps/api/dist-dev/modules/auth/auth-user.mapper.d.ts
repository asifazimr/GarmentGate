import { type AccessTokenClaims, type AuthUser } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
export declare const authUserInclude: {
    company: {
        include: {
            buyerProfile: true;
            manufacturerProfile: true;
        };
    };
};
export type UserWithCompany = Prisma.UserGetPayload<{
    include: typeof authUserInclude;
}>;
export declare function toAuthUser(user: UserWithCompany): AuthUser;
export declare function toClaims(user: UserWithCompany): AccessTokenClaims;
