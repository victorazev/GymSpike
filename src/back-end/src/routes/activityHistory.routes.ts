import { Router } from 'express';
import {
	createActivity,
	getUserActivities,
	getActivityById,
	getUserRangeActivities,
} from '../controllers/activityHistory.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Adicionar uma nova atividade
router.post(
	'/:userId/activities',
	authenticate,
	createActivity,
);

// Obter todas as atividades de um usuário
router.get(
	'/:userId/activities',
	authenticate,
	getUserActivities,
);

// Obter limitadas atividades de um usuário
router.get(
	'/:userId/activities/filter/:range',
	authenticate,
	getUserRangeActivities,
);

// Obter atividade pelo id da atividade
router.get(
	'/:userId/activities/:activityId',
	authenticate,
	getActivityById,
);

export default router;
