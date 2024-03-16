/*
  Warnings:

  - Added the required column `verifyStatus` to the `ForgotPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForgotPassword" ADD COLUMN     "verifyStatus" BOOLEAN NOT NULL;
