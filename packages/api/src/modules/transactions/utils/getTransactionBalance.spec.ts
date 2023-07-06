import { TransactionType } from '../types'
import { getTransactionBalance } from './getTransactionBalance'

describe('getTransactionBalance', () => {
  it('should return the `credit` amount if money is added', () => {
    const actual = getTransactionBalance(
      1_000,
      500
    )

    expect(actual).toEqual({
      credit: 500,
      debit: 0,
      type: TransactionType.Received
    })
  })

  it('should return the `debit` amount if money is removed', () => {
    const actual = getTransactionBalance(
      500,
      1_500
    )

    expect(actual).toEqual({
      credit: 0,
      debit: 1_000,
      type: TransactionType.Sent
    })
  })
})