import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '../accounts.controller';
import { AccountsService } from '../accounts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Account, AccountDocument } from '../accounts.schema';
import { ExchangeRateService } from '../services/exchange-rate/exchange-rate.service';
import { generateAccount, getAccountCollection } from 'src/test/account.testfactory';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { Transaction } from 'src/modules/transactions/transactions.schema';

describe('AccountsController', () => {
  let controller: AccountsController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useValue: {
            getAllAccounts: jest.fn(),
            getAccountById: jest.fn()
          }
        },
        ExchangeRateService,
        TransactionsService,
        { provide: getModelToken(Account.name), useValue: Account },
        { provide: getModelToken(Transaction.name), useValue: Transaction },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('returns a collection of accounts', async () => {
      const accountService = module.get(AccountsService)
      const expectedAccounts = getAccountCollection(5)

      jest.spyOn(accountService, 'getAllAccounts').mockImplementation(
        () => Promise.resolve(expectedAccounts as AccountDocument[])
      )

      const actual = await controller.findAll()

      expect(actual).toEqual(expectedAccounts)
    })
  })

  describe('findOne', () => {
    it('returns a collection of accounts', async () => {
      const accountService = module.get(AccountsService)
      const expectedAccount = generateAccount()

      jest.spyOn(accountService, 'getAccountById').mockImplementation(
        () => Promise.resolve(expectedAccount as AccountDocument)
      )

      const actual = await controller.findOne('test')

      expect(actual).toEqual(expectedAccount)
    })
  })

  describe('getExchangeBtcUsdRate', () => {

    it('should return the exchange rate', () => {
      const exchangeService = module.get(ExchangeRateService)

      const actual = controller.getExchangeBtcUsdRate()

      expect(actual).toEqual({
        btc: 1,
        usd: exchangeService.exchangeRate
      })
    })
  })
});
