import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {

  getAllAccounts() {
    return [{
      name: 'Hello world',
      category: 'Random',
      tags: 'test',
      balance: 10.00,
      availableBalance: 1.00
    }]
  }
}
