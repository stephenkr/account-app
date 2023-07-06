import { faker } from '@faker-js/faker';
import { ChangeDirection } from 'app/store/accounts/types';
import { Account, AccountWithChange } from 'app/store/accounts/types';

export const generateAccount = (overrides: Partial<Account> = {}): Account => ({
  id: faker.string.uuid(),
  name: faker.finance.accountName(),
  category: faker.string.alpha(10),
  tags: [faker.string.alpha(5), faker.string.alpha(5)],
  balance: faker.number.float({ min: 0, max: 100 }),
  availableBalance: faker.number.float({ min: 0, max: 100 }),
  ...overrides
})

export const generateAccountWithChange = (overrides: Partial<AccountWithChange> = {}): AccountWithChange => ({
  changeDirection: ChangeDirection.NoChange,
  ...generateAccount(overrides),
  ...overrides
})

export const getAccountCollection = (howMany: number) =>
  new Array(howMany).fill(null).map(() => generateAccount())

export const getAccountWithChangeCollection = (howMany: number) =>
  new Array(howMany).fill(null).map(() => generateAccountWithChange())