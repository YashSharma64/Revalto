/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AcademicYear" AS ENUM ('First', 'Second', 'Third', 'Fourth');

-- CreateEnum
CREATE TYPE "public"."Condition" AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "public"."WarrantyPeriod" AS ENUM ('LESS_THAN_1_MONTH', 'ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'SIX_TO_NINE_MONTHS', 'NINE_TO_TWELVE_MONTHS', 'MORE_THAN_1_YEAR');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "anonymousName" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "hostel" "public"."Hostel" NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imgUrl" TEXT,
    "annonymousImgUrl" TEXT,
    "academicYear" "public"."AcademicYear" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."posts" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemImgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "secondHandPrice" DOUBLE PRECISION NOT NULL,
    "condition" "public"."Condition" NOT NULL,
    "warrantyRemaining" "public"."WarrantyPeriod" NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."buyers" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "buyers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."buyers" ADD CONSTRAINT "buyers_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."buyers" ADD CONSTRAINT "buyers_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
