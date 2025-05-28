/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Conte` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Conte` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Module` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sectionId]` on the table `Conte` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subtitle` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `Conte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Conte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conte" DROP CONSTRAINT "Conte_moduleId_fkey";

-- DropIndex
DROP INDEX "Conte_moduleId_key";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" SERIAL NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Conte" DROP COLUMN "moduleId",
DROP COLUMN "text",
ADD COLUMN     "sectionId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "description",
ADD COLUMN     "order" SERIAL NOT NULL,
ADD COLUMN     "sectionId" TEXT NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_order_key" ON "Chapter"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Conte_sectionId_key" ON "Conte"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_order_key" ON "Module"("order");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conte" ADD CONSTRAINT "Conte_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
