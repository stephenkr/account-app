import { Test, TestingModule } from '@nestjs/testing';
import { AccountsGateway } from './accounts.gateway';

describe('AccountsGateway', () => {
  let gateway: AccountsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsGateway],
    }).compile();

    gateway = module.get<AccountsGateway>(AccountsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
