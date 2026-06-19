-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('NORMAL', 'URGENT', 'CRITICAL');

-- DropForeignKey
ALTER TABLE "UserQuiz" DROP CONSTRAINT "UserQuiz_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSubject" DROP CONSTRAINT "UserSubject_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "UserQuiz";

-- DropTable
DROP TABLE "UserSubject";

-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lastDonation" TIMESTAMP(3),
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyRequest" (
    "id" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "urgencyLevel" "Urgency" NOT NULL DEFAULT 'NORMAL',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmergencyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donor_userId_key" ON "Donor"("userId");

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
