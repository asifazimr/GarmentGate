import {
  filterContactDetails,
  type ManufacturerCapabilitiesDto,
  MachineSchema,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';

export interface CapabilitiesWrite {
  data: Prisma.ManufacturerProfileUpdateInput;
  /** Contact details found in the free text, for moderation logging. */
  flagged: string[];
}

/** DTO → profile update. Free text keeps the original (admin-only) and a filtered copy. */
export function capabilitiesWrite(dto: ManufacturerCapabilitiesDto): CapabilitiesWrite {
  const about = dto.about ? filterContactDetails(dto.about) : null;
  const headline = dto.headline ? filterContactDetails(dto.headline) : null;
  return {
    data: {
      headline: headline?.filtered ?? null,
      about: dto.about ?? null,
      aboutFiltered: about?.filtered ?? null,
      monthlyCapacityPcs: dto.monthlyCapacityPcs,
      moqPcs: dto.moqPcs,
      sampleLeadTimeDays: dto.sampleLeadTimeDays,
      productionLeadTimeMinDays: dto.productionLeadTimeMinDays,
      productionLeadTimeMaxDays: dto.productionLeadTimeMaxDays,
      workforceSize: dto.workforceSize,
      factorySizeSqm: dto.factorySizeSqm ?? null,
      machinery: dto.machinery.map((m) => ({
        type: filterContactDetails(m.type).filtered,
        count: m.count,
      })),
      exportMarkets: dto.exportMarkets,
      categories: { set: dto.categoryIds.map((id) => ({ id })) },
    },
    flagged: [...(about?.reasons ?? []), ...(headline?.reasons ?? [])],
  };
}

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
  categories: { id: string }[];
}

/** Profile row → the manufacturer's own editable view (null until capabilities were saved). */
export function capabilitiesView(mp: ProfileRow | null): ManufacturerCapabilitiesDto | null {
  if (mp === null) return null;
  if (mp.monthlyCapacityPcs === null) return null;
  const machinery = MachineSchema.array().safeParse(mp.machinery);
  return {
    categoryIds: mp.categories.map((c) => c.id),
    headline: mp.headline ?? undefined,
    about: mp.about ?? undefined,
    monthlyCapacityPcs: mp.monthlyCapacityPcs,
    moqPcs: mp.moqPcs ?? 1,
    sampleLeadTimeDays: mp.sampleLeadTimeDays ?? 1,
    productionLeadTimeMinDays: mp.productionLeadTimeMinDays ?? 1,
    productionLeadTimeMaxDays: mp.productionLeadTimeMaxDays ?? 1,
    workforceSize: mp.workforceSize ?? 1,
    factorySizeSqm: mp.factorySizeSqm ?? undefined,
    machinery: machinery.success ? machinery.data : [],
    exportMarkets: mp.exportMarkets,
  };
}
