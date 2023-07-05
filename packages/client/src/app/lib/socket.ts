import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from './environment';

const config: SocketIoConfig = {
  url: environment.socketHost,
  options: {}
};

export const socketModule = SocketIoModule.forRoot(config)