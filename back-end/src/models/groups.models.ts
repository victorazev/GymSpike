//Schema da colecao dos grupos

import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose

// Interface para o documento do Mongoose
// Definindo os campos que um documento de grupos pode ter
export interface UserGroupListDocument extends Document {
	createdBy?: any[];
	createdAt: Date;
	members?: any[];
}

// Definindo o schema da lista de amigos, que será usado para criar o modelo de dados
const groupListSchema = new Schema<UserGroupListDocument>({
	createdBy: { type: Array }, // Referência ao documento do usuário que criou o grupo, padrão é um array vazio.
	createdAt: { type: Date, required: true }, // Data e hora da criação do grupo, obrigatório
	members: { type: Array, default: [] }, // Referência a coleção de usuários pertencentes ao grupo, padrão é um array vazio.
});

// Criação do modelo do Mongoose, com o nome 'groupList' e o schema definido
export const groupListModel =
	mongoose.model<UserGroupListDocument>(
		'groupList',
		groupListSchema,
	);
