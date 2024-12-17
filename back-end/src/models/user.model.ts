import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface para o documento do Mongoose
export interface UserListDocument extends Document {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: 'F' | 'M';
  passwordHash: string;
  lastAccess: Date;
  streak: number;
  admin: boolean;
  activityHistory?: any[];
  activityGoals?: any[];
  friends?: mongoose.Types.ObjectId[]; // Lista de IDs de friendsList
  groups?: any[];
  comparePassword(password: string): Promise<boolean>;
}

// Definindo o schema do usuário
const UserListSchema = new Schema<UserListDocument>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['F', 'M'], required: true },
  passwordHash: { type: String, required: true },
  lastAccess: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  admin: { type: Boolean, default: false },
  activityHistory: { type: Array, default: [] },
  activityGoals: { type: Array, default: [] },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'friendsList' }], // Relacionamento com friendsList
  groups: { type: Array, default: [] },
});

// Middleware "pre" para hashear a senha
UserListSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash')) {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  }
  next();
});

// Método para comparar senha
UserListSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

// Modelo do Mongoose
export const UserListModel = mongoose.model<UserListDocument>('UserList', UserListSchema);
