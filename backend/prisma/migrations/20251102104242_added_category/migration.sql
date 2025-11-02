/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Accessories', 'Food', 'Electronics', 'Beauty', 'Fashion');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "Category" NOT NULL;
