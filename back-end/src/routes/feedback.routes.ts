import { Router } from 'express';
import { getActivities } from '../controllers/feedback.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Obter todas as atividades de um usuário
router.get('/:userId/feedback', authenticate, getActivities);

export default router;
