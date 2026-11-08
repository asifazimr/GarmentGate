import { z } from 'zod';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { InspectionTypeSchema } from './qc.schema.js';

/**
 * Gig QC inspectors (business model: "Gig economy layer"): freelancers apply, staff vet and
 * certify them, they take inspections from a task feed by distance and skill, check in by GPS
 * at the factory, file the AQL report and are paid per inspection day, weekly. Ratings, random
 * re-inspections and rotation (never the same factory too often) keep them honest.
 */

export const GigSettingsSchema = z.object({
  /** What GarmentGate pays an inspector per inspection day (USD minor units). */
  dayRateUsdMinor: z.number().int().min(0).max(1_000_000),
  /** How close to the factory a GPS check-in must be. */
  checkInRadiusM: z.number().int().min(50).max(5_000),
  /** At most this many inspections of one factory by one inspector in 90 days. */
  rotationLimit: z.number().int().min(1).max(50),
  /** Share of filed reports picked for a random re-inspection by an in-house lead. */
  auditSampleBps: z.number().int().min(0).max(10_000),
  /** Suspended automatically once rated at least this often with an average below the bar. */
  suspendBelowRating: z.number().min(1).max(5),
  minRatingsForSuspension: z.number().int().min(1).max(100),
});
export type GigSettings = z.infer<typeof GigSettingsSchema>;

export const DEFAULT_GIG_SETTINGS: GigSettings = {
  dayRateUsdMinor: 8_000,
  checkInRadiusM: 500,
  rotationLimit: 2,
  auditSampleBps: 1_000,
  suspendBelowRating: 3,
  minRatingsForSuspension: 5,
};

