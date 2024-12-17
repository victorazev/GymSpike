import { UserListModel } from '../models/user.model'; // Ajuste o caminho conforme necessário

// Buscar atividades pelo ID do usuário
export const getActivityFeedback = async (userId: string) => {
	// Encontre o usuário pelo ID e retorne apenas o campo `activityGoals`
	const user = await UserListModel.findById(userId);
	if (!user) {
		throw new Error('User not found');
	}

	if (
		!user.activityGoals?.length ||
		!user.activityHistory?.length
	) {
		// Verifica se há atividades registradas no objeto do usuário
		throw new Error(
			'Este usuário não possui atividades registradas',
		);
	}

	let atividadesRegistradas = user.activityHistory?.length || 0;
	atividadesRegistradas += user.activityGoals?.length || 0;

	let score = user.activityGoals?.reduce(
		(acc, cur) => acc + cur.score,
		0,
	);

	score += user.activityHistory?.reduce(
		(acc, cur) => acc + cur.score,
		0,
	);

	console.log(score);
	let feedback = {
		'Atividades realizadas:': atividadesRegistradas,
		'Score total': score,
	};

	// Retorne o histórico de atividades ou um array vazio
	return feedback;
};
