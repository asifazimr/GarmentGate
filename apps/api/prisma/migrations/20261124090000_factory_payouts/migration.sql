-- CreateEnum
CREATE TYPE "BankAccountStatus" AS ENUM ('PENDING_REVIEW', 'VERIFIED', 'REJECTED', 'REPLACED');

-- AlterTable
ALTER TABLE "order_releases" ADD COLUMN     "manufacturerProfileId" UUID;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "factoryBankAccountId" UUID;

-- CreateTable
CREATE TABLE "factory_bank_accounts" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "holderName" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankCountry" CHAR(2) NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "swiftBic" TEXT,
    "routingCode" TEXT,
    "branch" TEXT,
    "currency" "Currency" NOT NULL,
    "status" "BankAccountStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "reviewNote" TEXT,
    "submittedById" UUID NOT NULL,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "factory_bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "factory_bank_accounts_companyId_status_idx" ON "factory_bank_accounts"("companyId", "status");

-- CreateIndex
CREATE INDEX "factory_bank_accounts_status_createdAt_idx" ON "factory_bank_accounts"("status", "createdAt");


-- Hand-written: every existing release is owed to its order's current factory.
UPDATE "order_releases" r SET "manufacturerProfileId" = o."manufacturerProfileId"
  FROM "orders" o WHERE o.id = r."orderId" AND r."manufacturerProfileId" IS NULL;

-- One live (pending or verified) bank account per factory.
CREATE UNIQUE INDEX "factory_bank_accounts_one_live"
  ON "factory_bank_accounts" ("companyId") WHERE "status" IN ('PENDING_REVIEW', 'VERIFIED');
