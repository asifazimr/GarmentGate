import { PublicManufacturerSchema, PublicProductSchema, type ImageUrls } from '@garmentgate/shared';
import { describe, expect, it } from 'vitest';
import {
  NAME_REDACTED,
  type PublicManufacturerSource,
  type PublicProductSource,
  scrubText,
  identityPatterns,
  toPublicManufacturer,
  toPublicProduct,
} from './public.serializer.js';

/*
 * Every identifying value carries the marker "SENTINEL" (or a sentinel number), so a single
 * case-insensitive search of the serialized JSON proves nothing identifying got through.
 */
const SENTINEL = /sentinel/i;
const SENTINEL_PRICE = 777_777;

const identifyingCompany = {
  // Fields the serializer reads (for scrubbing) but must never output:
  country: 'BD',
  legalName: 'Sentinelwear Knit Composite Ltd.',
  tradeName: 'Sentinelwear',
  website: 'https://www.sentinel-factory.example',
  users: [
    {
      firstName: 'Sentinelfirst',
      lastName: 'Sentinellast',
      email: 'owner@sentinel-mail.example',
      phone: '+880 1711-000000',
    },
  ],
  // Fields that exist on the real row and must never be read or output:
  addressLine1: 'SENTINEL Road 1, Gazipur',
  addressLine2: 'SENTINEL Block B',
  city: 'SENTINEL-CITY',
  postalCode: 'SENTINEL-1700',
  phone: '+880 2 SENTINEL',
  registrationNumber: 'SENTINEL-REG-42',
  taxId: 'SENTINEL-TAX-42',
  kycRejectionReason: 'SENTINEL note',
};

const urls = (id: string): ImageUrls => ({
  thumb: `https://cdn.example/renditions/${id}/320.webp`,
  medium: `https://cdn.example/renditions/${id}/800.webp`,
  large: `https://cdn.example/renditions/${id}/1600.webp`,
  width: 1600,
  height: 1200,
});

function manufacturerSource(): PublicManufacturerSource {
  return {
    publicCode: 'MFR-BD-0421',
    headline: 'Sentinelwear: vertical knit composite for basics',
    aboutFiltered:
      'Founded by Sentinelfirst Sentinellast. Visit sentinel-factory.example or call +880 1711-000000. We knit 450k pcs a month.',
    monthlyCapacityPcs: 450_000,
    moqPcs: 1000,
    sampleLeadTimeDays: 10,
    productionLeadTimeMinDays: 45,
    productionLeadTimeMaxDays: 60,
    workforceSize: 3200,
    factorySizeSqm: 42_000,
    machinery: [
      { type: 'Overlock', count: 610 },
      { type: 'Sentinelwear custom line', count: 2 },
      { bogus: 'SENTINEL-not-a-machine' },
    ],
    exportMarkets: ['US', 'DE'],
    performanceScore: 92,
    onTimeDeliveryBps: 9450,
    qcPassBps: 8700,
    reviewCount: 4,
    ratingAvgX100: 462,
    qualityAvgX100: 475,
    communicationAvgX100: 450,
    onTimeAvgX100: 460,
    categories: [{ slug: 't-shirts', name: 'T-shirts' }],
    certifications: [
      {
        type: 'GOTS',
        customName: null,
        status: 'VERIFIED',
        expiresAt: new Date('2027-01-31T00:00:00Z'),
      },
      {
        type: 'OTHER',
        customName: 'Sentinelwear in-house audit',
        status: 'VERIFIED',
        expiresAt: null,
      },
      { type: 'WRAP', customName: null, status: 'PENDING', expiresAt: null },
    ],
    photos: [
      {
        id: '01a19700-0000-7000-8000-000000000001',
        fileId: 'f-approved',
        reviewStatus: 'APPROVED',
        caption: 'Sentinelwear cutting floor',
        sortOrder: 1,
      },
      {
        id: '01a19700-0000-7000-8000-000000000002',
        fileId: 'f-pending',
        reviewStatus: 'PENDING',
        caption: 'Pending',
        sortOrder: 0,
      },
      {
        id: '01a19700-0000-7000-8000-000000000003',
        fileId: 'f-rejected',
        reviewStatus: 'REJECTED',
        caption: 'Rejected',
        sortOrder: 2,
      },
      {
        id: '01a19700-0000-7000-8000-000000000004',
        fileId: 'f-unprocessed',
        reviewStatus: 'APPROVED',
        caption: 'Not processed yet',
        sortOrder: 3,
      },
    ],
    company: identifyingCompany,
  };
}

