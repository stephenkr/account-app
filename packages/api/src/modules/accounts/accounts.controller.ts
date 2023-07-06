import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { TransactionsService } from '../transactions/transactions.service';

@Controller('accounts')
export class AccountsController {

  constructor(
    private accountService: AccountsService,
    private exchangeRateService: ExchangeRateService,
    private transactionService: TransactionsService
  ) { }

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.getAccountById(id)
  }

  @Get(':id/transactions')
  findAllTransactions(@Param('id') id: string) {
    return this.transactionService.getAllAccountTransactions(id)
  }
}
