import { getAccountWithChangeCollection } from "app/tests/account.testfactory";
import { fetchAccounts, fetchExchangeRate, setAccountLoadFailed, setAccounts, setExchangeRateBtcUsd, setExchangeRateLoadFailed } from "../accounts.actions";
import { accountsReducer, initialState } from "../accounts.reducer";

describe('Account reducer', () => {
  it('unknown action', () => {
    const action = {
      type: 'unknown'
    }

    const actual = accountsReducer(initialState, action)

    expect(actual).toEqual(initialState)
  })

  describe('Account', () => {

    describe('set accounts', () => {
      it('should set the accounts and set related fetching state to `false`', () => {
        const accounts = getAccountWithChangeCollection(5)

        const actual = accountsReducer({
          ...initialState,
          isFetchingAccounts: true
        }, setAccounts({
          accounts
        }))

        expect(actual).toEqual({
          ...initialState,
          accounts,
          isFetchingAccounts: false
        })
      })
    })

    describe('fetch accounts', () => {
      it('should set is fetching state and clear failed state', () => {
        const actual = accountsReducer({
          ...initialState,
          isFetchingAccounts: false,
          hasFetchingAccountsFailed: true
        }, fetchAccounts())

        expect(actual).toEqual({
          ...initialState,
          isFetchingAccounts: true,
          hasFetchingAccountsFailed: false
        })
      })
    })

    describe('set accounts fetch failed', () => {
      it('should set the state as failed and reset loading states', () => {
        const actual = accountsReducer({
          ...initialState,
          isFetchingAccounts: true,
          hasFetchingAccountsFailed: false
        }, setAccountLoadFailed())

        expect(actual).toEqual({
          ...initialState,
          isFetchingAccounts: false,
          hasFetchingAccountsFailed: true
        })
      })
    })

  })

  describe('Exchange rate', () => {

    describe('set exchange rate', () => {
      it('should set the exchange rate', () => {

        const actual = accountsReducer({
          ...initialState,
          exchangeRateBtcUsd: 0
        }, setExchangeRateBtcUsd({
          exchangeRateBtcUsd: 1
        }))

        expect(actual).toEqual({
          ...initialState,
          exchangeRateBtcUsd: 1
        })
      })
    })

    describe('fetch exchange rate', () => {
      it('should set is fetching state and clear failed state', () => {
        const actual = accountsReducer({
          ...initialState,
          isFetchingExchangeRate: false,
          hasFetchingExchangeRateFailed: true
        }, fetchExchangeRate())

        expect(actual).toEqual({
          ...initialState,
          isFetchingExchangeRate: true,
          hasFetchingExchangeRateFailed: false
        })
      })
    })

    describe('set exchange rate fetch failed', () => {
      it('should set the state as failed and reset loading states', () => {
        const actual = accountsReducer({
          ...initialState,
          isFetchingExchangeRate: true,
          hasFetchingExchangeRateFailed: false
        }, setExchangeRateLoadFailed())

        expect(actual).toEqual({
          ...initialState,
          isFetchingExchangeRate: false,
          hasFetchingExchangeRateFailed: true
        })
      })
    })
  })
});