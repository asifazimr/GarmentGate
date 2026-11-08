-- CreateEnum
CREATE TYPE "InspectorApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InspectorStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- AlterEnum
ALTER TYPE "LedgerAccountType" ADD VALUE 'INSPECTOR_PAYABLE';

-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "auditRequested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "checkInDistanceM" INTEGER,
ADD COLUMN     "checkedInAt" TIMESTAMP(3),
ADD COLUMN     "earnedAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "payUsdMinor" INTEGER,
ADD COLUMN     "payoutReference" TEXT,
ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "manufacturer_profiles" ADD COLUMN     "latitude" DECIMAL(9,6),
ADD COLUMN     "longitude" DECIMAL(9,6);

-- CreateTable
CREATE TABLE "inspector_applications" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" CHAR(2) NOT NULL,
    "city" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "inspectionTypes" "InspectionType"[],
    "about" TEXT NOT NULL,
    "status" "InspectorApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inspector_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspector_profiles" (
    "userId" UUID NOT NULL,
    "status" "InspectorStatus" NOT NULL DEFAULT 'ACTIVE',
    "country" CHAR(2) NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "serviceRadiusKm" INTEGER NOT NULL DEFAULT 50,
    "inspectionTypes" "InspectionType"[],
    "dayRateUsdMinor" INTEGER,
    "certifiedAt" TIMESTAMP(3),
    "ratingSum" INTEGER NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "payoutMethod" TEXT,
    "payoutName" TEXT,
    "payoutAccount" TEXT,
    "payoutVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspector_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "inspector_applications_userId_key" ON "inspector_applications"("userId");

-- CreateIndex
CREATE INDEX "inspector_applications_status_createdAt_idx" ON "inspector_applications"("status", "createdAt");

-- CreateIndex
CREATE INDEX "inspector_profiles_status_country_idx" ON "inspector_profiles"("status", "country");


-- Hand-written: sane gig data.
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_gig_check"
  CHECK (("rating" IS NULL OR "rating" BETWEEN 1 AND 5) AND ("payUsdMinor" IS NULL OR "payUsdMinor" >= 0));
ALTER TABLE "inspector_profiles" ADD CONSTRAINT "inspector_profiles_check"
  CHECK ("serviceRadiusKm" BETWEEN 1 AND 1000 AND "ratingSum" >= 0 AND "ratingCount" >= 0);
