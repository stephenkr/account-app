import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date })
  confirmedDate: Date;

  @Prop({ unique: true, required: true })
  orderId: string;

  @Prop({ unique: true, required: true })
  orderCode: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  debit: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  balance: number;

  @Prop({ type: String })
  accountId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// Return a clean ID to the frontend
TransactionSchema.set('toJSON', {
  virtuals: true,
  transform: function (_doc, ret) { delete ret._id }
})