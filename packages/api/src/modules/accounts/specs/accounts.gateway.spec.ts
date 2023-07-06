import { Test, TestingModule } from '@nestjs/testing';
import { AccountsGateway } from '../accounts.gateway';
import { ExchangeRateService } from '../services/exchange-rate/exchange-rate.service';
import { AccountsService } from '../accounts.service';

describe('AccountsGateway', () => {
  let gateway: AccountsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsGateway,
        ExchangeRateService, {
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
});
