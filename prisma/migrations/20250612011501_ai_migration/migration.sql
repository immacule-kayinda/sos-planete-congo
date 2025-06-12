/*
  Warnings:

  - You are about to drop the column `imagesUrls` on the `Conte` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conte" DROP COLUMN "imagesUrls";

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "conteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Page_conteId_idx" ON "Page"("conteId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_conteId_fkey" FOREIGN KEY ("conteId") REFERENCES "Conte"("id") ON DELETE CASCADE ON UPDATE CASCADE;
