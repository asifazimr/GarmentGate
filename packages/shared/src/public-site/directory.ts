import { z } from 'zod';
import { CertificationTypeSchema } from '../onboarding/onboarding.schema.js';

/**
 * Category and sourcing-country directory for the public website. Totals and ranges only:
 * how many listed, verified factories make something, never which ones.
 */
const range = z.strictObject({ min: z.number().int(), max: z.number().int() }).nullable();

export const DirectoryCategorySchema = z.strictObject({
  slug: z.string(),
  name: z.string(),
  parentSlug: z.string().nullable(),
  factories: z.number().int().min(0),
  products: z.number().int().min(0),
  countries: z.array(z.string()),
  /** Smallest minimum order among those factories and products (pieces). */
  minMoq: z.number().int().nullable(),
  leadTimeDays: range,
});
export type DirectoryCategory = z.infer<typeof DirectoryCategorySchema>;

export const DirectoryCountrySchema = z.strictObject({
  code: z.string().length(2),
  factories: z.number().int().min(0),
  products: z.number().int().min(0),
  /** Category slugs made there, most factories first. */
  categories: z.array(z.string()),
  certifications: z.array(
    z.strictObject({ type: CertificationTypeSchema, factories: z.number().int() }),
  ),
  minMoq: z.number().int().nullable(),
  leadTimeDays: range,
});
export type DirectoryCountry = z.infer<typeof DirectoryCountrySchema>;

export const PublicDirectorySchema = z.strictObject({
  categories: z.array(DirectoryCategorySchema),
  countries: z.array(DirectoryCountrySchema),
});
export type PublicDirectory = z.infer<typeof PublicDirectorySchema>;
