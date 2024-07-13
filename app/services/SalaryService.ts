import { PrismaClient, Prisma } from '@prisma/client';

class SalaryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllSalarys() {
    return this.prisma.salary.findMany();
  }

  async getSalaryById(id: number) {
    return this.prisma.salary.findUnique({ where: { id } });
  }

  async createSalary(data: Prisma.SalaryCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      const newSalary = await tx.salary.create({ data });
      return newSalary;
    });
  }

  async updateSalary(id: number, data: Prisma.SalaryUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      const updatedSalary = await tx.salary.update({
        where: { id },
        data,
      });
      return updatedSalary;
    });
  }

  async deleteSalary(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.salary.delete({ where: { id } });
    });
  }
}

export default SalaryService;
