/*
  Warnings:

  - You are about to drop the column `completed` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `isCurrent` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[quizId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quizId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_moduleId_fkey";

-- DropIndex
DROP INDEX "Chapter_order_key";

-- DropIndex
DROP INDEX "Module_order_key";

-- DropIndex
DROP INDEX "Section_order_key";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "completed",
DROP COLUMN "isCurrent";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "quizId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Quiz";

-- CreateTable
CREATE TABLE "Quizz" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_quizId_key" ON "Section"("quizId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
