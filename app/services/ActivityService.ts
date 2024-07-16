import { PrismaClient, Prisma } from "@prisma/client";

class ActivityService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllActivitys(date: Date) {
    const endOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 2
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
