import { Injectable } from '@nestjs/common';
import { getRandomNumber } from './utils/getRandomNumber';

@Injectable()
export class ExchangeRateService {
  private btcUsdValue = getRandomNumber(5_000, 12_000)

  updateExchangeRate() {
    this.btcUsdValue = getRandomNumber(5_000, 12_000)
  }

  get exchangeRate() {
    return this.btcUsdValue
  }
}
