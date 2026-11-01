import { type ProductRequestDto, ProductRequestSchema } from '@garmentgate/shared';
import { z } from 'zod';
import { toMinor } from '@/lib/format';

/**
 * The dialog takes a human target price ("3.20"); this converts it to minor units and validates
 * with the shared schema the API uses, reporting issues on the fields the buyer edits.
 */
export const RequestFormSchema = z
  .object({
    kind: z.enum(['QUOTE', 'SAMPLE']),
    currency: z.string(),
    quantity: z.string(),
    sampleQuantity: z.string(),
    targetPrice: z.string(),
    neededBy: z.string(),
    destinationCountry: z.string(),
    notes: z.string(),
  })
  .transform((form, ctx): ProductRequestDto => {
    const price = form.targetPrice.trim();
    const targetUnitPriceMinor = price === '' ? undefined : toMinor(price, form.currency);
    if (Number.isNaN(targetUnitPriceMinor)) {
      ctx.addIssue({ code: 'custom', path: ['targetPrice'], message: 'Enter a price like 3.20' });
      return z.NEVER;
    }
    const result = ProductRequestSchema.safeParse({
      kind: form.kind,
      quantity: form.quantity,
      sampleQuantity: form.kind === 'SAMPLE' ? form.sampleQuantity : undefined,
      targetUnitPriceMinor,
      neededBy: form.neededBy,
      destinationCountry: form.destinationCountry || undefined,
      notes: form.notes,
    });
    if (result.success) return result.data;
    for (const issue of result.error.issues) {
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((part) => (part === 'targetUnitPriceMinor' ? 'targetPrice' : part)),
      });
    }
    return z.NEVER;
  });

export type RequestFormValues = z.input<typeof RequestFormSchema>;
export const REQUEST_FIELDS = [
  'quantity',
  'sampleQuantity',
  'targetPrice',
  'neededBy',
  'destinationCountry',
  'notes',
] as const;
