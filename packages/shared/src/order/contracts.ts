import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';
import { CountryCodeSchema } from '../onboarding/onboarding.schema.js';
import { IncotermSchema } from '../rfq/rfq.schema.js';
import { OrderStatusSchema } from '../status/statuses.js';

/**
 * Supply contracts (business model: corporate and institutional buyers, "yearly uniform
 * contracts"): one product from one factory at fixed prices for a period and a volume; the
 * buyer calls off orders against it. Each side sees only its own price and the other's code.
 */

export const SupplyContractStatusSchema = z.enum(['ACTIVE', 'ENDED', 'CANCELLED']);
export type SupplyContractStatus = z.infer<typeof SupplyContractStatusSchema>;

const qty = z.coerce.number().int().min(1).max(10_000_000);

export const CreateContractSchema = z
  .object({
    buyerCode: z.string().regex(/^BYR-[A-Z]{2}-\d{4}$/, { error: 'Enter a buyer code' }),
    manufacturerCode: z.string().regex(/^MFR-[A-Z]{2}-\d{4}$/, { error: 'Enter a factory code' }),
    title: z.string().trim().min(3).max(140),
    specification: z.string().trim().min(10, { error: 'Describe the product' }).max(4000),
    currency: CurrencySchema,
    buyerUnitPriceMinor: z.number().int().positive(),
    manufacturerUnitPriceMinor: z.number().int().positive(),
    contractedQuantity: qty,
    minCallOffQuantity: qty,
    depositBps: z.number().int().min(0).max(10_000),
    incoterm: IncotermSchema,
    destinationCountry: CountryCodeSchema,
    leadTimeDays: z.coerce.number().int().min(0).max(365),
    startsOn: z.iso.date(),
    endsOn: z.iso.date(),
  })
  .refine((v) => v.buyerUnitPriceMinor >= v.manufacturerUnitPriceMinor, {
    error: 'The buyer price must cover the factory price',
    path: ['buyerUnitPriceMinor'],
  })
  .refine((v) => v.minCallOffQuantity <= v.contractedQuantity, {
    error: 'The minimum call-off can’t exceed the contracted volume',
    path: ['minCallOffQuantity'],
  })
  .refine((v) => v.endsOn >= v.startsOn, { error: 'Ends before it starts', path: ['endsOn'] });
export type CreateContractInput = z.input<typeof CreateContractSchema>;
export type CreateContractDto = z.output<typeof CreateContractSchema>;

export const CallOffSchema = z.object({
  quantity: qty,
  /** Defaults to today plus the contract's lead time. */
  requestedShipDate: z.iso.date().optional(),
});
export type CallOffInput = z.input<typeof CallOffSchema>;
export type CallOffDto = z.output<typeof CallOffSchema>;

/** Whether a call-off of this size can be placed today. */
export function callOffError(
  c: {
    status: SupplyContractStatus;
    startsOn: string;
    endsOn: string;
    contractedQuantity: number;
    calledOffQuantity: number;
    minCallOffQuantity: number;
  },
  quantity: number,
  today: string,
): string | null {
  if (c.status !== 'ACTIVE') return 'This contract isn’t active';
  if (today < c.startsOn) return 'The contract hasn’t started yet';
  if (today > c.endsOn) return 'The contract has ended';
  if (quantity < c.minCallOffQuantity)
    return `Call off at least ${String(c.minCallOffQuantity)} pieces`;
  if (c.calledOffQuantity + quantity > c.contractedQuantity)
    return `Only ${String(c.contractedQuantity - c.calledOffQuantity)} pieces are left on this contract`;
  return null;
}

const callOffs = z.array(
  z.strictObject({
    orderCode: z.string(),
    status: OrderStatusSchema,
    quantity: z.number().int(),
    createdAt: z.iso.datetime(),
  }),
);

const shared = {
  code: z.string(),
  title: z.string(),
  specification: z.string(),
  currency: CurrencySchema,
  contractedQuantity: z.number().int(),
  calledOffQuantity: z.number().int(),
  minCallOffQuantity: z.number().int(),
  depositBps: z.number().int(),
  incoterm: IncotermSchema,
  destinationCountry: z.string(),
  leadTimeDays: z.number().int(),
  startsOn: z.iso.date(),
  endsOn: z.iso.date(),
  status: SupplyContractStatusSchema,
  callOffs,
};

/** The buyer's view: GarmentGate's price and the factory's code only. */
export const BuyerContractSchema = z.strictObject({
  ...shared,
  manufacturerCode: z.string(),
  unitPriceMinor: z.number().int(),
});
export type BuyerContract = z.infer<typeof BuyerContractSchema>;

/** The factory's view: its own price and the buyer's code only. */
export const ManufacturerContractSchema = z.strictObject({
  ...shared,
  buyerCode: z.string(),
  unitPriceMinor: z.number().int(),
});
export type ManufacturerContract = z.infer<typeof ManufacturerContractSchema>;

export const AdminContractSchema = z.object({
  ...shared,
  buyer: z.object({ code: z.string(), name: z.string() }),
  manufacturer: z.object({ code: z.string(), name: z.string() }),
  buyerUnitPriceMinor: z.number().int(),
  manufacturerUnitPriceMinor: z.number().int(),
});
export type AdminContract = z.infer<typeof AdminContractSchema>;

// ── Merchandisers (business model: "dedicated merchandiser per account") ──────

export const SetMerchandiserSchema = z.object({ userId: z.uuid().nullable() });
export type SetMerchandiserDto = z.infer<typeof SetMerchandiserSchema>;

/** Who at GarmentGate looks after this buyer: GarmentGate staff, never the factory. */
export const MerchandiserSchema = z.strictObject({ name: z.string() });
export type Merchandiser = z.infer<typeof MerchandiserSchema>;

export const AdminMerchandiserSchema = z.object({ userId: z.uuid(), name: z.string() });
export type AdminMerchandiser = z.infer<typeof AdminMerchandiserSchema>;
