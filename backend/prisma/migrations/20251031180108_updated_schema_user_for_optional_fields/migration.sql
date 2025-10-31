/*
  Warnings:

  - You are about to drop the column `anonymousName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_anonymousName_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "anonymousName",
ADD COLUMN     "userName" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "hostel" DROP NOT NULL,
ALTER COLUMN "roomNumber" DROP NOT NULL,
ALTER COLUMN "academicYear" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "public"."User"("userName");
