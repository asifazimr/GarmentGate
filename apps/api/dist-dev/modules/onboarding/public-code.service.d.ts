import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
type Tx = Prisma.TransactionClient | PrismaService;
export declare class PublicCodeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    next(kind: 'MFR' | 'BYR', country: string, tx?: Tx): Promise<string>;
    sequential(prefix: string, pad: number, tx?: Tx): Promise<string>;
}
export {};
