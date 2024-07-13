import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function seed() {
  // Seed Cars
  await prisma.car.createMany({
    data: [
      { plat: 'ABC123', merk: 'Toyota', status: 'free' },
      { plat: 'DEF456', merk: 'Honda', status: 'busy' },
      { plat: 'GHI789', merk: 'Ford', status: 'broken' },
    ],
  });

  // Seed Employees
  await prisma.employee.createMany({
    data: [
      {
        surename: 'John Doe',
        nik: '1234567890123456',
        address: '123 Main St',
        phone: '555-1234',
        position: 'Driver',
        base_salary: 5000000,
        username: 'johndoe',
        nickname: 'John',
        password: 'password',
        status: 'off',
      },
      {
        surename: 'Jane Smith',
        nik: '2345678901234567',
        address: '456 Elm St',
        phone: '555-5678',
        position: 'Manager',
        base_salary: 7000000,
        username: 'janesmith',
        nickname: 'Jane',
        password: 'password',
        status: 'free',
      },
    ],
  });

  // Seed Trips
  await prisma.trip.createMany({
    data: [
      {
        area: 'Downtown',
        estimasi: '2 hours',
        status: 'scheduled',
        car_id: 1,
        employee1_id: 1,
        employee2_id: null,
      },
      {
        area: 'Suburbs',
        estimasi: '3 hours',
        status: 'done',
        car_id: 2,
        employee1_id: 2,
        employee2_id: null,
      },
    ],
  });

  // Seed Salaries
  await prisma.salary.createMany({
    data: [
      {
        employee_id: 1,
        month: new Date('2024-07-01'),
        salary_total: 5000000,
        status: 'paid',
      },
      {
        employee_id: 2,
        month: new Date('2024-07-01'),
        salary_total: 7000000,
        status: 'delayed',
      },
    ],
  });

  // Seed Wages
  await prisma.wage.createMany({
    data: [
      {
        employee_id: 1,
        reason: 'Overtime',
        date: new Date('2024-07-10'),
        amount: 500000,
      },
      {
        employee_id: 2,
        reason: 'Bonus',
        date: new Date('2024-07-10'),
        amount: 1000000,
      },
    ],
  });

  // Seed Partners
  await prisma.partner.createMany({
    data: [
      {
        name: 'Partner A',
        address: '789 Oak St',
        area: 'East Side',
        phone: '555-7890',
        partner_type: 'Supplier',
      },
      {
        name: 'Partner B',
        address: '321 Pine St',
        area: 'West Side',
        phone: '555-4321',
        partner_type: 'Distributor',
      },
    ],
  });

  // Seed Activities
  await prisma.activity.createMany({
    data: [
      {
        detail: 'Delivery to Partner A',
        date: new Date('2024-07-12'),
        status: 'scheduled',
        partner_id: 1,
        trip_id: 1,
      },
      {
        detail: 'Meeting with Partner B',
        date: new Date('2024-07-13'),
        status: 'done',
        partner_id: 2,
        trip_id: 2,
      },
    ],
  });
}

