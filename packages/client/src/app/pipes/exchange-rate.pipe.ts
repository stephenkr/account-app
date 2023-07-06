import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exchangeRate',
})
export class ExchangeRatePipe implements PipeTransform {
  transform(value: number, exchangeRate: number | null): number {
    if (exchangeRate === null) {
      return 0
    }

    return this.getConvertedValue(value, exchangeRate)
  }

  private getConvertedValue(value: number, exchangeRate: number): number {
    return value * exchangeRate
  }
}
