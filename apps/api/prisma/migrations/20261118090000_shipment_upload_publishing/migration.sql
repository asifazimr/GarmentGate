-- AlterTable
ALTER TABLE "shipment_uploads" ADD COLUMN     "buyerVisible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publishedById" UUID;

