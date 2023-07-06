import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transactions.schema';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
  ],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule { }