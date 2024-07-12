import { PrismaClient } from "@prisma/client";
import CarService from "./services/CarService";
import CarController from "./controllers/CarController";
import carRouter from "./routes/CarRouter";

const prisma = new PrismaClient();

const car = (prisma: PrismaClient) => {
  const service = new CarService(prisma);
  const controller = new CarController(service);
  return carRouter(controller);
}

const carInjection = car(prisma)
export { carInjection }