/** Great-circle distance in metres (haversine). */
export function distanceMeters(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number {
  const R = 6_371_000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

/** Rotation: may this inspector take another inspection at this factory? */
export function rotationAllows(
  recentAtFactory: number,
  settings: Pick<GigSettings, 'rotationLimit'>,
) {
  return recentAtFactory < settings.rotationLimit;
}

/** Removal after repeated low scores (business model: "removal after repeated low scores"). */
export function shouldSuspend(
  rating: { sum: number; count: number },
  settings: Pick<GigSettings, 'suspendBelowRating' | 'minRatingsForSuspension'>,
): boolean {
  return (
    rating.count >= settings.minRatingsForSuspension &&
    rating.sum / rating.count < settings.suspendBelowRating
  );
}

/** A report is picked for re-inspection when a uniform draw in [0, 10000) falls under the rate. */
export function pickedForAudit(draw: number, settings: Pick<GigSettings, 'auditSampleBps'>) {
  return draw < settings.auditSampleBps;
}

const Coordinate = {
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
};
export const CoordinatesSchema = z.object(Coordinate);
export type Coordinates = z.infer<typeof CoordinatesSchema>;

// ── Applying ────────────────────────────────────────────────────────────────

export const InspectorApplicationInputSchema = z.object({
  firstName: z.string().trim().min(1, { error: 'Enter your first name' }).max(60),
  lastName: z.string().trim().min(1, { error: 'Enter your last name' }).max(60),
  email: z.email({ error: 'Enter a valid email' }).trim().toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, { error: 'Enter a phone number with the country code' }),
  country: CountryCodeSchema,
  city: z.string().trim().min(2, { error: 'Enter your city' }).max(80),
  experienceYears: z.coerce.number().int().min(0).max(60),
  inspectionTypes: z.array(InspectionTypeSchema).min(1, { error: 'Pick at least one' }),
  about: z
    .string()
    .trim()
    .min(30, { error: 'Tell us about your QC experience (30 characters or more)' })
    .max(2000),
});
export type InspectorApplicationInput = z.input<typeof InspectorApplicationInputSchema>;
export type InspectorApplicationDto = z.output<typeof InspectorApplicationInputSchema>;

export const AdminInspectorApplicationSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  country: z.string(),
  city: z.string(),
  experienceYears: z.number().int(),
  inspectionTypes: z.array(InspectionTypeSchema),
  about: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  reviewNote: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type AdminInspectorApplication = z.infer<typeof AdminInspectorApplicationSchema>;

export const ReviewApplicationSchema = z
  .object({
    decision: z.enum(['APPROVE', 'REJECT']),
    /** Passed GarmentGate's certification test (approving needs it). */
    certified: z.boolean().default(false),
    serviceRadiusKm: z.coerce.number().int().min(1).max(1000).default(50),
    latitude: Coordinate.latitude.optional(),
    longitude: Coordinate.longitude.optional(),
    note: z
      .string()
      .trim()
      .max(500)
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
  })
  .refine((v) => v.decision === 'REJECT' || v.certified, {
    error: 'Inspectors are approved once they pass the certification',
    path: ['certified'],
  })
  .refine((v) => v.decision === 'APPROVE' || (v.note?.length ?? 0) >= 5, {
    error: 'Say why',
    path: ['note'],
  });
export type ReviewApplicationDto = z.output<typeof ReviewApplicationSchema>;

// ── Working ─────────────────────────────────────────────────────────────────

export const TaskSchema = z.object({
  inspectionId: z.uuid(),
  type: InspectionTypeSchema,
  orderCode: z.string(),
  title: z.string(),
  quantity: z.number().int(),
  /** Factory code and town only until claimed (the address comes with the job). */
  factory: z.object({ code: z.string(), city: z.string().nullable(), country: z.string() }),
  distanceKm: z.number().nullable(),
  scheduledAt: z.iso.datetime().nullable(),
  payUsdMinor: z.number().int(),
});
export type Task = z.infer<typeof TaskSchema>;

export const CheckInSchema = CoordinatesSchema;
export type CheckInDto = z.infer<typeof CheckInSchema>;

export const RateInspectionSchema = z.object({ rating: z.number().int().min(1).max(5) });
export type RateInspectionDto = z.infer<typeof RateInspectionSchema>;

export const PayoutMethodSchema = z.enum(['BANK', 'BKASH', 'NAGAD']);
export const InspectorPayoutDetailsSchema = z.object({
  method: PayoutMethodSchema,
  name: z.string().trim().min(2).max(140),
  /** Bank account (with bank and branch) or mobile wallet number. */
  account: z.string().trim().min(5).max(200),
});
export type InspectorPayoutDetailsDto = z.infer<typeof InspectorPayoutDetailsSchema>;

export const InspectorMeSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED']),
  city: z.string(),
  country: z.string(),
  serviceRadiusKm: z.number().int(),
  inspectionTypes: z.array(InspectionTypeSchema),
  rating: z.number().nullable(),
  ratingCount: z.number().int(),
  payout: z
    .object({
      method: PayoutMethodSchema,
      name: z.string(),
      accountMasked: z.string(),
      verified: z.boolean(),
    })
    .nullable(),
  /** Earned and not yet paid / paid so far (USD minor units). */
  dueUsdMinor: z.number().int(),
  paidUsdMinor: z.number().int(),
  jobs: z.array(
    z.object({
      inspectionId: z.uuid(),
      orderCode: z.string(),
      type: InspectionTypeSchema,
      inspectedAt: z.iso.datetime().nullable(),
      payUsdMinor: z.number().int().nullable(),
      paid: z.boolean(),
      rating: z.number().int().nullable(),
    }),
  ),
});
export type InspectorMe = z.infer<typeof InspectorMeSchema>;

// ── Staff ───────────────────────────────────────────────────────────────────

export const AdminGigInspectorSchema = z.object({
  userId: z.uuid(),
  name: z.string(),
  email: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED']),
  city: z.string(),
  country: z.string(),
  certified: z.boolean(),
  rating: z.number().nullable(),
  ratingCount: z.number().int(),
  inspections: z.number().int(),
  dueUsdMinor: z.number().int(),
  payout: z
    .object({
      method: PayoutMethodSchema,
      name: z.string(),
      account: z.string(),
      verified: z.boolean(),
    })
    .nullable(),
});
export type AdminGigInspector = z.infer<typeof AdminGigInspectorSchema>;

export const PayInspectorSchema = z.object({ bankReference: z.string().trim().min(3).max(80) });
export type PayInspectorDto = z.infer<typeof PayInspectorSchema>;

export const FactoryLocationSchema = CoordinatesSchema;
export type FactoryLocationDto = z.infer<typeof FactoryLocationSchema>;
