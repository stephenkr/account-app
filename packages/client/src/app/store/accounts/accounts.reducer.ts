import { createReducer, on } from "@ngrx/store";
import { setAccounts } from "./accounts.actions";
import { Account } from "./types";

export const initialState = {
  accounts: [{
    name: 'Hello world',
    category: 'Random',
    tags: 'test',
    balance: 0.00,
    availableBalance: 1.00
  }] as Account[],
}

export type State = typeof initialState;

export const accountsReducer = createReducer(
  initialState,

  on(setAccounts, (state, { accounts }): State => ({
    ...state,
    accounts,
  })),
)