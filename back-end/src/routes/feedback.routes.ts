import { Router } from 'express';
import {
	getActivities,
	getAnalisys,
} from '../controllers/feedback.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Obter feedback de atividade do usuário
router.get('/:userId/feedback', authenticate, getActivities);

// Obter análise de atividade do usuário
router.get('/:userId/analysis', authenticate, getAnalisys);

export default router;
