import type { Request, Response } from "express";
import SalaryService from "../services/SalaryService";
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class SalaryController {
  private salaryService: SalaryService;

  constructor(salaryService: SalaryService) {
    this.salaryService = salaryService;
  }

  getAllSalaries = async (req: Request, res: Response) => {
    try {
      const { month, user_id } = req.query;
      const monthDate = new Date(month!.toString());
      let salaries;
      if (user_id) {
        salaries = await this.salaryService.getSalaryByUserMonth( parseInt(user_id.toString()), monthDate );
      } else {
        salaries = await this.salaryService.getAllSalaries(monthDate);
      }
      const response: ApiResponse = {error: false, message: "getting salaries successfully", data: salaries};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getSalaryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const salary = await this.salaryService.getSalaryById(id);
      if (salary) {
        const response: ApiResponse = {error: false, message: "getting salary by id successfully", data: salary};
        res.json(response);
      } else {
        const response: ApiResponse = {error: false, message: "salary not found", data: null};
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createSalary = async (req: Request, res: Response) => {
    try {
      const salary = await this.salaryService.createSalary(req.body);
      const response: ApiResponse = {error: false, message: "creating salary successfully", data: salary};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updateSalary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const salary = await this.salaryService.updateSalary(id, req.body);
      const response: ApiResponse = {error: false, message: "update salary successfully", data: salary};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deleteSalary = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.salaryService.deleteSalary(id);
      const response: ApiResponse = {error: false, message: "deleting salary successfully"};
      res.status(204).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default SalaryController;
