import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { WEEKDAYS } from './lines.js';

export const ProductionLineStatusSchema = z.enum(['ACTIVE', 'PAUSED', 'RETIRED']);
export type ProductionLineStatus = z.infer<typeof ProductionLineStatusSchema>;

const IsoDateSchema = z.iso.date({ error: 'Pick a date' });

/** A line as the factory configures it. */
export const ProductionLineInputSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, { error: 'Give the line a code' })
    .max(20)
    .regex(/^[A-Za-z0-9-]+$/, { error: 'Letters, digits and dashes only' }),
  name: z.string().trim().min(2, { error: 'Give the line a name' }).max(80),
  categoryIds: z.array(z.uuid()).min(1, { error: 'Pick at least one category' }).max(20),
  /** SAM minutes per working day (e.g. 30 operators × 480 min × 75% efficiency ≈ 10,800). */
  dailySamMinutes: z.coerce
    .number({ error: 'Enter a number' })
    .int()
    .min(60, { error: 'At least 60 minutes a day' })
    .max(200_000),
  workingDays: z
    .array(z.union(WEEKDAYS.map((d) => z.literal(d))))
    .min(1, { error: 'Pick at least one working day' })
    .max(7)
    .refine((d) => new Set(d).size === d.length, { error: 'Each day once' }),
  /** Cost of making in minor units per 100 SAM minutes (650 = 6.50 per 100 minutes). */
  cmRateMinorPer100Min: z.coerce
    .number({ error: 'Enter a rate' })
    .int()
    .min(1, { error: 'Enter a rate' })
    .max(10_000_000),
  currency: CurrencySchema.default('USD'),
  status: ProductionLineStatusSchema.default('ACTIVE'),
});
export type ProductionLineInput = z.input<typeof ProductionLineInputSchema>;
export type ProductionLineDto = z.output<typeof ProductionLineInputSchema>;

export const ManufacturerLineSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  categories: z.array(z.object({ id: z.uuid(), name: z.string() })),
  dailySamMinutes: z.number().int(),
  workingDays: z.array(z.number().int()),
  cmRateMinorPer100Min: z.number().int(),
  currency: CurrencySchema,
  status: ProductionLineStatusSchema,
  /** Minutes booked in open slots from today on (lines with bookings can't be deleted). */
  upcomingBookedMinutes: z.number().int(),
});
export type ManufacturerLine = z.infer<typeof ManufacturerLineSchema>;

/** Opening a window of a line's time for booking (inclusive dates). */
export const CapacitySlotInputSchema = z
  .object({
    lineId: z.uuid(),
    startDate: IsoDateSchema,
    endDate: IsoDateSchema,
    /** Optional: offer less than the line's full capacity in the window. */
    totalMinutes: z.coerce.number().int().min(1).optional(),
  })
  .refine((v) => v.endDate >= v.startDate, {
    path: ['endDate'],
    error: 'The end can’t be before the start',
  });
export type CapacitySlotInput = z.input<typeof CapacitySlotInputSchema>;
export type CapacitySlotDto = z.output<typeof CapacitySlotInputSchema>;

export const CapacitySlotUpdateSchema = z
  .object({
    endDate: IsoDateSchema.optional(),
    totalMinutes: z.coerce.number().int().min(1).optional(),
    status: z.enum(['OPEN', 'CLOSED']).optional(),
  })
  .refine(
    (v) => v.endDate !== undefined || v.totalMinutes !== undefined || v.status !== undefined,
    {
      error: 'Nothing to update',
    },
  );
export type CapacitySlotUpdateInput = z.input<typeof CapacitySlotUpdateSchema>;
export type CapacitySlotUpdateDto = z.output<typeof CapacitySlotUpdateSchema>;

export const CapacitySlotSchema = z.object({
  id: z.uuid(),
  lineId: z.uuid(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  totalMinutes: z.number().int(),
  bookedMinutes: z.number().int(),
  status: z.enum(['OPEN', 'CLOSED']),
});
export type CapacitySlot = z.infer<typeof CapacitySlotSchema>;

export const LineCalendarQuerySchema = z.object({
  from: IsoDateSchema,
  days: z.coerce.number().int().min(1).max(62).default(31),
});
export type LineCalendarQuery = z.infer<typeof LineCalendarQuerySchema>;

/** One line's days in the calendar window. */
export const LineCalendarDaySchema = z.object({
  date: z.iso.date(),
  working: z.boolean(),
  /** Minutes the line can offer that day (0 on non-working days). */
  capacityMinutes: z.number().int(),
  /** Opened for booking that day (inside an open slot). */
  openMinutes: z.number().int(),
  /** Booked that day: the slot's booked share spread over its working days. */
  bookedMinutes: z.number().int(),
  slotId: z.uuid().nullable(),
});
export type LineCalendarDay = z.infer<typeof LineCalendarDaySchema>;

export const LineCalendarSchema = z.object({
  from: z.iso.date(),
  days: z.number().int(),
  lines: z.array(
    z.object({
      line: ManufacturerLineSchema,
      slots: z.array(CapacitySlotSchema),
      days: z.array(LineCalendarDaySchema),
    }),
  ),
});
export type LineCalendar = z.infer<typeof LineCalendarSchema>;
