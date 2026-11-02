import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { DEFAULT_LOCALE, LocaleSchema } from '../i18n/locales.js';
import { RoleSchema } from './roles.js';

export const KycStatusSchema = z.enum(['NOT_SUBMITTED', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED']);
export type KycStatus = z.infer<typeof KycStatusSchema>;

export const OnboardingStepSchema = z.enum(['COMPANY_INFO', 'PROFILE', 'DOCUMENTS', 'SUBMITTED']);
export type OnboardingStep = z.infer<typeof OnboardingStepSchema>;

/** Roles a person can sign up as. Admins are created internally. */
export const SignupRoleSchema = z.enum(['BUYER', 'MANUFACTURER']);
export type SignupRole = z.infer<typeof SignupRoleSchema>;

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: 'Enter a valid email address' }).max(254));

export const PasswordSchema = z
  .string()
  .min(10, { error: 'Use at least 10 characters' })
  .max(128, { error: 'Use at most 128 characters' })
  .regex(/[A-Za-z]/, { error: 'Include at least one letter' })
  .regex(/\d/, { error: 'Include at least one number' });

const NameSchema = z.string().trim().min(1, { error: 'Required' }).max(80);

export const RegisterSchema = z.object({
  role: SignupRoleSchema,
  firstName: NameSchema,
  lastName: NameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  locale: z.string().min(2).max(10).default('en'),
  acceptTerms: z
    .boolean()
    .refine((accepted) => accepted, { error: 'Please accept the terms to continue' }),
});
export type RegisterInput = z.input<typeof RegisterSchema>;
export type RegisterDto = z.output<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, { error: 'Enter your password' }).max(128),
});
export type LoginInput = z.input<typeof LoginSchema>;
export type LoginDto = z.output<typeof LoginSchema>;

const TokenSchema = z.string().min(20).max(200);

export const VerifyEmailSchema = z.object({ token: TokenSchema });
export type VerifyEmailDto = z.infer<typeof VerifyEmailSchema>;

export const ForgotPasswordSchema = z.object({ email: EmailSchema });
export type ForgotPasswordInput = z.input<typeof ForgotPasswordSchema>;
export type ForgotPasswordDto = z.output<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({ token: TokenSchema, password: PasswordSchema });
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;

/** The signed-in user as returned by /auth/me, /auth/login, /auth/register, /auth/refresh. */
export const AuthUserSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: RoleSchema,
  /** Unknown codes (e.g. a language later removed) fall back to English. */
  locale: LocaleSchema.catch(DEFAULT_LOCALE),
  /** Also show amounts converted to this currency (approximate, for orientation only). */
  displayCurrency: CurrencySchema.nullable(),
  emailVerified: z.boolean(),
  company: z
    .object({
      id: z.uuid(),
      type: SignupRoleSchema,
      displayName: z.string(),
      publicCode: z.string().nullable(),
      kycStatus: KycStatusSchema,
      onboardingStep: OnboardingStepSchema,
      kycRejectionReason: z.string().nullable(),
    })
    .nullable(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthResponseSchema = z.object({ user: AuthUserSchema });

/** The signed-in user's own display preferences. */
export const UpdatePreferencesSchema = z
  .object({
    locale: LocaleSchema.optional(),
    displayCurrency: CurrencySchema.nullable().optional(),
  })
  .refine((v) => v.locale !== undefined || v.displayCurrency !== undefined, {
    error: 'Nothing to update',
  });
export type UpdatePreferencesDto = z.infer<typeof UpdatePreferencesSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

/**
 * Claims inside the access-token JWT. Kept small: the web proxy only needs enough to route.
 * Refresh the token after any change to role, email verification or KYC state.
 */
export const AccessTokenClaimsSchema = z.object({
  sub: z.uuid(),
  role: RoleSchema,
  /** Email verified */
  ev: z.boolean(),
  /** Company KYC status; null until the company exists */
  kyc: KycStatusSchema.nullable(),
});
export type AccessTokenClaims = z.infer<typeof AccessTokenClaimsSchema>;

export const AUTH_COOKIES = {
  accessToken: 'gg_at',
  refreshToken: 'gg_rt',
} as const;
