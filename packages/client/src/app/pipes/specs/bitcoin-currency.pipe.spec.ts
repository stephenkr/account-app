import { BitcoinCurrencyPipe } from '../bitcoin-currency.pipe';

describe('BitcoinCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new BitcoinCurrencyPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the value with the Bitcoin currency format', () => {
    const actual = new BitcoinCurrencyPipe().transform(1000)

    expect(actual).toBe(`1000 BTC`)
  })
});
