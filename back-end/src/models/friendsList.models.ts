//Schema da coleção lista de amigos

import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose

// Interface para o documento do Mongoose
// Definindo os campos que um documento de lista de amigos pode ter
export interface UserFriendListDocument extends Document {
	_id: mongoose.Types.ObjectId; // Certifica que o campo `_id` é um ObjectId
	addedAt: Date;
	userReference?: mongoose.Types.ObjectId[]; // IDs de usuários referenciados
  }

// Definindo o schema da lista de amigos, que será usado para criar o modelo de dados
const friendsListSchema = new Schema<UserFriendListDocument>({
	addedAt: { type: Date, required: true },
	userReference: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserList', default: [] }], // Referência ao UserList
  });

// Criação do modelo do Mongoose, com o nome 'friendsList' e o schema definido
export const friendsListModel =
	mongoose.model<UserFriendListDocument>(
		'friendsList',
		friendsListSchema,
	);
