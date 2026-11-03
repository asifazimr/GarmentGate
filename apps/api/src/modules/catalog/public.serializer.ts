/**
 * Buyer-facing serializers. THE ONLY WAY manufacturer or product data may reach a buyer.
 *
 * Three layers of defence (CLAUDE.md "Core rule: no direct contact"):
 *  1. Allowlist: every output field is copied explicitly. Nothing is spread from a database
 *     row, so new columns can never leak by default.
 *  2. Scrubbing: free text written by the factory (headline, about, product copy, captions) is
 *     re-filtered for contact details AND for the company's own names, website and owners'
 *     names, which the contact filter alone would not catch.
 *  3. Strict schemas: the result is parsed with z.strictObject schemas, which throw on any key
 *     not in the public contract.
 *
 * Never add: legal/trade name, address, phone, email, website, people's names, registration,
 * tax or certificate numbers, original file keys, or manufacturer prices.
 */
import {
  filterContactDetails,
  type ImageUrls,
  type PublicManufacturer,
  PublicManufacturerSchema,
  type PublicProduct,
  PublicProductSchema,
  bandFor,
  brandBadges,
  FLOOR_AREA_BANDS,
  type SupplierClaimRegion,
  type SupplierClaimStatus,
  type SupplierClaimTier,
  WORKFORCE_BANDS,
} from '@garmentgate/shared';

export const NAME_REDACTED = '[name removed]';

/** Words too generic to identify a company on their own; never scrubbed. */
const GENERIC_WORDS = new Set([
  'ltd',
  'limited',
  'llc',
  'inc',
  'co',
  'corp',
  'company',
  'pvt',
  'private',
  'plc',
  'gmbh',
  'ag',
  'sa',
  'as',
  'ab',
  'bv',
  'srl',
  'spa',
  'jsc',
  'tic',
  'san',
  've',
  'and',
  'the',
  'of',
  'group',
  'holdings',
  'international',
  'industries',
  'industrial',
  'industry',
  'mills',
  'mill',
  'apparel',
  'apparels',
  'garment',
  'garments',
  'textile',
  'textiles',
  'fashion',
  'fashions',
  'clothing',
  'knit',
  'knits',
  'knitting',
  'knitwear',
  'composite',
  'denim',
  'exports',
  'export',
  'manufacturing',
  'manufacturer',
  'factory',
  'organic',
  'activewear',
  'outerwear',
  'sportswear',
  'dis',
  'giyim',
  'tekstil',
]);

/** Data the scrubber needs to recognise this company in free text. Never output. */
export interface IdentityTerms {
  legalName: string;
  tradeName: string | null;
  website: string | null;
  peopleNames: string[];
}

/** Builds whole-word, case-insensitive patterns for everything that names this company. */
export function identityPatterns(identity: IdentityTerms): RegExp[] {
  const terms = new Set<string>();
  const addPhrase = (phrase: string | null) => {
    if (!phrase) return;
    const clean = phrase.trim();
    if (clean.length >= 3) terms.add(clean);
    for (const token of clean.split(/[^\p{L}\p{N}]+/u)) {
      if (token.length >= 4 && !GENERIC_WORDS.has(token.toLowerCase())) terms.add(token);
    }
  };
  addPhrase(identity.legalName);
  addPhrase(identity.tradeName);
  for (const name of identity.peopleNames) addPhrase(name);
  if (identity.website) {
    try {
      const host = new URL(identity.website).hostname.replace(/^www\./, '');
      terms.add(host);
      const label = host.split('.')[0];
      if (label && label.length >= 4) terms.add(label);
    } catch {
      addPhrase(identity.website);
    }
  }
  // Longest first, so a full name is removed before its parts.
  return [...terms]
    .sort((a, b) => b.length - a.length)
    .map((term) => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'giu');
    });
}

/** Removes contact details and anything that names the company or its people. */
export function scrubText(text: string | null, patterns: RegExp[]): string | null {
  if (text === null) return null;
  let out = filterContactDetails(text).filtered;
  for (const pattern of patterns) out = out.replace(pattern, NAME_REDACTED);
  out = out.replace(/\[name removed\](?:\s*\[name removed\])+/g, NAME_REDACTED).trim();
  return out === '' ? null : out;
}

// ── Sources (structural: Prisma rows with these relations satisfy them) ────────

interface CategorySource {
  slug: string;
  name: string;
}

