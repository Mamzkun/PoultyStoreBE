import { Router } from 'express';
import CarController from '../controllers/CarController';

const carRouter = (carController: CarController) => {
  const router = Router();
  router.get('/', carController.getAllCars);
  router.get('/:id', carController.getCarById);
  router.post('/', carController.createCar);
  router.put('/:id', carController.updateCar);
  router.delete('/:id', carController.deleteCar);
  return router
}

export default carRouter;