import { faker } from '@faker-js/faker';

export const documents = Array.from(new Array(25), () => ({
  name: faker.finance.accountName(),
  category: faker.string.alpha(10),
  tags: [faker.string.alpha(5), faker.string.alpha(5)],
  balance: faker.number.float({ min: 0, max: 100 }),
  availableBalance: faker.number.float({ min: 0, max: 100 }),
}))

export const name = 'accounts'