interface ImageSource {
  id: string;
  fileId: string;
  reviewStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface PublicManufacturerSource {
  publicCode: string;
  headline: string | null;
  aboutFiltered: string | null;
  monthlyCapacityPcs: number | null;
  moqPcs: number | null;
  sampleLeadTimeDays: number | null;
  productionLeadTimeMinDays: number | null;
  productionLeadTimeMaxDays: number | null;
  workforceSize: number | null;
  factorySizeSqm: number | null;
  machinery: unknown;
  exportMarkets: string[];
  performanceScore: number;
  onTimeDeliveryBps: number | null;
  qcPassBps: number | null;
  reviewCount: number;
  ratingAvgX100: number | null;
  qualityAvgX100: number | null;
  communicationAvgX100: number | null;
  onTimeAvgX100: number | null;
  categories: CategorySource[];
  supplierClaims?: {
    region: SupplierClaimRegion;
    tier: SupplierClaimTier;
    brandNames: string[];
    status: SupplierClaimStatus;
  }[];
  certifications: {
    type: PublicManufacturer['certifications'][number]['type'];
    customName: string | null;
    status: string;
    expiresAt: Date | null;
  }[];
  photos: (ImageSource & { caption: string | null; sortOrder: number })[];
  company: {
    country: string;
    legalName: string;
    tradeName: string | null;
    website: string | null;
    users: { firstName: string; lastName: string }[];
  };
}

export interface PublicProductSource {
  id: string;
  title: string;
  descriptionFiltered: string | null;
  fabric: string | null;
  composition: string | null;
  gsm: number | null;
  moqPcs: number;
  leadTimeDays: number;
  currency: PublicProduct['currency'];
  category: CategorySource;
  priceTiers: { minQty: number; buyerUnitPriceMinor: number }[];
  images: (ImageSource & { alt: string | null; sortOrder: number })[];
  manufacturerProfile: {
    publicCode: string;
    company: PublicManufacturerSource['company'];
  };
}

/** Signed rendition URLs by file id. Files without READY renditions are simply absent. */
export type ImageUrlLookup = ReadonlyMap<string, ImageUrls>;

export function identityOf(company: PublicManufacturerSource['company']): IdentityTerms {
  return {
    legalName: company.legalName,
    tradeName: company.tradeName,
    website: company.website,
    peopleNames: company.users.flatMap((u) => [
      `${u.firstName} ${u.lastName}`,
      u.firstName,
      u.lastName,
    ]),
  };
}

function publicImages(
  images: (ImageSource & { caption: string | null; sortOrder: number })[],
  urls: ImageUrlLookup,
  patterns: RegExp[],
): PublicManufacturer['photos'] {
  return [...images]
    .filter((img) => img.reviewStatus === 'APPROVED')
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .flatMap((img) => {
      const imageUrls = urls.get(img.fileId);
      return imageUrls
        ? [{ id: img.id, caption: scrubText(img.caption, patterns), urls: imageUrls }]
        : [];
    });
}

function machineryOf(value: unknown): { type: string; count: number }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((m: unknown) => {
    if (typeof m !== 'object' || m === null) return [];
    const { type, count } = m as { type?: unknown; count?: unknown };
    return typeof type === 'string' && typeof count === 'number' && Number.isInteger(count)
      ? [{ type, count }]
      : [];
  });
}

export function toPublicManufacturer(
  source: PublicManufacturerSource,
  urls: ImageUrlLookup,
): PublicManufacturer {
  const patterns = identityPatterns(identityOf(source.company));
  const output: PublicManufacturer = {
    publicCode: source.publicCode,
    country: source.company.country,
    headline: scrubText(source.headline, patterns),
    about: scrubText(source.aboutFiltered, patterns),
    categories: source.categories.map((c) => ({ slug: c.slug, name: c.name })),
    capabilities: {
      monthlyCapacityPcs: source.monthlyCapacityPcs,
      moqPcs: source.moqPcs,
      sampleLeadTimeDays: source.sampleLeadTimeDays,
      productionLeadTimeMinDays: source.productionLeadTimeMinDays,
      productionLeadTimeMaxDays: source.productionLeadTimeMaxDays,
      workforceBand: bandFor(source.workforceSize, WORKFORCE_BANDS),
      factorySizeBand: bandFor(source.factorySizeSqm, FLOOR_AREA_BANDS),
      machinery: machineryOf(source.machinery).map((m) => ({
        type: scrubText(m.type, patterns) ?? '',
        count: m.count,
      })),
      exportMarkets: [...source.exportMarkets],
    },
    // Only verified certificates, without numbers (they identify the factory) or exact dates.
    certifications: source.certifications
      .filter((c) => c.status === 'VERIFIED')
      .map((c) => ({
        type: c.type,
        name: c.type === 'OTHER' ? scrubText(c.customName, patterns) : null,
        validUntil: c.expiresAt ? c.expiresAt.toISOString().slice(0, 7) : null,
      })),
    brandBadges: brandBadges(source.supplierClaims ?? []),
    scores: {
      performanceScore: source.performanceScore,
      onTimeDeliveryBps: source.onTimeDeliveryBps,
      qcPassBps: source.qcPassBps,
      rating:
        source.reviewCount > 0 && source.ratingAvgX100 !== null
          ? {
              average: source.ratingAvgX100 / 100,
              count: source.reviewCount,
              quality: (source.qualityAvgX100 ?? 0) / 100,
              communication: (source.communicationAvgX100 ?? 0) / 100,
              onTime: (source.onTimeAvgX100 ?? 0) / 100,
            }
          : null,
    },
    photos: publicImages(source.photos, urls, patterns),
  };
  return PublicManufacturerSchema.parse(output);
}

export function toPublicProduct(source: PublicProductSource, urls: ImageUrlLookup): PublicProduct {
  const patterns = identityPatterns(identityOf(source.manufacturerProfile.company));
  const output: PublicProduct = {
    id: source.id,
    manufacturerCode: source.manufacturerProfile.publicCode,
    country: source.manufacturerProfile.company.country,
    title: scrubText(source.title, patterns) ?? NAME_REDACTED,
    description: scrubText(source.descriptionFiltered, patterns),
    category: { slug: source.category.slug, name: source.category.name },
    fabric: scrubText(source.fabric, patterns),
    composition: scrubText(source.composition, patterns),
    gsm: source.gsm,
    moqPcs: source.moqPcs,
    leadTimeDays: source.leadTimeDays,
    currency: source.currency,
    // Buyer prices only. The manufacturer's price would reveal GarmentGate's margin.
    priceTiers: [...source.priceTiers]
      .sort((a, b) => a.minQty - b.minQty)
      .map((t) => ({ minQty: t.minQty, unitPriceMinor: t.buyerUnitPriceMinor })),
    images: publicImages(
      source.images.map((i) => ({ ...i, caption: i.alt })),
      urls,
      patterns,
    ),
  };
  return PublicProductSchema.parse(output);
}
