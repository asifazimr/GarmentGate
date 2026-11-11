import { z } from 'zod';
export const ShipmentCodeSchema = z
    .string()
    .regex(/^SHP-\d{4}-\d{5,}$/, { error: 'Unknown shipment' });
export const ConsolidationCodeSchema = z
    .string()
    .regex(/^CON-\d{4}-\d{5,}$/, { error: 'Unknown shipping option' });
export const ClaimCodeSchema = z.string().regex(/^CLM-\d{4}-\d{5,}$/, { error: 'Unknown claim' });
export function forwarderOf(q) {
    return q.forwarderName
        ? { name: q.forwarderName, contact: q.forwarderContact, reference: q.forwarderReference }
        : null;
}
//# sourceMappingURL=logistics-params.js.map