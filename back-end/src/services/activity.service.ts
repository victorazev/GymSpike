import { ActivityHistoryModel, UserActivityHistoryDocument } from '../models/activity.model';
import { UserListModel } from '../models/user.model'; // Ajuste o caminho conforme necessário
import { Types } from 'mongoose';


// Adicionar uma nova atividade ao histórico de um usuário
export const addActivity = async (userId: string, activityData: Partial<UserActivityHistoryDocument>) => {
  const activity = new ActivityHistoryModel(activityData);

  // Encontre o usuário pelo ID
  const user = await UserListModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Garante que o campo activityHistory seja um array
  if (!user.activityHistory) {
    user.activityHistory = [];
  }

  // Adicione a nova atividade ao campo `activityHistory`
  user.activityHistory.push(activity);
  await user.save();

  return activity;
};

// Buscar atividades pelo ID do usuário
export const getActivitiesByUser = async (userId: string) => {
  // Encontre o usuário pelo ID e retorne apenas o campo `activityHistory`
  const user = await UserListModel.findById(userId).select('activityHistory');
  if (!user) {
    throw new Error('User not found');
  }

  // Retorne o histórico de atividades ou um array vazio
  return user.activityHistory || [];
};

// Atualizar uma atividade pelo ID
export const updateActivity = async (
  userId: string,
  activityId: string,
  activityData: Partial<UserActivityHistoryDocument>
) => {
  // Encontre o usuário pelo ID
  const user = await UserListModel.findById(userId).populate('activityHistory');
  if (!user) {
    throw new Error('User not found');
  }

  // Garante que o campo activityHistory seja um array
  if (!user.activityHistory) {
    user.activityHistory = [];
  }

  // Encontre a atividade que queremos atualizar dentro de activityHistory
  const activity = user.activityHistory.find(a => a._id.toString() === activityId);
  if (!activity) {
    throw new Error('Activity not found');
  }

  // Atualize os campos da atividade
  Object.assign(activity, activityData);

  // Atualizar diretamente a atividade na coleção ActivityHistory
  await ActivityHistoryModel.findByIdAndUpdate(activityId, activityData, { new: true });

  // Salve o usuário com a atividade atualizada
  await user.save();

  // Retorne a atividade atualizada
  return activity;
};

// Excluir uma atividade pelo ID
export const deleteActivity = async (activityId: string) => {
  return await ActivityHistoryModel.findByIdAndDelete(activityId); // Exclui a atividade
};
