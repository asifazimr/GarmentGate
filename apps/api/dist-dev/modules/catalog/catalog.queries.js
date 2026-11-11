import { fileWithRenditions } from '../media/media.service.js';
export const identityForScrubbing = {
    select: {
        country: true,
        legalName: true,
        tradeName: true,
        website: true,
        users: { select: { firstName: true, lastName: true } },
    },
};
export const publicManufacturerInclude = {
    categories: { select: { slug: true, name: true }, orderBy: { sortOrder: 'asc' } },
    certifications: { select: { type: true, customName: true, status: true, expiresAt: true } },
    photos: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
    company: identityForScrubbing,
    supplierClaims: {
        where: { status: 'VERIFIED' },
        select: { region: true, tier: true, brandNames: true, status: true },
    },
};
export const publicProductInclude = {
    category: { select: { slug: true, name: true } },
    priceTiers: { select: { minQty: true, buyerUnitPriceMinor: true }, orderBy: { minQty: 'asc' } },
    images: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
    manufacturerProfile: { select: { publicCode: true, company: identityForScrubbing } },
};
export const listedManufacturer = {
    isListed: true,
    company: { kycStatus: 'VERIFIED', deletedAt: null },
};
//# sourceMappingURL=catalog.queries.js.map