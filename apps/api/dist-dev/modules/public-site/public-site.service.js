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
import { DEFAULT_GIG_SETTINGS, GigSettingsSchema, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { listedManufacturer } from '../catalog/catalog.queries.js';
import { Notifier } from '../notifications/notifier.service.js';
import { serviceFees } from '../payments/charges.js';
import { PaymentsService } from '../payments/payments.service.js';
import { BuyerPlusService } from '../plans/buyer-plus.service.js';
import { PlansService } from '../plans/plans.service.js';
const STATS_TTL_MS = 10 * 60_000;
const KIND_LABEL = {
    SALES: 'Sourcing enquiry',
    ENTERPRISE: 'Enterprise enquiry',
    LOGISTICS_PARTNER: 'Logistics partner enquiry',
    MANUFACTURER: 'Manufacturer enquiry',
    SUPPORT: 'Support request',
    PRESS: 'Press enquiry',
};
let PublicSiteService = class PublicSiteService {
    prisma;
    payments;
    plans;
    plus;
    notifier;
    audit;
    stats = null;
    directoryCache = null;
    constructor(prisma, payments, plans, plus, notifier, audit) {
        this.prisma = prisma;
        this.payments = payments;
        this.plans = plans;
        this.plus = plus;
        this.notifier = notifier;
        this.audit = audit;
    }
    async publicStats() {
        if (this.stats && Date.now() - this.stats.at < STATS_TTL_MS)
            return this.stats.value;
        const delivered = {
            status: { in: ['DELIVERED', 'COMPLETED'] },
        };
        const [factories, factoryCountries, buyerCountries, categories, inspections, pieces] = await Promise.all([
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
        const value = {
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
    async publicPricing() {
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
    async directory() {
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
        const min = (xs) => {
            const v = xs.filter((x) => x !== null && x > 0);
            return v.length > 0 ? Math.min(...v) : null;
        };
        const range = (xs) => xs.length > 0 ? { min: Math.min(...xs), max: Math.max(...xs) } : null;
        const within = (slug, c) => c.slug === slug || c.parent?.slug === slug;
        const categoryRows = categories.map((c) => {
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
        const countryRows = [...new Set(factories.map((f) => f.company.country))]
            .sort()
            .map((code) => {
            const fs = factories.filter((f) => f.company.country === code);
            const ps = products.filter((p) => p.manufacturerProfile.company.country === code);
            const categoryCount = new Map();
            for (const f of fs)
                for (const slug of new Set(f.categories.map((c) => c.parent?.slug ?? c.slug)))
                    categoryCount.set(slug, (categoryCount.get(slug) ?? 0) + 1);
            const certCount = new Map();
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
    async createLead(dto) {
        if (dto.website)
            return;
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
    async leads() {
        const rows = await this.prisma.lead.findMany({
            orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
            take: 1000,
        });
        const staff = new Map((await this.prisma.user.findMany({
            where: { id: { in: rows.flatMap((r) => (r.handledById ? [r.handledById] : [])) } },
            select: { id: true, firstName: true, lastName: true },
        })).map((u) => [u.id, `${u.firstName} ${u.lastName}`]));
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
    async updateLead(adminId, id, dto) {
        const { count } = await this.prisma.lead.updateMany({
            where: { id },
            data: { status: dto.status, handledById: adminId },
        });
        if (count !== 1)
            throw new NotFoundException('Enquiry not found');
        await this.audit.log({
            actorUserId: adminId,
            action: 'lead.updated',
            entityType: 'Lead',
            entityId: id,
            metadata: { status: dto.status },
        });
    }
};
PublicSiteService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        PaymentsService,
        PlansService,
        BuyerPlusService,
        Notifier,
        AuditService])
], PublicSiteService);
export { PublicSiteService };
//# sourceMappingURL=public-site.service.js.map