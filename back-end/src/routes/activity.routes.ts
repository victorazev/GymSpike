import { Router } from 'express';
import { createActivity, getUserActivities, getActivityById } from '../controllers/activity.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Adicionar uma nova atividade
router.post('/:userId/activities', authenticate, createActivity);

// Obter todas as atividades de um usuário
router.get('/:userId/activities', authenticate, getUserActivities);

// Obter atividade pelo id da atividade
router.get('/:userId/activities/:activityId', authenticate, getActivityById);

export default router;
