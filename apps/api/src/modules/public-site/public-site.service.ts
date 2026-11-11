import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type AdminLead,
  DEFAULT_GIG_SETTINGS,
  GigSettingsSchema,
  type LeadDto,
  type DirectoryCategory,
  type DirectoryCountry,
  type PublicDirectory,
  type PublicPricing,
  type PublicStats,
  type UpdateLeadDto,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { listedManufacturer } from '../catalog/catalog.queries.js';
import { Notifier } from '../notifications/notifier.service.js';
import { serviceFees } from '../payments/charges.js';
import { PaymentsService } from '../payments/payments.service.js';
import { BuyerPlusService } from '../plans/buyer-plus.service.js';
import { PlansService } from '../plans/plans.service.js';

const STATS_TTL_MS = 10 * 60_000;
const KIND_LABEL: Record<LeadDto['kind'], string> = {
  SALES: 'Sourcing enquiry',
  ENTERPRISE: 'Enterprise enquiry',
  LOGISTICS_PARTNER: 'Logistics partner enquiry',
  MANUFACTURER: 'Manufacturer enquiry',
  SUPPORT: 'Support request',
  PRESS: 'Press enquiry',
};

/**
 * The public website's data: aggregate counts (never a single company), the live price list
 * from the staff settings, and enquiries from its forms for staff to follow up.
 */
@Injectable()
export class PublicSiteService {
  private stats: { at: number; value: PublicStats } | null = null;
  private directoryCache: { at: number; value: PublicDirectory } | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentsService,
    private readonly plans: PlansService,
    private readonly plus: BuyerPlusService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  /** Cached for ten minutes: the home page shouldn't run aggregate queries per visit. */
  async publicStats(): Promise<PublicStats> {
    if (this.stats && Date.now() - this.stats.at < STATS_TTL_MS) return this.stats.value;
    const delivered = {
      status: { in: ['DELIVERED', 'COMPLETED'] },
    } satisfies Prisma.OrderWhereInput;
    const [factories, factoryCountries, buyerCountries, categories, inspections, pieces] =
      await Promise.all([
        this.prisma.manufacturerProfile.count({ where: listedManufacturer }),
        this.prisma.company.findMany({
          where: { manufacturerProfile: listedManufacturer },
          select: { country: true },
          distinct: ['country'],
        }),
        this.prisma.order.findMany({
          where: delivered,
          select: { destinationCountry: true },
          distinct: ['destinationCountry'],
        }),
        this.prisma.category.count(),
        this.prisma.inspection.count({ where: { result: { not: 'PENDING' } } }),
        this.prisma.order.aggregate({ where: delivered, _sum: { quantity: true } }),
      ]);
    const value: PublicStats = {
      verifiedFactories: factories,
      sourcingCountries: factoryCountries.length,
      buyerCountries: buyerCountries.filter((o) => o.destinationCountry).length,
      categories,
      inspections,
      piecesDelivered: pieces._sum.quantity ?? 0,
    };
    this.stats = { at: Date.now(), value };
    return value;
  }

  async publicPricing(): Promise<PublicPricing> {
    const [fees, schedule, factoryPlans, buyerPlus, gigRow] = await Promise.all([
      serviceFees(this.prisma),
      this.payments.releaseSchedule(),
      this.plans.settings(),
      this.plus.settings(),
      this.prisma.platformSetting.findUnique({ where: { key: 'gig' } }),
    ]);
    const gig = GigSettingsSchema.safeParse(gigRow?.value);
    return {
      fees: {
        sampleFeeUsdMinor: fees.sampleFeeUsdMinor,
        inspectionFeeUsdMinor: fees.inspectionFeeUsdMinor,
        firstInspectionFree: fees.firstInspectionFree,
        creditSampleFees: fees.creditSampleFees,
        claimWindowDays: fees.claimWindowDays,
      },
      releaseSchedule: schedule.map((r) => ({ trigger: r.trigger, bps: r.bps })),
      factoryPlans,
      buyerPlus,
      inspectorDayRateUsdMinor: (gig.success ? gig.data : DEFAULT_GIG_SETTINGS).dayRateUsdMinor,
    };
  }

