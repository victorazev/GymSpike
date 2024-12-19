import { Router } from 'express';
import {
	createActivity,
	getActivityGoals,
	editActivityGoals,
	removeActivityGoals,
} from '../controllers/activityGoals.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Adicionar uma nova atividade
router.post(
	'/:userId/activityGoals',
	authenticate,
	createActivity,
);

// Obter todas as atividades de um usuário
router.get(
	'/:userId/activityGoals',
	authenticate,
	getActivityGoals,
);

// Atualizar uma atividade específica
router.put(
	'/:userId/activityGoals/:activityId',
	authenticate,
	editActivityGoals,
);

// Excluir uma atividade específica
router.delete(
	'/:userId/activityGoals/:activityId',
	authenticate,
	removeActivityGoals,
);

export default router;
