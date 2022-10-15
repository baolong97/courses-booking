import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../accounts/users/schemas/user.schema';
import { ECourseLevel } from '../constants';
import { CourseContent } from '../dto/create-course.dto';

export type CourseDocument = Course & Document;

@Schema({
  collection: 'courses',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Course {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  trainer: User;

  @Prop({ type: String, enum: ECourseLevel, required: true })
  level: ECourseLevel;

  @Prop({ type: [String] })
  benefits: string[];

  @Prop({ type: String, required: true })
  overview: string;

  @Prop({ type: String, required: true })
  introduce: string;

  @Prop({ type: CourseContent })
  contents: CourseContent[];

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  createdAt: Date;

  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index({ title: 'text' });
