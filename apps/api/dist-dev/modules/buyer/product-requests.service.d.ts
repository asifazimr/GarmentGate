import { type ProductRequestDto, type ProductRequestResult } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import type { BuyerContext } from './buyer-context.service.js';
export declare class ProductRequestsService {
    private readonly prisma;
    private readonly notifier;
    private readonly codes;
    private readonly audit;
    constructor(prisma: PrismaService, notifier: Notifier, codes: PublicCodeService, audit: AuditService);
    create(ctx: BuyerContext, productId: string, dto: ProductRequestDto): Promise<ProductRequestResult>;
}
