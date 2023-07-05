import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  onExchangeRateChange() {
    return this.socket.fromEvent('update').pipe(
      filter((message) =>
        message === 'exchangeRateChange'
      )
    )
  }
}