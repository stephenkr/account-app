import { isDevMode } from "@angular/core";

export const environment = {
  production: isDevMode() === false,
  apiHost: 'http://localhost:4000/api',
  socketHost: 'http://localhost:4000'
};