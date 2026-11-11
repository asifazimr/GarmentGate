import { type ConsolidationCandidate, type ConsolidationOption, type ConsolidationQuoteRequest } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { OrderLogisticsService } from './order-logistics.service.js';
export declare class ConsolidationService {
    private readonly prisma;
    private readonly orderLogistics;
    private readonly quotes;
    private readonly settings;
    private readonly codes;
    private readonly audit;
    constructor(prisma: PrismaService, orderLogistics: OrderLogisticsService, quotes: FreightQuotesService, settings: LogisticsSettingsService, codes: PublicCodeService, audit: AuditService);
    candidates(actor: ChatActor, code: string): Promise<ConsolidationCandidate[]>;
    quote(actor: ChatActor, dto: ConsolidationQuoteRequest): Promise<ConsolidationOption[]>;
    accept(actor: ChatActor, code: string): Promise<void>;
}
