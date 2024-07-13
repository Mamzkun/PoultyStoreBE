import type { Request, Response } from 'express';
import TripService from '../services/TripService';
import { 
  PrismaClientInitializationError, 
  PrismaClientKnownRequestError, 
  PrismaClientRustPanicError, 
  PrismaClientUnknownRequestError, 
  PrismaClientValidationError 
} from '@prisma/client/runtime/library';

class TripController {
  private tripService: TripService;

  constructor(tripService: TripService) {
    this.tripService = tripService;
  }

  getAllTrips = async (req: Request, res: Response) => {
    try {
      const trips = await this.tripService.getAllTrips();
      res.json(trips);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getTripById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const trip = await this.tripService.getTripById(id);
      if (trip) {
        res.json(trip);
      } else {
        res.status(404).json({ message: 'Trip not found' });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createTrip = async (req: Request, res: Response) => {
    try {
      const trip = await this.tripService.createTrip(req.body);
      res.status(201).json(trip);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updateTrip = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const trip = await this.tripService.updateTrip(id, req.body);
      res.json(trip);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deleteTrip = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.tripService.deleteTrip(id);
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

export default TripController;
