import { z } from 'zod';
export declare const ShipmentCodeSchema: z.ZodString;
export declare const ConsolidationCodeSchema: z.ZodString;
export declare const ClaimCodeSchema: z.ZodString;
export declare function forwarderOf(q: {
    forwarderName: string | null;
    forwarderContact: string | null;
    forwarderReference: string | null;
}): {
    name: string;
    contact: string | null;
    reference: string | null;
} | null;
