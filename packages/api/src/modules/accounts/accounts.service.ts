import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './accounts.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async getAllAccounts(): Promise<Account[]> {

    return this.accountModel.find().exec()
  }
}
