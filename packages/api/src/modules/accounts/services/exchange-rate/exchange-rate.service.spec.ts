import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateService],
    }).compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update the exchange rate when calling `updateExchangeRate`', () => {
    const originalValue = service.exchangeRate

    service.updateExchangeRate()

    expect(originalValue).not.toBe(service.exchangeRate)
  })

  it('returns a value for `exchangeRate`', () => {
    expect(
      service.exchangeRate
    ).toBeDefined()
  })
});
