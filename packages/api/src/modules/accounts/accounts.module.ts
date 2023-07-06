import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountSchema, Account } from './accounts.schema';
import { AccountsGateway } from './accounts.gateway';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsGateway, ExchangeRateService],
})
export class AccountsModule { }