//Schema do histórico de metas do usuário

import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose

// Interface para o documento do Mongoose
// Definindo os campos que um documento de histórico de metas pode ter
export interface UserActivityGoalsDocument extends Document {
	goalsAchieved?: any[];
	timestampStart: Date;
	timestampEnd: Date;
	score: number;
}

// Definindo o schema do histórico de metas, que será usado para criar o modelo de dados
const activityGoalsSchema =
	new Schema<UserActivityGoalsDocument>({
		goalsAchieved: { type: Array, default: [] }, // Grupos do usuário, padrão é um array vazio.
		timestampStart: { type: Date, required: true }, // Data e hora do início da meta, obrigatório
		timestampEnd: { type: Date, required: true }, // Data e hora do fim da meta, obrigatório
		score: { type: Number, required: true }, // Métrica do exercício realizado, obrigatório
	});

// Criação do modelo do Mongoose, com o nome 'activityGoals' e o schema definido
export const activityGoalsModel =
	mongoose.model<UserActivityGoalsDocument>(
		'activityGoals',
		activityGoalsSchema,
	);
