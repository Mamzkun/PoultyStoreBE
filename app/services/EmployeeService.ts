import { PrismaClient, Prisma, EmployeeStatus } from "@prisma/client";

class EmployeeService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllEmployees(status: EmployeeStatus | string) {
    if (status === "busy" || status === "off" || status === "free") {
      return this.prisma.employee.findMany({
        select: { id: true, nickname: true, phone: true, status: true },
        where: { status },
      });
    }
    return this.prisma.employee.findMany({
      select: { id: true, nickname: true, phone: true, status: true },
    });
  }

  async getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async createEmployee(data: Prisma.EmployeeCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.employee.create({ data });
    });
  }

  async updateEmployee(id: number, data: Prisma.EmployeeUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.employee.update({
        where: { id },
        data,
      });
    });
  }

  async deleteEmployee(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.employee.delete({ where: { id } });
    });
  }
}

export default EmployeeService;
