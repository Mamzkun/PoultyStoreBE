import { PrismaClient, Prisma } from "@prisma/client";
import { toLocalTime } from "../helpers/timeHelper";

class SalaryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllSalaries(month: Date) {
    const utcMonth = new Date(month.getFullYear(), month.getMonth());
    const result = await this.prisma.employee.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        surename: true,
        username: true,
        base_salary: true,
        salary: {
          where: { month: utcMonth },
        },
      },
    });
    return result.map((item) => {
      item.salary = item.salary.map((salary) => ({
        ...salary,
        month: toLocalTime(salary.month),
      }));
      return item;
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
    salary!.month = toLocalTime(salary!.month);
    const wagesInLocalTZ = wages.map((wage) => ({
      ...wage,
      date: toLocalTime(wage.date),
    }));
    return { salary, wages: wagesInLocalTZ };
  }

  async getSalaryByUserMonth(employee_id: number, month: Date) {
    const utcMonth = new Date(month.getFullYear(), month.getMonth());
    const endOfMonth = new Date(
      utcMonth.getFullYear(),
      utcMonth.getMonth() + 1,
      0
    );
    const salary = await this.prisma.salary.findFirst({
      where: { employee_id, month: utcMonth },
    });
    const wages = await this.prisma.wage.findMany({
      where: {
        employee_id,
        date: {
          gte: utcMonth,
          lte: endOfMonth,
        },
      },
    });
    salary!.month = toLocalTime(salary!.month);
    const wagesInLocalTZ = wages.map((wage) => ({
      ...wage,
      date: toLocalTime(wage.date),
    }));
    return { salary, wages: wagesInLocalTZ };
  }

  async createSalary(data: Prisma.SalaryCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.salary.create({ data });
    });
  }

  async updateSalary(id: number, data: Prisma.SalaryUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.salary.update({
        where: { id },
        data,
      });
    });
  }

  async deleteSalary(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.salary.delete({ where: { id } });
    });
  }
}

export default SalaryService;
