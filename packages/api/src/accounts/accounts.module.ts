import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountSchema, Account } from './schema/accounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule { }