import { type CompanyInfoDto, type OnboardingState } from '@garmentgate/shared';
import type { Response } from 'express';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { AuthService } from '../auth/auth.service.js';
import { TokenService } from '../auth/token.service.js';
import { OnboardingService } from './onboarding.service.js';
export declare class OnboardingController {
    private readonly onboarding;
    private readonly auth;
    private readonly tokens;
    constructor(onboarding: OnboardingService, auth: AuthService, tokens: TokenService);
    state(user: AuthenticatedUser): Promise<OnboardingState>;
    saveCompany(user: AuthenticatedUser, dto: CompanyInfoDto): Promise<OnboardingState>;
    saveProfile(user: AuthenticatedUser, body: unknown): Promise<OnboardingState>;
    submit(user: AuthenticatedUser, res: Response): Promise<OnboardingState>;
}
