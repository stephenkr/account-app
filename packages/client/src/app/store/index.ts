import { StoreModule } from '@ngrx/store';
import { accountsReducer } from './accounts/accounts.reducer';

export const storeModule = StoreModule.forRoot(
  {
    accounts: accountsReducer
  },
  {}
)
