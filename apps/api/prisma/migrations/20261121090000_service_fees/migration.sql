-- CreateEnum
CREATE TYPE "OrderChargeKind" AS ENUM ('SAMPLE_FEE', 'INSPECTION_FEE');

-- AlterEnum
ALTER TYPE "PaymentPurpose" ADD VALUE 'INSPECTION_FEE';

-- AlterEnum
ALTER TYPE "ReleaseTrigger" ADD VALUE 'CLAIM_WINDOW';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "sampleCreditMinor" BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "order_charges" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "kind" "OrderChargeKind" NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" "Currency" NOT NULL,
    "waived" BOOLEAN NOT NULL DEFAULT false,
    "sampleId" UUID,
    "inspectionId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_charges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_charges_sampleId_key" ON "order_charges"("sampleId");

-- CreateIndex
CREATE UNIQUE INDEX "order_charges_inspectionId_key" ON "order_charges"("inspectionId");

-- CreateIndex
CREATE INDEX "order_charges_orderId_kind_idx" ON "order_charges"("orderId", "kind");

-- AddForeignKey
ALTER TABLE "order_charges" ADD CONSTRAINT "order_charges_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written: charges are never negative; a waived charge carries its price for the record.
ALTER TABLE "order_charges" ADD CONSTRAINT "order_charges_amount_check" CHECK ("amountMinor" >= 0);
ALTER TABLE "orders" ADD CONSTRAINT "orders_sample_credit_check" CHECK ("sampleCreditMinor" >= 0);
