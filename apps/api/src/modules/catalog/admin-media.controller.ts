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
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { MediaService } from '../media/media.service.js';
import { fileWithRenditions } from '../media/media.service.js';

const KindSchema = z.enum(['factory-photos', 'product-images']);
type Kind = z.infer<typeof KindSchema>;
const DecisionSchema = z.object({ note: z.string().trim().max(300).optional() });

/**
 * Human check of images before buyers see them (logos, signage, faces, documents in shot).
 * Metadata is already stripped by the pipeline; this covers what's visible in the pixels.
 */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/media')
export class AdminMediaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
    private readonly audit: AuditService,
  ) {}

  @Get('pending')
  @ApiOperation({ summary: 'Processed images waiting for review' })
  async pending() {
    const ready = { file: { processingStatus: 'READY' as const } };
    const [photos, images] = await Promise.all([
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
    ]);
    const urls = await this.media.urlMap([
      ...photos.map((p) => p.file),
      ...images.map((i) => i.file),
    ]);
    return [
      ...photos.map((p) => ({
        kind: 'factory-photos' as const,
        id: p.id,
        manufacturerCode: p.manufacturerProfile.publicCode,
        context: p.caption,
        urls: urls.get(p.fileId) ?? null,
      })),
      ...images.map((i) => ({
        kind: 'product-images' as const,
        id: i.id,
        manufacturerCode: i.product.manufacturerProfile.publicCode,
        context: i.product.title,
        urls: urls.get(i.fileId) ?? null,
      })),
    ];
  }

  @Post(':kind/:id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  approve(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('kind', new ZodValidationPipe(KindSchema)) kind: Kind,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.decide(admin.id, kind, id, 'APPROVED', undefined);
  }

  @Post(':kind/:id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  reject(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('kind', new ZodValidationPipe(KindSchema)) kind: Kind,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(DecisionSchema)) body: z.output<typeof DecisionSchema>,
  ): Promise<void> {
    return this.decide(admin.id, kind, id, 'REJECTED', body.note);
  }

  private async decide(
    adminId: string,
    kind: Kind,
    id: string,
    status: 'APPROVED' | 'REJECTED',
    note: string | undefined,
  ): Promise<void> {
    const data = { reviewStatus: status, reviewNote: note ?? null, reviewedAt: new Date() };
    if (kind === 'factory-photos') await this.prisma.factoryPhoto.update({ where: { id }, data });
    else await this.prisma.productImage.update({ where: { id }, data });
    await this.audit.log({
      actorUserId: adminId,
      action: `media.${status.toLowerCase()}`,
      entityType: kind,
      entityId: id,
      metadata: note ? { note } : {},
    });
  }
}
