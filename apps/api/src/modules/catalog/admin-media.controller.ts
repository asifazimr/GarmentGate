import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type MediaReviewDecisionDto,
  MediaReviewDecisionSchema,
  type MediaReviewItem,
  MediaReviewItemSchema,
  type MediaReviewKind,
  MediaReviewKindSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { RfqFilesService } from '../rfq/rfq-files.service.js';

/**
 * Human check of files before the other side sees them: logos, signage, faces, documents in
 * shot, brand names on tech packs. Metadata is already stripped by the pipeline; this covers
 * what's visible in the pixels and pages.
 */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/media')
export class AdminMediaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
    private readonly rfqFiles: RfqFilesService,
    private readonly audit: AuditService,
  ) {}

  @Get('pending')
  @ApiOperation({ summary: 'Sanitized files waiting for review' })
  @ApiOkResponse({ standardSchema: MediaReviewItemSchema.array() })
  async pending(): Promise<MediaReviewItem[]> {
    const ready = { file: { processingStatus: 'READY' as const } };
    const [photos, images, attachments, samplePhotos, milestoneMedia] = await Promise.all([
      this.prisma.factoryPhoto.findMany({
        where: { reviewStatus: 'PENDING', ...ready },
        include: {
          file: fileWithRenditions,
          manufacturerProfile: { select: { publicCode: true } },
        },
        orderBy: { createdAt: 'asc' },
        take: 100,
      }),
      this.prisma.productImage.findMany({
        where: { reviewStatus: 'PENDING', ...ready },
        include: {
          file: fileWithRenditions,
          product: {
            select: { title: true, manufacturerProfile: { select: { publicCode: true } } },
          },
        },
        take: 100,
      }),
      this.prisma.rfqAttachment.findMany({
        where: { reviewStatus: 'PENDING', ...ready },
        include: {
          file: fileWithRenditions,
          rfq: {
            select: {
              code: true,
              buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
            },
          },
        },
        orderBy: { createdAt: 'asc' },
        take: 100,
      }),
      this.prisma.samplePhoto.findMany({
        where: { reviewStatus: 'PENDING', ...ready },
        include: {
          file: fileWithRenditions,
          sample: {
            select: {
              round: true,
              order: {
                select: {
                  code: true,
                  buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'asc' },
        take: 100,
      }),
      this.prisma.milestonePhoto.findMany({
        where: { reviewStatus: 'PENDING', ...ready },
        include: {
          file: fileWithRenditions,
          milestone: {
            select: {
              stage: true,
              order: {
                select: { code: true, manufacturerProfile: { select: { publicCode: true } } },
              },
            },
          },
        },
        orderBy: { createdAt: 'asc' },
        take: 100,
      }),
    ]);
    const urls = await this.media.urlMap([
      ...photos.map((p) => p.file),
      ...images.map((i) => i.file),
      ...attachments.map((a) => a.file),
      ...samplePhotos.map((p) => p.file),
      ...milestoneMedia.filter((m) => !m.file.mimeType.startsWith('video/')).map((m) => m.file),
    ]);
    const rfqItems = await Promise.all(
      attachments.map(async (a) => {
        const [view] = await this.rfqFiles.views([a], { kind: 'admin', rfqCode: a.rfq.code });
        return {
          kind: 'rfq-attachments' as const,
          id: a.id,
          ownerCode: a.rfq.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
          context: `${a.rfq.code} · ${view?.fileName ?? ''}`,
          contentType: a.file.mimeType,
          urls: urls.get(a.fileId) ?? null,
          documentUrl: a.file.mimeType === 'application/pdf' ? (view?.url ?? null) : null,
          videoUrl: null,
        };
      }),
    );
    return [
      ...photos.map((p) => ({
        kind: 'factory-photos' as const,
        id: p.id,
        ownerCode: p.manufacturerProfile.publicCode,
        context: p.caption,
        contentType: p.file.mimeType,
        urls: urls.get(p.fileId) ?? null,
        documentUrl: null,
        videoUrl: null,
      })),
      ...images.map((i) => ({
        kind: 'product-images' as const,
        id: i.id,
        ownerCode: i.product.manufacturerProfile.publicCode,
        context: i.product.title,
        contentType: i.file.mimeType,
        urls: urls.get(i.fileId) ?? null,
        documentUrl: null,
        videoUrl: null,
      })),
      ...rfqItems,
      ...samplePhotos.map((p) => ({
        kind: 'sample-photos' as const,
        id: p.id,
        ownerCode: p.sample.order?.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
        context: `${p.sample.order?.code ?? ''} · sample round ${String(p.sample.round)}`,
        contentType: p.file.mimeType,
        urls: urls.get(p.fileId) ?? null,
        documentUrl: null,
        videoUrl: null,
      })),
      ...(await Promise.all(
        milestoneMedia.map(async (m) => ({
          kind: 'milestone-media' as const,
          id: m.id,
          ownerCode: m.milestone.order.manufacturerProfile.publicCode,
          context: `${m.milestone.order.code} · ${m.milestone.stage.toLowerCase().replace('_', ' ')}${m.caption ? ` · ${m.caption}` : ''}`,
          contentType: m.file.mimeType,
          urls: urls.get(m.fileId) ?? null,
          documentUrl: null,
          videoUrl: m.file.mimeType.startsWith('video/') ? await this.media.videoUrl(m.file) : null,
        })),
      )),
    ];
  }

  @Post(':kind/:id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  approve(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('kind', new ZodValidationPipe(MediaReviewKindSchema)) kind: MediaReviewKind,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.decide(admin.id, kind, id, 'APPROVED', undefined);
  }

  @Post(':kind/:id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  reject(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('kind', new ZodValidationPipe(MediaReviewKindSchema)) kind: MediaReviewKind,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(MediaReviewDecisionSchema)) body: MediaReviewDecisionDto,
  ): Promise<void> {
    return this.decide(admin.id, kind, id, 'REJECTED', body.note);
  }

  private async decide(
    adminId: string,
    kind: MediaReviewKind,
    id: string,
    status: 'APPROVED' | 'REJECTED',
    note: string | undefined,
  ): Promise<void> {
    const data = { reviewStatus: status, reviewNote: note ?? null, reviewedAt: new Date() };
    if (kind === 'factory-photos') await this.prisma.factoryPhoto.update({ where: { id }, data });
    else if (kind === 'product-images')
      await this.prisma.productImage.update({ where: { id }, data });
    else if (kind === 'rfq-attachments')
      await this.prisma.rfqAttachment.update({ where: { id }, data });
    else if (kind === 'sample-photos')
      await this.prisma.samplePhoto.update({ where: { id }, data });
    else await this.prisma.milestonePhoto.update({ where: { id }, data });
    await this.audit.log({
      actorUserId: adminId,
      action: `media.${status.toLowerCase()}`,
      entityType: kind,
      entityId: id,
      metadata: note ? { note } : {},
    });
  }
}
