import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Subscription, interval } from 'rxjs';
import { Server } from 'socket.io';

const SECONDS_30 = 30_000

@WebSocketGateway({
  cors: true
})
export class AccountsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('update')
  emitExchangeRateChange(): Subscription {
    return interval(SECONDS_30).subscribe(() => {
      this.server.emit('update', "exchangeRateChange");
    })
  }

  handleConnection() {
    this.emitExchangeRateChange()
  }
}
