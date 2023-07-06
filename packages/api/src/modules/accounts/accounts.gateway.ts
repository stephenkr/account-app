import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { BehaviorSubject, interval, switchMap, tap, timer } from 'rxjs';
import { Server } from 'socket.io';
import { AccountsService } from './accounts.service';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';
import { getRandomNumber } from './utils/getRandomNumber';

const SECONDS_30 = 30_000

@WebSocketGateway({
  cors: true
})
export class AccountsGateway implements OnGatewayInit {
  accountChangeInterval$: BehaviorSubject<number> = new BehaviorSubject<number>(1000);

  constructor(private exchangeRateService: ExchangeRateService, private accountService: AccountsService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('update')
  emitExchangeRateChange() {
    this.server.emit('update', 'exchangeRateChange');
  }

  @SubscribeMessage('update')
  emitAccountChange() {
    this.server.emit('update', 'accountChange');
  }

  afterInit() {
    this.intervalUpdateExchangeRate()
    this.intervalUpdateAccount()
  }

  private intervalUpdateExchangeRate() {
    interval(SECONDS_30).subscribe(() => {
      this.exchangeRateService.updateExchangeRate()
      this.emitExchangeRateChange()
    });
  }

  private intervalUpdateAccount() {
    this.accountChangeInterval$.pipe(
      switchMap((duration) => timer(duration)),
      tap(() => this.updateAccountChangeTimer())
    ).subscribe(async () => {
      await this.accountService.updateRandomAccount()
      this.emitAccountChange()
    });
  }

  private updateAccountChangeTimer() {
    // between 20 and 40 seconds
    const duration = getRandomNumber(20_000, 40_000)

    this.accountChangeInterval$.next(duration)
  }
}
