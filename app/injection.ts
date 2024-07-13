import { PrismaClient } from "@prisma/client";
import CarService from "./services/CarService";
import CarController from "./controllers/CarController";
import carRouter from "./routes/CarRouter";
import PartnerService from "./services/PartnerService";
import partnerRouter from "./routes/PartnerRouter";
import PartnerController from "./controllers/PartnerController";
import EmployeeService from "./services/EmployeeService";
import EmployeeController from "./controllers/EmployeeController";
import employeeRouter from "./routes/EmployeeRouter";

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
const employee = (prisma: PrismaClient) => {
  const service = new EmployeeService(prisma);
  const controller = new EmployeeController(service);
  return employeeRouter(controller);
};

const carInjection = car(prisma)
const partnerInjection = partner(prisma)
const employeeInjection = employee(prisma)
export { carInjection, partnerInjection, employeeInjection }