var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { filterContactDetails, overallRating, REVIEW_BLIND_DAYS, REVIEW_WINDOW_DAYS, } from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { PerformanceService } from './performance.service.js';
const DAY = 86_400_000;
let ReviewsService = class ReviewsService {
    prisma;
    orders;
    performance;
    notifier;
    audit;
    constructor(prisma, orders, performance, notifier, audit) {
        this.prisma = prisma;
        this.orders = orders;
        this.performance = performance;
        this.notifier = notifier;
        this.audit = audit;
    }
    async forOrder(actor, code) {
        const order = await this.orders.load(actor, code);
        const side = actorOf(actor);
        if (side === 'ADMIN')
            throw new ForbiddenException('Staff see reviews in the admin panel');
        const reviews = await this.prisma.review.findMany({ where: { orderId: order.id } });
        const mineDirection = side === 'BUYER' ? 'BUYER_TO_MANUFACTURER' : 'MANUFACTURER_TO_BUYER';
        const mine = reviews.find((r) => r.direction === mineDirection) ?? null;
        const theirs = reviews.find((r) => r.direction !== mineDirection) ?? null;
        const closesAt = order.completedAt
            ? new Date(order.completedAt.getTime() + REVIEW_WINDOW_DAYS * DAY)
            : null;
        const revealed = !!theirs && (!!mine || this.blindOver(order.completedAt));
        return {
            mine: mine ? this.view(mine) : null,
            theirs: theirs && revealed ? this.view(theirs) : null,
            theirsPending: !!theirs && !revealed,
            canReview: order.status === 'COMPLETED' && !mine && !!closesAt && closesAt.getTime() > Date.now(),
            closesAt: closesAt?.toISOString() ?? null,
        };
    }
    async submit(actor, code, dto) {
        const order = await this.orders.load(actor, code);
        const side = actorOf(actor);
        if (side === 'ADMIN')
            throw new ForbiddenException('Only the buyer and the factory review');
        if (order.status !== 'COMPLETED' || !order.completedAt)
            throw new ConflictException('Reviews open once the order is completed');
        if (order.completedAt.getTime() + REVIEW_WINDOW_DAYS * DAY < Date.now())
            throw new ConflictException('The review window for this order has closed');
        const buyer = side === 'BUYER';
        const factoryCompanyId = order.manufacturerProfile.company.id;
        const names = [
            ...identityPatterns(identityOf(order.buyerCompany)),
            ...identityPatterns(identityOf(order.manufacturerProfile.company)),
        ];
        const filtered = dto.comment ? filterContactDetails(dto.comment) : null;
        try {
            await this.prisma.review.create({
                data: {
                    orderId: order.id,
                    manufacturerProfileId: order.manufacturerProfileId,
                    direction: buyer ? 'BUYER_TO_MANUFACTURER' : 'MANUFACTURER_TO_BUYER',
                    authorCompanyId: buyer ? order.buyerCompanyId : factoryCompanyId,
                    subjectCompanyId: buyer ? factoryCompanyId : order.buyerCompanyId,
                    rating: Math.round(overallRating(dto)),
                    qualityRating: dto.quality,
                    communicationRating: dto.communication,
                    deliveryRating: dto.onTime,
                    comment: dto.comment ?? null,
                    commentFiltered: filtered ? scrubText(filtered.filtered, names) : null,
                    status: 'PUBLISHED',
                },
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
                throw new ConflictException('You’ve already reviewed this order');
            throw error;
        }
        await this.audit.log({
            actorUserId: actor.userId,
            action: filtered?.flagged ? 'moderation.contact_filtered' : 'review.submitted',
            entityType: 'Order',
            entityId: order.id,
            metadata: { direction: buyer ? 'BUYER_TO_MANUFACTURER' : 'MANUFACTURER_TO_BUYER' },
        });
        if (buyer)
            await this.performance.recompute(order.manufacturerProfileId);
        await this.notifier.notify({
            to: { companyId: buyer ? factoryCompanyId : order.buyerCompanyId },
            type: 'REVIEW_RECEIVED',
            title: `${order.code}: you have a new review`,
            body: `${buyer ? (order.buyerCompany.buyerProfile?.publicCode ?? 'The buyer') : order.manufacturerProfile.publicCode} reviewed the order. You’ll see it once you’ve left yours, or after ${String(REVIEW_BLIND_DAYS)} days.`,
            link: { orderCode: order.code },
        });
    }
    async publicReviews(publicCode) {
        const profile = await this.prisma.manufacturerProfile.findFirst({
            where: { publicCode, isListed: true, company: { kycStatus: 'VERIFIED', deletedAt: null } },
            select: { id: true },
        });
        if (!profile)
            throw new NotFoundException('Factory not found');
        const rows = await this.prisma.review.findMany({
            where: {
                manufacturerProfileId: profile.id,
                direction: 'BUYER_TO_MANUFACTURER',
                status: 'PUBLISHED',
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
            include: {
                authorCompany: { select: { country: true } },
                order: {
                    select: { completedAt: true, reviews: { select: { direction: true } } },
                },
            },
        });
        return rows
            .filter((r) => r.order.reviews.some((x) => x.direction === 'MANUFACTURER_TO_BUYER') ||
            this.blindOver(r.order.completedAt))
            .slice(0, 20)
            .map((r) => ({
            buyerCountry: r.authorCompany.country,
            ...this.ratings(r),
            comment: r.commentFiltered,
            createdAt: r.createdAt.toISOString(),
        }));
    }
    blindOver(completedAt) {
        return !!completedAt && completedAt.getTime() + REVIEW_BLIND_DAYS * DAY < Date.now();
    }
    ratings(r) {
        const quality = r.qualityRating ?? r.rating;
        const communication = r.communicationRating ?? r.rating;
        const onTime = r.deliveryRating ?? r.rating;
        return {
            rating: overallRating({ quality, communication, onTime }),
            quality,
            communication,
            onTime,
        };
    }
    view(r) {
        return {
            direction: r.direction,
            ...this.ratings(r),
            comment: r.commentFiltered,
            createdAt: r.createdAt.toISOString(),
        };
    }
};
ReviewsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        OrdersService,
        PerformanceService,
        Notifier,
        AuditService])
], ReviewsService);
export { ReviewsService };
//# sourceMappingURL=reviews.service.js.map