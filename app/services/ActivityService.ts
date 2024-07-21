import { PrismaClient, Prisma } from "@prisma/client";

class ActivityService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllActivities(date: Date) {
    const endOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    return this.prisma.activity.findMany({
      where: {
        date: {
          gte: date,
          lte: endOfDate,
        },
      },
      relationLoadStrategy: "join",
      include: {
        partner: {
          select: { name: true, area: true },
        },
      },
    });
  }

  async getActivityById(id: number) {
    return this.prisma.activity.findUnique({ where: { id } });
  }

  async createActivity(data: Prisma.ActivityCreateInput) {
    data.date = new Date(data.date);
    return this.prisma.$transaction(async (tx) => {
      return tx.activity.create({data});
    });
  }

  async updateActivity(id: number, data: Prisma.ActivityUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.activity.update({
        where: { id },
        data,
      });
    });
  }

  async deleteActivity(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.activity.delete({ where: { id } });
    });
  }
}

export default ActivityService;
