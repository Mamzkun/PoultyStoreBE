import { PrismaClient, Prisma } from '@prisma/client';

class CarService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllCars() {
    return this.prisma.car.findMany({
      relationLoadStrategy : "join",
      include: {
        trip : {
          select : { id: true },
          where : { status : 'delivered' },
          take : 1
        }
      },
    });
  }

  async getCarById(id: number) {
    return this.prisma.car.findUnique({ where: { id } });
  }

  async getCarsWithNoTrip() {
    return this.prisma.car.findMany({
      where: { status : 'free' }
    });
  }

  async createCar(data: Prisma.CarCreateInput) {
    return this.prisma.car.create({ data })
  }

  async updateCar(id: number, data: Prisma.CarUpdateInput) {
    return this.prisma.car.update({
      where: { id },
      data,
    });
  }

  async deleteCar(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }
}

export default CarService;
