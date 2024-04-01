/*
  Warnings:

  - A unique constraint covering the columns `[employeImageId]` on the table `Employe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employe" ADD COLUMN     "employeImageId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "EmployeImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employe_employeImageId_key" ON "Employe"("employeImageId");

-- AddForeignKey
ALTER TABLE "Employe" ADD CONSTRAINT "Employe_employeImageId_fkey" FOREIGN KEY ("employeImageId") REFERENCES "EmployeImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
