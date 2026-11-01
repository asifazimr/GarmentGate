import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { MarginRule, MarginRuleDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';

/**
 * GarmentGate's markup on factory quotes, per category (and optionally per buyer). Changing a
 * rule prices new quotes; quotes already offered keep the price the buyer saw.
 */
@Injectable()
export class AdminMarginsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async list(): Promise<MarginRule[]> {
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
      category: r.category,
      buyerCode: r.company?.buyerProfile?.publicCode ?? null,
      active: r.active,
      quotesPriced: r._count.quotes,
      updatedAt: r.updatedAt.toISOString(),
    }));
  }

  async create(adminId: string, dto: MarginRuleDto): Promise<{ id: string }> {
    const scope = await this.scope(dto);
    await this.assertUniqueScope(scope, dto.active, null);
    const rule = await this.prisma.marginRule.create({
      data: {
        name: dto.name,
        markupBps: dto.markupBps,
        minMarginPerUnitMinor: dto.minMarginPerUnitMinor ?? null,
        active: dto.active,
        ...scope,
      },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'margin.created',
      entityType: 'MarginRule',
      entityId: rule.id,
      metadata: { markupBps: dto.markupBps },
    });
    return { id: rule.id };
  }

  async update(adminId: string, id: string, dto: MarginRuleDto): Promise<void> {
    const existing = await this.prisma.marginRule.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Rule not found');
    const scope = await this.scope(dto);
    if (
      this.isDefault(existing) &&
      (scope.categoryId !== null || scope.companyId !== null || !dto.active)
    ) {
      throw new BadRequestException('The default rule applies to everything and stays active');
    }
    await this.assertUniqueScope(scope, dto.active, id);
    await this.prisma.marginRule.update({
      where: { id },
      data: {
        name: dto.name,
        markupBps: dto.markupBps,
        minMarginPerUnitMinor: dto.minMarginPerUnitMinor ?? null,
        active: dto.active,
        ...scope,
      },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'margin.updated',
      entityType: 'MarginRule',
      entityId: id,
      metadata: { from: existing.markupBps, to: dto.markupBps },
    });
  }

  async remove(adminId: string, id: string): Promise<void> {
    const existing = await this.prisma.marginRule.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Rule not found');
    if (this.isDefault(existing))
      throw new BadRequestException('The default rule can’t be deleted');
    // Priced quotes keep their price; the link to the rule is cleared (onDelete: SetNull).
    await this.prisma.marginRule.delete({ where: { id } });
    await this.audit.log({
      actorUserId: adminId,
      action: 'margin.deleted',
      entityType: 'MarginRule',
      entityId: id,
    });
  }

  /** Overrides the buyer price of an offered quote (never below the factory price). */
  async reprice(adminId: string, quoteId: string, buyerUnitPriceMinor: number): Promise<void> {
    const quote = await this.prisma.quote.findUnique({ where: { id: quoteId } });
    if (!quote) throw new NotFoundException('Quote not found');
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

  private isDefault(rule: { categoryId: string | null; companyId: string | null }) {
    return rule.categoryId === null && rule.companyId === null;
  }

  private async scope(
    dto: MarginRuleDto,
  ): Promise<{ categoryId: string | null; companyId: string | null }> {
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category) throw new BadRequestException('Unknown category');
    }
    let companyId: string | null = null;
    if (dto.buyerCode) {
      const buyer = await this.prisma.buyerProfile.findUnique({
        where: { publicCode: dto.buyerCode },
        select: { companyId: true },
      });
      if (!buyer) throw new BadRequestException('Unknown buyer code');
      companyId = buyer.companyId;
    }
    return { categoryId: dto.categoryId, companyId };
  }

  /** One active rule per scope, so pricing is never ambiguous. */
  private async assertUniqueScope(
    scope: { categoryId: string | null; companyId: string | null },
    active: boolean,
    exceptId: string | null,
  ): Promise<void> {
    if (!active) return;
    const clash = await this.prisma.marginRule.findFirst({
      where: { ...scope, active: true, ...(exceptId && { id: { not: exceptId } }) },
    });
    if (clash)
      throw new ConflictException(`“${clash.name}” already covers this category and buyer`);
  }
}
