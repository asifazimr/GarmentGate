import type { Prisma } from '../../generated/prisma/client.js';
type Tx = Prisma.TransactionClient;
export declare function reserveMinutes(tx: Tx, slotId: string, minutes: number): Promise<boolean>;
export declare function reserveWholeWindow(tx: Tx, slotId: string): Promise<number>;
export declare function releaseMinutes(tx: Tx, bookingId: string, minutes: number | 'ALL'): Promise<number>;
export {};
