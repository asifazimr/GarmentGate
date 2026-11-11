import { StreamableFile } from '@nestjs/common';
import { type BuyerTracking, BuyerDocumentTypeSchema, type BookPickupDto, type ConsolidationCandidate, type ConsolidationOption, type ConsolidationQuoteRequest, type FactoryOrderLogistics, type OrderPackingDto } from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { ConsolidationService } from './consolidation.service.js';
import { TrackingService } from './tracking.service.js';
import { HubFlowService } from './hub-flow.service.js';
export declare class OrderShippingController {
    private readonly actors;
    private readonly hubFlow;
    private readonly consolidation;
    private readonly tracking;
    constructor(actors: ChatActorService, hubFlow: HubFlowService, consolidation: ConsolidationService, tracking: TrackingService);
    track(user: AuthenticatedUser, orderCode: string): Promise<BuyerTracking | null>;
    buyerDocument(user: AuthenticatedUser, orderCode: string, type: z.infer<typeof BuyerDocumentTypeSchema>, res: Response): Promise<StreamableFile>;
    factory(user: AuthenticatedUser, orderCode: string): Promise<FactoryOrderLogistics>;
    packing(user: AuthenticatedUser, orderCode: string, dto: OrderPackingDto): Promise<void>;
    pickup(user: AuthenticatedUser, orderCode: string, dto: BookPickupDto): Promise<void>;
    markings(user: AuthenticatedUser, orderCode: string, res: Response): Promise<StreamableFile>;
    candidates(user: AuthenticatedUser, orderCode: string): Promise<ConsolidationCandidate[]>;
    consolidate(user: AuthenticatedUser, dto: ConsolidationQuoteRequest): Promise<ConsolidationOption[]>;
    acceptConsolidation(user: AuthenticatedUser, consolidationCode: string): Promise<void>;
}
