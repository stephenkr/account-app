import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Subscription, interval } from 'rxjs';
import { Server } from 'socket.io';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';

const SECONDS_30 = 30_000

@WebSocketGateway({
  cors: true
})
export class AccountsGateway implements OnGatewayInit {
  constructor(private exchangeRateService: ExchangeRateService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('update')
  emitExchangeRateChange(): Subscription {
    return interval(SECONDS_30).subscribe(() => {
      this.exchangeRateService.updateExchangeRate()
      this.server.emit('update', "exchangeRateChange");
    })
  }

  afterInit() {
    this.emitExchangeRateChange()
  }
}
