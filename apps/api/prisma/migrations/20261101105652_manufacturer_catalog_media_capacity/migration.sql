-- CreateEnum
CREATE TYPE "ImageProcessingStatus" AS ENUM ('PENDING', 'PROCESSING', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "MediaReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "FilePurpose" ADD VALUE 'FACTORY_PHOTO';

-- AlterTable
ALTER TABLE "file_assets" ADD COLUMN     "height" INTEGER,
ADD COLUMN     "processedAt" TIMESTAMP(3),
ADD COLUMN     "processingError" TEXT,
ADD COLUMN     "processingStatus" "ImageProcessingStatus",
ADD COLUMN     "width" INTEGER;

-- AlterTable
ALTER TABLE "product_images" ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "reviewedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "factory_photos" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "factory_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacity_months" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "month" DATE NOT NULL,
    "availablePcs" INTEGER,
    "externalBookedPcs" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacity_months_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_renditions" (
    "id" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'webp',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_renditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "factory_photos_fileId_key" ON "factory_photos"("fileId");

-- CreateIndex
CREATE INDEX "factory_photos_manufacturerProfileId_sortOrder_idx" ON "factory_photos"("manufacturerProfileId", "sortOrder");

-- CreateIndex
CREATE INDEX "factory_photos_reviewStatus_idx" ON "factory_photos"("reviewStatus");

-- CreateIndex
CREATE UNIQUE INDEX "capacity_months_manufacturerProfileId_month_key" ON "capacity_months"("manufacturerProfileId", "month");

-- CreateIndex
CREATE UNIQUE INDEX "image_renditions_storageKey_key" ON "image_renditions"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "image_renditions_fileId_width_key" ON "image_renditions"("fileId", "width");

-- AddForeignKey
ALTER TABLE "factory_photos" ADD CONSTRAINT "factory_photos_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factory_photos" ADD CONSTRAINT "factory_photos_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_months" ADD CONSTRAINT "capacity_months_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_renditions" ADD CONSTRAINT "image_renditions_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Hand-written integrity rules
ALTER TABLE "capacity_months" ADD CONSTRAINT "capacity_months_non_negative"
  CHECK (("availablePcs" IS NULL OR "availablePcs" >= 0) AND "externalBookedPcs" >= 0);
ALTER TABLE "capacity_months" ADD CONSTRAINT "capacity_months_first_of_month"
  CHECK (EXTRACT(DAY FROM "month") = 1);
ALTER TABLE "image_renditions" ADD CONSTRAINT "image_renditions_positive"
  CHECK ("width" > 0 AND "height" > 0 AND "sizeBytes" > 0);
