-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('free', 'busy', 'broken');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('free', 'busy', 'off');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('scheduled', 'delivered', 'canceled', 'done');

-- CreateEnum
CREATE TYPE "SalaryStatus" AS ENUM ('delayed', 'paid');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('scheduled', 'delivered', 'canceled', 'done');

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "plat" TEXT NOT NULL,
    "merk" TEXT NOT NULL,
    "status" "CarStatus" NOT NULL DEFAULT 'free',

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "surename" TEXT NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "base_salary" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'off',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "estimasi" TEXT NOT NULL,
    "status" "TripStatus" NOT NULL,
    "wage" INTEGER NOT NULL,
    "car_id" INTEGER,
    "employee1_id" INTEGER,
    "employee2_id" INTEGER,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "month" TIMESTAMP(3) NOT NULL,
    "salary_total" INTEGER NOT NULL,
    "status" "SalaryStatus" NOT NULL DEFAULT 'delayed',

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wage" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Wage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "partner_type" TEXT NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "detail" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "ActivityStatus" NOT NULL DEFAULT 'scheduled',
    "partner_id" INTEGER,
    "trip_id" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nik_key" ON "Employee"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_employee1_id_fkey" FOREIGN KEY ("employee1_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_employee2_id_fkey" FOREIGN KEY ("employee2_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wage" ADD CONSTRAINT "Wage_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
