import { type ManufacturerQuote, type ManufacturerRfqDetail, type ManufacturerRfqSummary, type QuoteDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { BuyerPlusService } from '../plans/buyer-plus.service.js';
import { PlansService } from '../plans/plans.service.js';
import { RfqFilesService } from './rfq-files.service.js';
import { RfqNotifier } from './rfq-notifier.service.js';
export declare class ManufacturerRfqsService {
    private readonly prisma;
    private readonly rfqFiles;
    private readonly audit;
    private readonly notifier;
    private readonly plans;
    private readonly buyerPlus;
    constructor(prisma: PrismaService, rfqFiles: RfqFilesService, audit: AuditService, notifier: RfqNotifier, plans: PlansService, buyerPlus: BuyerPlusService);
    inbox(ctx: ManufacturerContext): Promise<ManufacturerRfqSummary[]>;
    detail(ctx: ManufacturerContext, code: string): Promise<ManufacturerRfqDetail>;
    submitQuote(ctx: ManufacturerContext, code: string, dto: QuoteDto): Promise<ManufacturerQuote>;
    private factory;
    private find;
    private access;
    private canQuote;
    private scrub;
    private summary;
    private ownQuote;
}
