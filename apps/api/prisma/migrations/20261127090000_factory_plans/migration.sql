BEGIN;
-- CreateEnum
CREATE TYPE "PlanTier" AS ENUM ('FREE', 'PRO', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PlanInterval" AS ENUM ('MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "SubscriptionSource" AS ENUM ('STRIPE', 'MANUAL');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('INCOMPLETE', 'ACTIVE', 'PAST_DUE', 'CANCELED');

-- AlterEnum
ALTER TYPE "LedgerTransactionKind" ADD VALUE 'SUBSCRIPTION';

-- AlterTable
ALTER TABLE "manufacturer_profiles" ADD COLUMN     "planTier" "PlanTier" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "searchBoost" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "rfq_invitations" ADD COLUMN     "notifiedAt" TIMESTAMP(3),
ADD COLUMN     "visibleAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "factory_subscriptions" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "tier" "PlanTier" NOT NULL,
    "interval" "PlanInterval",
    "source" "SubscriptionSource" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'INCOMPLETE',
    "amountUsdMinor" INTEGER NOT NULL DEFAULT 0,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "bankReference" TEXT,
    "createdById" UUID,
    "canceledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "factory_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "factory_subscription_invoices" (
    "id" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "stripeInvoiceId" TEXT,
    "amountMinor" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "factory_subscription_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "factory_subscriptions_stripeSubscriptionId_key" ON "factory_subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "factory_subscriptions_stripeCheckoutSessionId_key" ON "factory_subscriptions"("stripeCheckoutSessionId");

-- CreateIndex
CREATE INDEX "factory_subscriptions_manufacturerProfileId_status_idx" ON "factory_subscriptions"("manufacturerProfileId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "factory_subscription_invoices_stripeInvoiceId_key" ON "factory_subscription_invoices"("stripeInvoiceId");

-- CreateIndex
CREATE INDEX "factory_subscription_invoices_subscriptionId_idx" ON "factory_subscription_invoices"("subscriptionId");

-- CreateIndex
CREATE INDEX "rfq_invitations_notifiedAt_visibleAt_idx" ON "rfq_invitations"("notifiedAt", "visibleAt");

-- AddForeignKey
ALTER TABLE "factory_subscriptions" ADD CONSTRAINT "factory_subscriptions_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "factory_subscription_invoices" ADD CONSTRAINT "factory_subscription_invoices_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "factory_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Invitations sent before head starts existed were already announced.
UPDATE "rfq_invitations" SET "notifiedAt" = "invitedAt", "visibleAt" = "invitedAt";

-- One live paid plan per factory.
CREATE UNIQUE INDEX "factory_subscriptions_live_key" ON "factory_subscriptions"("manufacturerProfileId")
  WHERE "status" IN ('ACTIVE', 'PAST_DUE');

ALTER TABLE "factory_subscriptions"
  ADD CONSTRAINT "factory_subscriptions_amount_check" CHECK ("amountUsdMinor" >= 0),
  ADD CONSTRAINT "factory_subscriptions_paid_tier_check" CHECK ("tier" <> 'FREE'),
  ADD CONSTRAINT "factory_subscriptions_source_check" CHECK (
    ("source" = 'STRIPE' AND "interval" IS NOT NULL)
    OR ("source" = 'MANUAL' AND "stripeSubscriptionId" IS NULL AND "stripeCheckoutSessionId" IS NULL)
  );
ALTER TABLE "factory_subscription_invoices"
  ADD CONSTRAINT "factory_subscription_invoices_amount_check" CHECK ("amountMinor" > 0);
ALTER TABLE "manufacturer_profiles"
  ADD CONSTRAINT "manufacturer_profiles_search_boost_check" CHECK ("searchBoost" BETWEEN 0 AND 10);

COMMIT;
