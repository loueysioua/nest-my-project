import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Todo } from './Todo.schema';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  //one-to-one relation
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserSettings.name })
  settings?: UserSettings;

  //one-to-many relation
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: Todo.name }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
