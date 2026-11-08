import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';

/**
 * Where GarmentGate pays a factory: a bank account it submits and staff verify before any
 * payout. Never sent to buyers; the factory sees its own masked.
 */

export const BankAccountStatusSchema = z.enum([
  'PENDING_REVIEW',
  'VERIFIED',
  'REJECTED',
  'REPLACED',
]);
export type BankAccountStatus = z.infer<typeof BankAccountStatusSchema>;

const text = (min: number, max: number, error: string) =>
  z.string().trim().min(min, { error }).max(max);
const optional = (max: number, pattern?: RegExp) =>
  z
    .union([
      pattern
        ? z.string().trim().toUpperCase().regex(pattern, { error: 'Check the format' })
        : z.string().trim().max(max),
      z.literal(''),
      z.null(),
    ])
    .optional()
    .transform((v) => (v === '' || v === undefined ? null : v));

export const FactoryBankAccountInputSchema = z.object({
  holderName: text(2, 140, 'Enter the account holder (the company’s legal name)'),
  bankName: text(2, 140, 'Enter the bank'),
  bankCountry: CountryCodeSchema,
  /** Account number or IBAN: letters, digits and spaces. */
  accountNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9 ]{5,40}$/, { error: 'Letters and digits only' })
    .transform((v) => v.replace(/\s+/g, '')),
  swiftBic: optional(11, /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/),
  routingCode: optional(30),
  branch: optional(140),
  currency: CurrencySchema,
});
export type FactoryBankAccountInput = z.input<typeof FactoryBankAccountInputSchema>;
export type FactoryBankAccountDto = z.output<typeof FactoryBankAccountInputSchema>;

/** "•••• 4521": what the factory sees of its own account after saving it. */
export function maskAccount(accountNumber: string): string {
  return `•••• ${accountNumber.slice(-4)}`;
}

export const FactoryBankAccountViewSchema = z.strictObject({
  holderName: z.string(),
  bankName: z.string(),
  bankCountry: z.string(),
  accountMasked: z.string(),
  swiftBic: z.string().nullable(),
  currency: CurrencySchema,
  status: BankAccountStatusSchema,
  reviewNote: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type FactoryBankAccountView = z.infer<typeof FactoryBankAccountViewSchema>;

export const BankDetailsSchema = z.object({
  holderName: z.string(),
  bankName: z.string(),
  bankCountry: z.string(),
  accountNumber: z.string(),
  swiftBic: z.string().nullable(),
  routingCode: z.string().nullable(),
  branch: z.string().nullable(),
  currency: CurrencySchema,
});
export type BankDetails = z.infer<typeof BankDetailsSchema>;

export const AdminBankAccountSchema = BankDetailsSchema.extend({
  id: z.uuid(),
  manufacturer: z.object({ code: z.string(), name: z.string(), country: z.string() }),
  status: BankAccountStatusSchema,
  reviewNote: z.string().nullable(),
  createdAt: z.iso.datetime(),
  reviewedAt: z.iso.datetime().nullable(),
  /** The holder doesn't match the factory's legal name: check before verifying. */
  holderMismatch: z.boolean(),
});
export type AdminBankAccount = z.infer<typeof AdminBankAccountSchema>;

export const ReviewBankAccountSchema = z
  .object({
    decision: z.enum(['VERIFY', 'REJECT']),
    note: z
      .string()
      .trim()
      .max(500)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
  })
  .refine((v) => v.decision === 'VERIFY' || (v.note?.length ?? 0) >= 5, {
    error: 'Say why it was rejected',
    path: ['note'],
  });
export type ReviewBankAccountDto = z.output<typeof ReviewBankAccountSchema>;
