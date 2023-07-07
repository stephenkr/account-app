import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './accounts.schema';
import { Model } from 'mongoose';
import { getRandomNumber } from './utils/getRandomNumber';
import { getRandomBalance } from './utils/getRandomBalance';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Account.name) private accountModel: Model<Account>, private transactionService: TransactionsService) { }

  async getAllAccounts(): Promise<AccountDocument[]> {

    return this.accountModel.find().exec()
  }

  async getAccountById(id: string): Promise<AccountDocument> {
    return this.accountModel.findById(id).orFail().exec()
  }

  async getRandomAccount(): Promise<AccountDocument> {
    const maxRecords = await this.accountModel.count()
    const randomIndex = getRandomNumber(0, maxRecords - 1)

    return this.accountModel.findOne().skip(randomIndex).exec()
  }

  async updateRandomAccount(): Promise<string> {
    const randomAccount = await this.getRandomAccount()
    const { availableBalance, balance } = getRandomBalance()

    await randomAccount.updateOne({
      availableBalance,
      balance
    }).exec()

    await this.transactionService.insertTransaction({
      accountId: randomAccount.id,
      previousBalance: randomAccount.balance,
      newBalance: balance,
    })

    return randomAccount.id
  }
}
