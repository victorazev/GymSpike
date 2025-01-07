import { Router } from 'express';
import {
    createFriendList,
    getUserFriends,
    removeFriendList,
} from '../controllers/friendsList.controller';

const router = Router();

// Rota para criar uma nova lista de amigos
router.post('/:userId/friends', createFriendList);

// Rota para obter todas as listas de amigos de um usuário
router.get('/:userId/friend', getUserFriends);

// Rota para deletar uma lista de amigos
router.delete('/:userId/:friendListId/friends', removeFriendList);

export default router;
