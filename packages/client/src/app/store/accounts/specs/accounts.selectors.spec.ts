import { getAccountWithChangeCollection } from "app/tests/account.testfactory";
import { initialState } from "../accounts.reducer";
import { selectAccounts, selectAccountsFetching, selectExchangeRate, selectExchangeRateFetching } from "../accounts.selectors";

const accountState = {
  ...initialState
}

describe('Account selectors', () => {

  describe('selectAccounts', () => {
    it('returns the correct state', () => {
      const accounts = getAccountWithChangeCollection(5)

      const actual = selectAccounts.projector({
        ...accountState,
        accounts
      })

      expect(actual).toEqual(accounts)
    })
  })

  describe('selectAccountsFetching', () => {
    it('returns the correct state', () => {
      const actual = selectAccountsFetching.projector({
        ...accountState,
        isFetchingAccounts: true
      })

      expect(actual).toEqual(true)
    })
  })

  describe('selectExchangeRate', () => {
    it('returns the correct state', () => {
      const actual = selectExchangeRate.projector({
        ...accountState,
        exchangeRateBtcUsd: 10_000
      })

      expect(actual).toEqual(10_000)
    })
  })

  describe('selectExchangeRateFetching', () => {
    it('returns the correct state', () => {
      const actual = selectExchangeRateFetching.projector({
        ...accountState,
        isFetchingExchangeRate: true
      })

      expect(actual).toEqual(true)
    })
  })
});