import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./transactions.reducer";

const selectTransactionState = createFeatureSelector<State>('transactions')

export const selectTransactions = createSelector(selectTransactionState, (state) => state.transactions)
export const selectTransactionsFetching = createSelector(selectTransactionState, (state) => state.isFetching)
