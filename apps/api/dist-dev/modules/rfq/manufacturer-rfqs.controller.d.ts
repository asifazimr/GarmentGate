import { type ManufacturerQuote, type ManufacturerRfqDetail, type ManufacturerRfqSummary, type QuoteDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { ManufacturerRfqsService } from './manufacturer-rfqs.service.js';
export declare class ManufacturerRfqsController {
    private readonly context;
    private readonly rfqs;
    constructor(context: ManufacturerContextService, rfqs: ManufacturerRfqsService);
    inbox(user: AuthenticatedUser): Promise<ManufacturerRfqSummary[]>;
    detail(user: AuthenticatedUser, code: string): Promise<ManufacturerRfqDetail>;
    quote(user: AuthenticatedUser, code: string, dto: QuoteDto): Promise<ManufacturerQuote>;
}
