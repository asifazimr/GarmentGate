var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { filterContactDetails, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { listedManufacturer } from '../catalog/catalog.queries.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
const QUOTE_WINDOW_DAYS = 7;
let ProductRequestsService = class ProductRequestsService {
    prisma;
    notifier;
    codes;
    audit;
    constructor(prisma, notifier, codes, audit) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.codes = codes;
        this.audit = audit;
    }
    async create(ctx, productId, dto) {
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
        if (!product)
            throw new NotFoundException('Product not found');
        const sample = dto.kind === 'SAMPLE';
        const description = dto.notes ??
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
                    titleFiltered: sample ? `Sample: ${product.title}` : product.title,
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
        const what = sample ? 'sample request' : 'quote request';
        const link = { rfqCode: rfq.code };
        await this.notifier.notify({
            to: { companyId: ctx.companyId },
            type: 'SYSTEM',
            title: `${rfq.code} sent`,
            body: `Your ${what} for ${product.title} is with our sourcing team.`,
            link,
            email: false,
        });
        await this.notifier.notify({
            to: { manufacturerProfileId: product.manufacturerProfile.id },
            type: 'RFQ_INVITATION',
            title: `New ${what}: ${product.title}`,
            body: `${ctx.publicCode} requests ${String(dto.quantity)} pcs.`,
            link,
        });
        await this.notifier.notify({
            to: 'ADMINS',
            type: 'SYSTEM',
            title: `New ${what} ${rfq.code}`,
            body: `${ctx.publicCode} → ${product.manufacturerProfile.publicCode}: ${product.title}`,
            link,
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
};
ProductRequestsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        PublicCodeService,
        AuditService])
], ProductRequestsService);
export { ProductRequestsService };
//# sourceMappingURL=product-requests.service.js.map