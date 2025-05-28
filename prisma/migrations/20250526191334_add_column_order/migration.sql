/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Section_order_key" ON "Section"("order");
