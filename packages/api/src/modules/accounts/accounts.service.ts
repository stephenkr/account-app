import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './accounts.schema';
import { Model } from 'mongoose';
import { getRandomNumber } from './utils/getRandomNumber';
import { getRandomBalance } from './utils/getRandomBalance';

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async getAllAccounts(): Promise<AccountDocument[]> {

    return this.accountModel.find().exec()
  }

  async updateRandomAccount(): Promise<AccountDocument> {
    const maxRecords = await this.accountModel.count()
    const randomIndex = getRandomNumber(0, maxRecords - 1)

    const randomDocument = await this.accountModel.findOne().skip(randomIndex)
    const { availableBalance, balance } = getRandomBalance()

    await randomDocument.updateOne({
      availableBalance,
      balance
    }).exec()

    return this.accountModel.findOne({
      _id: randomDocument._id
    })
  }
}