function productSource(): PublicProductSource {
  return {
    id: '01a19700-0000-7000-8000-0000000000aa',
    title: 'Sentinelwear heavyweight tee',
    descriptionFiltered: 'Made by Sentinelwear. Email sales@sentinel-factory.example.',
    fabric: 'Single jersey',
    composition: '100% cotton',
    gsm: 240,
    moqPcs: 1000,
    leadTimeDays: 45,
    currency: 'USD',
    category: { slug: 't-shirts', name: 'T-shirts' },
    priceTiers: [
      { minQty: 5000, buyerUnitPriceMinor: 335 },
      { minQty: 1000, buyerUnitPriceMinor: 365 },
    ],
    images: [
      {
        id: '01a19700-0000-7000-8000-0000000000b1',
        fileId: 'p-approved',
        reviewStatus: 'APPROVED',
        alt: 'Front',
        sortOrder: 0,
      },
      {
        id: '01a19700-0000-7000-8000-0000000000b2',
        fileId: 'p-pending',
        reviewStatus: 'PENDING',
        alt: null,
        sortOrder: 1,
      },
    ],
    manufacturerProfile: { publicCode: 'MFR-BD-0421', company: identifyingCompany },
  };
}

const imageUrls = new Map([
  ['f-approved', urls('f-approved')],
  ['f-pending', urls('f-pending')],
  ['f-rejected', urls('f-rejected')],
  ['p-approved', urls('p-approved')],
  ['p-pending', urls('p-pending')],
]);

describe('toPublicManufacturer', () => {
  it('never outputs identity, contact or registration data', () => {
    const json = JSON.stringify(toPublicManufacturer(manufacturerSource(), imageUrls));
    expect(json).not.toMatch(SENTINEL);
    expect(json).not.toMatch(/\+?880|1711/); // phone number
    expect(json).not.toMatch(/@/); // no email of any kind
  });

  it('outputs exactly the public contract keys, nothing more', () => {
    const out = toPublicManufacturer(manufacturerSource(), imageUrls);
    expect(Object.keys(out).sort()).toEqual(
      [
        'about',
        'capabilities',
        'categories',
        'certifications',
        'country',
        'headline',
        'photos',
        'publicCode',
        'scores',
      ].sort(),
    );
    expect(Object.keys(out.capabilities).sort()).toEqual(
      [
        'exportMarkets',
        'factorySizeSqm',
        'machinery',
        'moqPcs',
        'monthlyCapacityPcs',
        'productionLeadTimeMaxDays',
        'productionLeadTimeMinDays',
        'sampleLeadTimeDays',
        'workforceSize',
      ].sort(),
    );
    for (const cert of out.certifications) {
      expect(Object.keys(cert).sort()).toEqual(['name', 'type', 'validUntil']);
    }
  });

  it('ignores extra fields on the source, including ones added to the schema later', () => {
    const source = manufacturerSource();
    const withExtras = Object.assign(source, {
      legalName: 'SENTINEL-EXTRA-LEGAL',
      ownerEmail: 'sentinel@extra.example',
      bankAccount: 'SENTINEL-IBAN',
      internalNotes: 'SENTINEL internal',
    });
    Object.assign(withExtras.company, { newColumnAddedLater: 'SENTINEL-NEW-COLUMN' });
    const json = JSON.stringify(toPublicManufacturer(withExtras, imageUrls));
    expect(json).not.toMatch(SENTINEL);
  });

  it('removes the company’s own names, website and contact details from free text', () => {
    const out = toPublicManufacturer(manufacturerSource(), imageUrls);
    expect(out.headline).toBe(`${NAME_REDACTED}: vertical knit composite for basics`);
    expect(out.about).toContain('We knit 450k pcs a month.');
    expect(out.about).not.toMatch(/sentinel|1711/i);
    expect(out.capabilities.machinery).toEqual([
      { type: 'Overlock', count: 610 },
      { type: `${NAME_REDACTED} custom line`, count: 2 },
    ]);
  });

  it('shows only verified certificates, without numbers and with month precision', () => {
    const out = toPublicManufacturer(manufacturerSource(), imageUrls);
    expect(out.certifications).toEqual([
      { type: 'GOTS', name: null, validUntil: '2027-01' },
      { type: 'OTHER', name: `${NAME_REDACTED} in-house audit`, validUntil: null },
    ]);
  });

  it('shows only approved, processed photos, as rendition URLs', () => {
    const out = toPublicManufacturer(manufacturerSource(), imageUrls);
    expect(out.photos).toHaveLength(1);
    expect(out.photos[0]).toEqual({
      id: '01a19700-0000-7000-8000-000000000001',
      caption: `${NAME_REDACTED} cutting floor`,
      urls: urls('f-approved'),
    });
  });

  it('the public schema rejects any identifying key, even if a serializer tried to add one', () => {
    const valid = toPublicManufacturer(manufacturerSource(), imageUrls);
    for (const key of [
      'legalName',
      'tradeName',
      'website',
      'phone',
      'email',
      'addressLine1',
      'ownerName',
      'registrationNumber',
    ]) {
      expect(PublicManufacturerSchema.safeParse({ ...valid, [key]: 'x' }).success).toBe(false);
    }
    expect(
      PublicManufacturerSchema.safeParse({
        ...valid,
        certifications: [{ type: 'GOTS', name: null, validUntil: null, certificateNumber: 'x' }],
      }).success,
    ).toBe(false);
  });
});

