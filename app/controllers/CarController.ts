import type { Request, Response } from 'express';
import CarService from '../services/CarService';
import { 
  PrismaClientInitializationError, 
  PrismaClientKnownRequestError, 
  PrismaClientRustPanicError, 
  PrismaClientUnknownRequestError, 
  PrismaClientValidationError 
} from '@prisma/client/runtime/library';

class CarController {
  private carService: CarService;

  constructor(carService: CarService) {
    this.carService = carService;
  }

  getAllCars = async (res: Response) => {
    try {
      const cars = await this.carService.getAllCars();
      res.json(cars);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getCarById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const car = await this.carService.getCarById(id);
      if (car) {
        res.json(car);
      } else {
        res.status(404).json({ message: 'Car not found' });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createCar = async (req: Request, res: Response) => {
    try {
      const car = await this.carService.createCar(req.body);
      res.status(201).json(car);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updateCar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const car = await this.carService.updateCar(id, req.body);
      res.json(car);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deleteCar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.carService.deleteCar(id);
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
  }
}

export default CarController;
