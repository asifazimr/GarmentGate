import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  type CreatePartnerUserDto,
  dateOnly,
  freightMode,
  type PartnerUser,
  type DutyRate,
  type DutyRateDto,
  type Hub,
  type HubDto,
  isoDate,
  type LogisticsMarginRule,
  type LogisticsMarginRuleDto,
  type LogisticsPartner,
  type LogisticsPartnerDto,
  type RateCard,
  type RateCardDto,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { AuthService } from '../auth/auth.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';

const partnerRef = { select: { id: true, code: true, name: true } } as const;

const isUniqueViolation = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';

/**
 * Staff configuration of logistics: partners, hubs, partner rate cards, GarmentGate's freight
 * margins and the duty table for landed-cost estimates. Staff-only data (costs, contacts).
 */
@Injectable()
export class LogisticsAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly codes: PublicCodeService,
    private readonly audit: AuditService,
    private readonly auth: AuthService,
  ) {}

  // ── Partners ──────────────────────────────────────────────────────────────

  async partners(): Promise<LogisticsPartner[]> {
    const rows = await this.prisma.logisticsPartner.findMany({
      orderBy: [{ active: 'desc' }, { name: 'asc' }],
      include: { _count: { select: { rateCards: true } } },
    });
    return rows.map(({ _count, createdAt: _c, updatedAt: _u, ...p }) => ({
      ...p,
      rateCards: _count.rateCards,
    }));
  }

  async savePartner(adminId: string, id: string | null, dto: LogisticsPartnerDto): Promise<void> {
    if (id) {
      await this.ensure(this.prisma.logisticsPartner.findUnique({ where: { id } }), 'Partner');
      await this.prisma.logisticsPartner.update({ where: { id }, data: dto });
    } else {
      const created = await this.prisma.$transaction(async (tx) =>
        tx.logisticsPartner.create({
          data: { ...dto, code: await this.codes.sequential('LP', 4, tx) },
        }),
      );
      id = created.id;
    }
    await this.log(adminId, 'logistics.partner_saved', 'LogisticsPartner', id);
  }

  /** People at a partner who use the partner portal. They set a password from the email. */
  async partnerUsers(partnerId: string): Promise<PartnerUser[]> {
    const users = await this.prisma.user.findMany({
      where: { logisticsPartnerId: partnerId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, email: true, firstName: true, lastName: true, status: true },
    });
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      name: `${u.firstName} ${u.lastName}`,
      status: u.status,
    }));
  }

  async createPartnerUser(
    adminId: string,
    partnerId: string,
    dto: CreatePartnerUserDto,
  ): Promise<void> {
    const partner = await this.ensure(
      this.prisma.logisticsPartner.findUnique({ where: { id: partnerId } }),
      'Partner',
    );
    if (!partner.active) throw new ConflictException('Activate the partner first');
    await this.auth.createStaffUser(adminId, {
      ...dto,
      role: 'PARTNER',
      logisticsPartnerId: partner.id,
    });
  }

  // ── Hubs ──────────────────────────────────────────────────────────────────

  async hubs(): Promise<Hub[]> {
    const rows = await this.prisma.hub.findMany({
      orderBy: [{ active: 'desc' }, { code: 'asc' }],
      include: { partner: partnerRef },
    });
    return rows.map(({ partnerId: _p, createdAt: _c, updatedAt: _u, ...h }) => h);
  }

  async saveHub(adminId: string, id: string | null, dto: HubDto): Promise<void> {
    if (dto.partnerId)
      await this.ensure(
        this.prisma.logisticsPartner.findUnique({ where: { id: dto.partnerId } }),
        'Partner',
      );
    const data = { ...dto, partnerId: dto.operator === 'PARTNER' ? dto.partnerId : null };
    try {
      if (id) {
        await this.ensure(this.prisma.hub.findUnique({ where: { id } }), 'Hub');
        await this.prisma.hub.update({ where: { id }, data });
      } else id = (await this.prisma.hub.create({ data })).id;
    } catch (error) {
      if (isUniqueViolation(error)) throw new ConflictException('A hub with that code exists');
      throw error;
    }
    await this.log(adminId, 'logistics.hub_saved', 'Hub', id);
  }

  // ── Rate cards ────────────────────────────────────────────────────────────

  async rateCards(): Promise<RateCard[]> {
    const rows = await this.prisma.rateCard.findMany({
      orderBy: [
        { active: 'desc' },
        { mode: 'asc' },
        { originCountry: 'asc' },
        { destinationCountry: 'asc' },
      ],
      take: 2000,
      include: { partner: partnerRef },
    });
    return rows.map((r) => ({
      id: r.id,
      partner: r.partner,
      mode: freightMode(r.mode),
      originCountry: r.originCountry,
      originPort: r.originPort,
      destinationCountry: r.destinationCountry,
      destinationPort: r.destinationPort,
      unit: r.unit,
      containerType: r.containerType,
      costMinor: r.costMinor,
      minChargeMinor: r.minChargeMinor,
      currency: r.currency,
      transitDaysMin: r.transitDaysMin,
      transitDaysMax: r.transitDaysMax,
      validFrom: isoDate(r.validFrom),
      validTo: isoDate(r.validTo),
      active: r.active,
      notes: r.notes,
    }));
  }

  async saveRateCard(adminId: string, id: string | null, dto: RateCardDto): Promise<void> {
    await this.ensure(
      this.prisma.logisticsPartner.findUnique({ where: { id: dto.partnerId } }),
      'Partner',
    );
    const data = { ...dto, validFrom: dateOnly(dto.validFrom), validTo: dateOnly(dto.validTo) };
    if (id) {
      await this.ensure(this.prisma.rateCard.findUnique({ where: { id } }), 'Rate card');
      await this.prisma.rateCard.update({ where: { id }, data });
    } else id = (await this.prisma.rateCard.create({ data })).id;
    await this.log(adminId, 'logistics.rate_card_saved', 'RateCard', id, {
      costMinor: dto.costMinor,
      currency: dto.currency,
    });
  }

  /** Cards are kept for history (quotes reference them later): retiring one deactivates it. */
  async retireRateCard(adminId: string, id: string): Promise<void> {
    const { count } = await this.prisma.rateCard.updateMany({
      where: { id },
      data: { active: false },
    });
    if (count !== 1) throw new NotFoundException('Rate card not found');
    await this.log(adminId, 'logistics.rate_card_retired', 'RateCard', id);
  }

  // ── Margin rules ──────────────────────────────────────────────────────────

  async marginRules(): Promise<LogisticsMarginRule[]> {
    const rows = await this.prisma.logisticsMarginRule.findMany({
      orderBy: [{ active: 'desc' }, { name: 'asc' }],
    });
    return rows.map(({ createdAt: _c, updatedAt: _u, ...r }) => ({
      ...r,
      mode: r.mode === null ? null : freightMode(r.mode),
    }));
  }

  async saveMarginRule(
    adminId: string,
    id: string | null,
    dto: LogisticsMarginRuleDto,
  ): Promise<void> {
    const duplicate = await this.prisma.logisticsMarginRule.findFirst({
      where: {
        active: true,
        mode: dto.mode,
        originCountry: dto.originCountry,
        destinationCountry: dto.destinationCountry,
        ...(id && { id: { not: id } }),
      },
      select: { name: true },
    });
    if (dto.active && duplicate)
      throw new ConflictException(`“${duplicate.name}” already covers that mode and route`);
    if (id) {
      await this.ensure(this.prisma.logisticsMarginRule.findUnique({ where: { id } }), 'Rule');
      await this.prisma.logisticsMarginRule.update({ where: { id }, data: dto });
    } else id = (await this.prisma.logisticsMarginRule.create({ data: dto })).id;
    await this.log(adminId, 'logistics.margin_saved', 'LogisticsMarginRule', id, {
      markupBps: dto.markupBps,
    });
  }

  async deleteMarginRule(adminId: string, id: string): Promise<void> {
    const { count } = await this.prisma.logisticsMarginRule.deleteMany({ where: { id } });
    if (count !== 1) throw new NotFoundException('Rule not found');
    await this.log(adminId, 'logistics.margin_deleted', 'LogisticsMarginRule', id);
  }

  // ── Duty rates ────────────────────────────────────────────────────────────

  async dutyRates(): Promise<DutyRate[]> {
    const rows = await this.prisma.dutyRate.findMany({
      orderBy: [{ destinationCountry: 'asc' }, { hsPrefix: 'asc' }],
      take: 5000,
    });
    return rows.map((r) => ({
      id: r.id,
      hsPrefix: r.hsPrefix,
      destinationCountry: r.destinationCountry,
      rateBps: r.rateBps,
      note: r.note,
      updatedAt: r.updatedAt.toISOString(),
    }));
  }

  async saveDutyRate(adminId: string, id: string | null, dto: DutyRateDto): Promise<void> {
    try {
      if (id) {
        await this.ensure(this.prisma.dutyRate.findUnique({ where: { id } }), 'Duty rate');
        await this.prisma.dutyRate.update({ where: { id }, data: dto });
      } else id = (await this.prisma.dutyRate.create({ data: dto })).id;
    } catch (error) {
      if (isUniqueViolation(error))
        throw new ConflictException('There is already a rate for that HS prefix and country');
      throw error;
    }
    await this.log(adminId, 'logistics.duty_rate_saved', 'DutyRate', id, { rateBps: dto.rateBps });
  }

  async deleteDutyRate(adminId: string, id: string): Promise<void> {
    const { count } = await this.prisma.dutyRate.deleteMany({ where: { id } });
    if (count !== 1) throw new NotFoundException('Duty rate not found');
    await this.log(adminId, 'logistics.duty_rate_deleted', 'DutyRate', id);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async ensure<T>(lookup: Promise<T | null>, what: string): Promise<T> {
    const found = await lookup;
    if (!found) throw new NotFoundException(`${what} not found`);
    return found;
  }

  private log(
    adminId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata?: Prisma.InputJsonValue,
  ): Promise<void> {
    return this.audit.log({
      actorUserId: adminId,
      action,
      entityType,
      entityId,
      ...(metadata !== undefined && { metadata }),
    });
  }
}
