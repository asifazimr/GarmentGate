import { Injectable } from '@nestjs/common';
import type { RfqAttachmentKind, RfqAttachmentView } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { StorageService } from '../storage/storage.service.js';

export const attachmentInclude = {
  file: fileWithRenditions,
} satisfies Prisma.RfqAttachmentInclude;
export type AttachmentRow = Prisma.RfqAttachmentGetPayload<{ include: typeof attachmentInclude }>;

const KIND_SLUG: Record<RfqAttachmentKind, string> = {
  TECH_PACK: 'tech-pack',
  REFERENCE_IMAGE: 'reference',
  SIZE_CHART: 'size-chart',
  OTHER: 'file',
};

/** Factories get a file only once it's sanitized and an admin has approved it. */
export const visibleToFactories = (a: AttachmentRow) =>
  a.reviewStatus === 'APPROVED' && a.file.processingStatus === 'READY';

/**
 * Signed links to the sanitized copies of RFQ files: a metadata-free PDF, or WebP renditions
 * for images. Originals are never linked, not even for their owner.
 */
@Injectable()
export class RfqFilesService {
  constructor(
    private readonly storage: StorageService,
    private readonly media: MediaService,
  ) {}

  /**
   * `owner`: the buyer sees all their files with their own names and review state.
   * `factory`: only approved files, renamed after the RFQ (file names can carry brand names).
   */
  async views(
    rows: AttachmentRow[],
    audience: { kind: 'owner' } | { kind: 'factory' | 'admin'; rfqCode: string },
  ): Promise<RfqAttachmentView[]> {
    const shown = audience.kind === 'factory' ? rows.filter(visibleToFactories) : rows;
    const sorted = [...shown].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return Promise.all(
      sorted.map(async (a, index) => {
        const ext = a.file.mimeType === 'application/pdf' ? 'pdf' : 'webp';
        const fileName =
          audience.kind === 'owner'
            ? a.file.originalFilename
            : `${audience.rfqCode}-${KIND_SLUG[a.kind]}-${String(index + 1)}.${ext}`;
        const links = await this.links(a, fileName);
        return {
          id: a.id,
          kind: a.kind,
          fileName,
          contentType: a.file.mimeType,
          sizeBytes: a.file.sizeBytes,
          processing: a.file.processingStatus ?? 'PENDING',
          review: a.reviewStatus,
          ...links,
        };
      }),
    );
  }

  private async links(a: AttachmentRow, downloadName: string) {
    if (a.file.processingStatus !== 'READY') return { url: null, thumbUrl: null };
    if (a.file.mimeType === 'application/pdf') {
      return {
        url: a.file.sanitizedKey
          ? await this.storage.presignDownload(a.file.sanitizedKey, downloadName)
          : null,
        thumbUrl: null,
      };
    }
    const urls = await this.media.urls(a.file);
    return { url: urls?.large ?? null, thumbUrl: urls?.thumb ?? null };
  }
}
