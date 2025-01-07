import mongoose from 'mongoose';
import { UserListModel } from '../models/user.model';
import { friendsListModel } from '../models/friendsList.models';

export const addFriendList = async (userId: string, friendData: any) => {
    // Cria uma nova lista de amigos
    const friendList = await friendsListModel.create(friendData);
  
    // Busca o usuário pelo ID
    const user = await UserListModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    // Inicializa a lista de amigos se não existir
    if (!user.friends) {
      user.friends = [];
    }
  
    // Adiciona o ID da lista de amigos ao campo `friends`
    user.friends.push(friendList._id as mongoose.Types.ObjectId);
    await user.save();
  
    return friendList;
  };

export const getFriendsByUserId = async (userId: string) => {
  const user = await UserListModel.findById(userId).populate('friends');
  if (!user) {
    throw new Error('User not found');
  }

  return user.friends;
};

export const deleteFriendList = async (userId: string, friendListId: string) => {
  const user = await UserListModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Remove o ID da lista de amigos
  user.friends = user.friends?.filter(
    (id) => id.toString() !== friendListId
  );
  await user.save();

  const deletedFriendList = await friendsListModel.findByIdAndDelete(friendListId);
  if (!deletedFriendList) {
    throw new Error('Friend list not found');
  }

  return deletedFriendList;
};
