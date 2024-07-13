import { Router } from 'express';
import type SalaryController from '../controllers/SalaryController';

const salaryRouter = (salaryController: SalaryController) => {
  const router = Router();
  router.get('/', salaryController.getAllSalarys);
  router.get('/:id', salaryController.getSalaryById);
  router.post('/', salaryController.createSalary);
  router.put('/:id', salaryController.updateSalary);
  router.delete('/:id', salaryController.deleteSalary);
  return router
}

export default salaryRouter;