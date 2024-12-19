import {
	activityGoalsModel,
	UserActivityGoalsDocument,
} from '../models/activityGoals.models';
import { UserListModel } from '../models/user.model'; // Ajuste o caminho conforme necessário

// Adicionar uma nova atividade ao histórico de um usuário
export const addActivityGoals = async (
	userId: string,
	activityData: Partial<UserActivityGoalsDocument>,
): Promise<UserActivityGoalsDocument> => {
	// Encontre o usuário pelo ID
	const user = await UserListModel.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}

	// Cria a atividade e vincula ao usuário
	const newActivity = await activityGoalsModel.create({
		...activityData,
		userReference: userId,
	});
	console.log(userId);
	console.log(newActivity);

	// Atualiza a lista de atividades no usuário
	await UserListModel.findByIdAndUpdate(
		userId,
		{ $push: { activityGoals: newActivity._id } },
		{ new: true },
	);

	return newActivity;
};

// Buscar atividades pelo ID do usuário
export const getAllActivitiyGoalsByUser = async (
	userId: string,
): Promise<UserActivityGoalsDocument[]> => {
	// Encontre o usuário pelo ID e retorne apenas o campo `activityGoals`
	const user = await UserListModel.findById(userId).select(
		'activityGoals',
	);
	if (!user) {
		throw new Error('User not found');
	}

	// Retorna o histórico de atividades
	return await activityGoalsModel.find({
		userReference: userId,
	});
};

export const updateActivityGoals = async (
	userId: string,
	activityId: string,
	activityData: Partial<UserActivityGoalsDocument>,
) => {
	const user = await UserListModel.findById(userId); // Busca pelo usuário informado
	// Verifica se o usuário existe
	if (!user) {
		throw new Error('User not found');
	}

	// Busca pela atividade informada
	const activity = await activityGoalsModel.findById(
		activityId,
	);
	// Verifica se a atividade informada existe
	if (!activity) {
		throw new Error('Activity not found');
	}

	// Busca a atividade e atauliza
	await activityGoalsModel.findByIdAndUpdate(
		activityId,
		{ ...activityData },
		{ new: true },
	);

	return { activityData };
};

export const deleteActivityGoals = async (
	userId: string,
	activityId: string,
) => {
	const user = await UserListModel.findById(userId); // Busca pelo usuário informado
	// Verifica se o usuário existe
	if (!user) {
		throw new Error('User not found');
	}

	// Busca pela atividade informada
	const activity = await activityGoalsModel.findById(
		activityId,
	);
	// Verifica se a atividade informada existe
	if (!activity) {
		throw new Error('Activity not found');
	}

	// Busca a atividade e deleta
	await activityGoalsModel.findByIdAndDelete(activityId);

	// Deleta a atividade dentro do documento do usuário
	const deletion = (user.activityGoals =
		user.activityGoals?.filter(
			(activity) => activity._id.toString() !== activityId,
		));

	await user.save();

	return deletion;
};
