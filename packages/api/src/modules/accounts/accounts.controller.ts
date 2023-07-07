import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.accountService.getAccountById(id)

      return response;
    } catch {
      throw new NotFoundException()
    }
  }

  @Get(':id/transactions')
  async findAllTransactions(@Param('id') id: string) {
    // ensure account exists
    await this.findOne(id)

    return this.transactionService.getAllAccountTransactions(id)
  }
}
