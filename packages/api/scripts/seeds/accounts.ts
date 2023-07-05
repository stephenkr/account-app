import { faker } from '@faker-js/faker';
import { getObjectId } from 'mongo-seeding';

export const documents = Array.from(new Array(25), (_, index) => ({
  id: getObjectId(index + ''),
  name: faker.finance.accountName(),
  category: faker.string.alpha(10),
  tags: [faker.string.alpha(5), faker.string.alpha(5)],
  balance: faker.finance.amount(),
  availableBalance: faker.finance.amount()
}))

export const name = 'accounts'
