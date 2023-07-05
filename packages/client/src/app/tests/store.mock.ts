import { provideMockStore } from '@ngrx/store/testing'
import { initialState } from '../store/accounts/accounts.reducer'

export const getMockStore = () => {
  return provideMockStore({
    initialState
  })
}