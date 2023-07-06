import { StoreModule } from '@ngrx/store';
import { accountsReducer } from './accounts/accounts.reducer';
import { AccountsEffects } from './accounts/accounts.effects';
import { EffectsModule } from '@ngrx/effects';
import { transactionsReducer } from './transactions/transactions.reducer';
import { TransactionEffects } from './transactions/transactions.effects';

export const effectsModule = EffectsModule.forRoot([AccountsEffects, TransactionEffects])

export const storeModule = StoreModule.forRoot(
  {
    accounts: accountsReducer,
    transactions: transactionsReducer
  },
  {}
)
