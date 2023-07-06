import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

export const accountDocuments = Array.from(new Array(25), () => ({
  _id: new mongoose.mongo.ObjectId(faker.database.mongodbObjectId()),
  name: faker.finance.accountName(),
  category: faker.animal.dog(),
  tags: [faker.animal.bird(), faker.animal.bird()],
  balance: faker.number.float({ min: 0, max: 100 }),
  availableBalance: faker.number.float({ min: 0, max: 100 }),
}))
