BEGIN;
-- CreateEnum
CREATE TYPE "TextChannel" AS ENUM ('SMS', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "OutboundMessageStatus" AS ENUM ('QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'SKIPPED');

-- AlterTable
ALTER TABLE "notification_preferences" ADD COLUMN     "text" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "pendingPhone" TEXT,
ADD COLUMN     "phoneCodeAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phoneCodeExpiresAt" TIMESTAMP(3),
ADD COLUMN     "phoneCodeHash" TEXT,
ADD COLUMN     "phoneE164" TEXT,
ADD COLUMN     "phoneVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "textChannel" "TextChannel" NOT NULL DEFAULT 'SMS';

-- CreateTable
CREATE TABLE "outbound_messages" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "channel" "TextChannel" NOT NULL,
    "to" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "OutboundMessageStatus" NOT NULL DEFAULT 'QUEUED',
    "error" TEXT,
    "providerRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outbound_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "outbound_messages_providerRef_key" ON "outbound_messages"("providerRef");

-- CreateIndex
CREATE INDEX "outbound_messages_userId_createdAt_idx" ON "outbound_messages"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "outbound_messages_createdAt_idx" ON "outbound_messages"("createdAt");

-- AddForeignKey
ALTER TABLE "outbound_messages" ADD CONSTRAINT "outbound_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- People who already saved preferences get texts where the defaults have them.
UPDATE "notification_preferences" SET "text" = "category"::text IN ('QUOTES', 'ORDERS', 'QC', 'PAYMENTS', 'DISPUTES');

ALTER TABLE "users"
  ADD CONSTRAINT "users_phone_e164_check" CHECK ("phoneE164" IS NULL OR "phoneE164" ~ '^\+[1-9][0-9]{7,14}$'),
  ADD CONSTRAINT "users_pending_phone_check" CHECK ("pendingPhone" IS NULL OR "pendingPhone" ~ '^\+[1-9][0-9]{7,14}$'),
  ADD CONSTRAINT "users_phone_verified_check" CHECK ("phoneVerifiedAt" IS NULL OR "phoneE164" IS NOT NULL);

COMMIT;
