import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento de atividade
export interface UserActivityHistoryDocument extends Document {
  exerciseType: 'RUNNING' | 'WEIGHTLIFTING' | 'TREADMILL' | 'SWIMMING'; // Tipo de exercício
  timestampStart: Date; // Data e hora de início da atividade
  timestampEnd: Date; // Data e hora de término da atividade
  score: number; // Pontuação da atividade
  avgHeartbeat: number; // Batimentos cardíacos médios
  estimatedCalories: number; // Calorias estimadas queimadas
  userReference: mongoose.Types.ObjectId; // Referência ao modelo UserList
}

// Schema para as atividades de usuário
const ActivityHistorySchema = new Schema<UserActivityHistoryDocument>({
  exerciseType: { 
    type: String, 
    enum: ['RUNNING', 'WEIGHTLIFTING', 'TREADMILL', 'SWIMMING'], 
    required: true 
  },
  timestampStart: { type: Date, required: true },
  timestampEnd: { type: Date, required: true },
  score: { type: Number, required: true },
  avgHeartbeat: { type: Number, required: true },
  estimatedCalories: { type: Number, required: true },
  userReference: { type: mongoose.Schema.Types.ObjectId, ref: 'UserList', required: true }, // Adicionada referência ao UserList
});

// Modelo para a coleção de histórico de atividades
export const ActivityHistoryModel = mongoose.model<UserActivityHistoryDocument>('ActivityHistory', ActivityHistorySchema);
