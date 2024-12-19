import { Request, Response, NextFunction } from 'express';
import {
	addActivityGoals,
	getAllActivitiyGoalsByUser,
	updateActivityGoals,
	deleteActivityGoals,
} from '../services/activityGoals.service';

// Controlador para adicionar uma nova atividade
export const createActivity = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			userId,
			goalsAchieved,
			timestampStart,
			timestampEnd,
			score,
		} = req.body;

		if (!userId || !timestampStart || !timestampEnd || !score) {
			res
				.status(400)
				.json({ message: 'Missing required fields' });
			return;
		}

		const newActivity = await addActivityGoals(userId, {
			goalsAchieved,
			timestampStart,
			timestampEnd,
			score,
		});

		res.status(201).json(newActivity);
	} catch (error) {
		next(error);
	}
};

// Controlador para buscar atividades de um usuário
export const getActivityGoals = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			res.status(400).json({ message: 'User ID is required' });
			return;
		}

		const activities = await getAllActivitiyGoalsByUser(userId);

		res.status(200).json(activities);
	} catch (error) {
		next(error);
	}
};

export const editActivityGoals = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId, activityId } = req.params; // ID do usuário e da atividade
		const {
			goalsAchieved,
			timestampStart,
			timestampEnd,
			score,
		} = req.body;

		const updatedActivity = await updateActivityGoals(
			userId,
			activityId,
			{
				goalsAchieved,
				timestampStart,
				timestampEnd,
				score,
			},
		);

		res.status(200).json({
			message: 'Activity updated successfully',
			updatedActivity,
		});
	} catch (error) {
		next(error);
	}
};

// Controlador para excluir uma atividade
export const removeActivityGoals = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId, activityId } = req.params; // ID da atividade

		const deletedActivity = await deleteActivityGoals(
			userId,
			activityId,
		);
		if (!deletedActivity) {
			res.status(404).json({ error: 'Activity not found' });
			return;
		}

		res
			.status(200)
			.json({ message: 'Activity deleted successfully' });
	} catch (error) {
		next(error);
	}
};
