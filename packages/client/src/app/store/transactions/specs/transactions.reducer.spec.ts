import { getTransactionCollection } from "app/tests/transaction.testfactory";
import { fetchTransactions, setTransactionLoadFailed, setTransactions } from "../transactions.actions";
import { initialState, transactionsReducer } from "../transactions.reducer";

describe('Transactions reducer', () => {
  it('unknown action', () => {
    const action = {
      type: 'unknown'
    }

    const actual = transactionsReducer(initialState, action)

    expect(actual).toEqual(initialState)
  })

  describe('set transactions', () => {
    it('should set the transactions and set related fetching state to `false`', () => {
      const transactions = getTransactionCollection(5)

      const actual = transactionsReducer({
        ...initialState,
        isFetching: true
      }, setTransactions({
        transactions
      }))

      expect(actual).toEqual({
        ...initialState,
        transactions,
        isFetching: false
      })
    })
  })

  describe('fetch transactions', () => {
    it('should set is fetching state and clear failed state', () => {
      const actual = transactionsReducer({
        ...initialState,
        isFetching: false,
        hasFetchingFailed: true
      }, fetchTransactions({
        accountId: '1'
      }))

      expect(actual).toEqual({
        ...initialState,
        isFetching: true,
        hasFetchingFailed: false
      })
    })
  })

  describe('set transactions fetch failed', () => {
    it('should set the state as failed and reset loading states', () => {
      const actual = transactionsReducer({
        ...initialState,
        isFetching: true,
        hasFetchingFailed: false
      }, setTransactionLoadFailed())

      expect(actual).toEqual({
        ...initialState,
        isFetching: false,
        hasFetchingFailed: true
      })
    })
  })

})