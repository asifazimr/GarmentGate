import { type BuyerPlusSettings, type Currency, type ServiceFees } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
type Client = Prisma.TransactionClient;
export declare const SERVICE_FEES_KEY = "service_fees";
export declare const BUYER_PLUS_KEY = "buyer_plus";
export declare function plusPerks(client: Client, buyerCompanyId: string): Promise<BuyerPlusSettings | null>;
export declare function serviceFees(client: Client): Promise<ServiceFees>;
export declare function chargeSample(tx: Client, order: {
    id: string;
    currency: Currency;
    buyerCompanyId: string;
}, sampleId: string): Promise<void>;
export declare function chargeInspection(tx: Client, order: {
    id: string;
    currency: Currency;
    buyerCompanyId: string;
}, inspectionId: string): Promise<void>;
export {};
