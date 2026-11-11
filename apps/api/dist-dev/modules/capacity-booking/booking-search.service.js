var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { bookingPrice, brandBadges, CapacitySearchResponseSchema, dateOnly, isoDate, minutesForPieces, piecesForMinutes, samToCenti, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { listedManufacturer } from '../catalog/catalog.queries.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { relatedCategoryIds } from './bookings.service.js';
const MAX_FACTORIES = 50;
let BookingSearchService = class BookingSearchService {
    prisma;
    settings;
    constructor(prisma, settings) {
        this.prisma = prisma;
        this.settings = settings;
    }
    async search(query) {
        const settings = await this.settings.get();
        const samCenti = query.samPerPiece === undefined ? null : samToCenti(query.samPerPiece);
        const minutes = query.minutes ??
            (samCenti !== null && query.pieces ? minutesForPieces(query.pieces, samCenti) : 0);
        const categories = await relatedCategoryIds(this.prisma, query.categoryId);
        const today = isoDate(new Date());
        const from = dateOnly(query.from > today ? query.from : today);
        const slots = await this.prisma.capacitySlot.findMany({
            where: {
                status: 'OPEN',
                endDate: { gte: from },
                startDate: { lte: dateOnly(query.to) },
                line: {
                    status: 'ACTIVE',
                    categories: { some: { id: { in: categories } } },
                    manufacturerProfile: listedManufacturer,
                },
            },
            orderBy: { startDate: 'asc' },
            take: 2000,
            include: {
                line: {
                    select: {
                        id: true,
                        cmRateMinorPer100Min: true,
                        currency: true,
                        manufacturerProfileId: true,
                        manufacturerProfile: {
                            select: {
                                publicCode: true,
                                performanceScore: true,
                                company: { select: { country: true } },
                                supplierClaims: {
                                    where: { status: 'VERIFIED' },
                                    select: { region: true, tier: true, brandNames: true, status: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        const byFactory = new Map();
        for (const slot of slots) {
            const free = slot.totalMinutes - slot.bookedMinutes;
            if (free <= 0)
                continue;
            const profile = slot.line.manufacturerProfile;
            let entry = byFactory.get(slot.line.manufacturerProfileId);
            if (!entry) {
                entry = {
                    result: {
                        manufacturer: {
                            publicCode: profile.publicCode,
                            country: profile.company.country,
                            performanceScore: profile.performanceScore,
                            brandBadges: brandBadges(profile.supplierClaims),
                        },
                        windows: [],
                    },
                    lines: [],
                    firstFit: null,
                };
                byFactory.set(slot.line.manufacturerProfileId, entry);
            }
            if (!entry.lines.includes(slot.lineId))
                entry.lines.push(slot.lineId);
            const fits = minutes > 0 && free >= minutes;
            const price = fits
                ? bookingPrice({
                    minutes,
                    factoryRateMinorPer100Min: slot.line.cmRateMinorPer100Min,
                    feeBps: settings.bookingFeeBps,
                    depositBps: settings.depositBps,
                })
                : null;
            const startDate = isoDate(slot.startDate);
            if (fits && (entry.firstFit === null || startDate < entry.firstFit))
                entry.firstFit = startDate;
            entry.result.windows.push({
                slotId: slot.id,
                lineId: slot.lineId,
                lineNumber: entry.lines.indexOf(slot.lineId) + 1,
                startDate,
                endDate: isoDate(slot.endDate),
                totalMinutes: slot.totalMinutes,
                freeMinutes: free,
                fits,
                estimatedPieces: samCenti === null ? null : piecesForMinutes(fits ? minutes : free, samCenti),
                quote: price
                    ? {
                        minutes,
                        currency: slot.line.currency,
                        buyerRateMinorPer100Min: price.buyerRateMinorPer100Min,
                        buyerAmountMinor: Number(price.buyerAmountMinor),
                        depositMinor: Number(price.depositMinor),
                        depositBps: settings.depositBps,
                    }
                    : null,
            });
        }
        const results = [...byFactory.values()]
            .sort((a, b) => (a.firstFit === null ? 1 : 0) - (b.firstFit === null ? 1 : 0) ||
            (a.firstFit ?? '').localeCompare(b.firstFit ?? '') ||
            b.result.manufacturer.performanceScore - a.result.manufacturer.performanceScore)
            .slice(0, MAX_FACTORIES)
            .map((e) => e.result);
        return CapacitySearchResponseSchema.parse({ minutes, results });
    }
};
BookingSearchService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        BookingSettingsService])
], BookingSearchService);
export { BookingSearchService };
//# sourceMappingURL=booking-search.service.js.map