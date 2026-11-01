import {
  CurrencySchema,
  type ManufacturerProduct,
  type ProductDto,
  ProductInputSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { fromMinor, toMinor } from '@/lib/format';

/**
 * The editor works in human prices ("3.60"); this converts them to integer minor units and then
 * validates with the same shared schema the API uses.
 */
export const ProductFormSchema = z
  .object({
    title: z.string(),
    categoryId: z.string(),
    description: z.string().optional(),
    fabric: z.string().optional(),
    composition: z.string().optional(),
    gsm: z.union([z.string(), z.number()]).optional(),
    moqPcs: z.union([z.string(), z.number()]),
    leadTimeDays: z.union([z.string(), z.number()]),
    currency: CurrencySchema,
    status: z.enum(['DRAFT', 'PUBLISHED']),
    priceTiers: z.array(
      z.object({
        minQty: z.union([z.string(), z.number()]),
        price: z.string().regex(/^\s*\d+([.,]\d+)?\s*$/, { error: 'Enter a price like 3.60' }),
      }),
    ),
  })
  .transform((form, ctx): ProductDto => {
    const { priceTiers, ...rest } = form;
    const result = ProductInputSchema.safeParse({
      ...rest,
      priceTiers: priceTiers.map((t) => ({
        minQty: t.minQty,
        unitPriceMinor: toMinor(t.price, rest.currency),
      })),
    });
    if (result.success) return result.data;
    // Report shared-schema issues on the fields the user actually edits.
    for (const issue of result.error.issues) {
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((part) => (part === 'unitPriceMinor' ? 'price' : part)),
      });
    }
    return z.NEVER;
  });

export type ProductFormValues = z.input<typeof ProductFormSchema>;

export const EMPTY_PRODUCT: ProductFormValues = {
  title: '',
  categoryId: '',
  description: '',
  fabric: '',
  composition: '',
  gsm: '',
  moqPcs: '',
  leadTimeDays: '',
  currency: 'USD',
  status: 'DRAFT',
  priceTiers: [
    { minQty: '500', price: '' },
    { minQty: '1000', price: '' },
    { minQty: '5000', price: '' },
  ],
};

export function toFormValues(p: ManufacturerProduct): ProductFormValues {
  return {
    title: p.title,
    categoryId: p.categoryId,
    description: p.description ?? '',
    fabric: p.fabric ?? '',
    composition: p.composition ?? '',
    gsm: p.gsm ?? '',
    moqPcs: p.moqPcs,
    leadTimeDays: p.leadTimeDays,
    currency: p.currency,
    status: p.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    priceTiers: p.priceTiers.map((t) => ({
      minQty: t.minQty,
      price: fromMinor(t.unitPriceMinor, p.currency),
    })),
  };
}
