import type { BuyerDashboard } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import type { BuyerContext } from './buyer-context.service.js';
export declare class BuyerDashboardService {
    private readonly prisma;
    private readonly media;
    constructor(prisma: PrismaService, media: MediaService);
    get(ctx: BuyerContext): Promise<BuyerDashboard>;
}
