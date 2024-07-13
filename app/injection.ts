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
import TripService from "./services/TripService";
import TripController from "./controllers/TripController";
import tripRouter from "./routes/TripRouter";

// prisma
const prisma = new PrismaClient();
// service
const carService = new CarService(prisma);
const partnerService = new PartnerService(prisma);
const employeeService = new EmployeeService(prisma);
const tripService = new TripService(prisma);
// controller
const carController = new CarController(carService);
const partnerController = new PartnerController(partnerService);
const employeeController = new EmployeeController(employeeService);
const tripController = new TripController(tripService);
// router
const carRoutes = carRouter(carController);
const partnerRoutes = partnerRouter(partnerController);
const employeeRoutes = employeeRouter(employeeController);
const tripRoutes = tripRouter(tripController);

export { carRoutes, partnerRoutes, employeeRoutes, tripRoutes }