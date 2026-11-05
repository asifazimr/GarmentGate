-- CreateEnum
CREATE TYPE "PickupStatus" AS ENUM ('REQUESTED', 'SCHEDULED', 'COLLECTED', 'RECEIVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "HubReceiptCondition" AS ENUM ('GOOD', 'DAMAGED', 'SHORT', 'OVER');

-- CreateEnum
CREATE TYPE "LogisticsShipmentStatus" AS ENUM ('PLANNED', 'BOOKED', 'IN_TRANSIT', 'AT_DESTINATION', 'CUSTOMS', 'OUT_FOR_DELIVERY', 'DELIVERED', 'EXCEPTION', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ShipmentLegKind" AS ENUM ('FACTORY_TO_HUB', 'HUB_TO_PORT', 'PORT_TO_PORT', 'PORT_TO_BUYER');

-- CreateEnum
CREATE TYPE "ShipmentLegStatus" AS ENUM ('PENDING', 'BOOKED', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LogisticsDocumentType" AS ENUM ('COMMERCIAL_INVOICE', 'PACKING_LIST', 'BILL_OF_LADING', 'ORIGINAL_BILL_OF_LADING', 'CERTIFICATE_OF_ORIGIN', 'INSURANCE_CERTIFICATE', 'SHIPPING_LABEL', 'CARTON_MARKING');

-- CreateEnum
CREATE TYPE "ShipmentEventSource" AS ENUM ('STAFF', 'PARTNER', 'FACTORY', 'SYSTEM');

-- AlterEnum
ALTER TYPE "FilePurpose" ADD VALUE 'HUB_PHOTO';

-- AlterTable
ALTER TABLE "logistics_quotes" ADD COLUMN     "consolidationId" UUID;

-- CreateTable
CREATE TABLE "order_packings" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "cartons" INTEGER NOT NULL,
    "piecesPerCarton" INTEGER,
    "grossWeightGrams" INTEGER NOT NULL,
    "netWeightGrams" INTEGER,
    "volumeLitres" INTEGER NOT NULL,
    "cartonLengthCm" INTEGER,
    "cartonWidthCm" INTEGER,
    "cartonHeightCm" INTEGER,
    "updatedById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_packings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickup_requests" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "hubId" UUID NOT NULL,
    "pickupDate" DATE NOT NULL,
    "status" "PickupStatus" NOT NULL DEFAULT 'REQUESTED',
    "partnerId" UUID,
    "note" TEXT,
    "noteFiltered" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "collectedAt" TIMESTAMP(3),
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pickup_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_receipts" (
    "id" UUID NOT NULL,
    "hubId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "pickupId" UUID,
    "receivedById" UUID NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cartonsExpected" INTEGER NOT NULL,
    "cartonsReceived" INTEGER NOT NULL,
    "grossWeightGrams" INTEGER,
    "condition" "HubReceiptCondition" NOT NULL,
    "repacked" BOOLEAN NOT NULL DEFAULT false,
    "relabelled" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "hub_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_receipt_photos" (
    "id" UUID NOT NULL,
    "receiptId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_receipt_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consolidations" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "buyerCompanyId" UUID NOT NULL,
    "mode" "LogisticsMode" NOT NULL,
    "destinationCountry" CHAR(2) NOT NULL,
    "currency" "Currency" NOT NULL,
    "separateTotalMinor" BIGINT NOT NULL,
    "combinedTotalMinor" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consolidations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistics_shipments" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "buyerCompanyId" UUID NOT NULL,
    "mode" "LogisticsMode" NOT NULL,
    "incoterm" "Incoterm" NOT NULL,
    "status" "LogisticsShipmentStatus" NOT NULL DEFAULT 'PLANNED',
    "shipperMode" TEXT NOT NULL,
    "originHubId" UUID,
    "originCountry" CHAR(2) NOT NULL,
    "destinationCountry" CHAR(2) NOT NULL,
    "destinationPort" TEXT,
    "consolidationId" UUID,
    "currency" "Currency" NOT NULL,
    "buyerPriceMinor" BIGINT NOT NULL,
    "partnerCostMinor" BIGINT NOT NULL,
    "insuranceMinor" BIGINT NOT NULL DEFAULT 0,
    "cartons" INTEGER NOT NULL,
    "grossWeightGrams" INTEGER NOT NULL,
    "volumeLitres" INTEGER NOT NULL,
    "etd" TIMESTAMP(3),
    "eta" TIMESTAMP(3),
    "departedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistics_shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistics_shipment_orders" (
    "shipmentId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "cartons" INTEGER NOT NULL,
    "grossWeightGrams" INTEGER NOT NULL,
    "volumeLitres" INTEGER NOT NULL,
    "buyerShareMinor" BIGINT NOT NULL,
    "costShareMinor" BIGINT NOT NULL,

    CONSTRAINT "logistics_shipment_orders_pkey" PRIMARY KEY ("shipmentId","orderId")
);

-- CreateTable
CREATE TABLE "shipment_legs" (
    "id" UUID NOT NULL,
    "shipmentId" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "kind" "ShipmentLegKind" NOT NULL,
    "status" "ShipmentLegStatus" NOT NULL DEFAULT 'PENDING',
    "partnerId" UUID,
    "fromLabel" TEXT NOT NULL,
    "toLabel" TEXT NOT NULL,
    "carrier" TEXT,
    "trackingNumber" TEXT,
    "containerNumber" TEXT,
    "transportDocNo" TEXT,
    "costMinor" BIGINT,
    "etd" TIMESTAMP(3),
    "eta" TIMESTAMP(3),
    "departedAt" TIMESTAMP(3),
    "arrivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipment_legs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipment_events" (
    "id" UUID NOT NULL,
    "shipmentId" UUID NOT NULL,
    "legId" UUID,
    "status" "LogisticsShipmentStatus",
    "source" "ShipmentEventSource" NOT NULL,
    "location" TEXT,
    "publicNote" TEXT,
    "internalNote" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipment_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistics_documents" (
    "id" UUID NOT NULL,
    "shipmentId" UUID NOT NULL,
    "type" "LogisticsDocumentType" NOT NULL,
    "number" TEXT NOT NULL,
    "issuedById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logistics_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_packings_orderId_key" ON "order_packings"("orderId");

-- CreateIndex
CREATE INDEX "pickup_requests_orderId_status_idx" ON "pickup_requests"("orderId", "status");

-- CreateIndex
CREATE INDEX "pickup_requests_hubId_status_pickupDate_idx" ON "pickup_requests"("hubId", "status", "pickupDate");

-- CreateIndex
CREATE INDEX "hub_receipts_orderId_idx" ON "hub_receipts"("orderId");

-- CreateIndex
CREATE INDEX "hub_receipts_hubId_receivedAt_idx" ON "hub_receipts"("hubId", "receivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "hub_receipt_photos_fileId_key" ON "hub_receipt_photos"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "consolidations_code_key" ON "consolidations"("code");

-- CreateIndex
CREATE INDEX "consolidations_buyerCompanyId_idx" ON "consolidations"("buyerCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "logistics_shipments_code_key" ON "logistics_shipments"("code");

-- CreateIndex
CREATE INDEX "logistics_shipments_buyerCompanyId_status_idx" ON "logistics_shipments"("buyerCompanyId", "status");

-- CreateIndex
CREATE INDEX "logistics_shipments_status_eta_idx" ON "logistics_shipments"("status", "eta");

-- CreateIndex
CREATE INDEX "logistics_shipment_orders_orderId_idx" ON "logistics_shipment_orders"("orderId");

-- CreateIndex
CREATE INDEX "shipment_legs_partnerId_status_idx" ON "shipment_legs"("partnerId", "status");

-- CreateIndex
CREATE INDEX "shipment_legs_trackingNumber_idx" ON "shipment_legs"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "shipment_legs_shipmentId_sequence_key" ON "shipment_legs"("shipmentId", "sequence");

-- CreateIndex
CREATE INDEX "shipment_events_shipmentId_occurredAt_idx" ON "shipment_events"("shipmentId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "logistics_documents_number_key" ON "logistics_documents"("number");

-- CreateIndex
CREATE INDEX "logistics_documents_shipmentId_idx" ON "logistics_documents"("shipmentId");

-- AddForeignKey
ALTER TABLE "logistics_quotes" ADD CONSTRAINT "logistics_quotes_consolidationId_fkey" FOREIGN KEY ("consolidationId") REFERENCES "consolidations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_packings" ADD CONSTRAINT "order_packings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_requests" ADD CONSTRAINT "pickup_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_requests" ADD CONSTRAINT "pickup_requests_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "hubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_requests" ADD CONSTRAINT "pickup_requests_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "logistics_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_receipts" ADD CONSTRAINT "hub_receipts_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "hubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_receipts" ADD CONSTRAINT "hub_receipts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_receipts" ADD CONSTRAINT "hub_receipts_pickupId_fkey" FOREIGN KEY ("pickupId") REFERENCES "pickup_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_receipt_photos" ADD CONSTRAINT "hub_receipt_photos_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "hub_receipts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_receipt_photos" ADD CONSTRAINT "hub_receipt_photos_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consolidations" ADD CONSTRAINT "consolidations_buyerCompanyId_fkey" FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_shipments" ADD CONSTRAINT "logistics_shipments_buyerCompanyId_fkey" FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_shipments" ADD CONSTRAINT "logistics_shipments_originHubId_fkey" FOREIGN KEY ("originHubId") REFERENCES "hubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_shipments" ADD CONSTRAINT "logistics_shipments_consolidationId_fkey" FOREIGN KEY ("consolidationId") REFERENCES "consolidations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_shipment_orders" ADD CONSTRAINT "logistics_shipment_orders_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "logistics_shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_shipment_orders" ADD CONSTRAINT "logistics_shipment_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_legs" ADD CONSTRAINT "shipment_legs_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "logistics_shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_legs" ADD CONSTRAINT "shipment_legs_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "logistics_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_events" ADD CONSTRAINT "shipment_events_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "logistics_shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_events" ADD CONSTRAINT "shipment_events_legId_fkey" FOREIGN KEY ("legId") REFERENCES "shipment_legs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_documents" ADD CONSTRAINT "logistics_documents_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "logistics_shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written rules Prisma can't express.
ALTER TABLE "order_packings"
  ADD CONSTRAINT "order_packings_check"
    CHECK ("cartons" > 0 AND "grossWeightGrams" > 0 AND "volumeLitres" > 0
           AND ("netWeightGrams" IS NULL OR "netWeightGrams" <= "grossWeightGrams"));

ALTER TABLE "hub_receipts"
  ADD CONSTRAINT "hub_receipts_cartons_check" CHECK ("cartonsExpected" >= 0 AND "cartonsReceived" >= 0);

ALTER TABLE "logistics_shipments"
  ADD CONSTRAINT "logistics_shipments_amounts_check"
    CHECK ("buyerPriceMinor" >= 0 AND "partnerCostMinor" >= 0 AND "insuranceMinor" >= 0
           AND "cartons" >= 0 AND "grossWeightGrams" >= 0 AND "volumeLitres" >= 0);

ALTER TABLE "logistics_shipment_orders"
  ADD CONSTRAINT "logistics_shipment_orders_check" CHECK ("buyerShareMinor" >= 0 AND "costShareMinor" >= 0);

-- One live pickup per order, and an order on at most one live shipment.
CREATE UNIQUE INDEX "pickup_requests_one_open"
  ON "pickup_requests" ("orderId") WHERE "status" <> 'CANCELLED';
CREATE UNIQUE INDEX "logistics_shipment_orders_one_active"
  ON "logistics_shipment_orders" ("orderId") WHERE "active";

-- A shipment carries one buyer's orders only: never mix two buyers' goods or documents.
CREATE FUNCTION logistics_shipment_one_buyer() RETURNS trigger AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "orders" o, "logistics_shipments" s
     WHERE o."id" = NEW."orderId" AND s."id" = NEW."shipmentId"
       AND o."buyerCompanyId" <> s."buyerCompanyId"
  ) THEN
    RAISE EXCEPTION 'An order of another buyer cannot join this shipment';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER logistics_shipment_one_buyer
  BEFORE INSERT OR UPDATE ON "logistics_shipment_orders"
  FOR EACH ROW EXECUTE FUNCTION logistics_shipment_one_buyer();
