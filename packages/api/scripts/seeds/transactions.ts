import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker';
import { accountDocuments } from './accounts'
import mongoose from 'mongoose'

export const transactionDocuments = accountDocuments.map((account) => ({
  _id: new mongoose.mongo.ObjectId(faker.database.mongodbObjectId()),
  confirmedDate: new Date(),
  orderId: nanoid(5).toUpperCase(),
  orderCode: nanoid(8).toUpperCase(),
  type: 'received',
  debit: 0,
  credit: account.balance,
  balance: account.balance,
  accountId: account._id.toString()
}))