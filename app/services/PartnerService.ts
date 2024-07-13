import { PrismaClient, Prisma } from '@prisma/client';

class PartnerService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllPartners() {
    return this.prisma.partner.findMany();
  }

  async getPartnerById(id: number) {
    return this.prisma.partner.findUnique({ where: { id } });
  }

  async createPartner(data: Prisma.PartnerCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      const newPartner = await tx.partner.create({ data });
      return newPartner;
    });
  }

  async updatePartner(id: number, data: Prisma.PartnerUpdateInput) {
    return this.prisma.$transaction(async (tx) => {
      const updatedPartner = await tx.partner.update({
        where: { id },
        data,
      });
      return updatedPartner;
    });
  }

  async deletePartner(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.partner.delete({ where: { id } });
    });
  }
}

export default PartnerService;
