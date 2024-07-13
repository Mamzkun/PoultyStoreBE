import type { Request, Response } from 'express';
import PartnerService from '../services/PartnerService';
import { 
  PrismaClientInitializationError, 
  PrismaClientKnownRequestError, 
  PrismaClientRustPanicError, 
  PrismaClientUnknownRequestError, 
  PrismaClientValidationError 
} from '@prisma/client/runtime/library';

class PartnerController {
  private partnerService: PartnerService;

  constructor(partnerService: PartnerService) {
    this.partnerService = partnerService;
  }

  getAllPartners = async (req: Request, res: Response) => {
    try {
      const partners = await this.partnerService.getAllPartners();
      res.json(partners);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getPartnerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const partner = await this.partnerService.getPartnerById(id);
      if (partner) {
        res.json(partner);
      } else {
        res.status(404).json({ message: 'Partner not found' });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createPartner = async (req: Request, res: Response) => {
    try {
      const partner = await this.partnerService.createPartner(req.body);
      res.status(201).json(partner);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updatePartner = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const partner = await this.partnerService.updatePartner(id, req.body);
      res.json(partner);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deletePartner = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.partnerService.deletePartner(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  private getErrorMessage = (error: unknown) => {
    return error instanceof (
      PrismaClientKnownRequestError || 
      PrismaClientUnknownRequestError ||
      PrismaClientRustPanicError ||
      PrismaClientInitializationError ||
      PrismaClientValidationError
    ) ? error.message : 'unknown error'
  };
}

export default PartnerController;
