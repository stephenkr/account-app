import { faker } from '@faker-js/faker';
import { Account } from '../modules/accounts/accounts.schema';

export const generateAccount = (overrides: Partial<Account> = {}): Account => ({
  name: faker.finance.accountName(),
  category: faker.string.alpha(10),
  tags: [faker.string.alpha(5), faker.string.alpha(5)],
  balance: faker.number.float({ min: 0, max: 100 }),
  availableBalance: faker.number.float({ min: 0, max: 100 }),
  ...overrides
})

export const getAccountCollection = (howMany: number) =>
  new Array(howMany).fill(null).map(() => generateAccount())