import {
  type AccessTokenClaims,
  type AuthUser,
  DEFAULT_LOCALE,
  isLocale,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';

export const authUserInclude = {
  company: { include: { buyerProfile: true, manufacturerProfile: true } },
} satisfies Prisma.UserInclude;

export type UserWithCompany = Prisma.UserGetPayload<{ include: typeof authUserInclude }>;

/** The signed-in user's own view of themselves (their own company name is fine to show). */
export function toAuthUser(user: UserWithCompany): AuthUser {
  const { company } = user;
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    locale: isLocale(user.locale) ? user.locale : DEFAULT_LOCALE,
    displayCurrency: user.displayCurrency,
    emailVerified: user.emailVerifiedAt !== null,
    company: company
      ? {
          id: company.id,
          type: company.type,
          displayName: company.tradeName ?? company.legalName,
          publicCode:
            company.manufacturerProfile?.publicCode ?? company.buyerProfile?.publicCode ?? null,
          kycStatus: company.kycStatus,
          onboardingStep: company.onboardingStep,
          kycRejectionReason: company.kycRejectionReason,
        }
      : null,
  };
}

export function toClaims(user: UserWithCompany): AccessTokenClaims {
  return {
    sub: user.id,
    role: user.role,
    ev: user.emailVerifiedAt !== null,
    kyc: user.company?.kycStatus ?? null,
  };
}
