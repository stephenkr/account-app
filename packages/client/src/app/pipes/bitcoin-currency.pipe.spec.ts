import { BitcoinCurrencyPipe } from './bitcoin-currency.pipe';

describe('BitcoinCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new BitcoinCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
