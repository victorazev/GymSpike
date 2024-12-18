import { ActivityHistoryModel, UserActivityHistoryDocument } from '../models/activity.model';
import { UserListModel } from '../models/user.model'; // Modelo de usuário

// Cria uma nova atividade e associa ao usuário
export const addActivity = async (
  userId: string,
  activityData: Partial<UserActivityHistoryDocument>
): Promise<UserActivityHistoryDocument> => {
  // Cria a atividade e vincula ao usuário
  const activity = await ActivityHistoryModel.create({
    ...activityData,
    userReference: userId,
  });

  // Atualiza a lista de atividades no usuário
  await UserListModel.findByIdAndUpdate(
    userId,
    { $push: { activityHistory: activity._id } },
    { new: true }
  );

  return activity;
};

// Busca todas as atividades de um usuário
export const getUserActivities = async (userId: string): Promise<UserActivityHistoryDocument[]> => {
  return await ActivityHistoryModel.find({ userReference: userId });
};

// Busca uma atividade específica por ID (com dados do usuário populados)
export const getActivityById = async (activityId: string): Promise<UserActivityHistoryDocument | null> => {
  return await ActivityHistoryModel.findById(activityId).populate('userReference', 'name email');
};
