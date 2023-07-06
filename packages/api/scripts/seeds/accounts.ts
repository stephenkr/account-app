import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

export const accountDocuments = Array.from(new Array(25), () => ({
  _id: new mongoose.mongo.ObjectId(faker.database.mongodbObjectId()),
  name: faker.finance.accountName(),
  category: faker.string.alpha(10),
  tags: [faker.string.alpha(5), faker.string.alpha(5)],
  balance: faker.number.float({ min: 0, max: 100 }),
  availableBalance: faker.number.float({ min: 0, max: 100 }),
}))
