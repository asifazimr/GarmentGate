-- CreateEnum
CREATE TYPE "LogisticsMode" AS ENUM ('SAMPLE_COURIER', 'DOMESTIC', 'SEA_FCL', 'SEA_LCL', 'AIR', 'DDP');

-- CreateEnum
CREATE TYPE "LogisticsPartnerKind" AS ENUM ('FORWARDER', 'COURIER', 'TRUCKING', 'CUSTOMS_BROKER');

-- CreateEnum
CREATE TYPE "RateUnit" AS ENUM ('PER_KG', 'PER_CBM', 'PER_CONTAINER', 'FLAT');

-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('GP20', 'GP40', 'HC40');

-- CreateEnum
CREATE TYPE "HubOperator" AS ENUM ('GARMENT_GATE', 'PARTNER');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "hsCode" TEXT;

-- CreateTable
CREATE TABLE "logistics_partners" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "LogisticsPartnerKind" NOT NULL,
    "country" CHAR(2) NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistics_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hubs" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "operator" "HubOperator" NOT NULL DEFAULT 'GARMENT_GATE',
    "partnerId" UUID,
    "country" CHAR(2) NOT NULL,
    "city" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "postalCode" TEXT,
    "port" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_cards" (
    "id" UUID NOT NULL,
    "partnerId" UUID NOT NULL,
    "mode" "LogisticsMode" NOT NULL,
    "originCountry" CHAR(2) NOT NULL,
    "originPort" TEXT,
    "destinationCountry" CHAR(2) NOT NULL,
    "destinationPort" TEXT,
    "unit" "RateUnit" NOT NULL,
    "containerType" "ContainerType",
    "costMinor" INTEGER NOT NULL,
    "minChargeMinor" INTEGER NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "transitDaysMin" INTEGER NOT NULL,
    "transitDaysMax" INTEGER NOT NULL,
    "validFrom" DATE NOT NULL,
    "validTo" DATE NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistics_margin_rules" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "mode" "LogisticsMode",
    "originCountry" CHAR(2),
    "destinationCountry" CHAR(2),
    "markupBps" INTEGER NOT NULL,
    "minMarginMinor" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistics_margin_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duty_rates" (
    "id" UUID NOT NULL,
    "hsPrefix" TEXT NOT NULL,
    "destinationCountry" CHAR(2) NOT NULL,
    "rateBps" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duty_rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logistics_partners_code_key" ON "logistics_partners"("code");

-- CreateIndex
CREATE INDEX "logistics_partners_kind_active_idx" ON "logistics_partners"("kind", "active");

-- CreateIndex
CREATE UNIQUE INDEX "hubs_code_key" ON "hubs"("code");

-- CreateIndex
CREATE INDEX "hubs_country_active_idx" ON "hubs"("country", "active");

-- CreateIndex
CREATE INDEX "rate_cards_mode_originCountry_destinationCountry_active_idx" ON "rate_cards"("mode", "originCountry", "destinationCountry", "active");

-- CreateIndex
CREATE INDEX "rate_cards_partnerId_idx" ON "rate_cards"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "duty_rates_hsPrefix_destinationCountry_key" ON "duty_rates"("hsPrefix", "destinationCountry");

-- AddForeignKey
ALTER TABLE "hubs" ADD CONSTRAINT "hubs_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "logistics_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_cards" ADD CONSTRAINT "rate_cards_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "logistics_partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Hand-written rules Prisma can't express.
ALTER TABLE "rate_cards"
  ADD CONSTRAINT "rate_cards_amounts_check" CHECK ("costMinor" > 0 AND "minChargeMinor" >= 0),
  ADD CONSTRAINT "rate_cards_transit_check" CHECK ("transitDaysMin" >= 0 AND "transitDaysMax" >= "transitDaysMin"),
  ADD CONSTRAINT "rate_cards_validity_check" CHECK ("validTo" >= "validFrom"),
  ADD CONSTRAINT "rate_cards_container_check"
    CHECK (("unit" = 'PER_CONTAINER') = ("containerType" IS NOT NULL));

ALTER TABLE "logistics_margin_rules"
  ADD CONSTRAINT "logistics_margin_rules_check" CHECK ("markupBps" BETWEEN 0 AND 10000 AND "minMarginMinor" >= 0);

ALTER TABLE "duty_rates"
  ADD CONSTRAINT "duty_rates_check" CHECK ("rateBps" BETWEEN 0 AND 10000 AND "hsPrefix" ~ '^[0-9]{2,10}$');

ALTER TABLE "orders"
  ADD CONSTRAINT "orders_hs_code_check" CHECK ("hsCode" IS NULL OR "hsCode" ~ '^[0-9]{6,10}$');
