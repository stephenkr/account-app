import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { databaseModule } from '../../lib/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [databaseModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
