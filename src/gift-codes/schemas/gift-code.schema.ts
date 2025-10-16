import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GiftCodeDocument = GiftCode & Document;

@Schema({ timestamps: true })
export class GiftCode {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  validUntil: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const GiftCodeSchema = SchemaFactory.createForClass(GiftCode);
