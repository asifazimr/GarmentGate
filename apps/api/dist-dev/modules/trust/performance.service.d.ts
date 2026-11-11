import { type OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { SearchService } from '../search/search.service.js';
export declare class PerformanceService implements OnModuleInit {
    private readonly prisma;
    private readonly hooks;
    private readonly search;
    private readonly logger;
    constructor(prisma: PrismaService, hooks: OrderHooks, search: SearchService);
    onModuleInit(): void;
    recompute(profileId: string): Promise<void>;
    private apply;
}
