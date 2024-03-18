/*
  Warnings:

  - Added the required column `employeId` to the `EmployeAbsence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeAbsence" ADD COLUMN     "employeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "EmployeAbsence" ADD CONSTRAINT "EmployeAbsence_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "Employe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
