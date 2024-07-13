import { PrismaClient } from "@prisma/client";
import CarService from "./services/CarService";
import CarController from "./controllers/CarController";
import carRouter from "./routes/CarRouter";
import PartnerService from "./services/PartnerService";
import partnerRouter from "./routes/PartnerRouter";
import PartnerController from "./controllers/PartnerController";

const prisma = new PrismaClient();

const car = (prisma: PrismaClient) => {
  const service = new CarService(prisma);
  const controller = new CarController(service);
  return carRouter(controller);
};
const partner = (prisma: PrismaClient) => {
  const service = new PartnerService(prisma);
  const controller = new PartnerController(service);
  return partnerRouter(controller);
};

const carInjection = car(prisma)
const partnerInjection = partner(prisma)
export { carInjection, partnerInjection }