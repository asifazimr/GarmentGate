import { z } from 'zod';
import { OwnedImageSchema } from '../media/media.schema.js';

export const CurrencySchema = z.enum([
  'USD',
  'EUR',
  'GBP',
  'BDT',
  'INR',
  'VND',
  'TRY',
  'PKR',
  'CNY',
]);
export type Currency = z.infer<typeof CurrencySchema>;

export const ProductStatusSchema = z.enum(['DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED']);
export type ProductStatus = z.infer<typeof ProductStatusSchema>;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' ? undefined : v));

const int = (min: number, max: number) => z.coerce.number().int().min(min).max(max);

/** A tier as the manufacturer enters it: their own price per unit, in minor units. */
export const PriceTierInputSchema = z.object({
  minQty: int(1, 10_000_000),
  unitPriceMinor: int(1, 100_000_000),
});

export const ProductInputSchema = z
  .object({
    title: z.string().trim().min(3, { error: 'Give the product a name' }).max(120),
    categoryId: z.uuid({ error: 'Pick a category' }),
    description: optionalText(2000),
    fabric: optionalText(120),
    composition: optionalText(160),
    gsm: z.preprocess((v) => (v === '' || v === null ? undefined : v), int(20, 2000).optional()),
    moqPcs: int(1, 10_000_000),
    leadTimeDays: int(1, 365),
    currency: CurrencySchema.default('USD'),
    priceTiers: z
      .array(PriceTierInputSchema)
      .min(1, { error: 'Add at least one price tier' })
      .max(6),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  })
  .superRefine((v, ctx) => {
    const quantities = v.priceTiers.map((t) => t.minQty);
    if (new Set(quantities).size !== quantities.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['priceTiers'],
        message: 'Each tier needs a different quantity',
      });
    }
    const sorted = [...v.priceTiers].sort((a, b) => a.minQty - b.minQty);
    if (sorted[0] && sorted[0].minQty > v.moqPcs) {
      ctx.addIssue({
        code: 'custom',
        path: ['priceTiers'],
        message: 'The first tier should start at or below the MOQ',
      });
    }
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const cur = sorted[i];
      if (prev && cur && cur.unitPriceMinor > prev.unitPriceMinor) {
        ctx.addIssue({
          code: 'custom',
          path: ['priceTiers'],
          message: 'Larger quantities should not cost more per piece',
        });
        break;
      }
    }
  });
export type ProductInput = z.input<typeof ProductInputSchema>;
export type ProductDto = z.output<typeof ProductInputSchema>;

/**
 * A product as its manufacturer sees it. Contains the manufacturer's own prices only:
 * the buyer-facing price (and therefore GarmentGate's margin) is never sent to them.
 */
export const ManufacturerProductSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  categoryId: z.uuid(),
  categoryName: z.string(),
  description: z.string().nullable(),
  fabric: z.string().nullable(),
  composition: z.string().nullable(),
  gsm: z.number().int().nullable(),
  moqPcs: z.number().int(),
  leadTimeDays: z.number().int(),
  currency: CurrencySchema,
  status: ProductStatusSchema,
  priceTiers: z.array(z.object({ minQty: z.number().int(), unitPriceMinor: z.number().int() })),
  images: z.array(OwnedImageSchema),
  updatedAt: z.iso.datetime(),
});
export type ManufacturerProduct = z.infer<typeof ManufacturerProductSchema>;
