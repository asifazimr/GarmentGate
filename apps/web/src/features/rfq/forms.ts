import { type QuoteDto, QuoteInputSchema, type RfqDto, RfqInputSchema } from '@garmentgate/shared';
import { z } from 'zod';
import { toMinor } from '@/lib/format';

/** Maps shared-schema issues onto the fields the user edits (prices are typed as "3.20"). */
function reportIssues(
  ctx: z.RefinementCtx,
  issues: z.core.$ZodIssue[],
  rename: Record<string, string>,
) {
  for (const issue of issues) {
    ctx.addIssue({
      code: 'custom',
      message: issue.message,
      path: issue.path.map((part) => (typeof part === 'string' ? (rename[part] ?? part) : part)),
    });
  }
}

const money = (value: string, currency: string): number | undefined | 'invalid' => {
  const clean = value.trim();
  if (clean === '') return undefined;
  const minor = toMinor(clean, currency);
  return Number.isNaN(minor) ? 'invalid' : minor;
};

export const RfqFormSchema = z
  .object({
    categoryId: z.string(),
    title: z.string(),
    description: z.string(),
    attachments: z.array(
      z.object({
        fileId: z.string(),
        kind: z.enum(['TECH_PACK', 'REFERENCE_IMAGE', 'SIZE_CHART', 'OTHER']),
        name: z.string(),
        sizeBytes: z.number(),
      }),
    ),
    quantity: z.string(),
    targetPrice: z.string(),
    currency: z.enum(['USD', 'EUR', 'GBP']),
    deadline: z.string(),
    requiredDeliveryDate: z.string(),
    destinationCountry: z.string(),
    incoterm: z.string(),
  })
  .transform((form, ctx): RfqDto => {
    const target = money(form.targetPrice, form.currency);
    if (target === 'invalid') {
      ctx.addIssue({ code: 'custom', path: ['targetPrice'], message: 'Enter a price like 3.20' });
      return z.NEVER;
    }
    const result = RfqInputSchema.safeParse({
      ...form,
      attachments: form.attachments.map(({ fileId, kind }) => ({ fileId, kind })),
      targetUnitPriceMinor: target,
      categoryId: form.categoryId || undefined,
      destinationCountry: form.destinationCountry || undefined,
      incoterm: form.incoterm || undefined,
    });
    if (result.success) return result.data;
    reportIssues(ctx, result.error.issues, { targetUnitPriceMinor: 'targetPrice' });
    return z.NEVER;
  });
export type RfqFormValues = z.input<typeof RfqFormSchema>;

/** Fields validated before leaving each wizard step. */
export const RFQ_STEPS = [
  ['categoryId', 'title', 'description'],
  [
    'quantity',
    'targetPrice',
    'currency',
    'deadline',
    'requiredDeliveryDate',
    'destinationCountry',
    'incoterm',
  ],
  [],
] as const;

export const QuoteFormSchema = z
  .object({
    currency: z.string(),
    price: z.string(),
    leadTimeDays: z.string(),
    moqPcs: z.string(),
    validUntil: z.string(),
    notes: z.string(),
  })
  .transform((form, ctx): QuoteDto => {
    const price = money(form.price, form.currency);
    if (price === undefined || price === 'invalid') {
      ctx.addIssue({ code: 'custom', path: ['price'], message: 'Enter a price like 3.20' });
      return z.NEVER;
    }
    const result = QuoteInputSchema.safeParse({ ...form, unitPriceMinor: price });
    if (result.success) return result.data;
    reportIssues(ctx, result.error.issues, { unitPriceMinor: 'price' });
    return z.NEVER;
  });
export type QuoteFormValues = z.input<typeof QuoteFormSchema>;
export const QUOTE_FIELDS = ['price', 'leadTimeDays', 'moqPcs', 'validUntil', 'notes'] as const;
