import { Router } from 'express';
import { createActivity, getActivities, editActivity, removeActivity } from '../controllers/activity.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Adicionar uma nova atividade
router.post('/:userId/activities', authenticate, createActivity);

// Obter todas as atividades de um usuário
router.get('/:userId/activities', authenticate, getActivities);

// Atualizar uma atividade específica
router.put('/:userId/activities/:activityId', authenticate, editActivity);

// Excluir uma atividade específica
router.delete('/activities/:activityId', authenticate, removeActivity);

export default router;
