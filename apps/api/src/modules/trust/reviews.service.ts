import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  filterContactDetails,
  type OrderReview,
  type OrderReviews,
  overallRating,
  type PublicReview,
  REVIEW_BLIND_DAYS,
  REVIEW_WINDOW_DAYS,
  type ReviewDirection,
  type SubmitReviewDto,
} from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { PerformanceService } from './performance.service.js';

const DAY = 86_400_000;
type ReviewRow = Prisma.ReviewGetPayload<object>;

/**
 * Two-way reviews after an order completes: the buyer rates the factory (quality,
 * communication, on-time delivery) and the factory rates the buyer (clear specs,
 * communication, on-time payment). Reviews are blind: neither side sees the other's until both
 * are in or the blind period ends, so nobody reviews in retaliation. Comments are
 * contact-filtered and scrubbed of both companies' names, since buyer reviews are public.
 */
@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly performance: PerformanceService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  async forOrder(actor: ChatActor, code: string): Promise<OrderReviews> {
    const order = await this.orders.load(actor, code);
    const side = actorOf(actor);
    if (side === 'ADMIN') throw new ForbiddenException('Staff see reviews in the admin panel');
    const reviews = await this.prisma.review.findMany({ where: { orderId: order.id } });
    const mineDirection: ReviewDirection =
      side === 'BUYER' ? 'BUYER_TO_MANUFACTURER' : 'MANUFACTURER_TO_BUYER';
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
      canReview:
        order.status === 'COMPLETED' && !mine && !!closesAt && closesAt.getTime() > Date.now(),
      closesAt: closesAt?.toISOString() ?? null,
    };
  }

  async submit(actor: ChatActor, code: string, dto: SubmitReviewDto): Promise<void> {
    const order = await this.orders.load(actor, code);
    const side = actorOf(actor);
    if (side === 'ADMIN') throw new ForbiddenException('Only the buyer and the factory review');
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
    } catch (error) {
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
    if (buyer) await this.performance.recompute(order.manufacturerProfileId);
    await this.notifier.notify({
      to: { companyId: buyer ? factoryCompanyId : order.buyerCompanyId },
      type: 'REVIEW_RECEIVED',
      title: `${order.code}: you have a new review`,
      body: `${buyer ? (order.buyerCompany.buyerProfile?.publicCode ?? 'The buyer') : order.manufacturerProfile.publicCode} reviewed the order. You’ll see it once you’ve left yours, or after ${String(REVIEW_BLIND_DAYS)} days.`,
      link: { orderCode: order.code },
    });
  }

  /** Buyer reviews on a factory's profile: once out of the blind period, buyer country only. */
  async publicReviews(publicCode: string): Promise<PublicReview[]> {
    const profile = await this.prisma.manufacturerProfile.findFirst({
      where: { publicCode, isListed: true, company: { kycStatus: 'VERIFIED', deletedAt: null } },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException('Factory not found');
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
      .filter(
        (r) =>
          r.order.reviews.some((x) => x.direction === 'MANUFACTURER_TO_BUYER') ||
          this.blindOver(r.order.completedAt),
      )
      .slice(0, 20)
      .map((r) => ({
        buyerCountry: r.authorCompany.country,
        ...this.ratings(r),
        comment: r.commentFiltered,
        createdAt: r.createdAt.toISOString(),
      }));
  }

  private blindOver(completedAt: Date | null): boolean {
    return !!completedAt && completedAt.getTime() + REVIEW_BLIND_DAYS * DAY < Date.now();
  }

  private ratings(r: ReviewRow) {
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

  private view(r: ReviewRow): OrderReview {
    return {
      direction: r.direction,
      ...this.ratings(r),
      comment: r.commentFiltered,
      createdAt: r.createdAt.toISOString(),
    };
  }
}
