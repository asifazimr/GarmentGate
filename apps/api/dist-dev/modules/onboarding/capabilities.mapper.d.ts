import { type ManufacturerCapabilitiesDto } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
export interface CapabilitiesWrite {
    data: Prisma.ManufacturerProfileUpdateInput;
    flagged: string[];
}
export declare function capabilitiesWrite(dto: ManufacturerCapabilitiesDto): CapabilitiesWrite;
interface ProfileRow {
    headline: string | null;
    about: string | null;
    monthlyCapacityPcs: number | null;
    moqPcs: number | null;
    sampleLeadTimeDays: number | null;
    productionLeadTimeMinDays: number | null;
    productionLeadTimeMaxDays: number | null;
    workforceSize: number | null;
    factorySizeSqm: number | null;
    machinery: unknown;
    exportMarkets: string[];
    categories: {
        id: string;
    }[];
}
export declare function capabilitiesView(mp: ProfileRow | null): ManufacturerCapabilitiesDto | null;
export {};
