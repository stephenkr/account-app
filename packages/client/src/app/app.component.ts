import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectExchangeRate } from './store/accounts/accounts.selectors';
import { fetchExchangeRate } from './store/accounts/accounts.actions';

@Component({
  selector: 'account-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private store: Store) { }

  get exchangeRateBtcUsd$() {
    return this.store.select(selectExchangeRate)
  }

  ngOnInit(): void {
    this.store.dispatch(fetchExchangeRate())
  }
}
