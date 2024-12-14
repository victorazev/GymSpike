//Schema da colecao de lista dos membros do grupo

import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose

// Interface para o documento do Mongoose
// Definindo os campos que um documento de lista de membros pode ter
export interface GroupMembersListDocument extends Document {
	addedAt: Date;
	addedBy?: any[];
	userReference?: any[];
}

// Definindo o schema da lista de membros, que será usado para criar o modelo de dados
const groupMembersListSchema =
	new Schema<GroupMembersListDocument>({
		addedAt: { type: Date, required: true }, // Data e hora do início da conexão, obrigatório
		addedBy: { type: Array, default: [] }, // Referência ao documento do usuário adicionador, padrão é um array vazio.
		userReference: { type: Array, default: [] }, // Referência ao documento do usuário adicionado, padrão é um array vazio.
	});

// Criação do modelo do Mongoose, com o nome 'groupMembersList' e o schema definido
export const groupMembersListModel =
	mongoose.model<GroupMembersListDocument>(
		'groupMembersList',
		groupMembersListSchema,
	);
