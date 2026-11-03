import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  type AdminClaim,
  CLAIM_EVIDENCE_MAX_BYTES,
  type ManufacturerClaim,
  type RejectClaimDto,
  type SupplierClaimDto,
  type SupplierClaimStatus,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';

type ClaimRow = Prisma.SupplierClaimGetPayload<object>;

/**
 * "We supply major EU brands." Factories name the brands and upload evidence; staff verify it.
 * Buyers only ever get a badge (region, tier, count) from `brandBadges`, never the names.
 */
@Injectable()
export class ClaimsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly files: FilesService,
    private readonly storage: StorageService,
    private readonly search: SearchService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  // ── Factory ───────────────────────────────────────────────────────────────

  async list(ctx: ManufacturerContext): Promise<ManufacturerClaim[]> {
    const rows = await this.prisma.supplierClaim.findMany({
      where: { manufacturerProfileId: ctx.profileId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((c) => this.view(c));
  }

  async create(ctx: ManufacturerContext, dto: SupplierClaimDto): Promise<ManufacturerClaim> {
    const file = await this.files.confirmUpload(
      dto.evidenceFileId,
      ctx.companyId,
      'SUPPLIER_CLAIM_EVIDENCE',
      CLAIM_EVIDENCE_MAX_BYTES,
    );
    try {
      const claim = await this.prisma.supplierClaim.create({
        data: {
          manufacturerProfileId: ctx.profileId,
          region: dto.region,
          tier: dto.tier,
          brandNames: dto.brandNames,
          evidenceFileId: file.id,
          note: dto.note ?? null,
        },
      });
      await this.audit.log({
        actorUserId: ctx.userId,
        action: 'supplier_claim.submitted',
        entityType: 'SupplierClaim',
        entityId: claim.id,
      });
      return this.view(claim);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002')
        throw new ConflictException('That evidence is already attached to a claim');
      throw error;
    }
  }

  async remove(ctx: ManufacturerContext, id: string): Promise<void> {
    const claim = await this.prisma.supplierClaim.findFirst({
      where: { id, manufacturerProfileId: ctx.profileId },
      select: { status: true },
    });
    if (!claim) throw new NotFoundException('Claim not found');
    await this.prisma.supplierClaim.delete({ where: { id } });
    if (claim.status === 'VERIFIED') await this.search.syncManufacturer(ctx.profileId);
  }

  // ── Staff ─────────────────────────────────────────────────────────────────

  async adminList(status: SupplierClaimStatus | undefined): Promise<AdminClaim[]> {
    const rows = await this.prisma.supplierClaim.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: status === 'PENDING' ? 'asc' : 'desc' },
      take: 1000,
      include: {
        evidenceFile: { select: { storageKey: true, originalFilename: true, status: true } },
        manufacturerProfile: {
          select: { publicCode: true, company: { select: { legalName: true } } },
        },
      },
    });
    return Promise.all(
      rows.map(async (c) => ({
        ...this.view(c),
        manufacturer: {
          code: c.manufacturerProfile.publicCode,
          name: c.manufacturerProfile.company.legalName,
        },
        evidenceUrl:
          c.evidenceFile?.status === 'UPLOADED'
            ? await this.storage.presignDownload(
                c.evidenceFile.storageKey,
                c.evidenceFile.originalFilename,
              )
            : null,
        reviewedAt: c.reviewedAt?.toISOString() ?? null,
      })),
    );
  }

  verify(adminId: string, id: string, note: string | undefined): Promise<void> {
    return this.decide(adminId, id, 'VERIFIED', note ?? null);
  }

  reject(adminId: string, id: string, dto: RejectClaimDto): Promise<void> {
    return this.decide(adminId, id, 'REJECTED', dto.note);
  }

  private async decide(
    adminId: string,
    id: string,
    status: 'VERIFIED' | 'REJECTED',
    note: string | null,
  ): Promise<void> {
    const claim = await this.prisma.supplierClaim.findUnique({
      where: { id },
      select: {
        region: true,
        tier: true,
        manufacturerProfileId: true,
        manufacturerProfile: { select: { companyId: true } },
      },
    });
    if (!claim) throw new NotFoundException('Claim not found');
    const { count } = await this.prisma.supplierClaim.updateMany({
      where: { id, status: 'PENDING' },
      data: { status, reviewNote: note, reviewedAt: new Date(), reviewedById: adminId },
    });
    if (count !== 1) throw new ConflictException('This claim has already been decided');
    await this.audit.log({
      actorUserId: adminId,
      action: `supplier_claim.${status.toLowerCase()}`,
      entityType: 'SupplierClaim',
      entityId: id,
      metadata: { region: claim.region, tier: claim.tier, ...(note && { note }) },
    });
    await this.notifier.notify({
      to: { companyId: claim.manufacturerProfile.companyId },
      type: 'SYSTEM',
      title: status === 'VERIFIED' ? 'Supplier claim verified' : 'Supplier claim not accepted',
      body:
        status === 'VERIFIED'
          ? 'Buyers now see a verified badge on your profile (never the brand names).'
          : `Reason: ${note ?? ''}. You can submit it again with other evidence.`,
    });
    await this.search.syncManufacturer(claim.manufacturerProfileId);
  }

  private view(c: ClaimRow): ManufacturerClaim {
    return {
      id: c.id,
      region: c.region,
      tier: c.tier,
      brandNames: c.brandNames,
      note: c.note,
      status: c.status,
      reviewNote: c.reviewNote,
      createdAt: c.createdAt.toISOString(),
    };
  }
}
