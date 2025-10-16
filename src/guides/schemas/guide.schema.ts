import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GuideDocument = Guide & Document;

@Schema({ timestamps: true })
export class Guide {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  htmlContent: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const GuideSchema = SchemaFactory.createForClass(Guide);
