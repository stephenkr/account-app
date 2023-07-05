import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectExchangeRate, selectExchangeRateFetching } from './store/accounts/accounts.selectors';
import { fetchExchangeRate } from './store/accounts/accounts.actions';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'account-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private store: Store, private socketService: SocketService) { }

  get exchangeRateBtcUsd$() {
    return this.store.select(selectExchangeRate)
  }

  get exchangeRateFetching$() {
    return this.store.select(selectExchangeRateFetching)
  }

  ngOnInit(): void {
    this.store.dispatch(fetchExchangeRate())

    this.socketService.onExchangeRateChange().subscribe({
      next: () => {
        this.store.dispatch(fetchExchangeRate())
      }
    })
  }
}
