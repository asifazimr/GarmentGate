import { ConfigService } from '@nestjs/config';
import { type BuyerOrderLogistics, type BuyerShippingOption, type HandoverRequestDto, type OrderStatus, type PaymentMethod, type PaymentStart, type ShippingQuoteRequest } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { LogisticsQuote } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import type { OrderRow } from '../orders/order-views.js';
import { OrdersService } from '../orders/orders.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
export declare const OPEN_FOR_SHIPPING: readonly OrderStatus[];
export declare class OrderLogisticsService {
    private readonly prisma;
    private readonly orders;
    private readonly quotes;
    private readonly settings;
    private readonly payments;
    private readonly audit;
    private readonly config;
    constructor(prisma: PrismaService, orders: OrdersService, quotes: FreightQuotesService, settings: LogisticsSettingsService, payments: PaymentsService, audit: AuditService, config: ConfigService<Env, true>);
    view(actor: ChatActor, code: string): Promise<BuyerOrderLogistics>;
    quote(actor: ChatActor, code: string, dto: ShippingQuoteRequest): Promise<BuyerShippingOption[]>;
    accept(actor: ChatActor, code: string, quoteId: string): Promise<void>;
    handover(actor: ChatActor, code: string, dto: HandoverRequestDto): Promise<void>;
    pay(actor: ChatActor, code: string, method: PaymentMethod): Promise<PaymentStart>;
    setHsCode(adminId: string, code: string, hsCode: string): Promise<void>;
    buyerOrder(actor: ChatActor, code: string): Promise<OrderRow>;
    assertEditable(order: OrderRow): Promise<void>;
    cargo(order: {
        id: string;
        quantity: number;
    }): Promise<{
        weightGrams: number;
        volumeLitres: number;
        estimated: boolean;
    }>;
    option(order: OrderRow, q: LogisticsQuote): Promise<BuyerShippingOption>;
}
