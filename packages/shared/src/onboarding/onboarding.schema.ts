import { z } from 'zod';
import { KycStatusSchema, OnboardingStepSchema } from '../auth/auth.schema.js';

export const CountryCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{2}$/, { error: 'Use a 2-letter country code' });

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === '' ? undefined : value));

const positiveInt = (max: number) => z.coerce.number().int().positive().max(max);
const optionalPositiveInt = (max: number) =>
  z.preprocess(
    (value) => (value === '' || value === null ? undefined : value),
    positiveInt(max).optional(),
  );

const currentYear = new Date().getFullYear();

// ── Step 1: company info (shared by both roles) ─────────────────────────────

export const CompanyInfoSchema = z.object({
  legalName: z.string().trim().min(2, { error: 'Enter your registered company name' }).max(200),
  tradeName: optionalText(200),
  country: CountryCodeSchema,
  city: z.string().trim().min(1, { error: 'Required' }).max(100),
  addressLine1: z.string().trim().min(1, { error: 'Required' }).max(200),
  addressLine2: optionalText(200),
  postalCode: optionalText(20),
  registrationNumber: z.string().trim().min(2, { error: 'Required' }).max(100),
  website: z
    .union([z.url({ error: 'Enter a full URL, e.g. https://example.com' }), z.literal('')])
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  phone: optionalText(40),
  yearEstablished: z.preprocess(
    (value) => (value === '' || value === null ? undefined : value),
    z.coerce.number().int().min(1850).max(currentYear).optional(),
  ),
});
export type CompanyInfoInput = z.input<typeof CompanyInfoSchema>;
export type CompanyInfoDto = z.output<typeof CompanyInfoSchema>;

// ── Step 2a: manufacturer capabilities ──────────────────────────────────────

export const MachineSchema = z.object({
  type: z.string().trim().min(2).max(80),
  count: positiveInt(100_000),
});

export const ManufacturerCapabilitiesSchema = z
  .object({
    categoryIds: z.array(z.uuid()).min(1, { error: 'Pick at least one category' }).max(20),
    headline: optionalText(120),
    about: optionalText(2000),
    monthlyCapacityPcs: positiveInt(100_000_000),
    moqPcs: positiveInt(1_000_000),
    sampleLeadTimeDays: positiveInt(365),
    productionLeadTimeMinDays: positiveInt(365),
    productionLeadTimeMaxDays: positiveInt(365),
    workforceSize: positiveInt(1_000_000),
    factorySizeSqm: optionalPositiveInt(10_000_000),
    machinery: z.array(MachineSchema).max(30).default([]),
    exportMarkets: z.array(CountryCodeSchema).max(100).default([]),
  })
  .refine((v) => v.productionLeadTimeMaxDays >= v.productionLeadTimeMinDays, {
    path: ['productionLeadTimeMaxDays'],
    error: 'Must be at least the minimum lead time',
  });
export type ManufacturerCapabilitiesInput = z.input<typeof ManufacturerCapabilitiesSchema>;
export type ManufacturerCapabilitiesDto = z.output<typeof ManufacturerCapabilitiesSchema>;

// ── Step 2b: buyer sourcing needs ───────────────────────────────────────────

export const BuyerBusinessTypeSchema = z.enum([
  'BRAND',
  'RETAILER',
  'IMPORTER',
  'WHOLESALER',
  'SOURCING_AGENT',
  'OTHER',
]);
export type BuyerBusinessType = z.infer<typeof BuyerBusinessTypeSchema>;

export const BuyerSourcingNeedsSchema = z.object({
  businessType: BuyerBusinessTypeSchema,
  categoryIds: z.array(z.uuid()).min(1, { error: 'Pick at least one category' }).max(20),
  annualVolumePcs: optionalPositiveInt(1_000_000_000),
  typicalOrderQuantityPcs: optionalPositiveInt(10_000_000),
  targetMarkets: z.array(CountryCodeSchema).max(100).default([]),
  sourcingNeeds: optionalText(2000),
});
export type BuyerSourcingNeedsInput = z.input<typeof BuyerSourcingNeedsSchema>;
export type BuyerSourcingNeedsDto = z.output<typeof BuyerSourcingNeedsSchema>;

// ── Step 3: documents ───────────────────────────────────────────────────────

export const KycDocumentTypeSchema = z.enum([
  'BUSINESS_LICENSE',
  'EXPORT_REGISTRATION',
  'TAX_CERTIFICATE',
  'OTHER',
]);
export type KycDocumentType = z.infer<typeof KycDocumentTypeSchema>;

export const CertificationTypeSchema = z.enum([
  'BSCI_AMFORI',
  'WRAP',
  'SEDEX_SMETA',
  'OEKO_TEX_100',
  'GOTS',
  'GRS',
  'BCI',
  'ISO_9001',
  'ISO_14001',
  'SA8000',
  'FAIR_TRADE',
  'HIGG_FEM',
  'OTHER',
]);
export type CertificationType = z.infer<typeof CertificationTypeSchema>;

export const ReviewStateSchema = z.enum(['PENDING', 'VERIFIED', 'REJECTED']);

/** Documents each role must upload before submitting for verification. */
export const REQUIRED_KYC_DOCUMENTS = {
  BUYER: ['BUSINESS_LICENSE'],
  MANUFACTURER: ['BUSINESS_LICENSE', 'EXPORT_REGISTRATION'],
} as const satisfies Record<'BUYER' | 'MANUFACTURER', readonly KycDocumentType[]>;

export const UPLOAD_MAX_BYTES = 10 * 1024 * 1024;
export const UPLOAD_CONTENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const UploadPurposeSchema = z.enum(['KYC_DOCUMENT', 'CERTIFICATION']);

