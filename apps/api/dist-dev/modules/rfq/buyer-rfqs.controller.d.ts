import { type AcceptQuoteResult, type BuyerRfqDetail, type BuyerRfqSummary, type PresignRfqFileDto, type PresignUploadResponse, type RfqCreated, type RfqDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { FilesService } from '../storage/files.service.js';
import { BuyerRfqsService } from './buyer-rfqs.service.js';
export declare class BuyerRfqsController {
    private readonly context;
    private readonly rfqs;
    private readonly files;
    constructor(context: BuyerContextService, rfqs: BuyerRfqsService, files: FilesService);
    presign(user: AuthenticatedUser, dto: PresignRfqFileDto): Promise<PresignUploadResponse>;
    create(user: AuthenticatedUser, dto: RfqDto): Promise<RfqCreated>;
    list(user: AuthenticatedUser): Promise<BuyerRfqSummary[]>;
    detail(user: AuthenticatedUser, code: string): Promise<BuyerRfqDetail>;
    accept(user: AuthenticatedUser, code: string, quoteId: string): Promise<AcceptQuoteResult>;
}
