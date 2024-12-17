import { Request, Response, NextFunction } from 'express';
import * as ActivityService from '../services/activity.service';

// Cria uma nova atividade
export const createActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, exerciseType, timestampStart, timestampEnd, score, avgHeartbeat, estimatedCalories } = req.body;

    if (!userId || !exerciseType || !timestampStart || !timestampEnd || score === undefined) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const activity = await ActivityService.addActivity(userId, {
      exerciseType,
      timestampStart,
      timestampEnd,
      score,
      avgHeartbeat,
      estimatedCalories,
    });

    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
};

// Busca todas as atividades de um usuário
export const getUserActivities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const activities = await ActivityService.getUserActivities(userId);
    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

// Busca uma atividade pelo ID
export const getActivityById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { activityId } = req.params;

    if (!activityId) {
      res.status(400).json({ message: 'Activity ID is required' });
      return;
    }

    const activity = await ActivityService.getActivityById(activityId);
    if (!activity) {
      res.status(404).json({ message: 'Activity not found' });
      return;
    }

    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
};
