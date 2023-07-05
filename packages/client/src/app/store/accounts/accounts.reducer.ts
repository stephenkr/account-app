import { createReducer, on } from "@ngrx/store";
import { fetchExchangeRate, setAccounts, setExchangeRateBtcUsd, setExchangeRateLoadFailed } from "./accounts.actions";
import { Account } from "./types";

export const initialState = {
  accounts: [{
    name: 'Hello world',
    category: 'Random',
    tags: 'test',
    balance: 10.00,
    availableBalance: 1.00
  }] as Account[],
  exchangeRateBtcUsd: 0,
  isFetchingExchangeRate: false,
  hasFetchingExchangeRateFailed: false
}

export type State = typeof initialState;

export const accountsReducer = createReducer(
  initialState,

  on(setAccounts, (state, { accounts }): State => ({
    ...state,
    accounts,
  })),

  // exchange rate related

  on(setExchangeRateBtcUsd, (state, { exchangeRateBtcUsd }): State => ({
    ...state,
    exchangeRateBtcUsd,
    isFetchingExchangeRate: false
  })),

  on(fetchExchangeRate, (state): State => ({
    ...state,
    isFetchingExchangeRate: true,
    hasFetchingExchangeRateFailed: false,
  })),

  on(setExchangeRateLoadFailed, (state): State => ({
    ...state,
    isFetchingExchangeRate: false,
    hasFetchingExchangeRateFailed: true
  }))
)