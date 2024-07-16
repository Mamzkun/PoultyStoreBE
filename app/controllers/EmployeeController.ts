import type { Request, Response } from "express";
import EmployeeService from "../services/EmployeeService";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  getAllEmployees = async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      const employee = await this.employeeService.getAllEmployees(
        status!.toString()
      );
      res.json(employee);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getEmployeeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const employee = await this.employeeService.getEmployeeById(id);
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createEmployee = async (req: Request, res: Response) => {
    try {
      const employee = await this.employeeService.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updateEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const employee = await this.employeeService.updateEmployee(id, req.body);
      res.json(employee);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deleteEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.employeeService.deleteEmployee(id);
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

export default EmployeeController;
