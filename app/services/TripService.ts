import { PrismaClient, Prisma } from '@prisma/client';

class TripService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllTrips() {
    return this.prisma.trip.findMany({
      relationLoadStrategy : "join",
      include: {
        car: true,
        employee1: {
          select : { nickname: true }
        },
        employee2: {
          select : { nickname: true }
        },
        activity: {
          select : {
            detail : true,
            partner : {
              select : {
                id : true,
                name : true
              }
            }
          }
        },
      }
    });
  }

  async getTripById(id: number) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  async createTrip(data: Prisma.TripCreateInput) {
    const activity = data.activity as number[];
    delete data.activity;
    return this.prisma.$transaction(async (tx) => {
      const newTrip = await tx.trip.create({ data });
      await tx.activity.updateMany({
        where: {
          id : { in : activity }
        },
        data : { trip_id : newTrip.id }
      });

      if (data.status === 'delivered') {
        if (newTrip.car_id) {
          await tx.car.update({
            where: { id: newTrip.car_id },
            data: { status: 'busy' },
          });
        }

        const employeeIds = [newTrip.employee1_id, newTrip.employee2_id].filter(
            (id) => id !== null
        ) as number[];

        if (employeeIds.length > 0) {
          await tx.employee.updateMany({
            where: {
              id: { in: employeeIds },
            },
            data: { status: 'busy' },
          });
        }
      }

      return newTrip;
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
