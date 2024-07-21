import type { Request, Response } from "express";
import WageService from "../services/WageService";
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class WageController {
  private wageService: WageService;

  constructor(wageService: WageService) {
    this.wageService = wageService;
  }

  getAllWages = async (_: Request, res: Response) => {
    try {
      const wages = await this.wageService.getAllWages();
      const response: ApiResponse = {error: false, message: "getting wages successfully", data: wages};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getWageById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const wage = await this.wageService.getWageById(id);
      if (wage) {
        const response: ApiResponse = {error: false, message: "getting wage by id successfully", data: wage};
        res.json(response);
      } else {
        const response: ApiResponse = {error: false, message: "wage not found", data: null};
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createWage = async (req: Request, res: Response) => {
    try {
      const wage = await this.wageService.createWage(req.body);
      const response: ApiResponse = {error: false, message: "creating wage successfully", data: wage};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updateWage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const wage = await this.wageService.updateWage(id, req.body);
      const response: ApiResponse = {error: false, message: "updating wage successfully", data: wage};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deleteWage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.wageService.deleteWage(id);
      const response: ApiResponse = {error: false, message: "deleting wage successfully", data: null};
      res.status(204).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default WageController;
