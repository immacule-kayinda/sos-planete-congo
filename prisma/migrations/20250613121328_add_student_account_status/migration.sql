-- CreateEnum
CREATE TYPE "StudentAccountStatus" AS ENUM ('PENDING_ACTIVATION', 'LIMITED_ACCESS', 'ACTIVE');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "accountStatus" "StudentAccountStatus" NOT NULL DEFAULT 'PENDING_ACTIVATION',
ADD COLUMN     "classCode" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "hasClassroomAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT;
