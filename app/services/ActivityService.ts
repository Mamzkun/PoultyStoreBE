import { PrismaClient, Prisma } from '@prisma/client';

class ActivityService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllActivitys() {
    return this.prisma.activity.findMany();
  }

  async getActivityById(id: number) {
    return this.prisma.activity.findUnique({ where: { id } });
  }

  async createActivity(data: Prisma.ActivityCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      const newActivity = await tx.activity.create({ data });
      return newActivity;
    });
  }

  async updateActivity(id: number, data: Prisma.ActivityUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      const updatedActivity = await tx.activity.update({
        where: { id },
        data,
      });
      return updatedActivity;
    });
  }

  async deleteActivity(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.activity.delete({ where: { id } });
    });
  }
}

export default ActivityService;
