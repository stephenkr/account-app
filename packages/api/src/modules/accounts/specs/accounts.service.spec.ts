import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TestDatabase, getTestDatabase } from 'src/test/testDatabase';
import { getAccountCollection } from 'src/test/account.testfactory'
import { Account, AccountDocument, AccountSchema } from '../accounts.schema';
import { AccountsService } from '../accounts.service';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { Transaction, TransactionSchema } from 'src/modules/transactions/transactions.schema';

describe('AccountsService', () => {
  let service: AccountsService;
  let accountModel: Model<Account>;
  let transactionModel: Model<Transaction>;
  let testDatabase: TestDatabase;

  beforeAll(async () => {
    testDatabase = await getTestDatabase()
    accountModel = testDatabase.connection.model(Account.name, AccountSchema);
    transactionModel = testDatabase.connection.model(Transaction.name, TransactionSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        TransactionsService,
        { provide: getModelToken(Account.name), useValue: accountModel },
        { provide: getModelToken(Transaction.name), useValue: transactionModel },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
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

  describe('getAllAccounts', () => {

    it('returns all the accounts from the database', async () => {
      await testDatabase.seed('accounts', getAccountCollection(5))

      const accountsCollection = await service.getAllAccounts()

      expect(accountsCollection.length).toBe(5)
    })
  })

  describe('getAccountById', () => {

    it('returns the correct account by id', async () => {
      await testDatabase.seed('accounts', getAccountCollection(5))
      const accounts = await service.getAllAccounts()

      const foundAccount = await service.getAccountById(accounts[0].id)

      expect(foundAccount.name).toBe(accounts[0].name)
    })
  })

  describe('updateRandomAccount', () => {
    it('should update a random account document', async () => {
      await testDatabase.seed('accounts', getAccountCollection(5))

      const accounts = await service.getAllAccounts()
      const changedAccountId = await service.updateRandomAccount()
      const changedAccount = await service.getAccountById(changedAccountId)

      const originalAccount = accounts.find((account: AccountDocument) => changedAccount.equals(account))

      expect(changedAccount.id).toBe(originalAccount.id)
      expect(originalAccount.balance).not.toBe(changedAccount.balance)
    })
  })
});
