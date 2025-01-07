import { Request, Response } from 'express';
import {
    addFriendList,
    getFriendsByUserId,
    deleteFriendList,
} from '../services/friendList.service';

// Adicionar uma nova lista de amigos
export const createFriendList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const friendData = req.body;

    try {
        const newFriendList = await addFriendList(userId, friendData);
        res.status(201).json({ message: 'Friend list added', data: newFriendList });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Obter todas as listas de amigos de um usuário
export const getUserFriends = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const friends = await getFriendsByUserId(userId);
        res.status(200).json({ data: friends });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Excluir uma lista de amigos
export const removeFriendList = async (req: Request, res: Response) => {
    const { userId, friendListId } = req.params;

    try {
        const deletedFriendList = await deleteFriendList(userId, friendListId);
        res.status(200).json({ message: 'Friend list deleted', data: deletedFriendList });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
