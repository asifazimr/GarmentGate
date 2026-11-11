import { type ImageUrls, type PublicManufacturer, type PublicProduct, type SupplierClaimRegion, type SupplierClaimStatus, type SupplierClaimTier } from '@garmentgate/shared';
export declare const NAME_REDACTED = "[name removed]";
export interface IdentityTerms {
    legalName: string;
    tradeName: string | null;
    website: string | null;
    peopleNames: string[];
}
export declare function identityPatterns(identity: IdentityTerms): RegExp[];
export declare function scrubText(text: string | null, patterns: RegExp[]): string | null;
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
    photos: (ImageSource & {
        caption: string | null;
        sortOrder: number;
    })[];
    company: {
        country: string;
        legalName: string;
        tradeName: string | null;
        website: string | null;
        users: {
            firstName: string;
            lastName: string;
        }[];
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
    priceTiers: {
        minQty: number;
        buyerUnitPriceMinor: number;
    }[];
    images: (ImageSource & {
        alt: string | null;
        sortOrder: number;
    })[];
    manufacturerProfile: {
        publicCode: string;
        company: PublicManufacturerSource['company'];
    };
}
export type ImageUrlLookup = ReadonlyMap<string, ImageUrls>;
export declare function identityOf(company: PublicManufacturerSource['company']): IdentityTerms;
export declare function toPublicManufacturer(source: PublicManufacturerSource, urls: ImageUrlLookup): PublicManufacturer;
export declare function toPublicProduct(source: PublicProductSource, urls: ImageUrlLookup): PublicProduct;
export {};
