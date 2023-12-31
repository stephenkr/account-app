import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SocketService } from 'app/services/socket.service';
import { fetchAccounts } from 'app/store/accounts/accounts.actions';
import { selectAccounts, selectAccountsFetching, selectExchangeRate } from 'app/store/accounts/accounts.selectors';
import { AccountWithChange } from 'app/store/accounts/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss'],
})
export class AccountTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'category', 'tags', 'balance', 'available_balance'];
  dataSource = new MatTableDataSource<AccountWithChange>([]);
  subscriptions$: Subscription[] = [];
  exchangeRateBtcUsd = 0;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to accounts for the table
    this.subscriptions$.push(
      this.store.select(selectAccounts).subscribe({
        next: (accounts) => {
          this.dataSource = new MatTableDataSource(accounts)
          this.dataSource.sort = this.sort;
        }
      })
    )

    // Subscribe to the exchange rate
    this.subscriptions$.push(
      this.store.select(selectExchangeRate).subscribe({
        next: (exchangeRateBtcUsd) => {
          this.exchangeRateBtcUsd = exchangeRateBtcUsd
        }
      })
    )

    this.store.dispatch(fetchAccounts())

    // Subscribe to the websocket for when an account changes
    this.subscriptions$.push(
      this.socketService.onAccountChange().subscribe({
        next: () => {
          this.store.dispatch(fetchAccounts())
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe()
    })
  }

  get isFetchingAccounts$() {
    return this.store.select(selectAccountsFetching)
  }

  openAccountDetail(rowId: string) {
    this.router.navigate([rowId])
  }
}
