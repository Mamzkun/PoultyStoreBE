import type { Request, Response } from "express";
import ActivityService from "../services/ActivityService";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

class ActivityController {
  private activityService: ActivityService;

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  getAllActivitys = async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
      const formattedDate = new Date(date!.toString());
      const activitys = await this.activityService.getAllActivitys(
        formattedDate
      );
      res.json(activitys);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  getActivityById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const activity = await this.activityService.getActivityById(id);
      if (activity) {
        res.json(activity);
      } else {
        res.status(404).json({ message: "Activity not found" });
      }
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  createActivity = async (req: Request, res: Response) => {
    try {
      const activity = await this.activityService.createActivity(req.body);
      res.status(201).json(activity);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  updateActivity = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const activity = await this.activityService.updateActivity(id, req.body);
      res.json(activity);
    } catch (error) {
      const errorMessage = this.getErrorMessage(error);
      res.status(500).json({ error: errorMessage });
    }
  };

  deleteActivity = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.activityService.deleteActivity(id);
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

export default ActivityController;
