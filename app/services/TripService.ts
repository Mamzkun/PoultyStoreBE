import { PrismaClient, Prisma } from '@prisma/client';

class TripService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllTrips() {
    return this.prisma.trip.findMany();
  }

  async getTripById(id: number) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  async createTrip(data: Prisma.TripCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.trip.create({ data });
    });
  }

  async updateTrip(id: number, data: Prisma.TripUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      return tx.trip.update({
        where: { id },
        data,
      });
    });
  }

  async deleteTrip(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.trip.delete({ where: { id } });
    });
  }
}

export default TripService;
