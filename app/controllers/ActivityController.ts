import type { Request, Response } from "express";
import ActivityService from "../services/ActivityService";
import type {ApiResponse, generalError} from "../helpers/typeHelper.ts";

class ActivityController {
  private activityService: ActivityService;

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  getAllActivities = async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
      const formattedDate = new Date(date!.toString());
      const activities = await this.activityService.getAllActivities(
        formattedDate
      );
      const response: ApiResponse = {error: false, message: "getting activities successfully", data: activities};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  getActivityById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const activity = await this.activityService.getActivityById(id);
      if (activity) {
        const response: ApiResponse = {error: false, message: "getting activity by id successfully", data: activity};
        res.json(response);
      } else {
        const response: ApiResponse = { error: false, message: "Activity not found", data: null };
        res.status(404).json(response);
      }
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  createActivity = async (req: Request, res: Response) => {
    try {
      const activity = await this.activityService.createActivity(req.body);
      const response: ApiResponse = {error: false, message: "creating new activity successfully", data: activity};
      res.status(201).json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  updateActivity = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const activity = await this.activityService.updateActivity(id, req.body);
      const response: ApiResponse = {error: false, message: "updating activity successfully", data: activity};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };

  deleteActivity = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      await this.activityService.deleteActivity(id);
      const response: ApiResponse = {error: false, message: "deleting activity successfully"};
      res.json(response);
    } catch (error) {
      const e = error as generalError;
      const response: ApiResponse = {error: true, message: e.message};
      res.status(500).json(response);
    }
  };
}

export default ActivityController;