  /**
   * Categories and sourcing countries with totals and ranges from listed, verified factories
   * and their published products. Cached for ten minutes.
   */
  async directory(): Promise<PublicDirectory> {
    if (this.directoryCache && Date.now() - this.directoryCache.at < STATS_TTL_MS)
      return this.directoryCache.value;
    const [categories, factories, products] = await Promise.all([
      this.prisma.category.findMany({
        select: { slug: true, name: true, sortOrder: true, parent: { select: { slug: true } } },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.manufacturerProfile.findMany({
        where: listedManufacturer,
        select: {
          moqPcs: true,
          company: { select: { country: true } },
          categories: { select: { slug: true, parent: { select: { slug: true } } } },
          certifications: { where: { status: 'VERIFIED' }, select: { type: true } },
        },
      }),
      this.prisma.product.findMany({
        where: { status: 'PUBLISHED', deletedAt: null, manufacturerProfile: listedManufacturer },
        select: {
          moqPcs: true,
          leadTimeDays: true,
          category: { select: { slug: true, parent: { select: { slug: true } } } },
          manufacturerProfile: { select: { company: { select: { country: true } } } },
        },
      }),
    ]);
    const min = (xs: (number | null)[]) => {
      const v = xs.filter((x): x is number => x !== null && x > 0);
      return v.length > 0 ? Math.min(...v) : null;
    };
    const range = (xs: number[]) =>
      xs.length > 0 ? { min: Math.min(...xs), max: Math.max(...xs) } : null;
    // A category counts its own items and its sub-categories'.
    const within = (slug: string, c: { slug: string; parent: { slug: string } | null }) =>
      c.slug === slug || c.parent?.slug === slug;

    const categoryRows: DirectoryCategory[] = categories.map((c) => {
      const fs = factories.filter((f) => f.categories.some((fc) => within(c.slug, fc)));
      const ps = products.filter((p) => within(c.slug, p.category));
      return {
        slug: c.slug,
        name: c.name,
        parentSlug: c.parent?.slug ?? null,
        factories: fs.length,
        products: ps.length,
        countries: [...new Set(fs.map((f) => f.company.country))].sort(),
        minMoq: min([...fs.map((f) => f.moqPcs), ...ps.map((p) => p.moqPcs)]),
        leadTimeDays: range(ps.map((p) => p.leadTimeDays)),
      };
    });

    const countryRows: DirectoryCountry[] = [...new Set(factories.map((f) => f.company.country))]
      .sort()
      .map((code) => {
        const fs = factories.filter((f) => f.company.country === code);
        const ps = products.filter((p) => p.manufacturerProfile.company.country === code);
        const categoryCount = new Map<string, number>();
        for (const f of fs)
          for (const slug of new Set(f.categories.map((c) => c.parent?.slug ?? c.slug)))
            categoryCount.set(slug, (categoryCount.get(slug) ?? 0) + 1);
        const certCount = new Map<DirectoryCountry['certifications'][number]['type'], number>();
        for (const f of fs)
          for (const type of new Set(f.certifications.map((c) => c.type)))
            certCount.set(type, (certCount.get(type) ?? 0) + 1);
        return {
          code,
          factories: fs.length,
          products: ps.length,
          categories: [...categoryCount.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([slug]) => slug),
          certifications: [...certCount.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([type, n]) => ({ type, factories: n })),
          minMoq: min([...fs.map((f) => f.moqPcs), ...ps.map((p) => p.moqPcs)]),
          leadTimeDays: range(ps.map((p) => p.leadTimeDays)),
        };
      });

    const value = { categories: categoryRows, countries: countryRows };
    this.directoryCache = { at: Date.now(), value };
    return value;
  }

  // ── Leads ─────────────────────────────────────────────────────────────────

  async createLead(dto: LeadDto): Promise<void> {
    // The honeypot: bots fill every field. Accept silently, keep nothing.
    if (dto.website) return;
    const lead = await this.prisma.lead.create({
      data: {
        kind: dto.kind,
        name: dto.name,
        email: dto.email,
        company: dto.company ?? null,
        country: dto.country ?? null,
        phone: dto.phone ?? null,
        message: dto.message,
        source: dto.source ?? null,
      },
    });
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'SYSTEM',
      title: `${KIND_LABEL[dto.kind]}: ${dto.company ?? dto.name}`,
      body: dto.message.length > 160 ? `${dto.message.slice(0, 159)}…` : dto.message,
    });
    await this.audit.log({
      action: 'lead.received',
      entityType: 'Lead',
      entityId: lead.id,
      metadata: { kind: dto.kind, source: dto.source ?? null },
    });
  }

  async leads(): Promise<AdminLead[]> {
    const rows = await this.prisma.lead.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      take: 1000,
    });
    const staff = new Map(
      (
        await this.prisma.user.findMany({
          where: { id: { in: rows.flatMap((r) => (r.handledById ? [r.handledById] : [])) } },
          select: { id: true, firstName: true, lastName: true },
        })
      ).map((u) => [u.id, `${u.firstName} ${u.lastName}`]),
    );
    return rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      status: r.status,
      name: r.name,
      email: r.email,
      company: r.company,
      country: r.country,
      phone: r.phone,
      message: r.message,
      source: r.source,
      handledBy: r.handledById ? (staff.get(r.handledById) ?? null) : null,
      createdAt: r.createdAt.toISOString(),
    }));
  }

  async updateLead(adminId: string, id: string, dto: UpdateLeadDto): Promise<void> {
    const { count } = await this.prisma.lead.updateMany({
      where: { id },
      data: { status: dto.status, handledById: adminId },
    });
    if (count !== 1) throw new NotFoundException('Enquiry not found');
    await this.audit.log({
      actorUserId: adminId,
      action: 'lead.updated',
      entityType: 'Lead',
      entityId: id,
      metadata: { status: dto.status },
    });
  }
}
