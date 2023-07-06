import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './transactions.schema';
import { Model } from 'mongoose';
import { getTransactionBalance } from './utils/getTransactionBalance';
import { getOrderId } from './utils/getOrderId';
import { getOrderCode } from './utils/getOrderCode';

interface InsertProps {
  accountId: string
  previousBalance: number;
  newBalance: number
}

@Injectable()
export class TransactionsService {

  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) { }

  async getAllAccountTransactions(accountId: string): Promise<TransactionDocument[]> {
    return this.transactionModel.find({
      accountId
    }).exec()
  }

  async insertTransaction({
    accountId,
    previousBalance,
    newBalance
  }: InsertProps): Promise<void> {
    const { debit, credit, type } = getTransactionBalance(
      newBalance,
      previousBalance
    )

    await this.transactionModel.collection.insertOne({
      accountId,
      confirmedDate: new Date(),
      orderId: getOrderId(),
      orderCode: getOrderCode(),
      type,
      debit,
      credit,
      balance: newBalance
    })
  }
}
