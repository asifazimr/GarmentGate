import { ConfigService } from '@nestjs/config';
import { type BuyerTracking, type LogisticsDocumentType, type TrackingEventDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { ShipmentsService } from './shipments.service.js';
export interface EventSource {
    userId: string;
    source: 'STAFF' | 'PARTNER';
}
export declare class TrackingService {
    private readonly prisma;
    private readonly orders;
    private readonly payments;
    private readonly ledger;
    private readonly fx;
    private readonly shipments;
    private readonly notifier;
    private readonly audit;
    private readonly config;
    constructor(prisma: PrismaService, orders: OrdersService, payments: PaymentsService, ledger: LedgerService, fx: FxService, shipments: ShipmentsService, notifier: Notifier, audit: AuditService, config: ConfigService<Env, true>);
    recordEvent(by: EventSource, shipmentCode: string, legId: string | null, dto: TrackingEventDto): Promise<void>;
    private depart;
    private logisticsPaid;
    private tellBuyer;
    payLeg(adminId: string, code: string, legId: string): Promise<void>;
    buyerTracking(actor: ChatActor, code: string): Promise<BuyerTracking | null>;
    buyerDocument(actor: ChatActor, code: string, type: LogisticsDocumentType): Promise<{
        file: Buffer;
        name: string;
    }>;
    private buyerShipment;
}
