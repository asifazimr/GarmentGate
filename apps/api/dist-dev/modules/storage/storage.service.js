var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Readable } from 'node:stream';
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, NotFound, PutObjectCommand, S3Client, } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const UPLOAD_EXPIRES_SECONDS = 10 * 60;
const DOWNLOAD_EXPIRES_SECONDS = 5 * 60;
export const IMAGE_URL_EXPIRES_SECONDS = 60 * 60;
let StorageService = class StorageService {
    bucket;
    client;
    constructor(config) {
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
    async presignUpload(key, contentType, maxBytes) {
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
    async head(key) {
        try {
            const out = await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
            return { sizeBytes: out.ContentLength ?? 0, contentType: out.ContentType };
        }
        catch (error) {
            if (error instanceof NotFound || error.name === 'NotFound')
                return null;
            throw error;
        }
    }
    async getStart(key, bytes) {
        const out = await this.client.send(new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Range: `bytes=0-${String(bytes - 1)}`,
        }));
        return out.Body ? Buffer.from(await out.Body.transformToByteArray()) : Buffer.alloc(0);
    }
    async getStream(key) {
        const out = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
        if (!(out.Body instanceof Readable))
            throw new Error(`Not a stream: ${key}`);
        return out.Body;
    }
    async getObject(key) {
        const out = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
        if (!out.Body)
            throw new Error(`Empty object: ${key}`);
        return Buffer.from(await out.Body.transformToByteArray());
    }
    async putObject(key, body, contentType) {
        await this.client.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ContentType: contentType,
            CacheControl: 'private, max-age=31536000, immutable',
        }));
    }
    presignDownload(key, downloadName, expiresIn = DOWNLOAD_EXPIRES_SECONDS) {
        return getSignedUrl(this.client, new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ...(downloadName && {
                ResponseContentDisposition: `inline; filename="${downloadName.replace(/["\\\r\n]/g, '_')}"`,
            }),
        }), { expiresIn });
    }
    async delete(key) {
        await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    }
};
StorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map