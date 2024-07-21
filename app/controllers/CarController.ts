import type { Request, Response } from 'express';
import CarService from '../services/CarService';
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class CarController {
  private carService: CarService;

  constructor(carService: CarService) {
    this.carService = carService;
  }

  getAllCars = async (_: Request, res: Response) => {
    try {
      const cars = await this.carService.getAllCars();
      const response: ApiResponse = {error: false, message: "getting cars successfully", data: cars};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getCarById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const car = await this.carService.getCarById(id);
      if (car) {
        const response: ApiResponse = {error: false, message: "getting car by id successfully", data: car};
        res.json(response);
      } else {
        const response: ApiResponse = { error: false, message: 'Car not found', data: null };
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createCar = async (req: Request, res: Response) => {
    try {
      const car = await this.carService.createCar(req.body);
      const response: ApiResponse = {error: false, message: "creating car successfully", data: car};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updateCar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const car = await this.carService.updateCar(id, req.body);
      const response: ApiResponse = {error: false, message: "updating car successfully", data: car};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deleteCar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.carService.deleteCar(id);
      const response: ApiResponse = {error: false, message: "deleting car successfully"};
      res.status(204).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default CarController;
