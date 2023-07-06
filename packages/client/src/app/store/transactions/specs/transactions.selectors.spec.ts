import { getTransactionCollection } from "app/tests/transaction.testfactory";
import { initialState } from "../transactions.reducer";
import { selectTransactions, selectTransactionsFetching } from "../transactions.selectors";

const transactionState = {
  ...initialState
}

describe('Transaction selectors', () => {

  describe('selectTransactions', () => {
    it('returns the correct state', () => {
      const transactions = getTransactionCollection(5)

      const actual = selectTransactions.projector({
        ...transactionState,
        transactions
      })

      expect(actual).toEqual(transactions)
    })
  })

  describe('selectTransactionsFetching', () => {
    it('returns the correct state', () => {
      const actual = selectTransactionsFetching.projector({
        ...transactionState,
        isFetching: true
      })

      expect(actual).toEqual(true)
    })
  })
});