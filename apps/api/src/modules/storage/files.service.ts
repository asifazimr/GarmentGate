import { randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { PresignUploadResponse } from '@garmentgate/shared';
import type { FilePurpose } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { StorageService } from './storage.service.js';

const EXTENSIONS: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export interface ReserveUpload {
  userId: string;
  /** The owning company; null for staff uploads (inspectors), which are owned by the uploader. */
  companyId: string | null;
  purpose: FilePurpose;
  /** Top-level key prefix, e.g. "kyc" or "media". */
  folder: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  maxBytes: number;
}

/**
 * The two halves of a direct-to-storage upload, shared by every feature:
 * reserve a FileAsset + presigned POST, then confirm the object really landed as declared.
 * Storage keys never contain the original filename (it may contain names).
 */
@Injectable()
export class FilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async reserveUpload(input: ReserveUpload): Promise<PresignUploadResponse> {
    const ext = EXTENSIONS[input.contentType] ?? 'bin';
    const storageKey = `${input.folder}/${input.companyId ?? 'staff'}/${randomUUID()}.${ext}`;
    const file = await this.prisma.fileAsset.create({
      data: {
        bucket: this.storage.bucket,
        storageKey,
        originalFilename: input.fileName,
        mimeType: input.contentType,
        sizeBytes: input.sizeBytes,
        purpose: input.purpose,
        uploadedById: input.userId,
        ownerCompanyId: input.companyId,
      },
    });
    const upload = await this.storage.presignUpload(
      storageKey,
      input.contentType,
      Math.min(input.sizeBytes, input.maxBytes),
    );
    return {
      fileId: file.id,
      url: upload.url,
      fields: upload.fields,
      expiresAt: upload.expiresAt.toISOString(),
    };
  }

  /**
   * Checks the object exists with the declared type and an allowed size, then marks it uploaded.
   * `owner` is the company, or `{ userId }` for a staff upload.
   */
  async confirmUpload(
    fileId: string,
    owner: string | { userId: string },
    purpose: FilePurpose,
    maxBytes: number,
  ) {
    const file = await this.prisma.fileAsset.findFirst({
      where:
        typeof owner === 'string'
          ? { id: fileId, ownerCompanyId: owner, purpose }
          : { id: fileId, ownerCompanyId: null, uploadedById: owner.userId, purpose },
    });
    if (!file) throw new NotFoundException('Upload not found');
    if (file.status !== 'PENDING_UPLOAD') {
      throw new ConflictException('This file is already attached');
    }
    const object = await this.storage.head(file.storageKey);
    if (!object) throw new BadRequestException('The file has not finished uploading');
    if (object.sizeBytes > maxBytes || object.contentType !== file.mimeType) {
      await this.storage.delete(file.storageKey).catch(() => undefined);
      await this.prisma.fileAsset.update({ where: { id: file.id }, data: { status: 'REJECTED' } });
      throw new BadRequestException('The uploaded file does not match what was declared');
    }
    return this.prisma.fileAsset.update({
      where: { id: file.id },
      data: { status: 'UPLOADED', sizeBytes: object.sizeBytes, uploadedAt: new Date() },
    });
  }

  /** Deletes a file, its renditions and their objects. */
  async remove(fileId: string): Promise<void> {
    const file = await this.prisma.fileAsset.findUnique({
      where: { id: fileId },
      include: { renditions: true },
    });
    if (!file) return;
    await this.prisma.fileAsset.delete({ where: { id: fileId } });
    const keys = [file.storageKey, ...file.renditions.map((r) => r.storageKey)];
    await Promise.all(keys.map((key) => this.storage.delete(key).catch(() => undefined)));
  }
}
