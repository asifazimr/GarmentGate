import { DEFAULT_LOCALE, isLocale, } from '@garmentgate/shared';
export const authUserInclude = {
    company: { include: { buyerProfile: true, manufacturerProfile: true } },
};
export function toAuthUser(user) {
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
                publicCode: company.manufacturerProfile?.publicCode ?? company.buyerProfile?.publicCode ?? null,
                kycStatus: company.kycStatus,
                onboardingStep: company.onboardingStep,
                kycRejectionReason: company.kycRejectionReason,
            }
            : null,
    };
}
export function toClaims(user) {
    return {
        sub: user.id,
        role: user.role,
        ev: user.emailVerifiedAt !== null,
        kyc: user.company?.kycStatus ?? null,
    };
}
//# sourceMappingURL=auth-user.mapper.js.map