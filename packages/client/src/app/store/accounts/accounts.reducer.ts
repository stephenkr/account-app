import { createReducer, on } from "@ngrx/store";
import { fetchAccounts, fetchExchangeRate, fetchSelectedAccount, setAccountLoadFailed, setAccounts, setExchangeRateBtcUsd, setExchangeRateLoadFailed, setSelectedAccount, setSelectedAccountLoadFailed } from "./accounts.actions";
import { AccountWithChange, ChangeDirection } from "./types";
import { getAccountsWithChange } from "./utils/getAccountsWithChange";

export const initialState = {
  accounts: [] as AccountWithChange[],
  isFetchingAccounts: false,
  hasFetchingAccountsFailed: false,

  selectedAccount: null as AccountWithChange | null,
  isFetchingSelectedAccount: false,
  hasFetchingSelectedAccountFailed: false,

  exchangeRateBtcUsd: 0,
  isFetchingExchangeRate: false,
  hasFetchingExchangeRateFailed: false
}

export type State = typeof initialState;

export const accountsReducer = createReducer(
  initialState,

  // account specific

  on(setAccounts, (state, { accounts }): State => ({
    ...state,
    accounts: getAccountsWithChange(state.accounts, accounts),
    isFetchingAccounts: false
  })),

  on(fetchAccounts, (state): State => ({
    ...state,
    isFetchingAccounts: true,
    hasFetchingAccountsFailed: false,
  })),

  on(setAccountLoadFailed, (state): State => ({
    ...state,
    isFetchingAccounts: false,
    hasFetchingAccountsFailed: true
  })),

  // selected account specific

  on(setSelectedAccount, (state, { account }): State => ({
    ...state,
    selectedAccount: {
      ...account,
      changeDirection: ChangeDirection.NoChange
    },
    isFetchingSelectedAccount: false
  })),

  on(fetchSelectedAccount, (state): State => ({
    ...state,
    isFetchingSelectedAccount: true,
    hasFetchingSelectedAccountFailed: false,
  })),

  on(setSelectedAccountLoadFailed, (state): State => ({
    ...state,
    isFetchingSelectedAccount: false,
    hasFetchingSelectedAccountFailed: true
  })),

  // exchange rate specific

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