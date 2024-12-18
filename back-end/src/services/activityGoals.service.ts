import {
	activityGoalsModel,
	UserActivityGoalsDocument,
} from '../models/activityGoals.models';
import { UserListModel } from '../models/user.model'; // Ajuste o caminho conforme necessário

// Adicionar uma nova atividade ao histórico de um usuário
export const addActivityGoals = async (
	userId: string,
	activityData: Partial<UserActivityGoalsDocument>,
) => {
	const activity = new activityGoalsModel(activityData);

	// Encontre o usuário pelo ID
	const user = await UserListModel.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}

	// Garante que o campo activityHistory seja um array
	if (!user.activityGoals) {
		user.activityGoals = [];
	}

	// Adicione a nova atividade ao campo `activityGoals`
	user.activityGoals.push(activity);
	await user.save();

	return activity;
};

// Buscar atividades pelo ID do usuário
export const getAllActivitiyGoalsByUser = async (
	userId: string,
) => {
	// Encontre o usuário pelo ID e retorne apenas o campo `activityGoals`
	const user = await UserListModel.findById(userId).select(
		'activityGoals',
	);
	if (!user) {
		throw new Error('User not found');
	}

	// Retorne o histórico de atividades ou um array vazio
	return user.activityGoals || [];
};

export const updateActivityGoals = async (
	userId: string,
	activityId: string,
	activityData: Partial<UserActivityGoalsDocument>,
) => {
	const user = await UserListModel.findById(userId); // Busca pelo usuário informado

	if (!user) {
		// Verifica se o usuário existe
		throw new Error('User not found');
	}

	if (user.activityGoals?.length == 0) {
		// Verifica se há atividades registradas no objeto do usuário
		throw new Error(
			'Este usuário não possui atividades registradas',
		);
	}

	let activity = user.activityGoals?.find(
		// Procura pela atividade informada dentro do objeto do usuário
		(activity) => activity._id.toString() === activityId,
	);

	if (!activity) {
		// Verifica se existe a tividade com o Id informado
		throw new Error('Esta atividade não existe');
	}

	activity = { ...activity, ...activityData };
	// Manipula a atividade obtida através do banco, sobrescrevendo os dados novos

	user.activityGoals = user.activityGoals?.filter(
		// Retira a atividade desatualizada
		(activity) => activity._id.toString() !== activityId,
	);

	user.activityGoals?.push(activity);
	// Adiciona a atividade atualizada

	await user.save();
	//Salva no banco de dados

	return activity;
};

export const deleteActivityGoals = async (
	userId: string,
	activityId: string,
) => {
	const user = await UserListModel.findById(userId); // Busca pelo usuário informado

	if (!user) {
		// Verifica se o usuário existe
		throw new Error('User not found');
	}

	if (user.activityGoals?.length == 0) {
		// Verifica se há atividades registradas no objeto do usuário
		throw new Error(
			'Este usuário não possui atividades registradas',
		);
	}

	let activity = user.activityGoals?.find(
		// Procura pela atividade informada dentro do objeto do usuário
		(activity) => activity._id.toString() === activityId,
	);

	if (!activity) {
		// Verifica se existe a tividade com o Id informado
		throw new Error('Esta atividade não existe');
	}

	const deletion = (user.activityGoals =
		user.activityGoals?.filter(
			(activity) => activity._id.toString() !== activityId,
		));

	await user.save();

	return deletion;
};
