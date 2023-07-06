import { Seeder } from 'mongo-seeding'
import { accountDocuments } from './seeds/accounts'
import { transactionDocuments } from './seeds/transactions';

const seeder = new Seeder({
  database: {
    name: 'nest'
  },
  dropDatabase: true
})

const collections = [{
  name: 'accounts',
  documents: accountDocuments
}, {
  name: 'transactions',
  documents: transactionDocuments
}]

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch((err) => {
    console.log('Error', err);
  });