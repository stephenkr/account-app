import { createAction, props } from "@ngrx/store";
import { Account } from "./types";

export const setAccounts = createAction('[ACCOUNTS] set accounts', props<{ accounts: Account[] }>())