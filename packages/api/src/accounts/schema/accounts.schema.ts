import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, type: [String] })
  tags: string[];

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  availableBalance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);