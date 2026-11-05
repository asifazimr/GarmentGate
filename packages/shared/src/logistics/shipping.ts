import type { LogisticsModeValue } from './freight.js';

/** Incoterms under which GarmentGate arranges (and charges for) the main carriage. */
export const GG_INCOTERMS = ['CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DDP'] as const;
export type GgIncoterm = (typeof GG_INCOTERMS)[number];

/** CIF and CIP oblige the seller to insure; DDP is door to door, so GarmentGate insures too. */
export const insuranceRequired = (incoterm: GgIncoterm): boolean =>
  incoterm === 'CIF' || incoterm === 'CIP' || incoterm === 'DDP';

/** Which modes can serve an incoterm on a route. DDP has its own door-to-door rates. */
export function modesFor(
  incoterm: GgIncoterm,
  originCountry: string,
  destinationCountry: string,
): LogisticsModeValue[] {
  if (originCountry === destinationCountry) return ['DOMESTIC'];
  if (incoterm === 'DDP') return ['DDP'];
  // Sea terms (CFR, CIF) are port to port; the others work for any mode.
  return incoterm === 'CFR' || incoterm === 'CIF'
    ? ['SEA_FCL', 'SEA_LCL']
    : ['SEA_FCL', 'SEA_LCL', 'AIR'];
}

/** Packed cargo estimated from the quantity, until the factory gives carton details. */
export function estimatedCargo(
  quantity: number,
  perPiece: { pieceWeightGrams: number; pieceVolumeMl: number },
): { weightGrams: number; volumeLitres: number } {
  return {
    weightGrams: quantity * perPiece.pieceWeightGrams,
    volumeLitres: Math.ceil((quantity * perPiece.pieceVolumeMl) / 1000),
  };
}
