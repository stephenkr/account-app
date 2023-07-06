import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectExchangeRate } from 'app/store/accounts/accounts.selectors';

@Component({
  selector: 'account-app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent {

  constructor(private store: Store) { }

  get exchangeRateBtcUsd$() {
    return this.store.select(selectExchangeRate)
  }
}
