import { getRandomNumber } from './getRandomNumber'

describe('getRandomNumber', () => {
  it('returns a random number between two values as expected', () => {
    const value = getRandomNumber(100, 200)

    const actual = value >= 100 && value <= 200

    expect(actual).toBe(true)
  })
})