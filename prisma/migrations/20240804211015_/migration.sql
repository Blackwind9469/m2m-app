-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sim" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "serial" INTEGER NOT NULL,
    "gsmno" INTEGER NOT NULL,
    "tariff" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "serial" INTEGER NOT NULL,
    "represent" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "sim_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "finish" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sim_serial_key" ON "Sim"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "Sim_gsmno_key" ON "Sim"("gsmno");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_serial_key" ON "Customer"("serial");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_represent_fkey" FOREIGN KEY ("represent") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_sim_id_fkey" FOREIGN KEY ("sim_id") REFERENCES "Sim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
