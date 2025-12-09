import { Schema } from 'mongoose';

export const LogSchema = new Schema({
  timestamp: { type: Date, required: true },
  usuario: { type: String, required: true },
  status: { type: String, required: true },
});