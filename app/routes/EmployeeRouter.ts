import { Router } from 'express';
import type EmployeeController from '../controllers/EmployeeController';

const employeeRouter = (employeeController: EmployeeController) => {
  const router = Router();
  router.get('/', employeeController.getAllEmployees);
  router.get('/:id', employeeController.getEmployeeById);
  router.post('/', employeeController.createEmployee);
  router.put('/:id', employeeController.updateEmployee);
  router.delete('/:id', employeeController.deleteEmployee);
  router.post('/login', employeeController.login);
  return router
}

export default employeeRouter;