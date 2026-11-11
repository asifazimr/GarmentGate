import { PrismaService } from '../../prisma/prisma.service.js';
export interface ManufacturerContext {
    userId: string;
    companyId: string;
    profileId: string;
}
export declare class ManufacturerContextService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    verified(userId: string): Promise<ManufacturerContext>;
}
