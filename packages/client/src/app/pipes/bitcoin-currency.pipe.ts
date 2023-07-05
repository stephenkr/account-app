import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bitcoinCurrency',
})
export class BitcoinCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} BTC`;
  }
}
