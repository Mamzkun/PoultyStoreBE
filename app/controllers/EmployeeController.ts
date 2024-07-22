import type { Request, Response } from "express";
import EmployeeService from "../services/EmployeeService";
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  getAllEmployees = async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      const employee = await this.employeeService.getAllEmployees(status!.toString());
      const response: ApiResponse = {error: false, message: "getting employees successfully", data: employee};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getEmployeeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const employee = await this.employeeService.getEmployeeById(id);
      if (employee) {
        const response: ApiResponse = {error: false, message: "getting employee by id successfully", data: employee};
        res.json(response);
      } else {
        const response: ApiResponse = { error: false, message: "Employee not found", data: null };
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createEmployee = async (req: Request, res: Response) => {
    try {
      const employee = await this.employeeService.createEmployee(req.body);
      const response: ApiResponse = {error: false, message: "creating new employee successfully", data: employee};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updateEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const employee = await this.employeeService.updateEmployee(id, req.body);
      const response: ApiResponse = {error: false, message: "updating employee successfully", data: employee};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deleteEmployee = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.employeeService.deleteEmployee(id);
      const response: ApiResponse = {error: false, message: "deleting data successfully"};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default EmployeeController;
