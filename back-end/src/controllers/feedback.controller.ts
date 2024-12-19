import { NextFunction, Request, Response } from 'express';
import {
	getActivityFeedback,
	getActivityAnalisys,
} from '../services/feedback.service';

// Controlador para buscar atividades de um usuário
export const getActivities = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params; // ID do usuário

		const feedback = await getActivityFeedback(userId);

		res.status(200).json({ feedback });
	} catch (error) {
		next(error);
	}
};

export const getAnalisys = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.params; // ID do usuário

		const feedback = await getActivityAnalisys(userId);

		res.status(200).json({ feedback });
	} catch (error) {
		next(error);
	}
};
