import type { Request, Response } from 'express';
import PartnerService from '../services/PartnerService';
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class PartnerController {
  private partnerService: PartnerService;

  constructor(partnerService: PartnerService) {
    this.partnerService = partnerService;
  }

  getAllPartners = async (_: Request, res: Response) => {
    try {
      const partners = await this.partnerService.getAllPartners();
      const response: ApiResponse = {error: false, message: "getting partners successfully", data: partners};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getPartnerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const partner = await this.partnerService.getPartnerById(id);
      if (partner) {
        const response: ApiResponse = {error: false, message: "getting partner by id successfully", data: partner};
        res.json(response);
      } else {
        const response: ApiResponse = {error: false, message: "partner not found", data: null};
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createPartner = async (req: Request, res: Response) => {
    try {
      const partner = await this.partnerService.createPartner(req.body);
      const response: ApiResponse = {error: false, message: "creating new partner successfully", data: partner};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updatePartner = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const partner = await this.partnerService.updatePartner(id, req.body);
      const response: ApiResponse = {error: false, message: "updating partner successfully", data: partner};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deletePartner = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.partnerService.deletePartner(id);
      const response: ApiResponse = {error: false, message: "deleting partner successfully"};
      res.status(204).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default PartnerController;
