/*
  Warnings:

  - A unique constraint covering the columns `[license_plate]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serial]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "serial" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sim" ALTER COLUMN "serial" SET DATA TYPE TEXT,
ALTER COLUMN "gsmno" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Contract_license_plate_key" ON "Contract"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serial_key" ON "Device"("serial");
