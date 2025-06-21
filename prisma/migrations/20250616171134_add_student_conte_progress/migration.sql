-- CreateTable
CREATE TABLE "StudentConteProgress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "conteId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentConteProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentConteProgress_studentId_conteId_key" ON "StudentConteProgress"("studentId", "conteId");

-- AddForeignKey
ALTER TABLE "StudentConteProgress" ADD CONSTRAINT "StudentConteProgress_conteId_fkey" FOREIGN KEY ("conteId") REFERENCES "Conte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConteProgress" ADD CONSTRAINT "StudentConteProgress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