describe('toPublicProduct', () => {
  it('never outputs identity data or the manufacturer’s price', () => {
    const source = productSource();
    Object.assign(source.priceTiers[0] ?? {}, { manufacturerUnitPriceMinor: SENTINEL_PRICE });
    Object.assign(source, { manufacturerProfileId: 'SENTINEL-PROFILE-ID' });
    const json = JSON.stringify(toPublicProduct(source, imageUrls));
    expect(json).not.toMatch(SENTINEL);
    expect(json).not.toContain(String(SENTINEL_PRICE));
    expect(json).not.toMatch(/@/);
  });

  it('sends buyer prices only, sorted by quantity', () => {
    const out = toPublicProduct(productSource(), imageUrls);
    expect(out.priceTiers).toEqual([
      { minQty: 1000, unitPriceMinor: 365 },
      { minQty: 5000, unitPriceMinor: 335 },
    ]);
  });

  it('scrubs names from product copy and shows only approved images', () => {
    const out = toPublicProduct(productSource(), imageUrls);
    expect(out.title).toBe(`${NAME_REDACTED} heavyweight tee`);
    expect(out.description).not.toMatch(/sentinel|@/i);
    expect(out.images.map((i) => i.id)).toEqual(['01a19700-0000-7000-8000-0000000000b1']);
    expect(out.manufacturerCode).toBe('MFR-BD-0421');
  });

  it('the public product schema rejects manufacturer prices', () => {
    const valid = toPublicProduct(productSource(), imageUrls);
    expect(
      PublicProductSchema.safeParse({
        ...valid,
        priceTiers: [{ minQty: 1, unitPriceMinor: 1, manufacturerUnitPriceMinor: 1 }],
      }).success,
    ).toBe(false);
  });
});

describe('scrubText', () => {
  const patterns = identityPatterns({
    legalName: 'Meghna Knit Composite Ltd.',
    tradeName: 'Meghna Knit',
    website: 'https://meghnaknit.example',
    peopleNames: ['Rafiq Hossain', 'Rafiq', 'Hossain'],
  });

  it('removes distinctive name parts but keeps generic industry words', () => {
    expect(scrubText('Meghna has 3,200 workers and a knit composite unit.', patterns)).toBe(
      `${NAME_REDACTED} has 3,200 workers and a knit composite unit.`,
    );
    expect(scrubText('Ask for Rafiq or see meghnaknit for details', patterns)).toBe(
      `Ask for ${NAME_REDACTED} or see ${NAME_REDACTED} for details`,
    );
  });

  it('matches whole words only', () => {
    expect(scrubText('Rafiqul is not the owner', patterns)).toBe('Rafiqul is not the owner');
  });
});
