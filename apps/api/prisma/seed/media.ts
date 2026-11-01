/**
 * Seed images: procedurally drawn (no stock photos, no text, nothing identifying), pushed through
 * the real image pipeline, and uploaded to MinIO so the demo shows true renditions.
 */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';
import { sanitizePdf } from '../../src/modules/media/document-processor.js';
import { processImage } from '../../src/modules/media/image-processor.js';
import type { PrismaClient } from '../../src/generated/prisma/client.js';

const env = (key: string, fallback: string) => process.env[key] ?? fallback;

const s3 = new S3Client({
  endpoint: env('S3_ENDPOINT', 'http://localhost:9000'),
  region: env('S3_REGION', 'us-east-1'),
  forcePathStyle: true,
  credentials: {
    accessKeyId: env('S3_ACCESS_KEY_ID', 'garmentgate'),
    secretAccessKey: env('S3_SECRET_ACCESS_KEY', 'garmentgate-dev-secret'),
  },
});
const bucket = env('S3_BUCKET', 'garmentgate');

/** A woven-fabric texture in the given colour, with a soft vignette. */
function textureSvg(hue: number, variant: number): string {
  const base = `hsl(${hue} 38% ${42 + (variant % 3) * 8}%)`;
  const thread = `hsl(${hue} 30% ${62 + (variant % 2) * 8}%)`;
  const angle = (variant * 37) % 90;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
    <defs>
      <pattern id="w" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
        <rect width="22" height="22" fill="${base}"/>
        <rect width="22" height="7" y="0" fill="${thread}" opacity=".55"/>
        <rect width="7" height="22" x="11" fill="${thread}" opacity=".35"/>
      </pattern>
      <radialGradient id="v" cx="50%" cy="45%" r="75%">
        <stop offset="55%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity=".45"/>
      </radialGradient>
      <linearGradient id="l" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
        <stop offset=".6" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="1200" fill="url(#w)"/>
    <rect width="1600" height="1200" fill="url(#l)"/>
    <rect width="1600" height="1200" fill="url(#v)"/>
  </svg>`;
}

let counter = 0;

/** Creates an UPLOADED, READY FileAsset with real renditions in MinIO. Returns its id. */
export async function seedImage(
  prisma: PrismaClient,
  opts: {
    companyId: string;
    userId: string;
    purpose: 'FACTORY_PHOTO' | 'PRODUCT_IMAGE';
    hue: number;
  },
): Promise<string> {
  counter += 1;
  const original = await sharp(Buffer.from(textureSvg(opts.hue, counter)))
    .jpeg({ quality: 85 })
    .toBuffer();
  const processed = await processImage(original);
  const storageKey = `originals/${opts.companyId}/seed-${String(counter).padStart(3, '0')}.jpg`;
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: storageKey,
      Body: original,
      ContentType: 'image/jpeg',
    }),
  );

  const file = await prisma.fileAsset.create({
    data: {
      bucket,
      storageKey,
      originalFilename: `seed-${String(counter)}.jpg`,
      mimeType: 'image/jpeg',
      sizeBytes: original.length,
      purpose: opts.purpose,
      status: 'UPLOADED',
      scanStatus: 'CLEAN',
      processingStatus: 'READY',
      processedAt: new Date(),
      width: processed.width,
      height: processed.height,
      uploadedById: opts.userId,
      ownerCompanyId: opts.companyId,
      uploadedAt: new Date(),
    },
  });
  for (const r of processed.renditions) {
    const key = `renditions/${file.id}/${String(r.width)}.webp`;
    await s3.send(
      new PutObjectCommand({ Bucket: bucket, Key: key, Body: r.data, ContentType: 'image/webp' }),
    );
    await prisma.imageRendition.create({
      data: {
        fileId: file.id,
        width: r.width,
        height: r.height,
        storageKey: key,
        sizeBytes: r.data.length,
      },
    });
  }
  return file.id;
}

/**
 * A plain tech-pack PDF (spec text only, nothing identifying), stored like a real upload: the
 * original under originals/ and the sanitized copy the pipeline would write.
 */
export async function seedDocument(
  prisma: PrismaClient,
  opts: { companyId: string; userId: string; fileName: string; title: string; lines: string[] },
): Promise<string> {
  counter += 1;
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([595, 842]);
  page.drawText(opts.title, { x: 56, y: 770, size: 20, font: bold });
  opts.lines.forEach((line, i) => {
    page.drawText(line, { x: 56, y: 730 - i * 22, size: 12, font });
  });
  const original = Buffer.from(await doc.save());
  const { data } = await sanitizePdf(original);

  const storageKey = `originals/${opts.companyId}/seed-doc-${String(counter).padStart(3, '0')}.pdf`;
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: storageKey,
      Body: original,
      ContentType: 'application/pdf',
    }),
  );
  const file = await prisma.fileAsset.create({
    data: {
      bucket,
      storageKey,
      originalFilename: opts.fileName,
      mimeType: 'application/pdf',
      sizeBytes: original.length,
      purpose: 'TECH_PACK',
      status: 'UPLOADED',
      scanStatus: 'CLEAN',
      processingStatus: 'READY',
      processedAt: new Date(),
      uploadedById: opts.userId,
      ownerCompanyId: opts.companyId,
      uploadedAt: new Date(),
    },
  });
  const sanitizedKey = `sanitized/${file.id}.pdf`;
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: sanitizedKey,
      Body: data,
      ContentType: 'application/pdf',
    }),
  );
  await prisma.fileAsset.update({ where: { id: file.id }, data: { sanitizedKey } });
  return file.id;
}
