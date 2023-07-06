import { Injectable } from '@nestjs/common';
import { getRandomNumber } from '../../utils/getRandomNumber';

@Injectable()
export class ExchangeRateService {
  private btcUsdValue = this.getRandomNumber()

  updateExchangeRate() {
    this.btcUsdValue = this.getRandomNumber()
  }

  get exchangeRate() {
    return this.btcUsdValue
  }

  private getRandomNumber() {
    return getRandomNumber(5_000, 12_000)
  }
}
