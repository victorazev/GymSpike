import { Request, Response } from 'express';
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
) => {
	try {
		const { userId } = req.params; // ID do usuário (passado na rota)
		const activityData = req.body; // Dados da atividade

		const activity = await addActivityGoals(
			userId,
			activityData,
		);
		res.status(201).json({
			message: 'Activity created successfully',
			activity,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to create activity' });
	}
};

// Controlador para buscar atividades de um usuário
export const getActivityGoals = async (
	req: Request,
	res: Response,
) => {
	try {
		const { userId } = req.params; // ID do usuário

		const activities = await getAllActivitiyGoalsByUser(userId);
		res.status(200).json({ activities });
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Failed to retrieve activities' });
	}
};

export const editActivityGoals = async (
	req: Request,
	res: Response,
) => {
	try {
		const { userId, activityId } = req.params; // ID do usuário e da atividade
		const activityData = req.body; // Dados para atualizar

		const updatedActivity = await updateActivityGoals(
			userId,
			activityId,
			activityData,
		);
		res.status(200).json({
			message: 'Activity updated successfully',
			updatedActivity,
		});
	} catch (error: any) {
		res.status(500).json({
			error: error.message || 'Failed to update activity',
		});
	}
};

// Controlador para excluir uma atividade
export const removeActivityGoals = async (
	req: Request,
	res: Response,
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
		res
			.status(500)
			.json({ error: 'Failed to delete activity' });
	}
};
