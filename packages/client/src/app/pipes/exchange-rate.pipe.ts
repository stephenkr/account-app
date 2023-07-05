import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exchangeRate',
})
export class ExchangeRatePipe implements PipeTransform {
  transform(value: number, exchangeRate: number): number {
    return this.getConvertedValue(value, exchangeRate)
  }

  private getConvertedValue(value: number, exchangeRate: number): number {
    return value * exchangeRate
  }
}
