import { type AcceptQuoteResult, type BuyerRfqDetail, type BuyerRfqSummary, type RfqCreated, type RfqDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import { MediaService } from '../media/media.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { PlansService } from '../plans/plans.service.js';
import { FilesService } from '../storage/files.service.js';
import { RfqFilesService } from './rfq-files.service.js';
import { RfqNotifier } from './rfq-notifier.service.js';
export declare class BuyerRfqsService {
    private readonly prisma;
    private readonly files;
    private readonly rfqFiles;
    private readonly media;
    private readonly codes;
    private readonly audit;
    private readonly notifier;
    private readonly plans;
    constructor(prisma: PrismaService, files: FilesService, rfqFiles: RfqFilesService, media: MediaService, codes: PublicCodeService, audit: AuditService, notifier: RfqNotifier, plans: PlansService);
    create(ctx: BuyerContext, dto: RfqDto): Promise<RfqCreated>;
    private inviteMatchedFactories;
    list(ctx: BuyerContext): Promise<BuyerRfqSummary[]>;
    detail(ctx: BuyerContext, code: string): Promise<BuyerRfqDetail>;
    private buyerQuote;
    accept(ctx: BuyerContext, code: string, quoteId: string): Promise<AcceptQuoteResult>;
}
