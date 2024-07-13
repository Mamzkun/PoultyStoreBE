import { Router } from 'express';
import type TripController from '../controllers/TripController';

const tripRouter = (tripController: TripController) => {
  const router = Router();
  router.get('/', tripController.getAllTrips);
  router.get('/:id', tripController.getTripById);
  router.post('/', tripController.createTrip);
  router.put('/:id', tripController.updateTrip);
  router.delete('/:id', tripController.deleteTrip);
  return router
}

export default tripRouter;