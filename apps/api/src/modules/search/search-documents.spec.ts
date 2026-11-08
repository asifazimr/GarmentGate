import { ProductSearchQuerySchema } from '@garmentgate/shared';
import { describe, expect, it } from 'vitest';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import {
  MANUFACTURER_DOCUMENT_KEYS,
  manufacturerDocument,
  PRODUCT_DOCUMENT_KEYS,
  productDocument,
} from './search-documents.js';
import { productFilter, productSort } from './search-filters.js';

const company = {
  country: 'BD',
  legalName: 'Sentinelwear Ltd.',
  tradeName: 'Sentinelwear',
  website: 'https://sentinel.example',
  users: [{ firstName: 'Sentinelfirst', lastName: 'Sentinellast' }],
  phone: '+880 SENTINEL',
  addressLine1: 'SENTINEL street',
};

const product = toPublicProduct(
  {
    id: '01a19700-0000-7000-8000-0000000000aa',
    title: 'Sentinelwear boxy tee',
    descriptionFiltered: 'Heavy cotton by Sentinelwear',
    fabric: 'Single jersey',
    composition: '100% cotton',
    gsm: 240,
    moqPcs: 1000,
    leadTimeDays: 45,
    currency: 'USD',
    category: { slug: 't-shirts', name: 'T-shirts' },
    priceTiers: [
      { minQty: 1000, buyerUnitPriceMinor: 365 },
      { minQty: 5000, buyerUnitPriceMinor: 312 },
    ],
    images: [],
    manufacturerProfile: { publicCode: 'MFR-BD-0421', company },
  },
  new Map(),
);

describe('search documents', () => {
  it('product documents hold only buyer-safe fields', () => {
    const doc = productDocument(product, {
      categorySlugs: ['t-shirts', 'tops'],
      certifications: ['GOTS'],
      performanceScore: 92,
      searchBoost: 2,
      createdAt: new Date('2026-10-01T00:00:00Z'),
    });
    expect(Object.keys(doc).sort()).toEqual([...PRODUCT_DOCUMENT_KEYS].sort());
    expect(JSON.stringify(doc)).not.toMatch(/sentinel/i);
    expect(doc).toMatchObject({ minPrice: 312, maxPrice: 365, categories: ['t-shirts', 'tops'] });
  });

  it('manufacturer documents hold only buyer-safe fields', () => {
    const m = toPublicManufacturer(
      {
        publicCode: 'MFR-BD-0421',
        headline: 'Sentinelwear basics',
        aboutFiltered: 'Run by Sentinelfirst',
        monthlyCapacityPcs: 1000,
        moqPcs: 100,
        sampleLeadTimeDays: 5,
        productionLeadTimeMinDays: 30,
        productionLeadTimeMaxDays: 40,
        workforceSize: 100,
        factorySizeSqm: null,
        machinery: [{ type: 'Overlock', count: 2 }],
        exportMarkets: [],
        performanceScore: 80,
        onTimeDeliveryBps: null,
        qcPassBps: null,
        reviewCount: 0,
        ratingAvgX100: null,
        qualityAvgX100: null,
        communicationAvgX100: null,
        onTimeAvgX100: null,
        categories: [{ slug: 't-shirts', name: 'T-shirts' }],
        certifications: [{ type: 'GOTS', customName: null, status: 'VERIFIED', expiresAt: null }],
        photos: [],
        company,
      },
      new Map(),
    );
    const doc = manufacturerDocument(m, ['tops']);
    expect(Object.keys(doc).sort()).toEqual([...MANUFACTURER_DOCUMENT_KEYS].sort());
    expect(JSON.stringify(doc)).not.toMatch(/sentinel/i);
  });
});

describe('productFilter', () => {
  it('quotes every string and ANDs certifications', () => {
    const query = ProductSearchQuerySchema.parse({
      category: 't-shirts,hoodies',
      fabric: 'Single jersey',
      cert: 'GOTS,OEKO_TEX_100',
      gsmMin: '180',
      moqMax: '1000',
      priceMax: '500',
      leadTimeMax: '60',
    });
    expect(productFilter(query)).toEqual([
      'categories IN ["t-shirts", "hoodies"]',
      'fabric IN ["Single jersey"]',
      'certifications = "GOTS"',
      'certifications = "OEKO_TEX_100"',
      'gsm >= 180',
      'moqPcs <= 1000',
      'leadTimeDays <= 60',
      'currency = "USD"',
      'minPrice <= 500',
    ]);
  });

  it('cannot be used to inject filter syntax', () => {
    const query = ProductSearchQuerySchema.parse({ fabric: 'x" OR country = "BD' });
    expect(productFilter(query)).toEqual(['fabric IN ["x\\" OR country = \\"BD"]']);
  });

  it('maps sort options', () => {
    expect(productSort('price_asc')).toEqual(['minPrice:asc']);
    expect(productSort('relevance')).toBeUndefined();
  });
});
