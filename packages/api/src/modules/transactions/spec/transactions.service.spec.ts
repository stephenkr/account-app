import { faker } from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Transaction, TransactionSchema } from 'src/modules/transactions/transactions.schema';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { TestDatabase, getTestDatabase } from 'src/test/testDatabase';
import { generateTransaction } from 'src/test/transaction.testfactory';
import { TransactionType } from '../types';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionModel: Model<Transaction>;
  let testDatabase: TestDatabase;

  beforeAll(async () => {
    testDatabase = await getTestDatabase()
    transactionModel = testDatabase.connection.model(Transaction.name, TransactionSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: getModelToken(Transaction.name), useValue: transactionModel },
      ],
    }).compile();

    service = module.get(TransactionsService);
  });

  afterAll(async () => {
    await testDatabase.down()
  });

  afterEach(async () => {
    await testDatabase.reset()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAccountTransactions', () => {

    it('returns all the transactions related to an account from the database', async () => {
      const accountId = faker.database.mongodbObjectId()

      const collection = [
        generateTransaction({
          accountId
        }),
        generateTransaction({
          accountId
        }),
        generateTransaction({
          accountId
        }),
        generateTransaction()
      ]

      await testDatabase.seed('transactions', collection)

      const accountsCollection = await service.getAllAccountTransactions(accountId)

      expect(accountsCollection.length).toBe(3)
    })
  })

  describe('insertTransaction', () => {
    it('should insert a transaction document', async () => {
      const accountId = faker.database.mongodbObjectId()

      await service.insertTransaction({
        accountId,
        previousBalance: 100,
        newBalance: 50
      })

      const accountsCollection = await service.getAllAccountTransactions(accountId)

      expect(accountsCollection[0]).toEqual(expect.objectContaining({
        accountId,
        balance: 50,
        credit: 0,
        debit: 50,
        type: TransactionType.Sent
      }))
    })
  })
});
