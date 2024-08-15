import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expression } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop()
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
