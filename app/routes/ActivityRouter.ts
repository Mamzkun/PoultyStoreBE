import { Router } from 'express';
import type ActivityController from '../controllers/ActivityController';

const activityRouter = (activityController: ActivityController) => {
  const router = Router();
  router.get('/', activityController.getAllActivities);
  router.get('/:id', activityController.getActivityById);
  router.post('/', activityController.createActivity);
  router.put('/:id', activityController.updateActivity);
  router.delete('/:id', activityController.deleteActivity);
  return router
}

export default activityRouter;