import { TestBed } from "@angular/core/testing";
import { SocketActions, SocketService } from "../socket.service"
import { Socket } from "ngx-socket-io";
import { of } from "rxjs";

describe('SocketService', () => {
  let service: SocketService;
  let socket: Socket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocketService,
        {
          provide: Socket,
          useValue: {
            fromEvent: jest.fn(),
          }
        }
      ],
    })

    service = TestBed.inject(SocketService)
    socket = TestBed.inject(Socket)
  })

  it('should only continue if the message is `exchangeRateChange`', (done) => {
    jest.spyOn(socket, 'fromEvent').mockImplementationOnce(() => (
      of(SocketActions.ExchangeRateChange)
    ))

    service.onExchangeRateChange().subscribe((message) => {
      expect(message).toBe(SocketActions.ExchangeRateChange)
      done()
    })
  })
})