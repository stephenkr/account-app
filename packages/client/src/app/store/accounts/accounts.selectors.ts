import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./accounts.reducer";

const selectAccountState = createFeatureSelector<State>('accounts')

export const selectAccounts = createSelector(selectAccountState, (state) => state.accounts)
export const selectAccountsFetching = createSelector(selectAccountState, (state) => state.isFetchingAccounts)

export const selectSelectedAccount = createSelector(selectAccountState, (state) => state.selectedAccount)
export const selectSelectedAccountFetching = createSelector(selectAccountState, (state) => state.isFetchingSelectedAccount)

export const selectExchangeRate = createSelector(selectAccountState, (state) => state.exchangeRateBtcUsd)
export const selectExchangeRateFetching = createSelector(selectAccountState, (state) => state.isFetchingExchangeRate)
