import { Router } from 'express';
import type WageController from '../controllers/WageController';

const wageRouter = (wageController: WageController) => {
  const router = Router();
  router.get('/', wageController.getAllWages);
  router.get('/:id', wageController.getWageById);
  router.post('/', wageController.createWage);
  router.put('/:id', wageController.updateWage);
  router.delete('/:id', wageController.deleteWage);
  return router
}

export default wageRouter;