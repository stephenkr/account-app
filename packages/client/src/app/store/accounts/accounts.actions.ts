import { createAction, props } from "@ngrx/store";
import { Account } from "./types";

export const setAccounts = createAction('[ACCOUNTS] set accounts', props<{ accounts: Account[] }>())
export const fetchAccounts = createAction('[ACCOUNTS] fetch accounts')
export const setAccountLoadFailed = createAction('[ACCOUNTS] fetch accounts failed')

export const setExchangeRateBtcUsd = createAction('[ACCOUNTS] set exchange rate btc/usd', props<{ exchangeRateBtcUsd: number }>())
export const fetchExchangeRate = createAction('[ACCOUNTS] fetch exchange rate btc/usd')
export const setExchangeRateLoadFailed = createAction('[ACCOUNTS] fetch exchange rate btc/usd failed')