export const PresignUploadSchema = z.object({
  purpose: UploadPurposeSchema,
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(UPLOAD_CONTENT_TYPES, { error: 'Upload a PDF, JPG, PNG or WebP file' }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(UPLOAD_MAX_BYTES, { error: 'Files can be at most 10 MB' }),
});
export type PresignUploadDto = z.infer<typeof PresignUploadSchema>;

/** Browser POSTs the file as multipart/form-data to `url` with `fields` + `file` last. */
export const PresignUploadResponseSchema = z.object({
  fileId: z.uuid(),
  url: z.url(),
  fields: z.record(z.string(), z.string()),
  expiresAt: z.iso.datetime(),
});
export type PresignUploadResponse = z.infer<typeof PresignUploadResponseSchema>;

const optionalDate = z.preprocess(
  (value) => (value === '' || value === null ? undefined : value),
  z.coerce.date().optional(),
);

export const AddCompanyDocumentSchema = z.object({
  fileId: z.uuid(),
  type: KycDocumentTypeSchema,
  documentNumber: optionalText(100),
  expiresAt: optionalDate,
});
export type AddCompanyDocumentDto = z.output<typeof AddCompanyDocumentSchema>;

export const AddCertificationSchema = z
  .object({
    fileId: z.uuid(),
    type: CertificationTypeSchema,
    customName: optionalText(100),
    certificateNumber: optionalText(100),
    issuedAt: optionalDate,
    expiresAt: optionalDate,
  })
  .refine((v) => v.type !== 'OTHER' || v.customName, {
    path: ['customName'],
    error: 'Name the certification',
  });
export type AddCertificationDto = z.output<typeof AddCertificationSchema>;

// ── Responses ───────────────────────────────────────────────────────────────

export const UploadedFileSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  sizeBytes: z.number().int(),
});

export const CompanyDocumentSchema = z.object({
  id: z.uuid(),
  type: KycDocumentTypeSchema,
  status: ReviewStateSchema,
  documentNumber: z.string().nullable(),
  expiresAt: z.iso.datetime().nullable(),
  file: UploadedFileSchema,
  createdAt: z.iso.datetime(),
});
export type CompanyDocument = z.infer<typeof CompanyDocumentSchema>;

export const CertificationSchema = z.object({
  id: z.uuid(),
  type: CertificationTypeSchema,
  customName: z.string().nullable(),
  certificateNumber: z.string().nullable(),
  issuedAt: z.iso.datetime().nullable(),
  expiresAt: z.iso.datetime().nullable(),
  status: z.enum(['PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED']),
  file: UploadedFileSchema.nullable(),
});
export type Certification = z.infer<typeof CertificationSchema>;

export const OnboardingStateSchema = z.object({
  role: z.enum(['BUYER', 'MANUFACTURER']),
  step: OnboardingStepSchema,
  kycStatus: KycStatusSchema,
  rejectionReason: z.string().nullable(),
  emailVerified: z.boolean(),
  publicCode: z.string().nullable(),
  submittedAt: z.iso.datetime().nullable(),
  company: CompanyInfoSchema.nullable(),
  manufacturerProfile: ManufacturerCapabilitiesSchema.nullable(),
  buyerProfile: BuyerSourcingNeedsSchema.nullable(),
  documents: z.array(CompanyDocumentSchema),
  certifications: z.array(CertificationSchema),
  missingDocuments: z.array(KycDocumentTypeSchema),
  canSubmit: z.boolean(),
});
export type OnboardingState = z.infer<typeof OnboardingStateSchema>;

export const CategorySchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  name: z.string(),
  parentId: z.uuid().nullable(),
});
export type Category = z.infer<typeof CategorySchema>;

export const RejectKycSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, { error: 'Explain what needs fixing (10+ characters)' })
    .max(1000),
});
export type RejectKycDto = z.infer<typeof RejectKycSchema>;

/** An optional internal note on an approval: staff only, kept in the audit log. */
export const ApproveKycSchema = z.preprocess(
  (v) => v ?? {},
  z.object({
    note: z
      .string()
      .trim()
      .max(1000)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
  }),
);
export type ApproveKycInput = z.input<typeof ApproveKycSchema>;
export type ApproveKycDto = z.output<typeof ApproveKycSchema>;

export const AdminKycCompanySchema = z.object({
  id: z.uuid(),
  type: z.enum(['BUYER', 'MANUFACTURER']),
  legalName: z.string(),
  country: z.string(),
  publicCode: z.string().nullable(),
  kycStatus: KycStatusSchema,
  submittedAt: z.iso.datetime().nullable(),
  owner: z.object({ name: z.string(), email: z.string(), emailVerified: z.boolean() }).nullable(),
  documentCount: z.number().int(),
  certificationCount: z.number().int(),
});
export type AdminKycCompany = z.infer<typeof AdminKycCompanySchema>;

/** Full submission as an admin reviews it. ADMIN-ONLY: contains the real identity. */
export const AdminKycCompanyDetailSchema = AdminKycCompanySchema.extend({
  rejectionReason: z.string().nullable(),
  company: CompanyInfoSchema,
  categories: z.array(z.string()),
  profileSummary: z.record(z.string(), z.union([z.string(), z.number(), z.null()])),
  documents: z.array(CompanyDocumentSchema.extend({ fileId: z.uuid() })),
  certifications: z.array(CertificationSchema.extend({ fileId: z.uuid().nullable() })),
});
export type AdminKycCompanyDetail = z.infer<typeof AdminKycCompanyDetailSchema>;
