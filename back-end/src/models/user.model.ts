import mongoose, { Schema, Document } from 'mongoose'; // Importando mongoose, Schema e Document do mongoose
import bcrypt from 'bcrypt'; // Importando a biblioteca bcrypt para manipulação de senhas

// Interface para o documento do Mongoose
// Definindo os campos que um documento de usuário pode ter
export interface UserListDocument extends Document {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: 'F' | 'M'; // Gênero do usuário (Feminino ou Masculino)
  passwordHash: string; // Hash da senha
  lastAccess: Date; // Data do último acesso
  streak: number; // Contagem de streak (sequência de ações ou dias consecutivos)
  admin: boolean; // Flag para indicar se o usuário é administrador
  activityHistory?: any[]; // Histórico de atividades (opcional)
  activityGoals?: any[]; // Metas de atividades (opcional)
  friends?: any[]; // Lista de amigos do usuário (opcional)
  groups?: any[]; // Grupos aos quais o usuário pertence (opcional)
  comparePassword(password: string): Promise<boolean>; // Método para comparar senha
}

// Definindo o schema do usuário, que será usado para criar o modelo de dados
const UserListSchema = new Schema<UserListDocument>({
  email: { type: String, required: true, unique: true }, // Campo de email, obrigatório e único
  username: { type: String, required: true }, // Campo de nome de usuário, obrigatório
  firstName: { type: String, required: true }, // Nome próprio, obrigatório
  lastName: { type: String, required: true }, // Sobrenome, obrigatório
  phone: { type: String, required: true }, // Telefone, obrigatório
  gender: { type: String, enum: ['F', 'M'], required: true }, // Gênero, obrigatório (F ou M)
  passwordHash: { type: String, required: true }, // Hash da senha, obrigatório
  lastAccess: { type: Date, default: Date.now }, // Data do último acesso, com valor padrão para a data atual
  streak: { type: Number, default: 0 }, // Contagem de streak, com valor padrão de 0
  admin: { type: Boolean, default: false }, // Flag de admin, com valor padrão de false
  activityHistory: { type: Array, default: [] }, // Histórico de atividades, padrão é um array vazio
  activityGoals: { type: Array, default: [] }, // Metas de atividades, padrão é um array vazio
  friends: { type: Array, default: [] }, // Lista de amigos, padrão é um array vazio
  groups: { type: Array, default: [] }, // Grupos do usuário, padrão é um array vazio
});

// Middleware "pre" para garantir que a senha seja hasheada antes de ser salva no banco de dados
UserListSchema.pre('save', async function (next) {
  // Verifica se o campo 'passwordHash' foi modificado
  if (this.isModified('passwordHash')) {
    // Gera um salt para a criptografia da senha
    const salt = await bcrypt.genSalt(10);
    // Hasheia a senha e atualiza o campo 'passwordHash'
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  }
  next(); // Passa para o próximo middleware
});

// Método para comparar a senha fornecida com o hash da senha armazenado
UserListSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  // Usa o bcrypt para comparar a senha fornecida com o hash armazenado
  return bcrypt.compare(password, this.passwordHash);
};

// Criação do modelo do Mongoose, com o nome 'UserList' e o schema definido
export const UserListModel = mongoose.model<UserListDocument>('UserList', UserListSchema);
