import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';

@Controller('accounts')
export class AccountsController {

  constructor(private accountService: AccountsService, private exchangeRateService: ExchangeRateService) { }

  @Get()
  findAll() {
    return this.accountService.getAllAccounts()
  }

  @Get('exchange-rate')
  getExchangeBtcUsdRate() {
    return {
      btc: 1,
      usd: this.exchangeRateService.exchangeRate
    }
  }
}
