import { createReducer, on } from "@ngrx/store";
import { fetchTransactions, setTransactionLoadFailed, setTransactions } from "./transactions.actions";
import { Transaction } from "./types";

export const initialState = {
  transactions: [] as Transaction[],
  isFetching: false,
  hasFetchingFailed: false,
}

export type State = typeof initialState;

export const transactionsReducer = createReducer(
  initialState,

  on(setTransactions, (state, { transactions }): State => ({
    ...state,
    transactions,
    isFetching: false
  })),

  on(fetchTransactions, (state): State => ({
    ...state,
    isFetching: true,
    hasFetchingFailed: false,
  })),

  on(setTransactionLoadFailed, (state): State => ({
    ...state,
    isFetching: false,
    hasFetchingFailed: true
  }))
)