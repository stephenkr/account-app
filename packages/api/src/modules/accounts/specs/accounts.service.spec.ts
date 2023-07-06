import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TestDatabase, getTestDatabase } from 'src/test/testDatabase';
import { getAccountCollection } from 'src/test/account.testfactory'
import { Account, AccountDocument, AccountSchema } from '../accounts.schema';
import { AccountsService } from '../accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let accountModel: Model<Account>;
  let testDatabase: TestDatabase;

  beforeAll(async () => {
    testDatabase = await getTestDatabase()
    accountModel = testDatabase.connection.model(Account.name, AccountSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        { provide: getModelToken(Account.name), useValue: accountModel },
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

  describe('updateRandomAccount', () => {
    it('should update a random account document', async () => {
      await testDatabase.seed('accounts', getAccountCollection(5))

      const accounts = await service.getAllAccounts()
      const changedAccount = await service.updateRandomAccount()

      const originalAccount = accounts.find((account: AccountDocument) => changedAccount.equals(account))

      expect(changedAccount._id.toString()).toBe(originalAccount._id.toString())
      expect(originalAccount.balance).not.toBe(changedAccount.balance)
    })
  })
});
