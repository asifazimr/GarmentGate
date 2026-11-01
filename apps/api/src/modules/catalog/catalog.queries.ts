import type { Prisma } from '../../generated/prisma/client.js';
import { fileWithRenditions } from '../media/media.service.js';

/**
 * Query shapes for buyer-facing reads. They select only what the public serializers need:
 * identity fields are loaded solely so the serializer can scrub them out of free text.
 */
export const identityForScrubbing = {
  select: {
    country: true,
    legalName: true,
    tradeName: true,
    website: true,
    users: { select: { firstName: true, lastName: true } },
  },
} satisfies Prisma.CompanyDefaultArgs;

export const publicManufacturerInclude = {
  categories: { select: { slug: true, name: true }, orderBy: { sortOrder: 'asc' } },
  certifications: { select: { type: true, customName: true, status: true, expiresAt: true } },
  photos: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
  company: identityForScrubbing,
} satisfies Prisma.ManufacturerProfileInclude;

export const publicProductInclude = {
  category: { select: { slug: true, name: true } },
  priceTiers: { select: { minQty: true, buyerUnitPriceMinor: true }, orderBy: { minQty: 'asc' } },
  images: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
  manufacturerProfile: { select: { publicCode: true, company: identityForScrubbing } },
} satisfies Prisma.ProductInclude;

/** Only verified, listed factories are visible to buyers. */
export const listedManufacturer = {
  isListed: true,
  company: { kycStatus: 'VERIFIED', deletedAt: null },
} satisfies Prisma.ManufacturerProfileWhereInput;
