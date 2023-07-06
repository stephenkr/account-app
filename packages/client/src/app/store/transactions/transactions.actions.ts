import { createAction, props } from "@ngrx/store";
import { Transaction } from "./types";

export const setTransactions = createAction('[TRANSACTIONS] set transactions', props<{ transactions: Transaction[] }>())
export const fetchTransactions = createAction('[TRANSACTIONS] fetch transactions', props<{ accountId: string }>())
export const setTransactionLoadFailed = createAction('[TRANSACTIONS] fetch transactions failed')