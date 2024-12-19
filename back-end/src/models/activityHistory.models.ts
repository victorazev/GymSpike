//Schema do histórico de atividades do usuário

import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose

// Interface para o documento do Mongoose
// Definindo os campos que um documento de histórico de atividade pode ter
export interface UserActivityHistoryDocument extends Document {
	exerciseType: string;
	timestampStart: Date;
	timestampEnd: Date;
	score: number;
	avgHeartbeat?: number;
	estimatedCalories?: number;
	userReference: mongoose.Types.ObjectId;
}

// Definindo o schema do histórico de atividades, que será usado para criar o modelo de dados
const ActivityHistorySchema =
	new Schema<UserActivityHistoryDocument>({
		userReference: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserList',
			required: true,
		}, // Referência ao documento do usuário
		exerciseType: {
			type: String,
			enum: [
				'RUNNING',
				'WEIGHTLIFTING',
				'TREADMILL',
				'SWIMMING',
			],
			required: true,
		}, // Tipo do exercício realizado, obrigatório
		timestampStart: { type: Date, required: true }, // Data e hora do início do exercício, obrigatório
		timestampEnd: { type: Date, required: true }, // Data e hora do fim do exercício, obrigatório
		score: { type: Number, required: true }, // Métrica do exercício realizado, obrigatório
		avgHeartbeat: { type: Number, required: true }, // Média dos batimentos cardíacos
		estimatedCalories: { type: Number, required: true }, // Calorias estimadas na realização do exercício
	});

// Criação do modelo do Mongoose, com o nome 'activityHistory' e o schema definido
export const ActivityHistoryModel =
	mongoose.model<UserActivityHistoryDocument>(
		'ActivityHistory',
		ActivityHistorySchema,
	);
