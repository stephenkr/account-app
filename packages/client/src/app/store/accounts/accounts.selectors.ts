import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./accounts.reducer";

const selectAccountState = createFeatureSelector<State>('accounts')

export const selectAccounts = createSelector(selectAccountState, (state) => state.accounts)
export const selectExchangeRate = createSelector(selectAccountState, (state) => state.exchangeRateBtcUsd)
