import { PrismaClient, Prisma } from '@prisma/client';

class CarService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllCars() {
    return this.prisma.car.findMany();
  }

  async getCarById(id: number) {
    return this.prisma.car.findUnique({ where: { id } });
  }

  async createCar(data: Prisma.CarCreateInput) {
    return this.prisma.car.create({ data })
  }

  async updateCar(id: number, data: Prisma.CarUpdateInput) {
    return await this.prisma.car.update({
      where: { id },
      data,
    });
  }

  async deleteCar(id: number) {
    return await this.prisma.car.delete({ where: { id } });
  }
}

export default CarService;
