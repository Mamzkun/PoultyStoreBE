import type { Request, Response } from "express";
import WageService from "../services/WageService";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

class WageController {
  private wageService: WageService;

  constructor(wageService: WageService) {
    this.wageService = wageService;
  }

  getAllWages = async (req: Request, res: Response) => {
    try {
      const wages = await this.wageService.getAllWages();
      res.json(wages);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getWageById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const wage = await this.wageService.getWageById(id);
      if (wage) {
        res.json(wage);
      } else {
        res.status(404).json({ message: "Wage not found" });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createWage = async (req: Request, res: Response) => {
    try {
      const wage = await this.wageService.createWage(req.body);
      res.status(201).json(wage);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updateWage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const wage = await this.wageService.updateWage(id, req.body);
      res.json(wage);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deleteWage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.wageService.deleteWage(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  private getErrorMessage = (error: unknown) => {
    return error instanceof
      (PrismaClientKnownRequestError ||
        PrismaClientUnknownRequestError ||
        PrismaClientRustPanicError ||
        PrismaClientInitializationError ||
        PrismaClientValidationError)
      ? error.message
      : "unknown error";
  };
}

export default WageController;
