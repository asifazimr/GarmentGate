import { PrismaService } from '../../prisma/prisma.service.js';
export interface BuyerContext {
    userId: string;
    companyId: string;
    publicCode: string;
}
export declare class BuyerContextService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    verified(userId: string): Promise<BuyerContext>;
}
