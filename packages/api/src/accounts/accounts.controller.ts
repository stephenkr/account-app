import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {

  constructor(private accountService: AccountsService) { }

  @Get()
  findAll() {
    return this.accountService.getAllAccounts()
  }

  @Get('exchange-rate')
  getExchangeBtcUsdRate() {
    return {
      btc: 1,
      usd: 1500
    }
  }
}
