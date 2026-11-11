var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
let AdminMarginsService = class AdminMarginsService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list() {
        const rules = await this.prisma.marginRule.findMany({
            orderBy: [
                { companyId: { sort: 'asc', nulls: 'first' } },
                { categoryId: { sort: 'asc', nulls: 'first' } },
                { name: 'asc' },
            ],
            include: {
                category: { select: { id: true, name: true } },
                company: { select: { buyerProfile: { select: { publicCode: true } } } },
                _count: { select: { quotes: true } },
            },
        });
        return rules.map((r) => ({
            id: r.id,
            name: r.name,
            markupBps: r.markupBps,
            minMarginPerUnitMinor: r.minMarginPerUnitMinor,
            commissionBps: r.commissionBps,
            repeatCommissionBps: r.repeatCommissionBps,
            category: r.category,
            buyerCode: r.company?.buyerProfile?.publicCode ?? null,
            active: r.active,
            quotesPriced: r._count.quotes,
            updatedAt: r.updatedAt.toISOString(),
        }));
    }
    async create(adminId, dto) {
        const scope = await this.scope(dto);
        await this.assertUniqueScope(scope, dto.active, null);
        const rule = await this.prisma.marginRule.create({
            data: {
                name: dto.name,
                markupBps: dto.markupBps,
                minMarginPerUnitMinor: dto.minMarginPerUnitMinor ?? null,
                commissionBps: dto.commissionBps,
                repeatCommissionBps: dto.repeatCommissionBps,
                active: dto.active,
                ...scope,
            },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'margin.created',
            entityType: 'MarginRule',
            entityId: rule.id,
            metadata: {
                markupBps: dto.markupBps,
                commissionBps: dto.commissionBps,
                repeatCommissionBps: dto.repeatCommissionBps,
            },
        });
        return { id: rule.id };
    }
    async update(adminId, id, dto) {
        const existing = await this.prisma.marginRule.findUnique({ where: { id } });
        if (!existing)
            throw new NotFoundException('Rule not found');
        const scope = await this.scope(dto);
        if (this.isDefault(existing) &&
            (scope.categoryId !== null || scope.companyId !== null || !dto.active)) {
            throw new BadRequestException('The default rule applies to everything and stays active');
        }
        await this.assertUniqueScope(scope, dto.active, id);
        await this.prisma.marginRule.update({
            where: { id },
            data: {
                name: dto.name,
                markupBps: dto.markupBps,
                minMarginPerUnitMinor: dto.minMarginPerUnitMinor ?? null,
                commissionBps: dto.commissionBps,
                repeatCommissionBps: dto.repeatCommissionBps,
                active: dto.active,
                ...scope,
            },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'margin.updated',
            entityType: 'MarginRule',
            entityId: id,
            metadata: {
                from: {
                    markupBps: existing.markupBps,
                    commissionBps: existing.commissionBps,
                    repeatCommissionBps: existing.repeatCommissionBps,
                },
                to: {
                    markupBps: dto.markupBps,
                    commissionBps: dto.commissionBps,
                    repeatCommissionBps: dto.repeatCommissionBps,
                },
            },
        });
    }
    async remove(adminId, id) {
        const existing = await this.prisma.marginRule.findUnique({ where: { id } });
        if (!existing)
            throw new NotFoundException('Rule not found');
        if (this.isDefault(existing))
            throw new BadRequestException('The default rule can’t be deleted');
        await this.prisma.marginRule.delete({ where: { id } });
        await this.audit.log({
            actorUserId: adminId,
            action: 'margin.deleted',
            entityType: 'MarginRule',
            entityId: id,
        });
    }
    async reprice(adminId, quoteId, buyerUnitPriceMinor) {
        const quote = await this.prisma.quote.findUnique({ where: { id: quoteId } });
        if (!quote)
            throw new NotFoundException('Quote not found');
        if (quote.status !== 'OFFERED')
            throw new ConflictException('Only offered quotes can be re-priced');
        if (buyerUnitPriceMinor < quote.manufacturerUnitPriceMinor) {
            throw new BadRequestException('The buyer price can’t be below the factory price');
        }
        await this.prisma.quote.update({
            where: { id: quoteId },
            data: { buyerUnitPriceMinor, pricedById: adminId, pricedAt: new Date() },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'quote.repriced',
            entityType: 'Quote',
            entityId: quoteId,
            metadata: { from: quote.buyerUnitPriceMinor, to: buyerUnitPriceMinor },
        });
    }
    isDefault(rule) {
        return rule.categoryId === null && rule.companyId === null;
    }
    async scope(dto) {
        if (dto.categoryId) {
            const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
            if (!category)
                throw new BadRequestException('Unknown category');
        }
        let companyId = null;
        if (dto.buyerCode) {
            const buyer = await this.prisma.buyerProfile.findUnique({
                where: { publicCode: dto.buyerCode },
                select: { companyId: true },
            });
            if (!buyer)
                throw new BadRequestException('Unknown buyer code');
            companyId = buyer.companyId;
        }
        return { categoryId: dto.categoryId, companyId };
    }
    async assertUniqueScope(scope, active, exceptId) {
        if (!active)
            return;
        const clash = await this.prisma.marginRule.findFirst({
            where: { ...scope, active: true, ...(exceptId && { id: { not: exceptId } }) },
        });
        if (clash)
            throw new ConflictException(`“${clash.name}” already covers this category and buyer`);
    }
};
AdminMarginsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AuditService])
], AdminMarginsService);
export { AdminMarginsService };
//# sourceMappingURL=admin-margins.service.js.map