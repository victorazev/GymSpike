import { ActivityHistoryModel } from '../models/activityHistory.models';
import { activityGoalsModel } from '../models/activityGoals.models';
import { UserListModel } from '../models/user.model'; // Ajuste o caminho conforme necessário

// Buscar atividades pelo ID do usuário
export const getActivityFeedback = async (userId: string) => {
	// Procura o usuário e seus documentos respectivos
	const user = await UserListModel.findById(userId);
	const activityHistory = await ActivityHistoryModel.find({
		userReference: userId,
	});
	const activityGoals = await activityGoalsModel.find({
		userReference: userId,
	});

	// Verifica se o usuário existe
	if (!user) {
		throw new Error('User not found');
	}

	// Verifica se há atividades registradas no objeto do usuário
	if (!activityGoals?.length || !activityHistory?.length) {
		throw new Error(
			'Este usuário não possui atividades registradas',
		);
	}

	let atividadesRegistradas = activityHistory?.length || 0;
	atividadesRegistradas += activityGoals?.length || 0;

	// Calcula os valores dos scores
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

export const getActivityAnalisys = async (userId: string) => {
	// Procura o usuário e seus documentos respectivos
	const user = await UserListModel.findById(userId);
	const activityHistory = await ActivityHistoryModel.find({
		userReference: userId,
	});
	const activityGoals = await activityGoalsModel.find({
		userReference: userId,
	});

	//Veriica se há usuário
	if (!user) {
		throw new Error('User not found');
	}

	// Verifica se há atividades registradas no objeto do usuário
	if (!activityGoals?.length || !activityHistory?.length) {
		throw new Error(
			'Este usuário não possui atividades registradas',
		);
	}

	// Faz análise com o score das três ultimas atividades realizadas
	const historyAnalisys =
		activityHistory?.length < 2
			? 'O usuário ainda nao possui histórico de atividades suficiente para uma análise'
			: `Sua média nas ultimas 3 atividades realizadas teve um score de ${
					(activityHistory[activityHistory.length - 1].score +
						activityHistory[activityHistory.length - 2].score +
						activityHistory[activityHistory.length - 3].score) /
					3
			  } pontos.`;

	const score =
		activityGoals[activityGoals.length - 1].score -
		activityGoals[activityGoals.length - 2].score;

	// Realizda análise com o score das duas ultimas metas realizadas
	const goalsAnalysis =
		activityHistory?.length > 1
			? `Você ${
					score > 0 ? 'melhorou' : 'piorou'
			  } ${score} pontos de score (${
					activityGoals[activityGoals.length - 2].score
			  } para ${
					activityGoals[activityGoals.length - 1].score
			  }). ${
					score > 0
						? 'Parabéns! Continue assim para alcançar seus objetvos!'
						: 'Esforce-se mais para obter resultados.'
			  }`
			: 'O usuário ainda nao possui histórico de metas suficiente para uma análise';

	const analise = {
		historico: historyAnalisys,
		metas: goalsAnalysis,
	};

	// Retorne o histórico de atividades ou um array vazio
	return analise;
};
