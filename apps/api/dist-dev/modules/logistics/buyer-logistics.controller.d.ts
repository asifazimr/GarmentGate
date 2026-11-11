import { type BuyerOrderLogistics, type BuyerShippingOption, type PayLogisticsDto, type PaymentStart, type ShippingQuoteRequest, type HandoverRequestDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { OrderLogisticsService } from './order-logistics.service.js';
export declare class BuyerLogisticsController {
    private readonly actors;
    private readonly logistics;
    constructor(actors: ChatActorService, logistics: OrderLogisticsService);
    view(user: AuthenticatedUser, code: string): Promise<BuyerOrderLogistics>;
    quote(user: AuthenticatedUser, code: string, dto: ShippingQuoteRequest): Promise<BuyerShippingOption[]>;
    accept(user: AuthenticatedUser, code: string, id: string): Promise<void>;
    handover(user: AuthenticatedUser, code: string, dto: HandoverRequestDto): Promise<void>;
    pay(user: AuthenticatedUser, code: string, dto: PayLogisticsDto): Promise<PaymentStart>;
}
