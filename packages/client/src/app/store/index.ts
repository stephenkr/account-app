import { StoreModule } from '@ngrx/store';
import { accountsReducer } from './accounts/accounts.reducer';
import { AccountsEffects } from './accounts/accounts.effects';
import { EffectsModule } from '@ngrx/effects';

export const effectsModule = EffectsModule.forRoot([AccountsEffects])

export const storeModule = StoreModule.forRoot(
  {
    accounts: accountsReducer
  },
  {}
)
