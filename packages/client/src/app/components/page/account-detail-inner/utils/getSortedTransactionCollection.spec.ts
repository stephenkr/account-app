import { getSortedTransactionCollection } from './getSortedTransactionCollection'
import { generateTransaction } from 'app/tests/transaction.testfactory'

describe('getSortedTransactionCollection', () => {

  it('sorts the transaction collection as expected', () => {
    const collection = [
      generateTransaction({
        confirmedDate: new Date('2000-01-01T01:01:09.000Z')
      }),
      generateTransaction({
        confirmedDate: new Date('2000-01-01T01:01:01.000Z')
      }),
      generateTransaction({
        confirmedDate: new Date('2000-01-01T01:01:02.000Z')
      })
    ]

    const actual = getSortedTransactionCollection(collection)

    expect(actual).toEqual([
      collection[0],
      collection[2],
      collection[1]
    ])
  })
})