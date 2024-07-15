import { PrismaClient, Prisma } from "@prisma/client";

class SalaryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllSalarys(month: Date) {
    return this.prisma.employee.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        surename: true,
        username: true,
        base_salary: true,
        salary: {
          where: { month },
        },
      },
    });
  }

  async getSalaryById(id: number) {
    const salary = await this.prisma.salary.findUnique({ where: { id } });
    const month = salary!.month;
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const wages = await this.prisma.wage.findMany({
      where: {
        employee_id: salary?.employee_id,
        date: {
          gte: month,
          lte: endOfMonth,
        },
      },
    });
    return { salary, wages };
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
