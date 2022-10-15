import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ERole } from '../constants';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop({ default: '', type: 'date' })
  birthDay: Date;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  avatarUrl: string;

  @Prop({ enum: ERole, type: [String], default: [ERole.USER] })
  roles: ERole[];

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
