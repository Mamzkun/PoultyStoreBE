import type { Request, Response } from 'express';
import SalaryService from '../services/SalaryService';
import { 
  PrismaClientInitializationError, 
  PrismaClientKnownRequestError, 
  PrismaClientRustPanicError, 
  PrismaClientUnknownRequestError, 
  PrismaClientValidationError 
} from '@prisma/client/runtime/library';

class SalaryController {
  private salaryService: SalaryService;

  constructor(salaryService: SalaryService) {
    this.salaryService = salaryService;
  }

  getAllSalarys = async (req: Request, res: Response) => {
    try {
      const salarys = await this.salaryService.getAllSalarys();
      res.json(salarys);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getSalaryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const salary = await this.salaryService.getSalaryById(id);
      if (salary) {
        res.json(salary);
      } else {
        res.status(404).json({ message: 'Salary not found' });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createSalary = async (req: Request, res: Response) => {
    try {
      const salary = await this.salaryService.createSalary(req.body);
      res.status(201).json(salary);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updateSalary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const salary = await this.salaryService.updateSalary(id, req.body);
      res.json(salary);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deleteSalary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.salaryService.deleteSalary(id);
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

export default SalaryController;
