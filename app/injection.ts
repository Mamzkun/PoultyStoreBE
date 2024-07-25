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
import SalaryService from "./services/SalaryService";
import SalaryController from "./controllers/SalaryController";
import salaryRouter from "./routes/SalaryRouter";
import WageService from "./services/WageService";
import WageController from "./controllers/WageController";
import wageRouter from "./routes/WageRouter";
import ActivityService from "./services/ActivityService";
import ActivityController from "./controllers/ActivityController";
import activityRouter from "./routes/ActivityRouter";

// prisma
const prisma = new PrismaClient();
// service
const carService = new CarService(prisma);
const partnerService = new PartnerService(prisma);
const employeeService = new EmployeeService(prisma);
const wageService = new WageService(prisma);
const tripService = new TripService(prisma, wageService);
const salaryService = new SalaryService(prisma);
const activityService = new ActivityService(prisma);
// controller
const carController = new CarController(carService);
const partnerController = new PartnerController(partnerService);
const employeeController = new EmployeeController(employeeService);
const tripController = new TripController(tripService);
const salaryController = new SalaryController(salaryService);
const wageController = new WageController(wageService);
const activityController = new ActivityController(activityService);
// router
const carRoutes = carRouter(carController);
const partnerRoutes = partnerRouter(partnerController);
const employeeRoutes = employeeRouter(employeeController);
const tripRoutes = tripRouter(tripController);
const salaryRoutes = salaryRouter(salaryController);
const wageRoutes = wageRouter(wageController);
const activityRoutes = activityRouter(activityController);

export { carRoutes, partnerRoutes, employeeRoutes, tripRoutes, salaryRoutes, wageRoutes, activityRoutes }