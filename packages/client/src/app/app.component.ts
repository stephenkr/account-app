import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectExchangeRate, selectExchangeRateFetching } from './store/accounts/accounts.selectors';
import { fetchExchangeRate } from './store/accounts/accounts.actions';
import { SocketService } from './services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';

  exchangeSocketSubscription: Subscription | null = null

  constructor(private store: Store, private socketService: SocketService) { }

  get exchangeRateBtcUsd$() {
    return this.store.select(selectExchangeRate)
  }

  get exchangeRateFetching$() {
    return this.store.select(selectExchangeRateFetching)
  }

  ngOnInit(): void {
    this.store.dispatch(fetchExchangeRate())

    this.exchangeSocketSubscription = this.socketService.onExchangeRateChange().subscribe({
      next: () => {
        this.store.dispatch(fetchExchangeRate())
      }
    })
  }

  ngOnDestroy(): void {
    if (this.exchangeSocketSubscription) {
      this.exchangeSocketSubscription.unsubscribe()
    }
  }
}
