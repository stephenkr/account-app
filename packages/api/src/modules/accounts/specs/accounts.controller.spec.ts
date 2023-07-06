import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '../accounts.controller';
import { AccountsService } from '../accounts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Account } from '../accounts.schema';
import { ExchangeRateService } from '../services/exchange-rate/exchange-rate.service';
import { getAccountCollection } from 'src/test/account.testfactory';

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
            getAllAccounts: jest.fn()
          }
        },
        ExchangeRateService,
        { provide: getModelToken(Account.name), useValue: Account },
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

      jest.spyOn(accountService, 'getAllAccounts').mockImplementation(() => Promise.resolve(expectedAccounts))

      const actual = await controller.findAll()

      expect(actual).toEqual(expectedAccounts)
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
