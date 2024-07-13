import { PrismaClient, Prisma } from '@prisma/client';

class EmployeeService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllEmployees() {
    return this.prisma.employee.findMany();
  }

  async getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async createEmployee(data: Prisma.EmployeeCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      const newEmployee = await tx.employee.create({ data });
      return newEmployee;
    });
  }

  async updateEmployee(id: number, data: Prisma.EmployeeUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      const updatedEmployee = await tx.employee.update({
        where: { id },
        data,
      });
      return updatedEmployee;
    });
  }

  async deleteEmployee(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.employee.delete({ where: { id } });
    });
  }
}

export default EmployeeService;
