import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  NotFound,
  S3Client,
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../config/env.schema.js';

export interface PresignedUpload {
  url: string;
  fields: Record<string, string>;
  expiresAt: Date;
}

const UPLOAD_EXPIRES_SECONDS = 10 * 60;
const DOWNLOAD_EXPIRES_SECONDS = 5 * 60;

/** Private S3-compatible storage. Browsers only ever get short-lived presigned URLs. */
@Injectable()
export class StorageService {
  readonly bucket: string;
  private readonly client: S3Client;

  constructor(config: ConfigService<Env, true>) {
    this.bucket = config.get('S3_BUCKET', { infer: true });
    this.client = new S3Client({
      endpoint: config.get('S3_ENDPOINT', { infer: true }),
      region: config.get('S3_REGION', { infer: true }),
      forcePathStyle: config.get('S3_FORCE_PATH_STYLE', { infer: true }),
      credentials: {
        accessKeyId: config.get('S3_ACCESS_KEY_ID', { infer: true }),
        secretAccessKey: config.get('S3_SECRET_ACCESS_KEY', { infer: true }),
      },
    });
  }

  /** Presigned POST: S3 itself enforces the content type and maximum size. */
  async presignUpload(
    key: string,
    contentType: string,
    maxBytes: number,
  ): Promise<PresignedUpload> {
    const { url, fields } = await createPresignedPost(this.client, {
      Bucket: this.bucket,
      Key: key,
      Expires: UPLOAD_EXPIRES_SECONDS,
      Fields: { 'Content-Type': contentType },
      Conditions: [
        ['content-length-range', 1, maxBytes],
        ['eq', '$Content-Type', contentType],
      ],
    });
    return { url, fields, expiresAt: new Date(Date.now() + UPLOAD_EXPIRES_SECONDS * 1000) };
  }

  /** Metadata of an uploaded object, or null if it doesn't exist. */
  async head(key: string): Promise<{ sizeBytes: number; contentType: string | undefined } | null> {
    try {
      const out = await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return { sizeBytes: out.ContentLength ?? 0, contentType: out.ContentType };
    } catch (error) {
      if (error instanceof NotFound || (error as { name?: string }).name === 'NotFound')
        return null;
      throw error;
    }
  }

  presignDownload(key: string, downloadName?: string): Promise<string> {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ...(downloadName && {
          ResponseContentDisposition: `inline; filename="${downloadName.replace(/["\\\r\n]/g, '_')}"`,
        }),
      }),
      { expiresIn: DOWNLOAD_EXPIRES_SECONDS },
    );
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }
}
