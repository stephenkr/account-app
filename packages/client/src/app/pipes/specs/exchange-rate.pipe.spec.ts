import { ExchangeRatePipe } from '../exchange-rate.pipe';

describe('ExchangeRatePipe', () => {
  it('create an instance', () => {
    const pipe = new ExchangeRatePipe();
    expect(pipe).toBeTruthy();
  });

  it('converts the value with the exchange rate as expected', () => {
    const actual = new ExchangeRatePipe().transform(1, 500)

    expect(actual).toBe(500)
  })

  it('returns `0` if the exchange rate is `null`', () => {
    const actual = new ExchangeRatePipe().transform(1, null)

    expect(actual).toBe(0)
  })
});
