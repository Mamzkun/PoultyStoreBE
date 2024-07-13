import { PrismaClient, Prisma } from '@prisma/client';

class WageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllWages() {
    return this.prisma.wage.findMany();
  }

  async getWageById(id: number) {
    return this.prisma.wage.findUnique({ where: { id } });
  }

  async createWage(data: Prisma.WageCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      const newWage = await tx.wage.create({ data });
      return newWage;
    });
  }

  async updateWage(id: number, data: Prisma.WageUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      const updatedWage = await tx.wage.update({
        where: { id },
        data,
      });
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
