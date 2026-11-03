import {
  CurrencySchema,
  type ManufacturerLine,
  type ProductionLineDto,
  ProductionLineInputSchema,
  ProductionLineStatusSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { fromMinor, toMinor } from '@/lib/format';

/**
 * The line editor takes the CM rate as a human amount per 100 minutes ("6.50"); this converts it
 * to minor units and validates with the shared schema the API uses.
 */
export const LineFormSchema = z
  .object({
    code: z.string(),
    name: z.string(),
    categoryIds: z.array(z.string()),
    dailySamMinutes: z.union([z.string(), z.number()]),
    workingDays: z.array(z.number()),
    rate: z.string().regex(/^\s*\d+([.,]\d+)?\s*$/, { error: 'Enter a rate like 6.50' }),
    currency: CurrencySchema,
    status: ProductionLineStatusSchema,
  })
  .transform((form, ctx): ProductionLineDto => {
    const { rate, ...rest } = form;
    const result = ProductionLineInputSchema.safeParse({
      ...rest,
      cmRateMinorPer100Min: toMinor(rate, rest.currency),
    });
    if (result.success) return result.data;
    for (const issue of result.error.issues) {
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((part) => (part === 'cmRateMinorPer100Min' ? 'rate' : part)),
      });
    }
    return z.NEVER;
  });

export type LineFormValues = z.input<typeof LineFormSchema>;

export const EMPTY_LINE: LineFormValues = {
  code: '',
  name: '',
  categoryIds: [],
  dailySamMinutes: '',
  workingDays: [1, 2, 3, 4, 5, 6],
  rate: '',
  currency: 'USD',
  status: 'ACTIVE',
};

export function toLineFormValues(line: ManufacturerLine): LineFormValues {
  return {
    code: line.code,
    name: line.name,
    categoryIds: line.categories.map((c) => c.id),
    dailySamMinutes: line.dailySamMinutes,
    workingDays: line.workingDays,
    rate: fromMinor(line.cmRateMinorPer100Min, line.currency),
    currency: line.currency,
    status: line.status,
  };
}
