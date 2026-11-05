-- CreateEnum
CREATE TYPE "ShipmentUploadKind" AS ENUM ('BILL_OF_LADING', 'AIRWAY_BILL', 'PROOF_OF_DELIVERY', 'PHOTO', 'OTHER');

-- AlterEnum
ALTER TYPE "FilePurpose" ADD VALUE 'LOGISTICS_DOCUMENT';

-- AlterEnum
ALTER TYPE "LedgerAccountType" ADD VALUE 'PARTNER_PAYABLE';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'PARTNER';

-- AlterTable
ALTER TABLE "ledger_accounts" ADD COLUMN     "logisticsPartnerId" UUID;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "logisticsShipmentId" UUID;

-- AlterTable
ALTER TABLE "shipment_legs" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "logisticsPartnerId" UUID;

-- CreateTable
CREATE TABLE "shipment_uploads" (
    "id" UUID NOT NULL,
    "shipmentId" UUID NOT NULL,
    "legId" UUID,
    "fileId" UUID NOT NULL,
    "kind" "ShipmentUploadKind" NOT NULL,
    "uploadedById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipment_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipment_uploads_fileId_key" ON "shipment_uploads"("fileId");

-- CreateIndex
CREATE INDEX "shipment_uploads_shipmentId_idx" ON "shipment_uploads"("shipmentId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_logisticsPartnerId_fkey" FOREIGN KEY ("logisticsPartnerId") REFERENCES "logistics_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_logisticsShipmentId_fkey" FOREIGN KEY ("logisticsShipmentId") REFERENCES "logistics_shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_accounts" ADD CONSTRAINT "ledger_accounts_logisticsPartnerId_fkey" FOREIGN KEY ("logisticsPartnerId") REFERENCES "logistics_partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_uploads" ADD CONSTRAINT "shipment_uploads_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "logistics_shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_uploads" ADD CONSTRAINT "shipment_uploads_legId_fkey" FOREIGN KEY ("legId") REFERENCES "shipment_legs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_uploads" ADD CONSTRAINT "shipment_uploads_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written rules Prisma can't express.
-- Platform accounts are the ones with neither a company nor a partner; partner payables are one per partner and currency.
DROP INDEX "ledger_accounts_platform_key";
CREATE UNIQUE INDEX "ledger_accounts_platform_key"
  ON "ledger_accounts" ("type", "currency") WHERE "companyId" IS NULL AND "logisticsPartnerId" IS NULL;
CREATE UNIQUE INDEX "ledger_accounts_partner_key"
  ON "ledger_accounts" ("type", "logisticsPartnerId", "currency") WHERE "logisticsPartnerId" IS NOT NULL;
ALTER TABLE "ledger_accounts"
  ADD CONSTRAINT "ledger_accounts_owner_check" CHECK ("companyId" IS NULL OR "logisticsPartnerId" IS NULL);

-- Every payment belongs to an order, a capacity booking or a logistics shipment (partner payouts).
ALTER TABLE "payments" DROP CONSTRAINT "payments_owner_check";
ALTER TABLE "payments"
  ADD CONSTRAINT "payments_owner_check"
    CHECK ("orderId" IS NOT NULL OR "capacityBookingId" IS NOT NULL OR "logisticsShipmentId" IS NOT NULL);

-- Partner users belong to a partner; nobody else does.
ALTER TABLE "users"
  ADD CONSTRAINT "users_partner_check" CHECK ("logisticsPartnerId" IS NULL OR "companyId" IS NULL);
