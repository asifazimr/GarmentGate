import { Injectable, NotFoundException } from '@nestjs/common';
import {
  filterContactDetails,
  type ProductRequestDto,
  type ProductRequestResult,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { listedManufacturer } from '../catalog/catalog.queries.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import type { BuyerContext } from './buyer-context.service.js';

const QUOTE_WINDOW_DAYS = 7;

/**
 * "Request quote" / "Order sample" from a product page. Creates an RFQ addressed to that
 * product's factory (plus a sample request), and tells each side only what it may know:
 * the factory sees the buyer's BYR- code, never the company.
 */
@Injectable()
export class ProductRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly codes: PublicCodeService,
    private readonly audit: AuditService,
  ) {}

  async create(
    ctx: BuyerContext,
    productId: string,
    dto: ProductRequestDto,
  ): Promise<ProductRequestResult> {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        status: 'PUBLISHED',
        deletedAt: null,
        manufacturerProfile: listedManufacturer,
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
        currency: true,
        manufacturerProfile: {
          select: {
            id: true,
            publicCode: true,
            company: { select: { users: { select: { id: true } } } },
          },
        },
      },
    });
    if (!product) throw new NotFoundException('Product not found');

    const sample = dto.kind === 'SAMPLE';
    const description =
      dto.notes ??
      (sample ? `Sample request for "${product.title}".` : `Quote request for "${product.title}".`);
    const filtered = filterContactDetails(description);
    const year = new Date().getUTCFullYear();

    const rfq = await this.prisma.$transaction(async (tx) => {
      const code = await this.codes.sequential(`RFQ-${String(year)}`, 5, tx);
      return tx.rfq.create({
        data: {
          code,
          buyerCompanyId: ctx.companyId,
          createdById: ctx.userId,
          categoryId: product.categoryId,
          productId: product.id,
          title: sample ? `Sample: ${product.title}` : product.title,
          description,
          descriptionFiltered: filtered.filtered,
          quantity: dto.quantity,
          targetUnitPriceMinor: dto.targetUnitPriceMinor ?? null,
          currency: product.currency,
          deadline: new Date(Date.now() + QUOTE_WINDOW_DAYS * 86_400_000),
          requiredDeliveryDate: dto.neededBy,
          destinationCountry: dto.destinationCountry,
          status: 'OPEN',
          publishedAt: new Date(),
          invitations: { create: [{ manufacturerProfileId: product.manufacturerProfile.id }] },
          ...(sample && {
            samples: {
              create: [{ type: 'CATALOG', quantity: dto.sampleQuantity ?? 1, status: 'REQUESTED' }],
            },
          }),
        },
      });
    });

    const admins = await this.prisma.user.findMany({
      where: { role: 'ADMIN', status: 'ACTIVE' },
      select: { id: true },
    });
    const buyers = await this.prisma.user.findMany({
      where: { companyId: ctx.companyId },
      select: { id: true },
    });
    const what = sample ? 'sample request' : 'quote request';
    await this.prisma.notification.createMany({
      data: [
        ...buyers.map((u) => ({
          userId: u.id,
          type: 'SYSTEM' as const,
          title: `${rfq.code} sent`,
          body: `Your ${what} for ${product.title} is with our sourcing team.`,
          data: { rfqCode: rfq.code },
        })),
        ...product.manufacturerProfile.company.users.map((u) => ({
          userId: u.id,
          type: 'RFQ_INVITATION' as const,
          title: `New ${what}: ${product.title}`,
          body: `${ctx.publicCode} requests ${String(dto.quantity)} pcs.`,
          data: { rfqCode: rfq.code },
        })),
        ...admins.map((u) => ({
          userId: u.id,
          type: 'SYSTEM' as const,
          title: `New ${what} ${rfq.code}`,
          body: `${ctx.publicCode} → ${product.manufacturerProfile.publicCode}: ${product.title}`,
          data: { rfqCode: rfq.code },
        })),
      ],
    });
    await this.audit.log({
      actorUserId: ctx.userId,
      action: filtered.flagged
        ? 'moderation.contact_filtered'
        : `rfq.${sample ? 'sample' : 'quote'}_requested`,
      entityType: 'Rfq',
      entityId: rfq.id,
      ...(filtered.flagged && { metadata: { reasons: filtered.reasons } }),
    });
    return { rfqCode: rfq.code };
  }
}
