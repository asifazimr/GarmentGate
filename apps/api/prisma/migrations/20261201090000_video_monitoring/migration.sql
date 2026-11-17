-- CreateEnum
CREATE TYPE "CameraArea" AS ENUM ('CUTTING', 'SEWING', 'FINISHING', 'PACKING', 'QC', 'WAREHOUSE', 'OTHER');

-- CreateEnum
CREATE TYPE "CameraStatus" AS ENUM ('SETUP', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'DISABLED');

-- AlterEnum
ALTER TYPE "OrderChargeKind" ADD VALUE 'MONITORING_FEE';

-- AlterEnum
ALTER TYPE "PaymentPurpose" ADD VALUE 'MONITORING_FEE';

-- CreateTable
CREATE TABLE "cameras" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "label" TEXT NOT NULL,
    "area" "CameraArea" NOT NULL,
    "status" "CameraStatus" NOT NULL DEFAULT 'SETUP',
    "providerInputId" TEXT NOT NULL,
    "ingestUrl" TEXT NOT NULL,
    "streamKey" TEXT NOT NULL,
    "reviewNote" TEXT,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cameras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_cameras" (
    "orderId" UUID NOT NULL,
    "cameraId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_cameras_pkey" PRIMARY KEY ("orderId","cameraId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cameras_providerInputId_key" ON "cameras"("providerInputId");

-- CreateIndex
CREATE INDEX "cameras_manufacturerProfileId_status_idx" ON "cameras"("manufacturerProfileId", "status");

-- AddForeignKey
ALTER TABLE "cameras" ADD CONSTRAINT "cameras_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cameras" ADD CONSTRAINT "order_cameras_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cameras" ADD CONSTRAINT "order_cameras_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "cameras"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "order_cameras" ADD CONSTRAINT "order_cameras_position_check" CHECK ("position" >= 1);
