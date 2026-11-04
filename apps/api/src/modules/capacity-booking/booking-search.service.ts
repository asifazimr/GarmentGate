import { Injectable } from '@nestjs/common';
import {
  bookingPrice,
  brandBadges,
  type CapacitySearchQuery,
  type CapacitySearchResponse,
  CapacitySearchResponseSchema,
  type CapacitySearchResult,
  dateOnly,
  isoDate,
  minutesForPieces,
  piecesForMinutes,
  samToCenti,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { listedManufacturer } from '../catalog/catalog.queries.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { relatedCategoryIds } from './bookings.service.js';

const MAX_FACTORIES = 50;

/**
 * "Book capacity": open windows on lines that make the category, between two dates, grouped by
 * factory. Buyers see the factory's public code, country, score and brand badges, numbered lines
 * and their own (marked-up) price. Never line codes or names, the CM rate, or headcount.
 */
@Injectable()
export class BookingSearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: BookingSettingsService,
  ) {}

  async search(query: CapacitySearchQuery): Promise<CapacitySearchResponse> {
    const settings = await this.settings.get();
    const samCenti = query.samPerPiece === undefined ? null : samToCenti(query.samPerPiece);
    const minutes =
      query.minutes ??
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

    const byFactory = new Map<
      string,
      { result: CapacitySearchResult; lines: string[]; firstFit: string | null }
    >();
    for (const slot of slots) {
      const free = slot.totalMinutes - slot.bookedMinutes;
      if (free <= 0) continue;
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
      if (!entry.lines.includes(slot.lineId)) entry.lines.push(slot.lineId);
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
        estimatedPieces:
          samCenti === null ? null : piecesForMinutes(fits ? minutes : free, samCenti),
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
      .sort(
        (a, b) =>
          (a.firstFit === null ? 1 : 0) - (b.firstFit === null ? 1 : 0) ||
          (a.firstFit ?? '').localeCompare(b.firstFit ?? '') ||
          b.result.manufacturer.performanceScore - a.result.manufacturer.performanceScore,
      )
      .slice(0, MAX_FACTORIES)
      .map((e) => e.result);
    // Strict schema: throws if anything beyond the allowlist slipped in.
    return CapacitySearchResponseSchema.parse({ minutes, results });
  }
}
