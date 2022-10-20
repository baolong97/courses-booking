import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ECourseLevel } from '../constants';
import { CourseContent, CourseTrainer } from '../dto/create-course.dto';

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

  @Prop()
  trainer: CourseTrainer;

  @Prop({ type: String, enum: ECourseLevel, required: true })
  level: ECourseLevel;

  @Prop({ type: [String] })
  highlights: string[];

  @Prop({ type: String, required: true })
  overview: string;

  @Prop({ type: String, required: true })
  introduce: string;

  @Prop({ type: CourseContent, default: [] })
  lessons: CourseContent[];

  @Prop({ type: CourseContent, default: [] })
  exercises: CourseContent[];

  @Prop({ type: CourseContent, default: [] })
  documents: CourseContent[];

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  numberOfStudents: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  numberOfLessons: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  numberOfExercises: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  numberOfDocuments: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ required: true, type: 'number' })
  durationInSeconds: number;

  @Prop({ type: 'boolean' })
  isEndSell: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index({ title: 'text' });
