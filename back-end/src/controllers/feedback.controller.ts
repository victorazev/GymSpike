import { Request, Response } from 'express';
import { getActivityFeedback } from '../services/feedback.service';

// Controlador para buscar atividades de um usuário
export const getActivities = async (
	req: Request,
	res: Response,
) => {
	try {
		const { userId } = req.params; // ID do usuário

		const feedback = await getActivityFeedback(userId);

		res.status(200).json({ feedback });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: `${error}` });
	}
};
