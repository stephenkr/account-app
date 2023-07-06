import { Test, TestingModule } from '@nestjs/testing';
import { AccountsGateway } from '../accounts.gateway';
import { ExchangeRateService } from '../services/exchange-rate/exchange-rate.service';
import { AccountsService } from '../accounts.service';

jest.useFakeTimers()

describe('AccountsGateway', () => {
  let gateway: AccountsGateway;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AccountsGateway,
        {
          provide: ExchangeRateService,
          useValue: {
            updateExchangeRate: jest.fn()
          }
        }, {
          provide: AccountsService,
          useValue: {
            updateRandomAccount: jest.fn()
          }
        }],
    }).compile();

    gateway = module.get<AccountsGateway>(AccountsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('afterInit', () => {
    const updateExchangeRateMock = jest.fn()
    const updateRandomAccountMock = jest.fn()
    const serverEmitMock = jest.fn()

    beforeAll(() => {
      gateway.server = Object.assign({}, gateway.server, {
        emit: serverEmitMock
      })

      const exchangeRateService = module.get(ExchangeRateService)
      jest.spyOn(exchangeRateService, 'updateExchangeRate').mockImplementation(updateExchangeRateMock)

      const accountService = module.get(AccountsService)
      jest.spyOn(accountService, 'updateRandomAccount').mockImplementation(updateRandomAccountMock)

      gateway.afterInit()

      jest.advanceTimersByTime(55_000)
    })

    it('should trigger the exchange rate change and emit the related event', () => {
      expect(updateExchangeRateMock).toHaveBeenCalled()
      expect(serverEmitMock).toHaveBeenCalledWith('update', 'exchangeRateChange')
    })

    it('should trigger a random account update and emit the related event', () => {
      expect(updateRandomAccountMock).toHaveBeenCalled()
      expect(serverEmitMock).toHaveBeenCalledWith('update', 'accountChange')
    })
  })
});
