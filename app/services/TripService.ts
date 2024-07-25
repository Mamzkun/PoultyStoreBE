import { PrismaClient, Prisma } from '@prisma/client';
import type {tripRequest} from "../helpers/typeHelper.ts";
import type WageService from "./WageService.ts";

class TripService {
  private prisma: PrismaClient;
  private wageService: WageService;

  constructor(prisma: PrismaClient, wageService: WageService) {
    this.prisma = prisma;
    this.wageService = wageService;
  }

  async getAllTrips(date: Date) {
    return this.prisma.trip.findMany({
      relationLoadStrategy : "join",
      where: { date },
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
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        activity: {
          select: { id: true },
        },
        car: {
          select: { id: true },
        },
        employee1: {
          select: { id: true },
        },
        employee2: {
          select: { id: true },
        },
      },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    return {
      date: trip.date.toISOString().split('T')[0],
      area: trip.area,
      estimasi: trip.estimasi,
      wage: trip.wage,
      status: trip.status,
      car_id: trip.car?.id ?? null,
      employee1_id: trip.employee1?.id ?? null,
      employee2_id: trip.employee2?.id ?? null,
      activity: trip.activity.map((act) => act.id),
    };
  }

  async createTrip(data: Prisma.TripCreateInput) {
    const tripData = data as tripRequest;
    const activity = tripData.activity as number[];
    delete tripData.activity;
    tripData.date = new Date(tripData.date);
    tripData.wage = parseInt(tripData.wage.toString());
    if (tripData.employee1_id) tripData.employee1_id = parseInt(tripData.employee1_id.toString());
    if (tripData.employee2_id) tripData.employee2_id = parseInt(tripData.employee2_id.toString());
    if (tripData.car_id) tripData.car_id = parseInt(tripData.car_id.toString());

    return this.prisma.$transaction(async (tx) => {
      const newTrip = await tx.trip.create({ data : tripData as Prisma.TripCreateInput });
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
    const tripData = data as tripRequest;
    const activity = tripData.activity as number[];
    delete tripData.activity;
    tripData.date = new Date(tripData.date);
    tripData.wage = parseInt(tripData.wage.toString());
    if (tripData.employee1_id) tripData.employee1_id = parseInt(tripData.employee1_id.toString());
    if (tripData.employee2_id) tripData.employee2_id = parseInt(tripData.employee2_id.toString());
    if (tripData.car_id) tripData.car_id = parseInt(tripData.car_id.toString());

    return this.prisma.$transaction(async (tx) => {
      const oldData = await this.getTripById(id);
      const updatedTrip = await tx.trip.update({
        where: { id },
        data : tripData as Prisma.TripUpdateInput
      });

      if (activity && activity.length > 0) {
        const deletedActivity = oldData.activity.filter(i => !activity.includes(i));
        const addedActivity = activity.filter(i => !oldData.activity.includes(i));

        await tx.activity.updateMany({
          where: {
            id: { in: deletedActivity },
          },
          data: { trip_id: null },
        });

        await tx.activity.updateMany({
          where: {
            id: { in: addedActivity },
          },
          data: { trip_id: updatedTrip.id },
        });
      }

      if (updatedTrip.car_id) {
        await tx.car.update({
          where: { id: updatedTrip.car_id },
          data: { status: data.status === 'delivered' ? 'busy' : 'free' },
        });
      }

      const employeeIds = [updatedTrip.employee1_id, updatedTrip.employee2_id].filter(
          (id) => id !== null
      ) as number[];

      if (employeeIds.length > 0) {
        await tx.employee.updateMany({
          where: {
            id: { in: employeeIds },
          },
          data: { status: data.status === 'delivered' ? 'busy' : 'free' },
        });
      }

      if (data.status === 'done') {
        const wageInput = {
          reason: `trip to ${tripData.area}`,
          date: new Date().toString(),
          amount: tripData.wage,
          employee : 0
        }
        wageInput.employee = tripData.employee1_id!
        await this.wageService.createWage(wageInput as Prisma.WageCreateInput);
        wageInput.employee = tripData.employee2_id!
        await this.wageService.createWage(wageInput as Prisma.WageCreateInput);
      }

      return updatedTrip;
    });
  }

  async deleteTrip(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.trip.delete({ where: { id } });
    });
  }
}

export default TripService;
