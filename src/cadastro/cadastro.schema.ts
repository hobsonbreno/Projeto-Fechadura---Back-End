import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cadastro extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  registration: string;

  @Prop({ required: true })
  financialStatus: string;

  @Prop()
  documentPath: string;

  @Prop([String])
  photosPaths: string[];
}

export const CadastroSchema = SchemaFactory.createForClass(Cadastro);
