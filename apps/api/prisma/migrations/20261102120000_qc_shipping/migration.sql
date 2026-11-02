-- AlterEnum
ALTER TYPE "FilePurpose" ADD VALUE 'INSPECTION_PHOTO';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'INSPECTOR';

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "bookedById" UUID,
ADD COLUMN     "inspectorId" UUID,
ADD COLUMN     "lotSize" INTEGER;

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "forwarder" TEXT,
ADD COLUMN     "incoterm" "Incoterm";

-- CreateTable
CREATE TABLE "inspection_photos" (
    "id" UUID NOT NULL,
    "inspectionId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "caption" TEXT,
    "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspection_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inspection_photos_fileId_key" ON "inspection_photos"("fileId");

-- CreateIndex
CREATE INDEX "inspection_photos_inspectionId_idx" ON "inspection_photos"("inspectionId");

-- CreateIndex
CREATE INDEX "inspections_inspectorId_result_idx" ON "inspections"("inspectorId", "result");

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "inspections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written: one open inspection per order and type (two clicks can't book two).
CREATE UNIQUE INDEX "inspections_one_open_per_type" ON "inspections"("orderId", "type") WHERE "result" = 'PENDING';

-- Hand-written: one shipment per order.
CREATE UNIQUE INDEX "shipments_one_per_order" ON "shipments"("orderId");

-- Hand-written: defect counts and sizes are never negative.
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_counts_non_negative" CHECK (
  coalesce("criticalDefects", 0) >= 0 AND coalesce("majorDefects", 0) >= 0 AND coalesce("minorDefects", 0) >= 0
  AND coalesce("lotSize", 1) > 0 AND coalesce("sampleSize", 1) > 0
);
