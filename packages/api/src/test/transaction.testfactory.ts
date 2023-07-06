import { faker } from '@faker-js/faker';

import { nanoid } from 'nanoid'
import { Transaction } from '../modules/transactions/transactions.schema';
import { TransactionType } from '../modules/transactions/types';

export const generateTransaction = (overrides: Partial<Transaction> = {}): Transaction => {
  const balance = faker.number.float({ min: 0, max: 100 })

  return {
    confirmedDate: new Date(),
    orderId: nanoid(5).toUpperCase(),
    orderCode: nanoid(8).toUpperCase(),
    type: TransactionType.Received,
    debit: 0,
    credit: balance,
    balance,
    accountId: faker.string.uuid(),
    ...overrides
  }
}

export const getTransactionCollection = (howMany: number) =>
  new Array(howMany).fill(null).map(() => generateTransaction())

