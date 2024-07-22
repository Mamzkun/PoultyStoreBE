import type { Request, Response } from 'express';
import TripService from '../services/TripService';
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class TripController {
  private tripService: TripService;

  constructor(tripService: TripService) {
    this.tripService = tripService;
  }

  getAllTrips = async (_: Request, res: Response) => {
    try {
      const trips = await this.tripService.getAllTrips();
      const response: ApiResponse = {error: false, message: "getting trips successfully", data: trips};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getTripById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const trip = await this.tripService.getTripById(id);
      if (trip) {
        const response: ApiResponse = {error: false, message: "getting salary by id successfully", data: trip};
        res.json(response);
      } else {
        const response: ApiResponse = {error: false, message: "trip not found", data: null};
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createTrip = async (req: Request, res: Response) => {
    try {
      const trip = await this.tripService.createTrip(req.body);
      const response: ApiResponse = {error: false, message: "creating data successfully", data: trip};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updateTrip = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const trip = await this.tripService.updateTrip(id, req.body);
      const response: ApiResponse = {error: false, message: "updating trip successfully", data: trip};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deleteTrip = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.tripService.deleteTrip(id);
      const response: ApiResponse = {error: false, message: "deleting trip successfully"};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default TripController;
