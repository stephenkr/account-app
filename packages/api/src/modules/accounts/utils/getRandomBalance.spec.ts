import { getRandomBalance } from './getRandomBalance'

describe('getRandomBalance', () => {
  it('returns a random balance below 100', () => {
    const { balance, availableBalance } = getRandomBalance()

    expect(balance < 100).toBe(true)
    expect(availableBalance < 100).toBe(true)
  })

  it('returns balance greater than availableBalance', () => {
    const { balance, availableBalance } = getRandomBalance()

    expect(availableBalance < balance).toBe(true)
  })
})