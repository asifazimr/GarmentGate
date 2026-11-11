import { type OrderReviews, type PublicReview, type SubmitReviewDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { PerformanceService } from './performance.service.js';
export declare class ReviewsService {
    private readonly prisma;
    private readonly orders;
    private readonly performance;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, orders: OrdersService, performance: PerformanceService, notifier: Notifier, audit: AuditService);
    forOrder(actor: ChatActor, code: string): Promise<OrderReviews>;
    submit(actor: ChatActor, code: string, dto: SubmitReviewDto): Promise<void>;
    publicReviews(publicCode: string): Promise<PublicReview[]>;
    private blindOver;
    private ratings;
    private view;
}
