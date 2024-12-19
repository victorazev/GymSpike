import { ActivityHistoryModel } from '../models/activityHistory.models';
import { activityGoalsModel } from '../models/activityGoals.models';
import { UserListModel } from '../models/user.model'; // Ajuste o caminho conforme necessário

// Buscar atividades pelo ID do usuário
export const getActivityFeedback = async (userId: string) => {
	// Encontre o usuário pelo ID e retorne apenas o campo `activityGoals`
	const user = await UserListModel.findById(userId);

	const activityHistory = await ActivityHistoryModel.find({
		userReference: userId,
	});
	const activityGoals = await activityGoalsModel.find({
		userReference: userId,
	});

	if (!user) {
		throw new Error('User not found');
	}

	if (!activityGoals?.length || !activityHistory?.length) {
		// Verifica se há atividades registradas no objeto do usuário
		throw new Error(
			'Este usuário não possui atividades registradas',
		);
	}

	let atividadesRegistradas = activityHistory?.length || 0;
	atividadesRegistradas += activityGoals?.length || 0;

	let score = activityGoals?.reduce(
		(acc, cur) => acc + cur.score,
		0,
	);

	score += activityHistory?.reduce(
		(acc, cur) => acc + cur.score,
		0,
	);

	let feedback = {
		'Atividades realizadas:': atividadesRegistradas,
		'Score total': score,
	};

	// Retorne o histórico de atividades ou um array vazio
	return feedback;
};
