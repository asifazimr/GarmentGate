import { z } from 'zod';

export const ShipmentCodeSchema = z
  .string()
  .regex(/^SHP-\d{4}-\d{5,}$/, { error: 'Unknown shipment' });
export const ConsolidationCodeSchema = z
  .string()
  .regex(/^CON-\d{4}-\d{5,}$/, { error: 'Unknown shipping option' });

export const ClaimCodeSchema = z.string().regex(/^CLM-\d{4}-\d{5,}$/, { error: 'Unknown claim' });

/** The buyer's forwarder on a hand-over quote (staff only), or null. */
export function forwarderOf(q: {
  forwarderName: string | null;
  forwarderContact: string | null;
  forwarderReference: string | null;
}): { name: string; contact: string | null; reference: string | null } | null {
  return q.forwarderName
    ? { name: q.forwarderName, contact: q.forwarderContact, reference: q.forwarderReference }
    : null;
}
