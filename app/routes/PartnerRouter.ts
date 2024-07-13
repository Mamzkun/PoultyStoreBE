import { Router } from 'express';
import type PartnerController from '../controllers/PartnerController';

const partnerRouter = (partnerController: PartnerController) => {
  const router = Router();
  router.get('/', partnerController.getAllPartners);
  router.get('/:id', partnerController.getPartnerById);
  router.post('/', partnerController.createPartner);
  router.put('/:id', partnerController.updatePartner);
  router.delete('/:id', partnerController.deletePartner);
  return router
}

export default partnerRouter;