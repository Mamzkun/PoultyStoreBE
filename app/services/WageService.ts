import { PrismaClient, Prisma } from "@prisma/client";
import { toLocalTime } from "../helpers/timeHelper";

class WageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllWages() {
    const result = await this.prisma.wage.findMany();
    return result.map((wage) => ({
      ...wage,
      date: toLocalTime(wage.date),
    }));
  }

  async getWageById(id: number) {
    const result = await this.prisma.wage.findUnique({ where: { id } });
    result!.date = toLocalTime(result!.date);
    return result;
  }

  async createWage(data: Prisma.WageCreateInput) {
    const date = new Date(data.date);
    const userId = data.employee ? parseInt(data.employee.toString()) : 0;
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.prisma.$transaction(async (prisma) => {
      // Step 1: Cek apakah salary untuk user pada bulan tertentu sudah ada
      let salaryRecord = await prisma.salary.findFirst({
        where: {
          employee_id: userId,
          month: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });

      // Step 2: Jika belum ada, buat entry salary baru
      if (!salaryRecord) {
        const user = await prisma.employee.findUnique({
          where: { id: userId },
        });

        if (!user) {
          throw new Error("User not found");
        }

        salaryRecord = await prisma.salary.create({
          data: {
            employee_id: userId,
            month: startOfMonth,
            salary_total: user.base_salary,
            status: "delayed",
          },
        });

        // Tambahkan base_salary ke dalam wage
        await prisma.wage.create({
          data: {
            employee_id: userId,
            date: startOfMonth,
            amount: user.base_salary,
            reason: "Base Salary",
          },
        });
      }

      // Step 3: Tambahkan wage baru ke dalam tabel wage
      const newWage = await prisma.wage.create({
        data: {
          employee_id: userId,
          date: new Date(),
          amount: data.amount,
          reason: data.reason,
        },
      });

      // Step 4: Update total salary di tabel salary
      await prisma.salary.update({
        where: {
          id: salaryRecord.id,
        },
        data: {
          salary_total: {
            increment: data.amount,
          },
        },
      });
      return newWage;
    });
  }

  async updateWage(id: number, data: Prisma.WageUpdateInput) {
    const date = new Date(data.date!.toString());
    const userId = data.employee ? parseInt(data.employee.toString()) : 0;
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.prisma.$transaction(async (tx) => {
      // Step 1: ambil id dari salary yang mau diubah
      const salaryRecord = await tx.salary.findFirst({
        where: {
          employee_id: userId,
          month: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      });

      // Step 2: ambil nilai wage sebelum diubah
      const oldWage = await tx.wage.findUnique({ where: { id } });

      // Step 3: update wage
      const updatedWage = await tx.wage.update({
        where: { id },
        data : {
          employee_id: userId,
          date: date,
          amount: data.amount,
          reason: data.reason,
        },
      });

      // Step 4: update salary
      if (oldWage && salaryRecord) {
        console.log(updatedWage.amount - oldWage.amount)
        await tx.salary.update({
          where: {
            id : salaryRecord.id
          },
          data: {
            salary_total: {
              increment: updatedWage.amount - oldWage.amount,
            },
          },
        });
      }

      return updatedWage;
    });
  }

  async deleteWage(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.wage.delete({ where: { id } });
    });
  }
}

export default WageService;
