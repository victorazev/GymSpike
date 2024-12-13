//Schema da coleção lista de amigos

import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose

// Interface para o documento do Mongoose
// Definindo os campos que um documento de lista de amigos pode ter
export interface UserFriendListDocument extends Document {
	addedAt: Date;
	userReference?: any[];
}

// Definindo o schema da lista de amigos, que será usado para criar o modelo de dados
const friendsListSchema = new Schema<UserFriendListDocument>({
	addedAt: { type: Date, required: true }, // Data e hora do início da conexão de usuários, obrigatório
	userReference: { type: Array, default: [] }, // Referência ao documento do usuário, padrão é um array vazio.
});

// Criação do modelo do Mongoose, com o nome 'friendsList' e o schema definido
export const friendsListModel =
	mongoose.model<UserFriendListDocument>(
		'friendsList',
		friendsListSchema,
	);
